class Table {
  constructor(props) {
    this.ds = [];
    this.onclick = props.onclick;
    this.onmsg = props.onmsg;
    this.table = document.getElementById('table');
    this.active = -1;
    if(Array.isArray(props.ds) && props.ds.length > 0) {
      this.ds = props.ds;
    } 

    this.ds.forEach(element => {
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
    cell1.innerHTML = params.title;
    cell2.innerHTML = params.x;
    cell3.innerHTML = params.y;
    cell4.innerHTML = params.ms;

    row.addEventListener('click', () => {
      if(this.active !== -1 && this.active !== row.rowIndex) {
        this.displayRow();
      } else if(this.active == -1 || this.active !== row.rowIndex) {
        this.onclick(row.rowIndex - 1);
      }
    });

    row.addEventListener('dblclick', () => {
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
    const row = this.table.rows[this.active];
    row.classList.remove('editing');
    const cells = row.cells;
    let data = this.ds[this.active - 1];
    let cols = Object.keys(data);
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = data[cols[i]];
    }
    this.active = -1;
  }

  editRow(row) {
    const cells = row.cells;
    row.classList.add('editing');

    for(let i = 0; i < cells.length; i++) {
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
            if(cell.cellIndex == cells.length - 1) {
              this.displayRow();
            }
          }
        }
      });
    }
  }

  updateCell4(index, value) {
    if(this.active !== -1) {
      this.displayRow();
    }
    this.table.rows[index + 1].cells[3].innerHTML = value;
  }

  recover(rowIndex, cellIndex) {
    let data = this.ds[rowIndex - 1];
    let cols = Object.keys(data);
    return data[cols[cellIndex]];
  }

  saveDataSet(rowIndex, cellIndex, value) {
    let data = this.ds[rowIndex - 1];
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
    for(let i = this.table.rows.length - 1; i > 0; i--) {
      this.table.deleteRow(i);
    }
  }
}