Vue.component('preview', { 
	template:  `<div id="preview" style="background: white; overflow: auto; top: 0px; left: 0px;">
	</div>`,
	props: {
	},
	data() {
		return {
			visible: false,
			cellSize: 72
		};
	},
	created(){
	},
	mounted () {
    window.addEventListener("beforeprint", this.onBeforePrint);
    window.addEventListener("afterprint", this.onAfterPrint);
    // this.addPage();
    // this.addPage();
		// setTimeout(() => {
			this.onAfterPrint();
			this.rule1();
		// }, 1000);
	},
	destroyed() {
    window.removeEventListener("beforeprint", this.onBeforePrint);
    window.removeEventListener("afterprint", this.onAfterPrint);
  },
	methods: {
		onBeforePrint() {
			let preview = document.querySelector("#preview");
			preview.style.overflow = "none";
			preview.style.position = "absolute";
			preview.style.height = "auto";

			// let btn = document.querySelector("#btnClose");
			// btn.style.visibility = "hidden";
		},
		onAfterPrint() {
			let app = document.querySelector("#app");
			let preview = document.querySelector("#preview");
			preview.style.overflow = "auto";
			preview.style.position = "";
			preview.style.height = app.clientHeight + "px";
		},
    cancel() {
			this.$emit("onClose");
		},
    addPage() {
			const preview = document.querySelector("#preview");
			const div = document.createElement("div");
			div.style.background = "white";
			if(preview.children.length > 0) {
				div.style.pageBreakBefore = "always";
				div.style.background = "grey";
			}
			preview.appendChild(div);

			const table = document.createElement("table");
			table.classList.add("table-writing")
			table.style.width = Math.ceil(37.795 * 20) + "px"; // (Math.ceil(Math.round(203/2.54)) * 20.3) + "px";
			div.appendChild(table);

      let height = Math.ceil(37.795 * 26);
			let fontSize = Math.ceil(this.cellSize * 0.8)
			let xx = 0;
			while(xx < 100 && div.clientHeight < height) {
				let row = table.insertRow(0);
				for(let j = 0; j < 10; j++) {
					let cell = row.insertCell(0);
					// cell.innerHTML = (xx + 1) + " - " + j;
					cell.style.height = this.cellSize + "px";
					cell.style.width = this.cellSize + "px";
					cell.style.fontSize = fontSize + "px";
				}
				xx++;
			}
			return table;
		},
		rule1() { // 均間原則，橫畫均間
			let table = this.addPage();
			let numCell = table.rows[0].cells.length;
			let indexRow = 0, indexCell = 0;

			let chars = "三日目貝月自言白百主生古石告同用者直真有見年車帛星員";
			for(let i = 0; i < chars.length; i++) {
				let char = chars.substr(i, 1);
				let cell = table.rows[indexRow].cells[indexCell];
				cell.innerHTML = char;
				indexCell++;
				if(indexCell >= numCell) {
					indexCell = 0;
					indexRow += 2;
				}

			}
		}
	},
	watch: {

	},
});