window.renderAccent = (語, 重音) => {
  let values = 語.split("//");
  let accnets = 重音.split("//");
  let voicedSound = "ゃャゅュょョ"; // 拗音
  let results = "";

  for(let x = 0; x < values.length; x++) {
    let value = values[x];
    let accent = accnets[x];
    if(typeof accent == "string" && accent.length > 1) {
      accent = accent.substr(0, 1);
    } else if(accent.length == 0) {
      accent = null;
    }
    if(isNaN(accent)) {
      if(accent == "⓪")
        accent = "0";
      else {
        let c = (accent.charCodeAt(0) - 9311);
        if(c > 10 || c < 1) {
          accent = null;
        } else
          accent = c + "";
      }
    }
    let arr = [];
    for (let i = 0; i < value.length; i++) {
      let char = value.substr(i, 1);
      if(char == "。")
        continue;
      else if (voicedSound.indexOf(char) > -1) { // 拗音
        arr[arr.length - 1] += char;
        // console.log(arr[arr.length - 1])
      } else {
        arr.push(char);
      }
    }
    // console.log(arr)
    let result = "";
    if(typeof accent != "undefined" && accent != null) {
      let str = ["", "", ""];
      for(let i = 0; i < arr.length; i++) {
        if(accent == "0" && i > 0) {
          // result += "<span class='accent'>" + arr[i] + "</span>";
          str[1] += arr[i];
        } else if(accent == "1" && i == 0) {
          // result += "<span class='accent'>" + arr[i] + "</span>";
          str[1] += arr[i];
        } else if(accent.indexOf(",") == -1 && i > 0 && i < accent) {
          // result += "<span class='accent'>" + arr[i] + "</span>";
          str[1] += arr[i];
        } else {
          str[str[1].length == 0 ? 0 : 2] += arr[i]
          // result += arr[i];
        }
      }
      str.forEach((el, index) => {
        if(el.length > 0) {
          result += "<span" + (index == 1 ? " class='accent'" : " class='accent-bottom'") + ">" + el + "</span>";
        }
      })
    } else {
      result = arr.join("");
    }
    results += (results.length > 0 ? "//" : "") + result;
  }
  return results;
}