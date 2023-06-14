let h3s = document.querySelectorAll("h3");
let tables = document.querySelectorAll("table");
let left = document.createElement("div");
document.body.appendChild(left);
left.id = "left";

let right = document.createElement("div");
document.body.appendChild(right);
right.id = "right";

let s = "";
for(let i = 0; i < h3s.length; i++) {
  let anchor = document.createElement("a");
  anchor.href= `javascript:show(${i})`;
  anchor.innerText = h3s[i].innerText;
  anchor.style.display = "block";
  anchor.style.padding = "5px 5px";
  anchor.style.width = "100%";
  left.appendChild(anchor);

  // console.log(h3s[i].innerText);
  // let tr = tables[i].querySelectorAll("tr");
  // for(let j = 0; j < tr.length; j++) {
  //   let td = tr[j].querySelectorAll("td");
  //   let c = td[td.length -1].innerText;
  //   if(c.length == 0) {
  //     console.log(tr[j].innerHTML)
  //   }
  // }
  
  tables[i].style.display = "none";
  h3s[i].style.display = "none";
}

function show(index) {
  right.innerHTML = "";
  setTimeout(() => {
    let table = document.createElement("table");
    right.appendChild(table);

    let tr = tables[index].querySelectorAll("tr");
    let row;
    for(let i = 0; i < tr.length; i++) {
      row = table.insertRow();
      let cell = row.insertCell();
      cell.innerText = (i + 1);
      cell.style.textAlign = "right";

      let td = tr[i].querySelectorAll("td");
      for(let j = 0; j < td.length; j++) {
        let cell = row.insertCell();
        if(j == 0) {
          cell.innerHTML = window.renderAccent(td[0].innerText, td[3].innerText)
        } else
          cell.innerHTML = td[j].innerText;
      }
    }

    let a = document.querySelectorAll("a");
    for(let i = 0; i < a.length; i++) {
      if(index == i)
        a[i].removeAttribute("href");
      else 
        a[i].href = `javascript:show(${i})`;
    }
  }, 300);
}

let style = document.createElement('style');
style.innerHTML = `
  html, body {
    min-height: 100% !important;
    height: 100%;
  }
  body {
    margin: 0px;
    padding: 0px 0px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
  }
  #left, #right {
    height: 100%;
    border: 0px solid red;
  }
  #left {
    // width: 150px;
    overflow: auto;
  }
  #right {
    flex: 1;
    overflow: auto;
    padding: 5px;
  }
  table {
    border-collapse: collapse; 
    font-size: 16px;
    width: 100%;
  }
  td{
    border: 1px solid black;
    padding: 5px;
  }
  span.accent {
    margin-top: 2px;
    border-top: 1px solid #D3D3D3;
    border-left: 1px solid #D3D3D3;
    border-right: 1px solid #D3D3D3;
  }
  span.accent-bottom  {
    border-bottom: 1px solid #D3D3D3;
  }
`;
document.getElementsByTagName("head")[0].appendChild(style);