/*
node adbTool.js
*/

const express = require('express');
const app = express();
const { exec } = require('child_process');
const port = 3000;
const fs = require('fs');


function today() {
  return (new Date()).toLocaleDateString('zh-Hant', { year: 'numeric', month: '2-digit', day: '2-digit' });
  //.replace(/\//g, '')
}
function now() {
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


app.use(express.static(__dirname));
app.use(express.json());           // 讓 req.body 可以讀到 JSON
app.use(express.urlencoded({ extended: true })); // 讀取 form-data

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/items', (req, res) => {
  // req.query.type 取得 query string
});

app.post('/api/items', (req, res) => {
  // req.body.name / req.body.qty
  console.log(req.body);
  res.json({ success: true });
});

const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  exec(`open -a "Google Chrome" http://localhost:${port}`);
});
