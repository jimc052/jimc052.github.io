window.renderAccent = (語, 重) => {
  let values = 語.split("//");
  let accnets = 重.split("//");
  let voicedSound = "ゃャゅュょョ"; // 拗音
  let results = "";

  for(let x = 0; x < values.length; x++) {
    let value = values[x];
    let accent = accnets.length > x ? accnets[x] : accnets[0];
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
    results += (results.length > 0 ? "，" : "") + result;
  }
  return results;
}

window.rome = (value) => { // 羅馬拼音
  let datas = window.japanese();
  let voicedSound = "ゃャゅュょョ"; // 拗音
  let doubleConsonan = "っッ"; // 促音, 雙寫後面第一個假名的字母
  let longSound = {a: "ā", i: "ī", u: "ū", e: "ē", o: "ō"}; // 長音
  let voiceN = "んン";

  let arr1 = [];
  for (let i = 0; i < value.length; i++) {
    let char = value.substr(i, 1);
    if(char == "。")
      continue;
    else if (voicedSound.indexOf(char) > -1) { // 拗音
      arr1[arr1.length - 1] += char;
    } else if (doubleConsonan.indexOf(char) > -1 && i == value.length - 1) { // 促音, 在最後一個字；不發音

    } else {
      arr1.push(char);
    }
  }

  let indexDoubleConsonan = -1;
  let i = 0;
  while(i < arr1.length) {
    let char = arr1[i];
    if (voiceN.indexOf(char) > -1) { // ん 後續音, 不懂 2023-05-25
      arr1[i] = "n"
    } else if (doubleConsonan.indexOf(char) > -1) { // 促音

    } else if (char == "ィ") { // 不知怎麼用，只好寫死
      let c1 = arr1[i - 1] == null || arr1[i - 1].length == 1
        ? "" : arr1[i - 1].substr(0, arr1[i - 1].length - 1);
      let c2 =  arr1[i - 1] == null || arr1[i - 1].length == 1
        ? arr1[i - 1] : arr1[i - 1].substr(arr1[i - 1].length - 1, 1);
      if (c2 == "e" || c2 == "u") { // 長音
        arr1[i - 1] = c1 + longSound["i"];
        arr1.splice(i, 1); continue;
      } else {
        arr1[i] = "i";
      }
    } else if (char == "ー") { // 長音
      let c1 = arr1[i - 1].substr(0, arr1[i - 1].length - 1);
      let c2 = arr1[i - 1].substr(arr1[i - 1].length - 1, 1);
      let c3 = longSound[c2];
      if(typeof c3 != "undefined" )
        arr1[i - 1] = c1 + c3;
      arr1.splice(i, 1); continue;
    } else {
      let mp3 = match(char); // char == "ィ" ? "i" : 
      if (mp3.length > 0) {
        if (i > 0 && doubleConsonan.indexOf(arr1[i - 1]) > -1) { // 促音
          arr1[i] = mp3.substring(0, 1) + mp3;
          arr1[i - 1] = null;
          indexDoubleConsonan = i;
        } else if (i > 0 && indexDoubleConsonan != i - 1 && "aiueo".indexOf(mp3) > -1) { // 長音
          if (arr1[i - 1] == mp3) {
            arr1[i - 1] = longSound[mp3];
            arr1.splice(i, 1); continue;
          } else if ("aiueo".indexOf(mp3) > -1) {
            let c1 = arr1[i - 1] == null || arr1[i - 1].length == 1
              ? "" : arr1[i - 1].substr(0, arr1[i - 1].length - 1);
            let c2 =  arr1[i - 1] == null || arr1[i - 1].length == 1
              ? arr1[i - 1] : arr1[i - 1].substr(arr1[i - 1].length - 1, 1);
            if ((c2 == mp3) || (c2 == "e" && mp3 == "i") || (c2 == "o" && mp3 == "u")) { // 長音
              arr1[i - 1] = c1 + longSound[c2];
              arr1.splice(i, 1); continue;
            } else
              arr1[i] = mp3;
          }
        } else
          arr1[i] = mp3;
      }
    }
    i++;
  }
  arr1 = arr1.filter(el => {
    return el != null
  });
  return arr1.join(" ").replace(/  /g, " ").replace(/\[ /g, "[").replace(/ \]/g, "]");

  function match(char) {
    let mp3 = "";
    for(let x = 0; x < datas.length; x++){
      for(let y = 0; y < datas[x].length; y++){
        for(let z = 0; z < datas[x][y].length; z++){
          if(datas[x][y][z] == null) continue;
          if(datas[x][y][z]["平"] === char || datas[x][y][z]["片"] === char) {
            mp3 = datas[x][y][z]["mp3"];
            break;
          }
        }
        if(mp3.length > 0) break;
      }
      if(mp3.length > 0) break;
    }
    if(mp3.indexOf(",") > -1) mp3 = mp3.split(",")[0];
    return mp3;
  }
}

window.japanese = function() {
  return [
    [ // 清音
      [{"平":"あ","mp3":"a","片":"ア"},{"平":"い","mp3":"i","片":"イ"},{"平":"う","mp3":"u","片":"ウ"},{"平":"え","mp3":"e","片":"エ"},{"平":"お","mp3":"o","片":"オ"}],
      [{"平":"か","mp3":"ka","片":"カ"},{"平":"き","mp3":"ki","片":"キ"},{"平":"く","mp3":"ku","片":"ク"},{"平":"け","mp3":"ke","片":"ケ"},{"平":"こ","mp3":"ko","片":"コ"}],
      [{"平":"さ","mp3":"sa","片":"サ"},{"平":"し","mp3":"shi,si","片":"シ"},{"平":"す","mp3":"su","片":"ス"},{"平":"せ","mp3":"se","片":"セ"},{"平":"そ","mp3":"so","片":"ソ"}],
      [{"平":"た","mp3":"ta","片":"タ"},{"平":"ち","mp3":"chi,ti,ci","片":"チ"},{"平":"つ","mp3":"tsu,tu,cu","片":"ツ"},{"平":"て","mp3":"te","片":"テ"},{"平":"と","mp3":"to","片":"ト"}],
      [{"平":"な","mp3":"na","片":"ナ"},{"平":"に","mp3":"ni","片":"ニ"},{"平":"ぬ","mp3":"nu","片":"ヌ"},{"平":"ね","mp3":"ne","片":"ネ"},{"平":"の","mp3":"no","片":"ノ"}],
      [{"平":"は","mp3":"ha","片":"ハ"},{"平":"ひ","mp3":"hi","片":"ヒ"},{"平":"ふ","mp3":"fu,hu","片":"フ"},{"平":"へ","mp3":"he","片":"ヘ"},{"平":"ほ","mp3":"ho","片":"ホ"}],
      [{"平":"ま","mp3":"ma","片":"マ"},{"平":"み","mp3":"mi","片":"ミ"},{"平":"む","mp3":"mu","片":"ム"},{"平":"め","mp3":"me","片":"メ"},{"平":"も","mp3":"mo","片":"モ"}],
      [{"平":"や","mp3":"ya","片":"ヤ"},null,{"平":"ゆ","mp3":"yu","片":"ユ"},null,{"平":"よ","mp3":"yo","片":"ヨ"}],
      [{"平":"ら","mp3":"ra","片":"ラ"},{"平":"り","mp3":"ri","片":"リ"},{"平":"る","mp3":"ru","片":"ル"},{"平":"れ","mp3":"re","片":"レ"},{"平":"ろ","mp3":"ro","片":"ロ"}],
      [{"平":"わ","mp3":"wa","片":"ワ"},null,null,null,{"平":"を","mp3":"o","片":"ヲ"}],[{"平":"ん","mp3":"n","片":"ン"},null,null,null,null]
    ], [ // 濁音
      [{"平":"が","mp3":"ga","片":"ガ"},{"平":"ぎ","mp3":"gi","片":"ギ"},{"平":"ぐ","mp3":"gu","片":"グ"},{"平":"げ","mp3":"ge","片":"ゲ"},{"平":"ご","mp3":"go","片":"ゴ"}],
      [{"平":"ざ","mp3":"za","片":"ザ"},{"平":"じ","mp3":"ji,zi","片":"ジ"},{"平":"ず","mp3":"zu","片":"ズ"},{"平":"ぜ","mp3":"ze","片":"ゼ"},{"平":"ぞ","mp3":"zo","片":"ゾ"}],
      [{"平":"だ","mp3":"da","片":"ダ"},{"平":"ぢ","mp3":"di","片":"ヂ"},{"平":"づ","mp3":"du","片":"ヅ"},{"平":"で","mp3":"de","片":"デ"},{"平":"ど","mp3":"do","片":"ド"}],
      [{"平":"ば","mp3":"ba","片":"バ"},{"平":"び","mp3":"bi","片":"ビ"},{"平":"ぶ","mp3":"bu","片":"ブ"},{"平":"べ","mp3":"be","片":"ベ"},{"平":"ぼ","mp3":"bo","片":"ボ"}],
      [{"平":"ぱ","mp3":"pa","片":"パ"},{"平":"ぴ","mp3":"pi","片":"ピ"},{"平":"ぷ","mp3":"pu","片":"プ"},{"平":"ぺ","mp3":"pe","片":"ペ"},{"平":"ぽ","mp3":"po","片":"ポ"}]
    ], [ // ゃャゅュょョ 拗音
      [
        {"平":"きゃ","mp3":"kya","片":"キャ"},null,
        {"平":"きゅ","mp3":"kyu","片":"キュ"},null,
        {"平":"きょ","mp3":"kyo","片":"キョ"}
      ],
      [{"平":"しゃ","mp3":"sha,sya","片":"シャ"},null,{"平":"しゅ","mp3":"shu,syu","片":"シュ"},null,{"平":"しょ","mp3":"sho,syo","片":"ショ"}],
      [{"平":"ちゃ","mp3":"cha,cya","片":"チャ"},null,{"平":"ちゅ","mp3":"chu,cyu","片":"チュ"},null,{"平":"ちょ","mp3":"cho,cyo","片":"チョ"}],
      [{"平":"にゃ","mp3":"nya","片":"ニャ"},null,{"平":"にゅ","mp3":"nyu","片":"ニュ"},null,{"平":"にょ","mp3":"nyo","片":"ニョ"}],
      [{"平":"ひゃ","mp3":"hya","片":"ヒャ"},null,{"平":"ひゅ","mp3":"hyu","片":"ヒュ"},null,{"平":"ひょ","mp3":"hyo","片":"ヒョ"}],
      [{"平":"みゃ","mp3":"mya","片":"ミャ"},null,{"平":"みゅ","mp3":"myu","片":"ミュ"},null,{"平":"みょ","mp3":"myo","片":"ミョ"}],
      [{"平":"りゃ","mp3":"rya","片":"リャ"},null,{"平":"りゅ","mp3":"ryu","片":"リュ"},null,{"平":"りょ","mp3":"ryo","片":"リョ"}],
      [{"平":"ぎゃ","mp3":"gya","片":"ギャ"},null,{"平":"ぎゅ","mp3":"gyu","片":"ギュ"},null,{"平":"ぎょ","mp3":"gyo","片":"ギョ"}],
      [{"平":"じゃ","mp3":"ja,zya","片":"ジャ"},null,{"平":"じゅ","mp3":"ju,zyu","片":"ジュ"},null,{"平":"じょ","mp3":"jo,zyo","片":"ジョ"}],
      [{"平":"びゃ","mp3":"bya","片":"ビャ"},null,{"平":"びゅ","mp3":"byu","片":"ビュ"},null,{"平":"びょ","mp3":"byo","片":"ビョ"}],
      [{"平":"ぴゃ","mp3":"pya","片":"ピャ"},null,{"平":"ぴゅ","mp3":"pyu","片":"ピュ"},null,{"平":"ぴょ","mp3":"pyo","片":"ピョ"}],
    ]
  ];
}

// window.japanese().forEach(el1 => {
//   el1.forEach(el2 => {
//     el2.forEach(el3 => {
//       if(el3 != null && el3.mp3.indexOf(",") > 0) {
//         console.log(el3.mp3);
//       }
//     });
//   });
// })