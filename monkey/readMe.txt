1. 啟動 GoLive，會開啟 index.html。
2. 截圖後並下載到電腦：
  adb shell screencap -p /sdcard/screenshot.png && adb pull /sdcard/screenshot.png
3. index.html 會即時更新 Android 設備上的畫面圖檔。
4. 點選圖檔，右邊會新增一筆記錄；修改 title 及 ms(毫秒)。
5. 重複 2～4 步驟到全部流程結束後，按右下方的「monkey」button。
6. monkey.html，按下方的「腳本」button；將內容複製、貼上，儲存到 monkey_script.txt。
2. 上傳腳本到手機後，執行腳本：
  adb push monkey_script.txt /sdcard/ && adb shell monkey -f /sdcard/monkey_script.txt -v 1
