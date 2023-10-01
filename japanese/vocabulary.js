// open -a Google\ Chrome "index.html"
Vue.component('vocabulary', {
	template:  `<div style="height: 100%; width: 100%; overflow: auto; display: flex; flex-direction: column;">
		<Spin size="large" fix v-if="spinShow"></Spin>

		<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; padding: 5px 10px;">
			<RadioGroup v-model="level" type="button" button-style="solid" 
				size="large"
				@on-change="onChangeLevel"
				ref="radio-group"
				v-if="isBigScreen == true"
			>
				<Radio label="1" true-value="true"></Radio>
				<Radio label="2"></Radio>
				<Radio label="3"></Radio>
				<Radio label="4"></Radio>
			</RadioGroup>
			
			<div style="flex: 1;" />

			<div v-if="isBigScreen == true" style="display: flex; flex-direction: row; 
					justify-content: center; align-items: center;"
			>
				分類：
				<Select v-model="option" style="width:150px" size="large" @on-change="onChangeOption">
					<Option v-for="item in options" :value="item" :key="item">{{ item }}</Option>
				</Select>
			</div>

			<div style="flex: 1;" />

			<Input ref="input" v-model="search" search 
				style="width: 200px; font-size: 20px; padding: 5px; margin-right: 10px;" size="large"
				@on-search="onSearch" 
			/>
		</div>
		<div v-if="isBigScreen == true" ref="frame" style="flex: 1;">
			<Table id="table" ref="table" highlight-row 
				:height="height"
				:width="width"
				border :columns="columns" :data="dsTable"
				@on-column-width-resize="onColumnResize"
				@on-cell-click="onCellClick"
				@on-row-click="onRowClick"
			></Table>
		</div>
		<div v-if="isBigScreen == true" style="display: flex; flex-direction: row; align-items: center; padding: 5px 10px;">
			2023-09-19 16:00
			<div style="flex: 1;" />

			<Button v-if="$isLogin() && $isDebug()" type="primary" size="large"  @click="onBtnAddWord" 
				style="width: 80px;">新增</Button>

			<Button v-if="dataStore.length > 0" type="primary" size="large"  @click="dsPreview = dataStore;" 
				style="width: 80px; margin-left: 5px;">預覧</Button>

			<Button v-if="$isLogin() && rowIndex > -1" size="large" @click="onBtnAddNote" 
				style="min-width: 80px; margin-left: 5px;"
				:type="note.indexOf(dsTable[rowIndex].id) == -1 ? 'success' : 'warning' "
			>
				<span v-if="$isLogin() && note.indexOf(dsTable[rowIndex].id) == -1">加入筆記</span>
				<span v-else>移除筆記</span>
			</Button>

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
		<div v-else ref="frame" style="flex: 1; overflow: auto;">
			<ul style="padding: 5px;">
				<li v-for="(item, index) in dsTable" class="lesson-frame" v-html="renderWord(item, index)">
				</li>
			</ul>
		</div>
		<span v-if="! isBigScreen" style="text-align: center; padding: 5px; font-size: 20px;">
			{{$storage("email")}}
		</span>
		<editor ref="editor" :columns="columns" :options="options" :word="editIndex > -1 ? dsTable[editIndex] : undefined" @onClose="onCloseEditor" />
		<preview ref="preview" :datastore="dsPreview" @onClose="onClosePreview" />
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
				"家族", "身體", "職稱", "飲料", 
				"食物", "蔬菜", "水果", "調味料",  
				"交通", "服飾", "費用", 
				"電器家具", "廚房器具", "文具", "物品",
				"專業領域", "抽象", "顏色、明暗",
				"大自然", "休閒",
				"國家、城市", "建築物", "場所", "方位",
				"數字", "時間", "數學",  "季節",
				"陸上動物", "水生動物", "飛行動物", "昆蟲"
			],
			editIndex: -1,
			rowIndex: -1,
			sortKey: "語",
			note: "",
			isBigScreen: null,
			spinShow: false,
			dsPreview: undefined
		};
	},
	created(){
		this.isBigScreen = document.body.clientWidth > 600 ? true : false;
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
		

		// if(vocabularys.length > 0) console.log(vocabularys[vocabularys.length -1].id)
		{ // 轉檔 - buffer; 08370 - 08699
			/*
			s = window.localStorage["japanese-buffer"];
			// s = ""; // 故意的
			// console.log(s)
			let dsBuffer = typeof s != "undefined" && s.length > 0 ? JSON.parse(s) : [];
			for(let i = dsBuffer.length - 1; i >= 0; i--) {
				// console.log(i + `=>  ${dsBuffer[i].語}, ${dsBuffer[i].漢}`);
					try {
						delete dsBuffer[i].id;
						await this.onCloseEditor(dsBuffer[i]);
					} catch (err) {
						console.log(err)
						break;
					}					
				dsBuffer.splice(i, 1);
				window.localStorage["japanese-buffer"] = JSON.stringify(dsBuffer)
			}
			*/
		}
		{ // 更新
			// 、
			/*
			for(let i = 0; i < vocabularys.length; i++) {
				if(1 == 0) { // 刪除空白 tag
					let word = vocabularys[i];
					let b = false;
					for(let key in word) {
						if("註,詞,類,漢,重,級".indexOf(key) > -1) {
							if(typeof word[key] == "string" && word[key].trim().length == 0) {
								delete word[key];
								b = true;
							}
						}
					}
					if(b == true) {
						console.log(i + `=>  ${word.語}, ${word.漢}, ${word.中}`);
						try {
							await this.onCloseEditor(word);
						} catch (err) {
							console.log(err)
							break;
						}
					}
				}
				if(1 == 0) {
					// let col = "語"; //漢, 中
					// let char1 = "。", char2 = "";
					// let row = vocabularys[i];
					// if(typeof row[col] == "string" && row[col].indexOf(char1) > -1) {
					// 	row[col] = row[col].replace(char1, char2); //.replace("〕", ") ")
					// 	console.log(i + `=>  ${row.語}, ${row.漢}, ${row.中}`);
					// 	try {
					// 		await this.onCloseEditor(row);
					// 	} catch (err) {
					// 		console.log(err)
					// 		break;
					// 	}
					// }
				}
			}
			*/
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

		if(FireStore.login == true) {
			this.spinShow = true;
			try {
				await this.download();
				let ref = FireStore.db.collection("users").doc(FireStore.uid())
							.collection("japanese").doc("note")
				// let ref = doc.where("note", "==", "預設")
				let snapshot = await ref.get();
				let data = snapshot.data();
				if(typeof data == "object" && typeof data.預設 == "string") {
					this.note = data.預設;
				}
			} catch(e) {
				console.log(e)
			} finally {
				setTimeout(() => {
					this.spinShow = false;
				}, 600);
			}
		}

		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
		window.addEventListener('keydown', this.onKeydown, false);

		TTX.initial();

		this.columns = [{
				"title": "#",
				"width": 60,
				"align": "center",
				render: (h, p) => {
					let i = this.note.indexOf(p.row["id"]);
					let json = {
						// attrs: {id: 'foo'}, // ok
						'class': {'note-mark': i != -1 ? true : false},
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
					return h('div', json, (p.index + 1));
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

		// if(this.isBigScreen == true && this.$isDebug()) { this.onDebugSearch(); return; }

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
				let values = p.row["語"].indexOf("，") > -1 
					? p.row["語"].split("，") 
					: p.row["語"].split("//");
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
			this.rowIndex = index;

			return;
			// ok，只是作為暫時作資料轉換的
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
			this.currentPage = e; this.editIndex = -1; this.rowIndex = -1;
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
			if(table != null)
				table.scrollTop = 0;
		},
		onPageSizeChange(e) {
			this.currentPage = 0; this.editIndex = -1;  this.rowIndex = -1;
			this.pageSize = e;
			this.onChangePage(1, this.sortKey);
			window.localStorage["japanese-vocabulary-pageSize"] = e;
		},
		onSearch() {
			this.option = ""; this.clearLevel();
			this.dataStore = []; this.dsTable = [];
			this.currentPage = -1; this.editIndex = -1;  this.rowIndex = -1;
			this.sortKey = "語";
			this.search = this.search.trim();
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
						if(this.search.indexOf("=筆記") > -1) {
							if(this.note.indexOf(el1.id) > -1) {
								this.dataStore.push(el1)
							}
						}
						else if(strLenLimit != -1 && searchCols.length == 1 && typeof el1[searchCols[0]] == "string") { // 某欄位字串長度
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
			this.currentPage = -1; this.editIndex = -1;  this.rowIndex = -1;
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
			if(this.isBigScreen == true) {
				this.level = "";
				this.$refs["radio-group"].$children.forEach(el => {
					el.currentValue = false;
				});				
			}
		},
		onChangeOption() {
			if(typeof this.option == "undefined" || this.option == "" || this.option == "undefined") return;
			this.search = "";   this.clearLevel();
			this.dataStore = []; this.dsTable = [];
			this.currentPage = -1; this.editIndex = -1;  this.rowIndex = -1;
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
				// vocabularys.sort((a, b) => {
				// 	let A = a["語"] + "\t" + (typeof a["漢"] == "undefined" ? "" : a["漢"]);
				// 	let B = b["語"] + "\t" + (typeof b["漢"] == "undefined" ? "" : b["漢"]);
				// 	return A < B ? 1 : -1;
				// 	// return a.id < b.id ? 1 : -1;
				// });
				
				// for(let i = vocabularys.length - 1; i > 0; i--) {
				// 	let A = (typeof vocabularys[i]["漢"] == "undefined" ? "" : vocabularys[i]["漢"] ) 
				// 		+ "\t" + vocabularys[i]["語"];
				// 	let B = (typeof vocabularys[i - 1]["漢"] == "undefined" ? "" : vocabularys[i - 1]["漢漢"] ) 
				// 		+ "\t" + vocabularys[i - 1]["語"];
				// 	if(A == B) {
				// 		this.dataStore.push( vocabularys[i])
				// 	}
				// }
			}
			{
				if(1 == 1) {
					let cols = "詞,漢,語".split(",");
					for(let i = 0; i < vocabularys.length; i++) {
						let row = vocabularys[i];
						for(let j = 0; j < cols.length; j++) {
							if(typeof row[cols[j]] == "string" && row[cols[j]].indexOf("//") > -1) {
								this.dataStore.push(row);
								break;							
							}

						}	
					}					
				}
			}

			{
				/*
				this.dataStore = vocabularys.filter(el => {
					return el.id >= id;
				})
				this.dataStore.sort((a, b) => {
					let A = (typeof a["類"] == "undefined" ? "" : a["類"] ) + "\t" + a["語"];
					let B = (typeof b["類"] == "undefined" ? "" : b["類"] ) + "\t" +b["語"];
					return A < B ? 1 : -1;
					// return a.id < b.id ? 1 : -1;
				});
				for(let i = this.dataStore.length - 1; i > 0; i--) {
					let A = (typeof this.dataStore[i]["類"] == "undefined" ? "" : this.dataStore[i]["類"] ) 
						+ "\t" + this.dataStore[i]["語"];
					let B = (typeof this.dataStore[i - 1]["類"] == "undefined" ? "" : this.dataStore[i - 1]["類"] ) 
						+ "\t" + this.dataStore[i - 1]["語"];
					if(A == B) {
						this.dataStore.splice(i, 1)
					}
				}
				window.localStorage["japanese-buffer"] = JSON.stringify(this.dataStore)
				*/
			}

			this.onChangePage(1, this.sortKey);
			if(this.dataStore.length > 0) {
				// document.querySelector("#btnVocabChange").style.visibility = "visible";
			}
		},
		searchSymbole() { // 還沒寫

		},
		async onBtnAddWord() {
			this.dsTable.push({"類": this.option})
			this.editIndex = this.dsTable.length - 1;
		},
		async onBtnAddNote() {
			let data = this.dsTable[this.rowIndex];
			if(this.note.indexOf(data.id) > -1) {
				this.note = this.note.replace(data.id + ",", "");
			} else {
				this.note += data.id + ","
			}

			let ref = FireStore.db.collection("users").doc(FireStore.uid())
						.collection("japanese").doc("note")
			try {
				let x = await ref.set({"預設": this.note});
			} catch(e) {
				console.log(e)
			} finally {
				// setTimeout(() => {
				// 	this.spinShow = false;
				// 	success();
				// }, 600);
			}
		},
		async onCloseEditor(word) {
			if(typeof word == "string") { // 刪除
				if(this.editIndex > -1) {
					// this.$set(this.dsTable, this.editIndex, word);
					this.dsTable.splice(this.editIndex, 1);
				}
				let index = this.dataStore.findIndex(el => {
					return el.id == word;
				});
				if(index > -1) {
					this.dataStore.splice(index, 1);
				}
				index = vocabularys.findIndex(el => {
					return el.id == word;
				});
				if(index > -1) {
					vocabularys.splice(index, 1);
				}
				window.localStorage["japanese-vocabulary"] = JSON.stringify(vocabularys);
				let ref = FireStore.db.collection("japanese-vocabulary")
					.doc(word).delete();
			}
			else if(typeof word == "object") {
				if(typeof word.語 == "undefined" || word.語.trim().length == 0) {
					alert("請輸入'語'欄位");
					return;
				}
				word.date = (new Date()).getTime();
				for(let key in word) {
					if("註,詞,類,漢,重,級".indexOf(key) > -1) {
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
		onClosePreview() {
			this.dsPreview = undefined;
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
		renderWord(item, index) {
			let accent = window.renderAccent(item.語, item.重);
			let 漢 = typeof item.漢 == "string" && item.漢.length > 0
				? (`<div style="min-height: 0px;"> ${item.漢}</div>`)
				: "";

			return (
				`<div class="card " style="font-size: 20px; width: auto; background: white; ">
					<div style="min-width: 25px; font-size: 20px; margin-right: 5px;">${(index + 1) + "."}</div>
					
					<div style="flex: 1; font-size: 20px; display: flex; flex-direction: column;">
						<div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
							<div style="min-height: 0px;">
							${accent}
							</div>
							<div style="color: #2d8cf0; margin-left: 20px;">
								${typeof item.重 == "string" ? item.重 : ""}
							</div>
						</div>
						${漢}
						<a styl href="javascript: TTX.speak('${item.語}');" 
							style="font-size: 20px;"
						>
							${window.rome(item.語)}
						</a>
						<div>${item.中}</div>
					</div>
				</div>`);
		}
	},
	computed: {
		
	},
	watch: {
	},
});


/*
やめて(呀灭爹) 不行
// 気持ちいい（ki mo chi ii）舒服,爽死了  
// いやだ(一呀达)不要  
はなして(ha na shi te)住手  
// だめだ(da me da)不行了  
ほしい(hoshii)想要  
// すごい(su go i)好厉害  
いく(i ku )要去了  

手を放せ（te o ha na se) 放手，放开我  
放して(ha na shi te)放开我
痛ぃ（yi ta yi) 痛  
速く（ha ya ku) 快一点  
いや(i ya)不要  
止めろ(ya me ro)住手  
そんな事が话せゐか？ （so n na ko to ga ha na se ru ka?) 这种话怎么说得出口？  
はつかし(ha tsu ka shi)羞死人了  
耻しい(ha zu ka shi i)tsu=zu,这句也是羞死人了  
あたしの奥に（a ta shi no o ku ni）到人家的身体里了  
何が欲しぃ？言て.话して (na ni ga ho si yi?yi te. ha na shi te)想要什么说出来  


*/