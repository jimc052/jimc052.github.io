// open -a Google\ Chrome "index.html"
Vue.component('vocabulary', {
	template:  `<div style="height: 100%; width: 100%; overflow: auto; display: flex; flex-direction: column;">
		<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; padding: 5px 10px;">
			<RadioGroup v-model="level" type="button" button-style="solid" 
				size="large"
				@on-change="onChangeLevel"
				ref="radio-group"
			>
				<Radio label="1" true-value="true"></Radio>
				<Radio label="2"></Radio>
				<Radio label="3"></Radio>
				<Radio label="4"></Radio>
			</RadioGroup>
			
			<div style="flex: 1;" />
			分類：
			<Select v-model="option" style="width:150px" size="large" @on-change="onChangeOption">
				<Option v-for="item in options" :value="item" :key="item">{{ item }}</Option>
			</Select>
			<div style="flex: 1;" />

			<Input ref="input" v-model="search" search 
				style="width: 200px; font-size: 20px; padding: 5px; margin-right: 10px;" size="large"
				@on-search="onSearch" 
			/>
		</div>
		<div ref="frame" style="flex: 1;">
			<Table id="table" ref="table" highlight-row 
				:height="height"
				:width="width"
				border :columns="columns" :data="dsTable"
				@on-column-width-resize="onColumnResize"
				@on-cell-click="onCellClick"
				@on-row-click="onRowClick"
			></Table>
		</div>
		<div style="display: flex; flex-direction: row; align-items: center; padding: 5px 10px;">
		 	2023-08-26 18:00
			<div style="flex: 1;" />

			<Button v-if="$isDebug()" type="primary" size="large"  @click="onBtnAdd" 
				style="width: 100px;">新增</Button>

			<!--
			<div style="flex: 1;" />
			<Select v-model="option2" style="width:150px" size="large">
				<Option value=""></Option>
				<Option v-for="item in options" :value="item" :key="item">{{ item }}</Option>
			</Select>
			-->
		
			<div style="flex: 1;" />
			<Page :total="dataStore.length" 
				:page-size="pageSize" :page-size-opts="pageOpts" show-elevator show-sizer 
				style="" 
				@on-change="onChangePage" @on-page-size-change="onPageSizeChange" />
			
		</div>
		<editor ref="editor" :columns="columns" :options="options" :word="editIndex > -1 ? dsTable[editIndex] : undefined" @onClose="onCloseEditor"
		/>
	</div>`,
	props: {
	},
	data() {
		return {
			level: "0",
			search: "",
			columns: [],
			height: 0,
			width: 0,
			pageOpts: [15, 20, 30, 50, 75, 100, 150, 300],
			pageSize: 15,
			dataStore: [],
			dsTable: [],
			row: {},
			currentPage: 0, 
			option: "",
			option2: "",
			options: [
				"家族", "身體", "職稱", "飲料", "食物",  
				"交通", "服飾", "費用", 
				"電器家具", "廚房器具", "文具", "物品",
				"專業領域", "抽象", "顏色、明暗",
				"大自然", "休閒",
				"國家、城市", "建築物", "場所", "方位",
				"數字", "時間", "數學",  "季節"
			],
			editIndex: -1,
			sortKey: "語"
		};
	},
	created(){
		let s = window.localStorage["japanese-vocabulary-pageSize"];
		if(typeof s != "undefined") {
			this.pageSize = parseInt(s, 10);
		}
	},
	async mounted () {
		let s = window.localStorage["japanese-vocabulary"];	
		vocabularys = typeof s != "undefined" && s.length > 0 ? JSON.parse(s) : [];
		vocabularys.sort((a, b) => {
			return a.id > b.id ? 1 : -1;
		});

		// console.log(vocabularys[vocabularys.length -1].id)
		{ // 轉檔 - buffer; 08288 
			/*
			s = window.localStorage["japanese-buffer"];
			// console.log(s)
			let dsBuffer = typeof s != "undefined" && s.length > 0 ? JSON.parse(s) : [];
			for(let i = dsBuffer.length - 1; i >= 0; i--) {
					if(dsBuffer[i].語 == "なに") continue;
			// 	delete dsBuffer[i].id;
			// 	delete dsBuffer[i].date;
				let index = vocabularys.findIndex(el => {
					return el.語 == dsBuffer[i].語 && el.漢 == dsBuffer[i].漢;
				});
				console.log(index + `=>  ${dsBuffer[i].語}, ${dsBuffer[i].漢}`);
				if(index == -1) {
					try {
						await this.onCloseEditor(dsBuffer[i]);
					} catch (err) {
						console.log(err)
						break;
					}					
				}
				dsBuffer.splice(i, 1);
				window.localStorage["japanese-buffer"] = JSON.stringify(dsBuffer)
			}
			*/
		}
		{ // 刪除 fireStore
			// for(let i = 8283; i <= 8385; i++) {
			// 	let id = i.leftPadding(5);
			// 	let ref = FireStore.db.collection("japanese-vocabulary")
			// 		.doc(id).delete();				
			// }
		}
		{ // 更新詞類
			// for(let i = 0; i < vocabularys.length; i++) {
			// 	let row = vocabularys[i];
			// 	if(row.類 == "副詞" && (typeof row.詞 == "undefined" || row.詞.length == 0)) {
			// 		row.詞 = row.類;
			// 		delete row.類;
			// 		try {
			// 			await this.onCloseEditor(row);
			// 		} catch (err) {
			// 			console.log(err)
			// 			break;
			// 		}	
			// 	}
			// }
			// 更新類
			for(let i = 0; i < vocabularys.length; i++) {
				let row = vocabularys[i];
				if(row.類 == "電器" ) {
					row.類 = "電器家具";
					try {
						await this.onCloseEditor(row);
					} catch (err) {
						console.log(err)
						break;
					}	
				}
			}
		}
		{ // 找出類
			// let result = "";
			// for(let i = 0; i < vocabularys.length; i++) {
			// 	let row = vocabularys[i];
			// 	if(typeof row.類 == "string" && row.類.length > 0) {
			// 		if(result.indexOf(`"${row.類}"`) == -1) {
			// 			result += (result.length > 0 ? ", " : "")
			// 				+ `"${row.類}"`
			// 		}
			// 	}
			// }
			// console.log(result)
		
		}

		if(FireStore.login == true)
			await this.download();

		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
		window.addEventListener('keydown', this.onKeydown, false);

		TTX.initial();

		this.columns = [{
				"title": "#",
				"width": 60,
				"align": "center",
				render: (h, p) => {
					let json = {
						// attrs: {id: 'foo'}, // ok
						// 'class': {pronounce: true}, // ok
						domProps: {
						// 	value: s,
						},
						style: {
							cursor: 'pointer',
							"user-select": "none",
						},
						on: {
							click:  (event) => {
								this.editIndex = p.index;
							}
						}
					};
					return h('div', json, p.index + 1);
				}
			}, {
				"title": "ID",
				"key": "id",
				"width": 60,
				"align": "center",
				renderHeader: this.renderHeader,
			}, {
				"title": "語",
				"key": "語",
				"ellipsis": true,
				"resizable": true,
				renderHeader: this.renderHeader,
				render: this.renderAccent
			}, {
				"title": "讀音",
				"ellipsis": true, 
				render: this.renderPronounce
			}, {
				"title": "重音",
				"key": "重",
				"ellipsis": true,
				"resizable": true,
				"align": "center",
				"width": 60
			}, {
				"title": "漢字・原文",
				"key": "漢",
				"ellipsis": true,
				"resizable": true,
				renderHeader: this.renderHeader
			}, {
				"title": "中文",
				"key": "中",
				"ellipsis": true,
				"resizable": true,
				renderHeader: this.renderHeader
			}, {
				"title": "備註",
				"key": "註",
				"ellipsis": true,
				"resizable": true,
				"width": 150				
			}, {
				"title": "分類",
				"key": "類",
				"ellipsis": true,
				"resizable": true,
				"width": 100,
				renderHeader: this.renderHeader,
			}, {
				"title": "詞態",
				"key": "詞",
				"ellipsis": true,
				"resizable": true,
				"width": 100,
				renderHeader: this.renderHeader,
			}, {
				"title": "級別",
				"key": "級",
				"ellipsis": true,
				"resizable": true,
				"align": "center",
				"width": 60
			}
		];

		if(this.$isDebug()) { this.onDebugSearch(); return; }

		s = window.localStorage["japanese-vocabulary-search"];
		if(typeof s != "undefined" && s.length > 0) {
			this.search = s;
			this.onSearch();
		} else {
			s = window.localStorage["japanese-vocabulary-level"];
			if(typeof s != "undefined" && s.length > 0) {
				this.$refs["radio-group"].$children[s - 1].currentValue = true;
				this.level = s;
				this.onChangeLevel();
			} else {
				s = window.localStorage["japanese-vocabulary-option"];
				if(typeof s != "undefined" && s.length > 0) {
					this.option = s;
					this.onChangeOption();
				}
			}
		}
	},
	destroyed() {
		this.broadcast.$off('onResize', this.onResize);
		window.removeEventListener('keydown', this.onKeydown, false);
		vocabularys = undefined;
		this.dsTable = undefined;
		this.dataStore = undefined;
  },
	methods: {
		renderAccent(h, p){
			let values = p.row["語"];
			let accnets = p.row["重"];
			return h('span', 
				{
					domProps: {
						innerHTML: window.renderAccent(values, accnets)
					},
				},
			);
		},
		renderPronounce(h, p){
			let results = [];
			if(typeof p.row["語"] == "string") {
				let values = p.row["語"].split("//");
				for(let x = 0; x < values.length; x++) {
					let s = window.rome(values[x]);
					// console.log(values[x] + ", " + s)
					if(x > 0) results.push(h('span', "，"))
					let json = {
						// attrs: {id: 'foo'}, // ok
						// 'class': {pronounce: true}, // ok
						domProps: {
						// 	value: s,
							// innerHTML: "<span style='color: red'>" + s + "<span>" // OK
						},
						// style: { // OK
						// 	color: 'red',
						// 	// fontSize: '28px'
						// },
						on: {
							click: function (event) {
								TTX.speak(values[x])
							}
						}
					};
					results.push(h('a', json, s))
				}				
			}
			return h('span', {}, results);
		},
		renderHeader(h, params) {
			let icon = h("Icon",{
				props:{
					type:`md-arrow-dropdown`,
					color:"#c8c8c8",
					size: 20
				},
				style:{
						marginLeft: "0px",
						// marginTop: "10px"
				},
				//调用点击的方法
				on:{
					click:()=>{
						// doPassword();
					}
				}
			});
			let arr = [
				h("span", params.column.title)
			];
			if(this.dataStore.length > 0 && this.sortKey == params.column.key)
				arr.push(icon)

			return h(
				this.dataStore.length > 0 && this.sortKey != params.column.key ? "a" : "div",
				{ 
				style: { },
				on: {
					click:  (event) => {
						this.sortKey = params.column.key;
						this.onChangePage(1, this.sortKey);
					}
				} 
			}, arr);
		},
		onResize(){
			let frame = this.$refs["frame"];
			if(typeof frame == "object") {
				this.height = frame.clientHeight;
				this.width = frame.clientWidth;
				frame.style.height = this.height + "px";
			}
		},
		onKeydown(event){
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			// let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			// let sk = event.shiftKey, code = event.keyCode;
			let char = (event.keyCode >=48 && event.keyCode <=122) ? String.fromCharCode(event.keyCode).toUpperCase() : "";
			// console.log(event.keyCode + ", " + this.active)
			if(o.tagName == "BODY" && pk && char == "C") { // 因為第一行沒有行號，而其他行又多了行號，所以無法用；2023-06-26
			} else {
				return;
			}
			event.preventDefault();
			event.stopImmediatePropagation();
			event.stopPropagation();
		},
		onColumnResize(width, start, col) { // 還沒寫...............
			// console.log(col)
		},
		onCellClick(row, column, data, event) { // 有 bug，要值才會有觸發
			// console.log(column.key)
			// console.log(row)
			// console.log(row._index)
		},
		async onRowClick(data, index) { // ok，只是作為暫時作資料轉換的
			return;
			if(this.option2.length > 0) {
				data.類 = this.option2;
				this.onCloseEditor(data)
				this.$set(this.dsTable, index, data);
			} else if( typeof data.重 == "string" && data.重.length > 0) {
				let s = "";
				for(let i = 0; i < data.重.length; i++) {
					let accent = data.重.substr(i, 1);
					if(accent == "⓪")
						accent = "0";
					else {
						let c = (accent.charCodeAt(0) - 9311);
						if(c > 10 || c < 1) {
							accent = null;
						} else
							accent = c + "";
					}
				
					if(accent != null)
						s += (s.length > 0 ? "," : "") + accent;
				}
				data.重 = s;
				this.$set(this.dsTable, index, data);
				this.onCloseEditor(data);
			}
		},
		onChangePage(e, sortKey) {
			if(this.currentPage == e && typeof sortKey == "undefined") return;
			this.currentPage = e; this.editIndex = -1;
			this.dsTable = [];
			if(typeof sortKey == "string") {
				this.dataStore.sort((a, b) => {
					return a[sortKey] < b[sortKey] ? -1 : 1;
				})
			}
			
			let start = (e - 1) * this.pageSize, end = start + this.pageSize;
			if(end > this.dataStore.length) end = this.dataStore.length;
			for(let i = start; i < end; i++) {
				this.dsTable.push(this.dataStore[i]);
			}	
			let table = document.querySelector(".ivu-table-body");
			table.scrollTop = 0;
		},
		onPageSizeChange(e) {
			this.currentPage = 0; this.editIndex = -1;
			this.pageSize = e;
			this.onChangePage(1, this.sortKey);
			window.localStorage["japanese-vocabulary-pageSize"] = e;
		},
		onSearch() {
			this.option = ""; this.clearLevel();
			this.dataStore = []; this.dsTable = [];
			this.currentPage = -1; this.editIndex = -1;
			this.sortKey = "語";
			setTimeout(() => {
				if(this.search.length > 0) {
					let equal = this.search.indexOf("=") > -1 ? "=" 
					: (this.search.indexOf("%") > -1 ? "%" : "");
					let strLenLimit = -1; // 99: 有值即可，-1: 忽略
					let search = "", searchCols = ["語", "中", "漢", "註", "類", "詞"];
					if(equal.length > 0) {
						let arrSearch = this.search.split(equal);
						if(arrSearch[0].length > 0) {
							searchCols = [arrSearch[0]];
						}

						if(arrSearch.length == 2 && arrSearch[1].length > 0) {
							if(!isNaN(arrSearch[1])) {
								strLenLimit = parseInt(arrSearch[1], 10)
							} else {
								search = arrSearch[1]
							}
						}
					} else {
						search = this.search;
					}
					if(strLenLimit != -1 && searchCols.length > 1) {
						alert("請指定欄位")
						return;
					}
					vocabularys.forEach((el1, index1) => {
						if(strLenLimit != -1 && searchCols.length == 1 && typeof el1[searchCols[0]] == "string") { // 某欄位字串長度
							if( (strLenLimit == 99 && el1[searchCols[0]].length > 0) || (el1[searchCols[0]].length == strLenLimit) ) {
								this.dataStore.push(el1)
							}
						} else if(equal.length == 1 && search.length > 0 && searchCols.length == 1 && typeof el1[searchCols[0]] == "string") {
							if(equal == "=" && search == el1[searchCols[0]])
								this.dataStore.push(el1)
							else if(equal == "%" && el1[searchCols[0]].indexOf(search) > -1)
								this.dataStore.push(el1)
						} else if(search.length > 0) {
							for(let i = 0; i < searchCols.length; i++) {
								let str = el1[searchCols[i]];
								if(typeof str == "string") {
									if(equal == "=" && search == str) {
										this.dataStore.push(el1)
										break;
									} else if(equal != "=" && str.indexOf(search) > -1) {
										this.dataStore.push(el1)
										break;
									}
								}
							}
						}
						///----------------------
					});
				}
				this.onChangePage(1, this.sortKey);
				window.localStorage["japanese-vocabulary-search"] = this.search;
				window.localStorage["japanese-vocabulary-level"] = "";
				window.localStorage["japanese-vocabulary-option"] = "";
			}, 300);
		},
		onChangeLevel() {
			this.search = ""; this.option = "";
			this.dataStore = []; this.dsTable = [];
			this.currentPage = -1; this.editIndex = -1;
			this.sortKey = "語";
			setTimeout(() => {
				vocabularys.forEach((el1, index1) => {
					if(this.level <= 4 && el1["級"] == this.level) {
						this.dataStore.push(el1)
					}
				});
				this.onChangePage(1, this.sortKey);
				window.localStorage["japanese-vocabulary-level"] = this.level;
				window.localStorage["japanese-vocabulary-search"] = "";
				window.localStorage["japanese-vocabulary-option"] = "";
			}, 300);
		},
		clearLevel() {
			this.level = "";
			this.$refs["radio-group"].$children.forEach(el => {
				el.currentValue = false;
			});
		},
		onChangeOption() {
			if(typeof this.option == "undefined" || this.option == "" || this.option == "undefined") return;
			this.search = "";   this.clearLevel();
			this.dataStore = []; this.dsTable = [];
			this.currentPage = -1; this.editIndex = -1;
			this.sortKey = "語";
			setTimeout(() => {
				vocabularys.forEach((el1, index1) => {
					if(el1["類"] ==  this.option) {
						this.dataStore.push(el1)
					}  
				});		
				// console.log(this.dataStore[0])
				this.onChangePage(1, this.sortKey);
				window.localStorage["japanese-vocabulary-level"] = "";
				window.localStorage["japanese-vocabulary-search"] = "";
				window.localStorage["japanese-vocabulary-option"] = this.option;
			}, 300);
		},
		onDebugSearch() {
			this.search = "";
			this.sortKey = "id";
			this.dataStore = []; this.dsTable = [];
			this.currentPage = -1;
			{
				// vocabularys = vocabularys.filter(el => {
				// 	return el.id >= "08288";
				// })
				// vocabularys.sort((a, b) => {
				// 	return a.id < b.id ? 1 : -1;
				// });
				// window.localStorage["japanese-vocabulary"] =  JSON.stringify(vocabularys)
				// this.dataStore = vocabularys;				
			}

			this.dataStore = vocabularys.filter(el => {
				return el.id >= "08288";
			})
			// this.dataStore.sort((a, b) => {
			// 	// return a["語"] + a.id < b["語"] + b.id ? 1 : -1;
			// 	return a.id < b.id ? 1 : -1;
			// });
			// window.localStorage["japanese-buffer"] = JSON.stringify(this.dataStore)

			this.onChangePage(1, this.sortKey);
			if(this.dataStore.length > 0) {
				// document.querySelector("#btnVocabChange").style.visibility = "visible";
			}
		},
		async onBtnAdd() {
			this.dsTable.push({"類": this.option})
			this.editIndex = this.dsTable.length - 1;
		},
		async onCloseEditor(word) {
			if(typeof word == "object") {
				if(typeof word.語 == "undefined" || word.語.trim().length == 0) {
					alert("請輸入'語'欄位");
					return;
				}
				word.date = (new Date()).getTime();
				for(let key in word) {
					if("註,詞,類".indexOf(key) > -1) {
						if(typeof word[key] == "string" && word[key].trim().length == 0) {
							delete word[key];
						}
					} else if(typeof word[key] == "undefined") {
						delete word[key];
					}
				}
				if(this.editIndex > -1) {
					this.$set(this.dsTable, this.editIndex, word);
				}

				let id = word.id;
				if(typeof id == "undefined") {
					let last = vocabularys[vocabularys.length - 1];
					id = (parseInt(last.id, 10) + 1).leftPadding(5);
					word.id = id;
					vocabularys.push(word)
				} else {
					let index = this.dataStore.findIndex(el => {
						return el.id == word.id;
					});
					if(index > -1) {
						this.dataStore[index] = word;
					}
					index = vocabularys.findIndex(el => {
						return el.id == word.id;
					});
					if(index > -1) {
						vocabularys[index] = word;
					}
				}
				window.localStorage["japanese-vocabulary"] = JSON.stringify(vocabularys);
				let json = Object.assign({}, word);
				delete json.id;
				let ref = FireStore.db.collection("japanese-vocabulary")
					.doc(id);
				let x = await ref.set(json);
			}
			this.editIndex = -1;
		},
		async download() {
			let s = window.localStorage["japanese-vocabulary-last-date"];
			let last = typeof s != "undefined" && s.length > 0 ? parseInt(s, 10) : 0;
			let max = 0;
			return new Promise(async (success, error)  => {
				try {
					let doc = FireStore.db.collection("japanese-vocabulary")
					let ref = doc.where("date", ">", last)
					let snapshot = await ref.get();
					// console.log(snapshot.size);
					snapshot.forEach((doc) => {
						let json = Object.assign({id: doc.id}, doc.data());
						if(json.date > max) max = json.date;
						let index = vocabularys.findIndex(el => {
							return el.id == json.id;
						})
						if(index == -1)
							vocabularys.push(json);
						else 
							vocabularys[index] = json;
					});

					if(max > 0) {
						window.localStorage["japanese-vocabulary-last-date"] = max;
						window.localStorage["japanese-vocabulary"] = JSON.stringify(vocabularys, null, 2);
					}
					success();
				} catch(e) {
					error(e)
				}
			});
		},
	},
	watch: {
	},
});