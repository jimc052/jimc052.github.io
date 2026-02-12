/*
node node_monkey.js
*/

const express = require('express');
const app = express();
const { exec } = require('child_process');
const port = 3000;
const SocketServer = require('ws').Server;
const fs = require('fs');
const wss = new SocketServer({ port: 8080 });
let shotIndex = 0, refreshFrequcy = 100;
let screenshots = "screenshots";
let captureSessionId = 0;
let monkeyProcess = null;

wss.on('connection', async (ws) => {
  console.log('Client connected; sieze: ' + wss.clients.size + "; " + now());
  if(wss.clients.size === 1) {
    clearFolder();
    shotIndex = 0;
    captureSessionId++;
    const sessionId = captureSessionId;
    try {
      await checkFolder();
      screenCapture(sessionId);
    } catch (e) {
      broadcast({ type: "error", message: `${e}` });
    }
  }

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      if(data.type === 'tap') {
        await execCmd(`adb shell input tap ${data.x} ${data.y}`);
        broadcast(Object.assign(data, {message: `OK`}));
      } else {
        console.log(`Received message: ${message}`);
      }
    } catch (e) {
      // console.error(e);
      broadcast({ type: "error", message: `${e}` });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected; sieze: ' + wss.clients.size + "; " + now());
    if(wss.clients.size === 0) {
      shotIndex = -1;
      captureSessionId++;
      clearFolder();
      if (monkeyProcess) {
        monkeyProcess.kill();
        monkeyProcess = null;
        exec('adb shell pkill -f com.android.commands.monkey', () => {});
      }
    }
  });
});

function now(params) {
  return (new Date()).toLocaleTimeString('zh-Hant', { hour12: false });
}

function execCmd(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

function clearFolder() {
  if (fs.existsSync(`monkey_script.txt`)) {
    fs.unlinkSync(`monkey_script.txt`);
  }

  const dir = './' + screenshots;
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      fs.unlinkSync(`${dir}/${file}`);
    });
  }
}

function checkFolder() {
  const dir = './' + screenshots;
  return new Promise((resolve, reject) => {
    fs.access(dir, (err) => {
      if (err) {
        fs.mkdir(dir, (err) => {
          reject(err);
        });
      }
    });
    resolve();
  });
}

function screenCapture(sessionId) {
  if (sessionId !== captureSessionId) return;
  function capture() {
    exec('adb shell screencap -p /sdcard/screenshot.png', (error, stdout, stderr) => {
      if (sessionId !== captureSessionId) return;
      if (error) {
        console.error(`exec error: ${error}`);
        broadcast({ type: "error", message: `exec error: ${error}` });
      } else if(shotIndex != -1) {
        // console.log("pulling..." + (new Date().toISOString()));
        pull();
      }
      // 指令執行完畢後，等待 600ms 再執行下一次抓圖
    });
  }
  function pull() {
    const newPng = `${screenshots}/screenshotNew.png`;
    const oldPng = `${screenshots}/screenshot.png`;
    exec(`adb pull /sdcard/screenshot.png ${newPng}`, (error, stdout, stderr) => {
      if (sessionId !== captureSessionId) return;
      if (error) {
        console.error(`exec error: ${error}`);
        broadcast({ type: "error", message: `exec error: ${error}` });
      } else { // 指令執行完畢後，等待 600ms 再執行下一次抓圖
        try {
          const newFileBuffer = fs.readFileSync(newPng);
          let changed = false;
          if (!fs.existsSync(oldPng)) {
            fs.renameSync(newPng, oldPng);
            changed = true;
          } else {
            const oldFileBuffer = fs.readFileSync(oldPng);
            if (!newFileBuffer.equals(oldFileBuffer)) {
              fs.unlinkSync(oldPng);
              fs.renameSync(newPng, oldPng);
              changed = true;
            } else {
              fs.unlinkSync(newPng);
            }
          }
          if (changed) {
            broadcast({ type: "screenshot", message: `${oldPng}?t=${Date.now()}` });
          }
        } catch (e) {
          console.error(`File operation error: ${e}`);
          broadcast({ type: "error", message: `File operation error: ${e}` });
        }
        setTimeout(() => screenCapture(sessionId), refreshFrequcy);
      }
    });    
  }
  if(shotIndex != -1)
    capture();
}


function broadcast(params) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(params));
    }
  });
}

app.use(express.static(__dirname));
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});

process.on('SIGINT', () => {
  clearFolder();
  server.close(() => {
    process.exit(0);
  });
});