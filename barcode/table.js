Vue.component('vue-table', { 
	template:  `<div style="height: 100%; width: 450px; overflow: auto; display: flex; flex-direction: column;">
	<div ref="header" style="height: 50px; display: flex; flex-direction: row; align-items: center; ">
		<Select v-if="editModeGroup == ''" v-model="group" style="flex: 1; margin: 0px 5px; " size="large"
			@on-select="onSelect"
		>
			<Option v-for="item in selectGroups" :value="item" :key="item">{{ item }}</Option>
		</Select>

		<Input ref="input" v-else v-model="editValueGroup" placeholder="請輸入類別" 
			style="flex: 1; font-size: 20px; padding: 5px; margin: 0px 5px; " size="large" clearable />
		<div v-if="editModeGroup == ''">
			<Button @click="onClickAddGroup" icon="md-add" type="primary" shape="circle"></Button>
			<Button v-if="group.length > 0" @click="onClickDelGroup" icon="md-trash" type="primary" shape="circle"></Button>
		</div>
		<div v-else>
			<Button v-if="editValueGroup.length > 0" @click="onClickSaveGroup" icon="md-document" type="primary" shape="circle"></Button>
			<Button @click="onClickCloseGroup" icon="md-close" type="primary" shape="circle"></Button>
		</div>
		<!--
		<Button @click="onClickCloseGroup" icon="md-arrow-back" type="primary" shape="circle"></Button>
		<Button @click="onClickCloseGroup" icon="md-arrow-forward" type="primary" shape="circle"></Button>
		-->
	</div>
	<div ref="frame" style="flex: 1;">
		<Table highlight-row  border :columns="columns" :data="dataPage"
			@on-column-width-resize="onColumnResize"
			@on-cell-click="onCellClick"
		></Table>
	</div>
	<div ref="footer" style="display: flex; flex-direction: column; padding: 5px 10px;">
		<div style="display: flex; flex-direction: row; margin-bottom: 5px;">
			<Button v-if="group.length > 0" @click="onClickAddRow" icon="md-add" type="primary"></Button>
			<Button v-if="currentRow > -1" @click="onClickDelRow" icon="md-trash" type="primary" style="margin-left: 5px;"></Button>
		</div>
		<Page v-if="datas.length > opts[0]" :total="datas.length" 
			:page-size="pageSize" :page-size-opts="opts" show-elevator show-sizer 
			style="" 
			@on-change="onChangePage" @on-page-size-change="onPageSizeChange" />
	</div>
</div>`,
	props: {
		// datas: {
		// 	type: Array,
		// 	// require: true, 
		// 	default: [] // 
		// },
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
				// resizable: true,
				width: 150,
				render: this.render
			}, { 
				title: "品名",
				key: "text",
				// resizable: true,
				width: 250,
				render: this.render
			}],
			height: 0,
			opts: [15, 20, 30, 40],
			pageSize: 30,
			dataPage: [],
			datas: [],
			row: {},
			currentPage: 0,
			currentRow: -1,
			currentColumn: -1,
			selectGroups: [],
			group: "",
			editModeGroup: "",
			editValueGroup: ""
		};
	},
	created(){
		let s = window.localStorage["barcode-tbl-pageSize"];
		if(typeof s != "undefined") {
			this.pageSize = parseInt(s, 10);
		}

		let group = window.localStorage["barcode-group"];
		if(typeof group != "undefined") {
			this.group = group;
		}

		let selectGroups = window.localStorage["barcode-groups"];
		if(typeof selectGroups != "undefined") {
			this.selectGroups = JSON.parse(selectGroups);
		}
	},
	async mounted () {
		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
		this.retrieve();
	},
	destroyed() {
		// this.removeEventListener("click", this.onRowClick);
		if(this.dataPage.length > 0) this.eventListener(1);
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		save() {
			if(this.datas.length == 0)
				delete localStorage["barcode-" + this.group];
			else
				localStorage["barcode-" + this.group] = JSON.stringify(this.datas);
		},
		render(h, p) {
			let key = p.column.key;
			if(this.currentRow == p.index) {
				setTimeout(() => {
					let obj = document.querySelector("#input_" + this.currentColumn + "_" + this.currentRow);
					if(obj) {
						obj.focus();
					}
				}, 400);	
				return h('input', {
					style: {
						width: '100%',
						padding: '2px 2px',
						borderRadius: '4px',
						border: '1px solid #e9eaec',
						fontSize: "18px",
						textAlign: typeof p.column.textAlign == "string" ? p.column.textAlign : "left", // 'right'
					},
					attrs: {
						id: "input_" + key + "_" + p.index,
						// maxlength: p.column.maxlength, 
						// type: typeof p.column.type == "string" ? p.column.type : "text", //  "number"
					},
					domProps: {
						value: p.row[key],
						// _data: p.index,
						// key: key
					},
					on: {
						input: (event) => {
							let obj = {};
							obj[key] = event.target.value;
							this.$emit("child-edit", p.index, obj);

							let json = Object.assign(p.row, obj);
							this.$set(this.dataPage, p.index, json);

							let index = ((this.currentPage - 1) * this.pageSize) + p.index;
							this.datas[index][key] = event.target.value;
							this.save();

							this.dirty = true;
							
						}, 
						keyup: (e) => {
							let o = document.activeElement;
							let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? e.metaKey : e.ctrlKey;
							let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? e.ctrlKey : e.altKey;
							let sk = e.shiftKey, keyCode = e.keyCode;
							let id = o.id.split("_");
							let col = id[1], index = id[2]
							// console.log(o.id)
							if(e.keyCode == 13) {
								if(col == "value") {
									let obj = document.querySelector("#input_text_" + this.currentRow);
									if(obj) {
										obj.focus();
									}
								} else if(this.currentRow + 1 < this.dataPage.length){
									this.moveNext(this.currentRow + 1, "value")
								}
							} else if(e.keyCode == 38) { // up
								if(this.currentRow - 1 >= 0){
									this.moveNext(this.currentRow - 1, this.currentColumn)
								}
							} else if(e.keyCode == 40) { // down
								if(this.currentRow + 1 < this.dataPage.length){
									this.moveNext(this.currentRow + 1, this.currentColumn)
								}
							} else {
								return false;
							}
							// if(b == true) {
								e.preventDefault();
								e.stopImmediatePropagation();
								e.stopPropagation();				
							// }
						
						}
					}
				});
			} else 
				return h('span', p.row[key]);
		},
		onSelect(e) {
			// console.log(e.label)
			this.group = e.label;
			this.retrieve();
			window.localStorage["barcode-group"] = this.group
		},
		retrieve() {
			this.currentRow = -1;
			this.currentPage = 1;
			if(typeof localStorage["barcode-" + this.group] == "string") {
				this.datas = JSON.parse(localStorage["barcode-" + this.group]);
			} else 
				this.datas = [];
			this.onChangePage(1);
		},
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
			if(this.dataPage.length > 0) this.eventListener(1);
			this.dataPage = [];
			let start = (e - 1) * this.pageSize, end = start + this.pageSize;
			if(end > this.datas.length) end = this.datas.length;
			for(let i = start; i < end; i++) {
				this.dataPage.push(Object.assign({index: i}, this.datas[i]));
			}

			this.$emit("child-retrieve", this.dataPage);
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
			this.$emit("onRowClick", this.dataPage[index]);
			// console.log(e)
		},
		onCellClick(row, column, data, event) {
			this.moveNext(row._index, typeof column.key == "string" ? column.key : "value")
		},
		moveNext(index, col) {
			this.currentRow = index;
			this.currentColumn = col;
			this.$set(this.dataPage, index, this.dataPage[index]);
		},
		reset() {
			this.dataPage = [];
			this.currentRow = -1;
			this.onChangePage(1);
			this.editValueGroup = "";
			this.editModeGroup = "";
			this.$emit("child-retrieve", this.dataPage);
		},
		onClickAddRow() {
			this.dataPage.push({index: this.datas.length, text: "", value: ""})
			this.datas.push({text: "", value: ""});
			this.currentRow = this.dataPage.length - 1;
			this.currentColumn = "value";
			this.$emit("child-retrieve", this.dataPage);
		},
		onClickDelRow() {
			let row = this.dataPage[this.currentRow];
			this.datas.splice(row.index, 1)
			this.save();
			this.dataPage.splice(this.currentRow, 1);
			if(this.dataPage.length == 0 && this.currentPage > 1) {
				this.onChangePage(this.currentPage - 1);
			}
			this.currentRow = -1;
		},
		onClickAddGroup() {
			this.editValueGroup = "";
			this.editModeGroup = "add";
			setTimeout(() => {
				let input = this.$refs["input"];
				if(input) {
					input.focus();
				}				
			}, 300);
		},
		onClickDelGroup() {
			delete window.localStorage["barcode-" + this.group];

			for(let i = 0; i < this.selectGroups.length; i++) {
				if(this.selectGroups[i] == this.group) {
					this.selectGroups.splice(i, 1);
					break;
				}
			}
			if(this.selectGroups.length > 0)
				window.localStorage["barcode-groups"] = JSON.stringify(this.selectGroups);
			else {
				delete window.localStorage["barcode-groups"];
			}

			delete window.localStorage["barcode-group"];
			this.datas = [];
			this.reset();
			location.reload();
		},
		onClickSaveGroup() {
			if(this.editValueGroup.trim().length == 0) {
				alert("請輸入類別")
				return;
			}
			let exists = this.selectGroups.some(el => {
				return el == this.editValueGroup;
			})
			if(exists == false) {
				this.group = this.editValueGroup;
				this.selectGroups.push(this.group)
				window.localStorage["barcode-group"] = this.group
				window.localStorage["barcode-groups"] = JSON.stringify(this.selectGroups);
				this.reset();
			} else {
				alert(`「${this.editValueGroup}」類別已存在!`)
			}
		},
		onClickCloseGroup() {
			this.editValueGroup = "";
			this.editModeGroup = "";
		}
	},
	watch: {
	}
});
/*
https://www.iviewui.com/components/table
*/