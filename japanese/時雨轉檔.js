let h4s = document.querySelectorAll("h4");
let divs = document.querySelectorAll("div");
let tables = document.querySelectorAll("table");
// console.log(h4s)
// console.log(tables)
let result = "";
for(let i = 0; i < h4s.length; i++) {
  console.log(i + ": " + h4s[i].innerText)
  let 分類 = h4s[i].innerText == "綜合" || h4s[i].innerText == "綜合" == "片假名" 
    ? undefined : h4s[i].innerText;
  let trs = tables[i].querySelectorAll("tr");
  let colNames = trs[0].innerText.split("\t");
  if(分類 == "片假名") 
    colNames[0] = "假名";
  result += (result.length > 0 ? "\n" : "");
  
  // if(i < 1) {
    for(let j = 1; j < trs.length; j ++){
      let json = {分類};
      let tds = trs[j].innerText.split("\t");
      for(let k = 0; k < colNames.length; k++) {
        if("日文,假名,重音,中文".indexOf(colNames[k]) > -1)
          json[colNames[k]] = tds[k];
      }
      if(json["假名"].indexOf("---") > -1) {
        json["假名"] = json["日文"];
        json["日文"] = "";
      }
      result += (result.length > 0 ? ",\n" : "") + "  " + JSON.stringify(json);
    }
  // }

  divs[i].style.display = "none";
  h4s[i].style.display = "none";
  tables[i].style.display = "none";
}

document.body.style.margin = "0px";
document.body.style.padding = "0px";

let textarea = document.createElement("textarea");
textarea.style.width = "100%";
textarea.style.height = "100%";
textarea.style.fontSize = "16px"
textarea.value = result;

document.body.appendChild(textarea);