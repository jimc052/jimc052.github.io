class Table {
  constructor(props) {
    this.onclick = props.onclick;
    this.onmsg = props.onmsg;
    this.table = document.getElementById('table');
    this.active = -1;
    ds.forEach(element => {
      this.insertRow(element);
    });
  }

  insertRow(params) {
    if(this.active !== -1) {
      this.displayRow();
    }
    const row = this.table.insertRow();
    // console.log("rowIndex: " + row.rowIndex)
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    row.insertCell(4); // 刪除功能
    cell1.innerHTML = params.title;
    cell2.innerHTML = params.x;
    cell3.innerHTML = params.y;
    cell4.innerHTML = params.ms;

    row.addEventListener('click', (e) => {
      if(this.active !== -1 && this.active !== row.rowIndex) {
        this.displayRow();
      } else if(this.active == -1 || this.active !== row.rowIndex) {
        this.onclick(row.rowIndex - 1);
      }
      this.focusRow(row.rowIndex);
      
      if(e.target.cellIndex == 4) {
        const tr = e.target.closest('tr');
        let index = tr.rowIndex;
        let answer = confirm(`確定要刪除第 ${index} 筆資料嗎？`);
        if(answer) {
          this.table.deleteRow(tr.rowIndex);
          ds.splice(tr.rowIndex - 1, 1);
          window.localStorage["monkey_script"] = JSON.stringify(ds, null, 2);
          this.onmsg(`第 ${index} 筆資料已刪除`);
          this.active = -1;
        }
      }
    });

    row.addEventListener('dblclick', (e) => {
      if(this.active !== -1) {
        this.displayRow();
      }
      if (this.active !== row.rowIndex) {
        this.active = row.rowIndex;
        this.editRow(row);
        // this.onclick(row.rowIndex - 1);
      }
    });
  }

  displayRow() {
    if(this.active == -1) return;
    const row = this.table.rows[this.active];
    row.classList.remove('editing');
    const cells = row.cells;
    let data = ds[this.active - 1];
    let cols = Object.keys(data);
    for (let i = 0; i < cells.length - 1; i++) {
      cells[i].innerHTML = data[cols[i]];
    }
    this.active = -1;
  }

  editRow(row) {
    const cells = row.cells;
    row.classList.add('editing');

    for(let i = 0; i < cells.length - 1; i++) {
      const val = cells[i].innerHTML;
      const type = i === 0 ? 'text' : 'number';
      cells[i].innerHTML = `<input type="${type}" style="width: 100%; padding: 5px;" value="${val}">`;
      cells[i].querySelector('input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();

          const tr = e.target.closest('tr');
          const cell = e.target.closest('td');
          const value = e.target.value;
          let msg = "";
          if(value.trim() == "") {
            msg = "請輸入內容"
          } else if(cell.cellIndex !== 0 && isNaN(value)) {
            msg = "請輸入數字"
          }
          if(msg !== "") {
            alert(msg);
            e.target.value = this.recover(tr.rowIndex, cell.cellIndex)
          } else {
            this.saveDataSet(tr.rowIndex, cell.cellIndex, value);
            if(cell.cellIndex == cells.length - 2) {
              this.displayRow();
            } else {
              tr.cells[cell.cellIndex + 1].querySelector('input').focus();
            }
          }
        }
      });
    }
  }

  focusRow(rowIndex, scrollTo) {
    for(let i = 1; i < this.table.rows.length; i++) {
      // row.classList.add('focused');
      if(i == rowIndex) {
        this.table.rows[i].classList.add('focused');
        if (scrollTo) {
          this.table.rows[i].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        this.table.rows[i].classList.remove('focused');
      }
    }
    if(rowIndex == -1) {
      this.table.rows[0].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  updateCell4(index, value) {
    if(this.active !== -1) {
      this.displayRow();
    }
    this.table.rows[index + 1].cells[3].innerHTML = value;
  }

  recover(rowIndex, cellIndex) {
    let data = ds[rowIndex - 1];
    let cols = Object.keys(data);
    return data[cols[cellIndex]];
  }

  saveDataSet(rowIndex, cellIndex, value) {
    let data = ds[rowIndex - 1];
    let cols = Object.keys(data);
    data[cols[cellIndex]] = value;
    window.localStorage["monkey_script"] = JSON.stringify(ds, null, 2);
    this.onmsg(`第 ${rowIndex} 筆資料已儲存`);
  }

  show() {
    this.table.style.display = 'block';
  }

  hide() {
    this.table.style.display = 'none';
  }

  clear() {
    this.active = -1;
    for(let i = this.table.rows.length - 1; i > 0; i--) {
      this.table.deleteRow(i);
    }
  }
}