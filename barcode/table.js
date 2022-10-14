Vue.component('vue-table', { 
	template:  `<div style="height: 100%; overflow: auto; display: flex; flex-direction: column;">
	<div ref="header" style="height: 50px; display: flex; flex-direction: row; align-items: center; padding: 0px 5px;">
		<div v-if="isEditable == true" style="flex: 1; display: flex; flex-direction: row; align-items: center; ">
			<Select v-if="editModeGroup == ''" v-model="group" style="flex: 1;" size="large"
				@on-select="onSelect"
			>
				<Option v-for="item in selectGroups" :value="item" :key="item">{{ item }}</Option>
			</Select>

			<Input ref="input" v-else v-model="editValueGroup" placeholder="請輸入類別" 
				style="flex: 1; font-size: 20px; padding: 5px;" size="large" clearable />
			<div v-if="editModeGroup == ''" style="margin-left: 5px;">
				<Button @click="onClickAddGroup" icon="md-add" type="primary" shape="circle"></Button>
				<Button v-if="isEditable == true && group.length > 0" @click="onClickDelGroup" icon="md-trash" type="primary" shape="circle"></Button>
			</div>
			<div v-else  style="margin-left: 5px;">
				<Button v-if="editValueGroup.length > 0" @click="onClickSaveGroup" icon="md-document" type="primary" shape="circle"></Button>
				<Button @click="onClickCloseGroup" icon="md-close" type="primary" shape="circle"></Button>
			</div>
		</div>
		<div v-else style="flex: 1; display: flex; flex-direction: row; ">
			<div style="flex: 1; font-size: 20px; color: #2d8cf0; ">{{group}}</div>
			<Button @click="onClickRefresh" icon="md-refresh" type="primary"></Button>
			<Button v-if="datas.length > 0" icon="md-archive" @click="modalEditor = true" type="primary" style="margin-left: 5px;"></Button>
		</div>
	</div>
	<div ref="frame" style="flex: 1;">
		<Table :height="height" highlight-row  border :columns="columns" :data="dataPage"
			@on-column-width-resize="onColumnResize"
			@on-cell-click="onCellClick"
		></Table>
	</div>
	<div ref="footer" style="display: flex; flex-direction: column; padding: 5px 10px;">
		<div v-if="isEditable == true" style="display: flex; flex-direction: row; margin-bottom: 5px;">
			<Button v-if="group.length > 0" @click="onClickAddRow" icon="md-add" type="primary"></Button>
			<Button v-if="currentRow > -1" @click="onClickDelRow" icon="md-trash" type="primary" style="margin-left: 5px;"></Button>

			<div style="flex: 1;"></div>
			<Button v-if="datas.length > 0" icon="md-archive" @click="modalEditor = true" type="primary" style="margin-left: 5px;"></Button>
		</div>

		<Page v-if="datas.length > opts[0]" :total="datas.length" 
			:page-size="pageSize" :page-size-opts="opts" show-elevator show-sizer 
			style="" 
			@on-change="onChangePage" @on-page-size-change="onChangePageSize" />
	</div>
	<editor ref="editor" :modal="modalEditor" :datas="datas" :editable="isEditable" @onClose="onCloseEditor" />
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
				width: 40,
				indexMethod: (row)=>{
					return row._index + ((this.currentPage-1) * this.pageSize) + 1;
				},
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
			opts: [15, 20, 30, 50, 75, 100],
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
			editValueGroup: "",
			isEditable: true,
			modalEditor: false
		};
	},
	created(){
		let s = window.localStorage["barcode-tbl-pageSize"];
		if(typeof s != "undefined") {
			this.pageSize = parseInt(s, 10);
		}

		let mode = this.$queryString("mode");
		if(mode.length > 0) {
			this.group = mode == "COUPON" ? "優惠券" : mode;
			this.selectGroups.push(this.group)
		} else {
			let group = window.localStorage["barcode-group"];
			if(typeof group != "undefined") {
				this.group = group;
			}
			let selectGroups = window.localStorage["barcode-groups"];
			if(typeof selectGroups != "undefined") {
				this.selectGroups = JSON.parse(selectGroups);
				if(this.group.length == 0 && this.selectGroups.length > 0)
				this.group = this.selectGroups[0]
			}
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
			if(this.isEditable == true && this.currentRow == p.index) {
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
		async retrieve() {
			this.currentRow = -1;
			this.currentPage = 0;
			this.dataPage = [];
			this.datas = [];
			this.isEditable = true;
			let SITE = this.$queryString("SITE")
			let STORE = this.$queryString("STORE")
			let ID_NO = this.$queryString("ID_NO")
			if(this.group == "優惠券" && SITE.length > 0 && STORE.length > 0 && ID_NO.length > 0){
				try {
				let result = await this.coupons(SITE, STORE, ID_NO);
				this.datas = result;
				} catch (e) {

				}
				this.isEditable = false;
			} else if(typeof localStorage["barcode-" + this.group] == "string") {
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
			let mode = this.$queryString("mode");
		
			let fh = header.clientHeight + (mode.length > 0 ? 45 : 80) ; // footer.clientHeight;
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
		onChangePageSize(e) {
			this.currentRow = -1;
			this.currentPage = 0;
			this.dataPage = [];
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
			this.currentPage = 0;
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
				setTimeout(() => {
					this.retrieve();	
				}, 300);
			} else {
				alert(`「${this.editValueGroup}」類別已存在!`)
			}
		},
		onClickCloseGroup() {
			this.editValueGroup = "";
			this.editModeGroup = "";
		},
		onClickRefresh() {
			// location.reload();
			this.retrieve()
		},
		coupons(SITE, STORE, ID_NO) {
			// ?SITE=BSMS000032&STORE=000000&ID_NO=20249
			let url = `https://rd.jabezpos.com/api/member-group/dev/v1/sites/${SITE}/stores/${STORE}/members/${ID_NO}/coupons`;
			let json = {"method":"GET",
				"headers":{
					"content-type":"application/x-www-form-urlencoded",
					"x-debug":1,
					"x-dev-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJwb3NAa3ltY28iLCJpc3MiOiJqYWJlenBvczp5YW5hQGJldGhlbC5jb20udHciLCJzdWIiOiI1YTA5NjFlNi1lODg4LTRkZjctOTFhMS0wMmM5OGRlMmIxMTgiLCJpYXQiOjE2NDg0MzkwMDc5MjcsImFjdGl2ZSI6dHJ1ZX0.EvmHpkgt8K8ZJQ54ZyZeDnqLQb6HaTH0EPrdZvJ1G4E"
				},
				"timeout":6,
				// "body":""
			};
			return new Promise( (success, error) => {
				fetch(url, json)
				.then((response) => {
					setTimeout(() => null, 0);
					return response.text();
				})
				.then((responseText) => {
					// console.log(responseText)
					if(responseText.indexOf("<html") > -1 && responseText.indexOf("<body") > -1){
						let i = responseText.indexOf("<body");
						let j = responseText.indexOf("</body>");
						let s = responseText.substr(i, (j - i) + "</body>".length)
						throw s;
					} else if(responseText.trim().indexOf("{") != 0){
						throw responseText;
					} else {
						let json = JSON.parse(responseText);
						if(typeof json.code == "undefined") json.code = json.msgCode;
						if(json.code  === "00" || json.code === "000"){
								if(typeof json.data == "undefined") json.data = {};
								json.data.code = json.code;
								json.data.msg = json.msg;

								let arr = [];
								let result = json.data.coupons.sort((a, b) => {
									if(a.pcName > b.pcName)
										return -1;
									else if(a.pcName < b.pcName)
										return 1;
									return 0;
								});
								result.forEach(el => {
									arr.push({text: el.pcName, value: "bccCpn_" + el.cpnNo})
								})
								success(arr);
						} else {
							throw json;
						}
					}
					// console.log(`success: ${new Date()}, 時間：${(((new Date()).getTime()- d1) / 1000)}`);
				})
				.catch((err) => {
					console.log(err)
					alert(err)
				})
				.finally(() =>{
				});
			});
		},
		onCloseEditor(result) {
			this.modalEditor = false;
			if(typeof result == "string") {
				if(result.length > 0)
					localStorage["barcode-" + this.group] = result;
				else 
					delete localStorage["barcode-" + this.group]
			}
			this.retrieve();
		}
	},
	watch: {
	},
});
/*
https://www.iviewui.com/components/table
https://www.iviewui.com/view-ui-plus/component/base/icon
*/