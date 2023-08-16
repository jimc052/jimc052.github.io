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
			></Table>
		</div>
		<div style="display: flex; flex-direction: row; align-items: center; padding: 5px 10px;">
		 	2023-08-11
			<div style="flex: 1;" />
			<Page :total="dataStore.length" 
				:page-size="pageSize" :page-size-opts="pageOpts" show-elevator show-sizer 
				style="" 
				@on-change="onChangePage" @on-page-size-change="onPageSizeChange" />
			
		</div>
		<editor ref="editor" :colTitle="colTitle.split('\t')"
			:word="activeIndex > -1 ? dsTable[activeIndex] : undefined" @onClose="onCloseEditor"
			:colKey="colKey.split('\t')"
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
			pageOpts: [15, 20, 30, 40],
			pageSize: 15,
			dataStore: [],
			dsTable: [],
			row: {},
			currentPage: 0, 
			colTitle: "語	級別	舊	漢字・原文	備註	重音	中文	分類",
			colKey:  "語	級	舊	漢	註	重	中	類",
			option: "",
			options: ["家族", "地點", "食物", "飲料", "物品", "服裝", "方位", "數字", "動詞", "形容詞"],
			activeIndex: -1,
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
		await this.download();

		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
		window.addEventListener('keydown', this.onKeydown, false);

		let self = this;
		this.columns.push({title: "#",
			width: 60,
			align: 'center',
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
						click: function (event) {
							self.activeIndex = p.index;
						}
					}
				};
				return h('div', json, p.index + 1);
			}
		});

		// this.columns.push({title: "id", key: "id", width: 60})
		let keys = this.colKey.split("\t");
		this.colTitle.split("\t").forEach((el, index) => {
			let json = {
				title: el, 
				key: keys[index], 
				ellipsis: true, 
				// tooltip: true,
				resizable: true,
			};
			if(el == "級別" || el == "重音") {
				json.align = 'center';
				json.width = 60;
			} else if(el == "分類") {
				json.width = 100;
			}
			else if(el == "備註")
				json.width = 150;
			else if(el == "舊") {
				return;
			}

			if(el == "語" || el == "漢字・原文" || el == "中文") { // 排序用
				json.renderHeader = this.renderHeader;
			}

			this.columns.push(json)
			if(el == "語") {
				json.render = this.renderAccent;
				this.columns.push({title: "讀音", ellipsis: true, render: this.renderPronounce})
			}
		});
		TTX.initial();

		// if(this.$isDebug()) { this.onDebugSearch(); return; }

		let s = window.localStorage["japanese-vocabulary-search"];
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

		this.$removeScript("./datas/單字.js");
		words = undefined;
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
			// let key = p.column.key;
			let values = p.row["語"].split("//");
			let results = [];
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
			if(this.dataStore.length > 0 && this.sortKey == params.column.title)
				arr.push(icon)
			
			return h(
				this.dataStore.length > 0 && this.sortKey != params.column.title ? "a" : "div",
				{ 
				style: { },
				on: {
					click:  (event) => {
						this.sortKey = params.column.title;
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

				/*
				const selection = window.getSelection();
				let arr = selection.toString().split("\n")
				let s = "", cols = 8;
				arr.forEach((el, index) => {
					let mod = index % cols;
					s += (mod > 0 ? "\t" : "") + el;
					
					if(mod == cols - 1) {
						s += "\n";
					}
				})

				const el = document.createElement('textarea');
				el.style.width = "100%"; el.style.height = "800px";
				// el.style.display = "none";
				el.value = s;
				document.body.appendChild(el);
				el.select();
				document.execCommand('copy');
				// document.body.removeChild(el);
				*/
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
		onChangePage(e, sortKey) {
			if(this.currentPage == e && typeof sortKey == "undefined") return;
			this.currentPage = e; this.activeIndex = -1;
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
			this.currentPage = 0; this.activeIndex = -1;
			this.pageSize = e;
			this.onChangePage(1, this.sortKey);
			window.localStorage["japanese-vocabulary-pageSize"] = e;
		},
		onSearch() {
			this.option = ""; this.clearLevel();
			this.dataStore = []; this.dsTable = [];
			this.currentPage = -1; this.activeIndex = -1;
			this.sortKey = "語";
			setTimeout(() => {
				if(this.search.length > 0) {
					let equal = this.search.indexOf("=") > -1 ? "=" 
					: (this.search.indexOf("%") > -1 ? "%" : "");
					let strLenLimit = -1; // 99: 有值即可，-1: 忽略
					let search = "", searchCols = ["語", "中", "漢", "註", "類"];
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
					console.log(typeof words)
					words.forEach((el1, index1) => {
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
			this.currentPage = -1; this.activeIndex = -1;
			this.sortKey = "語";
			setTimeout(() => {
				words.forEach((el1, index1) => {
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
			this.currentPage = -1; this.activeIndex = -1;
			this.sortKey = "語";
			setTimeout(() => {
				words.forEach((el1, index1) => {
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
			// "語	級別	舊	漢字・原文	備註	重音	中文	分類"
			this.search = "";
			this.dataStore = []; this.dsTable = [];
			this.currentPage = -1;
			let cols = this.colKey.split("\t");
			let arr = words.split("\n");
			arr.forEach((el1, index1) => {
				let row = el1.split("\t");
				if(row[4].length > 0) { // 備註
					let json = {index: index1};
					row.forEach((el2, index2) => {
						if(cols[index2] != "舊") json[cols[index2]] = el2;
					});
					this.dataStore.push(json)
				}  

				// if(row[5].indexOf(",") > -1) {
				// // if(row[5] == "4") {
				// 	let json = {};
				// 	row.forEach((el2, index2) => {
				// 		if(cols[index2] != "舊") json[cols[index2]] = el2;
				// 	});
				// 	this.dataStore.push(json)
				// }  
			});

			this.dataStore.sort(function(a, b){
				return a["備"] < b["備"] ? 1 : -1;
			});
			this.onChangePage(1, this.sortKey);
		},
		async onCloseEditor(word) {
			if(typeof word == "object") {
				word.date = (new Date()).getTime();
				this.$set(this.dsTable, this.activeIndex, word);
				let id = word.id;
				if(typeof id == "undefined") {
					id = (word.length).leftPadding(5);
				}
				let json = Object.assign({}, word);
				delete json.id;
				let ref = FireStore.db.collection("japanese-vocabulary")
					.doc(id);
				let x = await ref.set(json);
			}
			this.activeIndex = -1;
		},
		async upload() {
			let awaitSecond = () => {
				return new Promise(async (success, error) => { 
					setTimeout(() => {
						success();
					}, 1000);
				});
			}
			let cols = this.colKey.split("\t");
			let arr = words.split("\n");
			let date = (new Date()).getTime()
			for(let index1 = 0; index1 < arr.length; index1++) {
				let row = arr[index1].split("\t");
				let json = {};
				row.forEach((el2, index2) => {
					if(cols[index2] != "舊") json[cols[index2]] = el2;
				});
				json["date"] = date;
				try {
					let ref = FireStore.db.collection("japanese-vocabulary").doc((index1 + "").leftPadding(5));
					let x = await ref.set(json);
					// await awaitSecond();
					console.log(index1)
				} catch(e) {
					console.log(e)
					break;
				}
				// if(index1 > 100) break;
			}
		},
		async download() {
			let s = window.localStorage["japanese-vocabulary"];	
			words = typeof s != "undefined" && s.length > 0 ? JSON.parse(s) : [];
			s = window.localStorage["japanese-vocabulary-last-date"];
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
						let index = words.findIndex(el => {
							return el.id == json.id;
						})
						if(index == -1)
							words.push(json);
						else 
							words[index] = json;
					});

					if(max > 0) {
						window.localStorage["japanese-vocabulary-last-date"] = max;
						window.localStorage["japanese-vocabulary"] = JSON.stringify(words, null, 2);
					}
					success();
				} catch(e) {
					error(e)
				}
			});
		}
	},
	watch: {
	},
});