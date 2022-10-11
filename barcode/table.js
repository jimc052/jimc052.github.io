Vue.component('vue-table', { 
	template:  `<div style="height: 100%; overflow: auto; display: flex; flex-direction: column;">
	<div ref="header" style="height: 50px;">

	</div>
	<div ref="frame" style="flex: 1;">
		<Table :id="id" highlight-row  border :columns="columns" :data="datas2"
			@on-column-width-resize="onColumnResize"
			@on-cell-click="onCellClick"
		></Table>
	</div>
	<div ref="footer" style="display: flex; flex-direction: row; padding: 5px 10px;">
		<Page v-if="datas.length > opts[0]" :total="datas.length" 
			:page-size="pageSize" :page-size-opts="opts" show-elevator show-sizer 
			style="" 
			@on-change="onChangePage" @on-page-size-change="onPageSizeChange" />
	</div>
</div>`,
	props: {
		datas: {
			type: Array,
			// require: true, 
			default: [] // 
		},
		id: {
			type: String,
			// require: true, 
			default: "unknown" // 
		},
	},
	data() {
		return {
			columns: [{
					type: 'index',
					align: 'center',
					fixed: "left",
					className: "index",
					indexMethod: (row)=>{
						return row._index + ((this.currentPage-1) * this.pageSize) + 1;
					}
				},{ 
					title: "條碼",
					key: "value",
					resizable: true,
					width: 150,
				}, { 
					title: "品名",
					key: "text",
					resizable: true,
					width: 250,
					render(h, p){
						let key = p.column.key;
						if(this.currendIndex === p.index) {
							if(this.cell == key) {
								setTimeout(() => {
									let obj = document.querySelector("#column_list_inp_" + this.cell + "_" + this.currendIndex);
									if(obj) {
										obj.focus();
									}
								}, 400);					
							}
							return h('input', {
								style: {
									width: '100%',
									padding: '2px 2px',
									borderRadius: '4px',
									border: '1px solid #e9eaec',
									textAlign: typeof p.column.textAlign == "string" ? p.column.textAlign : "left", // 'right'
								},
								attrs: {
									id: "column_list_inp_" + key + "_" + this.currendIndex,
									maxlength: p.column.maxlength, 
									type: typeof p.column.type == "string" ? p.column.type : "text", //  "number"
								},
								domProps: {
									value: p.row[key]
								},
								on: {
									input: (event) => {
										let obj = {};
										obj[key] = event.target.value;
										this.$set(this.list, p.index, Object.assign(p.row, obj));
										this.dirty = true;
									}
								}
							});
						} else
							return h('span', p.row[key]);
					},
				}],
			height: 0,
			opts: [15, 20, 30, 40],
			pageSize: 30,
			datas2: [],
			row: {},
			currentPage: 0,
			currendIndex: 0
		};
	},
	created(){
		let s = window.localStorage["barcode-tbl-pageSize"];
		if(typeof s != "undefined") {
			this.pageSize = parseInt(s, 10);
		}		
	},
	async mounted () {
		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
	},
	destroyed() {
		// this.removeEventListener("click", this.onRowClick);
		if(this.datas2.length > 0) this.eventListener(1);
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		onColumnResize(width, start, col) { // 還沒寫...............
			// console.log(col)
		},
		onResize(){
			let leftPane = document.querySelector("#leftPane");
			let header = this.$refs["header"];
			let frame = this.$refs["frame"];
			let footer = this.$refs["footer"];
			let fh = header.clientHeight + footer.clientHeight;
			if(typeof frame == "object") {
				this.height = leftPane.clientHeight - fh;
				frame.style.height = this.height + "px";
			}
		},
		onChangePage(e) {
			if(this.currentPage == e) return;
			this.currentPage = e;
			if(this.datas2.length > 0) this.eventListener(1);
			this.datas2 = [];
			let start = (e - 1) * this.pageSize, end = start + this.pageSize;
			if(end > this.datas.length) end = this.datas.length;
			for(let i = start; i < end; i++) {
				this.datas2.push(this.datas[i]);
			}

			setTimeout(()=>{
				this.eventListener(0);
			}, 600)
		},
		eventListener(opt){
			let arr = document.querySelectorAll(" div.ivu-table-fixed-body table td:first-child");
			for(let i = 0; i < arr.length; i++) {
				if(opt == 0) {
					arr[i].setAttribute("row", i);
					arr[i].addEventListener("click", this.onRowClick, true);
				} else 
					arr[i].removeEventListener("click", this.onRowClick, true);
			}
		},
		onPageSizeChange(e) {
			this.currentPage = 0;
			this.pageSize = e;
			this.onChangePage(1);
			window.localStorage["barcode-tbl-pageSize"] = e;
		},
		onRowClick(e) {
			let el = e.target;
			while(el.tagName != "TD"){
				el = el.parentNode;
			}
			let row = el.getAttribute("row")
			let index = parseInt(row, 10);
			this.$emit("onRowClick", this.datas2[index]);
			console.log(e)
		},
		onCellClick(row, column, data, event) {
			console.log(data)
		},
		reset() {
			this.columns = [];
			this.datas2 = [];
		},
		onClick(e){
			this.$emit("onBtnClick", e);
		},
		onClickGrid(){
			this.$emit("onBtnClick", {id: this.id, columns: this.columns});
		}
	},
	watch: {
		datas(value) {
			this.currentPage = 0;
			this.height = 0;
			setTimeout(() => {
				this.onResize();
				this.onChangePage(1);
			}, 600);
		}
	}
});
/*
https://www.iviewui.com/components/table
*/