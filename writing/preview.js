Vue.component('preview', { 
	template:  `<div id="preview" style="background: white; overflow: auto; top: 0px; left: 0px;">
		<div v-if="size == 72" v-for="index1 in pagesNum" :key="index1" :id="'pages' + index1" class="writing-pages"
			:style="{pageBreakBefore: index1 == 1 ? 'none' : 'always'}"
		>
			<div v-for="index2 in rowsNum" :key="index2" :id="'rows' + index1 + '-' + index2" class="writing-rows">
				<div v-for="index3 in cellsNum" :key="index3" 
					:id="'cells' + index1 + '-'  + index2 + '-' + index3" class="writing-cells"
					:style="{width: (size) + 'px', height: (size) + 'px'}"
				>
					<vm-canvas :size="size"
						:char="cellIndex(index1, index2, index3) < rule.length 
						? rule.substr(cellIndex(index1, index2, index3), 1) : null " />
				</div>
			</div>
		</div>
		<div v-else >
				<div v-for="index in rule.length" :key="index"  
					:id="'cells' + index" class="writing-cells"
					:style="{width: size + 'px', height: size + 'px'}"
				>
				<vm-canvas :size="size" :char=" rule.substr(index - 1, 1)" />
			</div>
		</div>
	</div>`,
	props: {
	},
	data() {
		return {
			cellSize: 72,
			rowsNum: 14, // 15
			cellsNum: 10, // 10
			pagesNum: 1,
			rowsSpace: 2,
			size: 72, // 72, 300
			rule: "",
			rules: {
				"均間原則-橫畫": "三日目貝月自言白百主生古石告同用者直真有見年車帛星員書事長表明朋門問間",
				"均間原則-豎畫": "山出中巾而皿血冊回向田由甲申用世高車重果可同固過要覆罪羅西帶明門川州順",
			}
		};
	},
	created(){
		if(document.body.clientWidth < 400)
			this.size = 300;
		else 
			this.size = 72;
	},
	mounted () {
    window.addEventListener("beforeprint", this.onBeforePrint);
    window.addEventListener("afterprint", this.onAfterPrint);
		// setTimeout(() => {
			this.onAfterPrint();
		// }, 1000);
		let s = this.rules["均間原則-橫畫"];
		if(this.size == 72 && this.rowsSpace > 0) {
			let i1 = s.length % this.cellsNum;
			s += " ".repeat(i1);

			let s2 = "";
			for(let i = 0; i < s.length; i++) {
				if(i > 0 && i % this.cellsNum == 0) {
					s2 += " ".repeat(this.cellsNum * this.rowsSpace);
				}
				s2 += s.substr(i, 1);
			}
			s = s2;
			this.pagesNum = Math.ceil(s.length / (this.cellsNum * this.rowsNum));
			// console.log(s.length + ", " + (this.cellsNum * this.rowsNum) + ", " + this.pagesNum)
		}
		this.rule = s;
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
		cellIndex(page, row, cell) {
			// return this.name.split('').reverse().join('');
			return ((page - 1) * this.rowsNum * this.cellsNum) 
				+ ((row - 1) * this.cellsNum) + (cell - 1)
		},
	},
	computed: {

	},
	watch: {

	},
});