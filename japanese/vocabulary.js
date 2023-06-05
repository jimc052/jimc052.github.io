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
				border :columns="columns" :data="data2"
				@on-column-width-resize="onColumnResize"
			></Table>
		</div>
		<div style="display: flex; flex-direction: row; padding: 5px 10px;">
			<div style="flex: 1; back">
			</div>
			<Page :total="dataStore.length" 
				:page-size="pageSize" :page-size-opts="pageOpts" show-elevator show-sizer 
				style="" 
				@on-change="onChangePage" @on-page-size-change="onPageSizeChange" />
			
		</div>
	</div>`,
	props: {
		// dataStore: {
		// 	type: Array,
		// 	// require: true, 
		// 	default: [] // 
		// },
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
			data2: [],
			row: {},
			currentPage: 0, 
			colTitle: "語	級別	舊	漢字・原文	備註	發音	中文意思	分類",
			option: "",
			options: ["地點", "食物", "物品", "方位", "數字", "動詞", "形容詞"]
		};
	},
	created(){
		let s = window.localStorage["japanese-vocabulary-pageSize"];
		if(typeof s != "undefined") {
			this.pageSize = parseInt(s, 10);
		}
	},
	async mounted () {
		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
		window.addEventListener('keydown', this.onKeydown, false);

		this.columns.push({
			type: 'index',
			width: 60,
			align: 'center',
			fixed: "left",
			className: "index",
			// indexMethod: (row)=>{
			// 	return row._index + ((this.currentPage-1) * this.pageSize) + 1;
			// }
		});
		this.colTitle.split("\t").forEach(el => {
			let json = {title: el, key: el, ellipsis: true};
			if(el == "級別" || el == "發音") {
				json.align = 'center';
				json.width = 60;
			}
			else if(el == "備註")
				json.width = 150;
			else if(el == "舊") {
				return;
			}
			
			this.columns.push(json)
			if(el == "語") {
				json.render = this.renderAccent;

				this.columns.push({title: "讀音", key: el + "2", ellipsis: true, render: this.renderPronounce})
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
			}
		}
	},
	destroyed() {
		this.broadcast.$off('onResize', this.onResize);
		window.removeEventListener('keydown', this.onKeydown, false);
  },
	methods: {
		renderAccent(h, p){
			let values = p.row["語"].split("//");
			let accnets = p.row["發音"].split("//");
			let voicedSound = "ゃャゅュょョ"; // 拗音
			let results = "";

			for(let x = 0; x < values.length; x++) {
				let value = values[x];
				let accent = accnets[x];
				if(typeof accent != "undefined" && accent != null && accent.indexOf(",") > -1) {
					accent = accent.split(",")[0];
				}
				let arr = [];
				for (let i = 0; i < value.length; i++) {
					let char = value.substr(i, 1);
					if(char == "。")
						continue;
					else if (voicedSound.indexOf(char) > -1) { // 拗音
						arr[arr.length - 1] += char;
						// console.log(arr[arr.length - 1])
					} else {
						arr.push(char);
					}
				}
				let result = "";
				if(typeof accent != "undefined" && accent != null) {
					for(let i = 0; i < arr.length; i++) {
						if(accent == "0" && i > 0) {
							result += "<span class='accent'>" + arr[i] + "</span>";
						} else if(accent == "1" && i == 0) {
							result += "<span class='accent'>" + arr[i] + "</span>";
						} else if(accent.indexOf(",") == -1 && i > 0 && i < accent) {
							result += "<span class='accent'>" + arr[i] + "</span>";
						} else 
							result += arr[i];
					}
				} else {
					result = arr.join("");
				}
				results += (results.length > 0 ? "//" : "") + result;
			}

			return h('span', 
				{
					domProps: {
						innerHTML: results
					},
				},
			);
		},
		renderPronounce(h, p){
			// let key = p.column.key;
			let values = p.row["語"].split("//");
			let datas = this.$japanese();

			let voicedSound = "ゃャゅュょョ"; // 拗音
			let doubleConsonan = "っッ"; // 促音, 雙寫後面一個假名的字母
			let longSound = {a: "ā", i: "ī", u: "ū", e: "ē", o: "ō"}; // 長音
			let voiceN = "んン";

			let results = [];

			for(let x = 0; x < values.length; x++) {
				let s = rome(values[x]);
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

			function match(char) {
				let mp3 = "";
				for(let x = 0; x < datas.length; x++){
					for(let y = 0; y < datas[x].length; y++){
						for(let z = 0; z < datas[x][y].length; z++){
							if(datas[x][y][z] == null) continue;
							if(datas[x][y][z]["平"] === char || datas[x][y][z]["片"] === char) {
								mp3 = datas[x][y][z]["mp3"];
								break;
							}
						}
						if(mp3.length > 0) break;
					}
					if(mp3.length > 0) break;
				}
				
				return mp3;
			}
			function rome(value) {
				let arr1 = [];
				for (let i = 0; i < value.length; i++) {
					let char = value.substr(i, 1);
					if(char == "。")
						continue;
					else if (voicedSound.indexOf(char) > -1) { // 拗音
						arr1[arr1.length - 1] += char;
					} else {
						arr1.push(char);
					}
				}

        let indexDoubleConsonan = -1;
        let i = 0;
        while(i < arr1.length) {
					let char = arr1[i];
					if (voiceN.indexOf(char) > -1) { // ん 後續音, 不懂 2023-05-25
						arr1[i] = "n"
					} else if (doubleConsonan.indexOf(char) > -1) { // 促音

          } else if (char == "ィ") { // 不知怎麼用，只好寫死
            let c1 = arr1[i - 1] == null || arr1[i - 1].length == 1
							? "" : arr1[i - 1].substr(0, arr1[i - 1].length - 1);
            let c2 =  arr1[i - 1] == null || arr1[i - 1].length == 1
							? arr1[i - 1] : arr1[i - 1].substr(arr1[i - 1].length - 1, 1);
            if (c2 == "e" || c2 == "u") { // 長音
              arr1[i - 1] = c1 + longSound["i"];
              arr1.splice(i, 1); continue;
            } else {
              arr1[i] = "i";
            }
					} else if (char == "ー") { // 長音
						let c1 = arr1[i - 1].substr(0, arr1[i - 1].length - 1);
						let c2 = arr1[i - 1].substr(arr1[i - 1].length - 1, 1);
            let c3 = longSound[c2];
            if(typeof c3 != "undefined" )
						  arr1[i - 1] = c1 + c3;
						arr1.splice(i, 1); continue;
					} else {
						let mp3 = match(char); // char == "ィ" ? "i" : 
						if (mp3.length > 0) {
							if (i > 0 && doubleConsonan.indexOf(arr1[i - 1]) > -1) { // 促音
								arr1[i] = mp3.substring(0, 1) + mp3;
								arr1[i - 1] = null;
                indexDoubleConsonan = i;
							} else if (i > 0 && indexDoubleConsonan != i - 1 && "aiueo".indexOf(mp3) > -1) { // 長音
								if (arr1[i - 1] == mp3) {
									arr1[i - 1] = longSound[mp3];
									arr1.splice(i, 1); continue;
								} else if ("aiueo".indexOf(mp3) > -1) {
									let c1 = arr1[i - 1] == null || arr1[i - 1].length == 1
										? "" : arr1[i - 1].substr(0, arr1[i - 1].length - 1);
									let c2 =  arr1[i - 1] == null || arr1[i - 1].length == 1
										? arr1[i - 1] : arr1[i - 1].substr(arr1[i - 1].length - 1, 1);
									if ((c2 == mp3) || (c2 == "e" && mp3 == "i") || (c2 == "o" && mp3 == "u")) { // 長音
										arr1[i - 1] = c1 + longSound[c2];
										arr1.splice(i, 1); continue;
									} else
										arr1[i] = mp3;
								}
							} else
								arr1[i] = mp3;
						}
					}
          i++;
				}
				arr1 = arr1.filter(el => {
					return el != null
				});
				return arr1.join(" ");
			}
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
			// let char = (event.keyCode >=48 && event.keyCode <=122) ? String.fromCharCode(event.keyCode).toUpperCase() : "";
			// console.log(event.keyCode + ", " + this.active)
			// console.log(o.id)
			if(o.tagName == "INPUT") return;
		},
		onColumnResize(width, start, col) { // 還沒寫...............
			// console.log(col)
		},
		onChangePage(e) {
			if(this.currentPage == e) return;
			this.currentPage = e;
			if(this.data2.length > 0) this.eventListener(1);
			this.data2 = [];
			let start = (e - 1) * this.pageSize, end = start + this.pageSize;
			if(end > this.dataStore.length) end = this.dataStore.length;
			for(let i = start; i < end; i++) {
				this.data2.push(this.dataStore[i]);
			}	
			let table = document.querySelector(".ivu-table-body");
			table.scrollTop = 0;
		},
		eventListener(opt){
			// let arr = document.querySelectorAll("#" + this.id + " div.ivu-table-fixed-body table td:first-child")
			// for(let i = 0; i < arr.length; i++) {
			// 	if(opt == 0) {
			// 		arr[i].setAttribute("row", i);
			// 		arr[i].addEventListener("click", this.onRowClick, true);
			// 	} else 
			// 		arr[i].removeEventListener("click", this.onRowClick, true);
			// }
		},
		onPageSizeChange(e) {
			this.currentPage = 0;
			this.pageSize = e;
			this.onChangePage(1);
			window.localStorage["japanese-vocabulary-pageSize"] = e;
		},
		onSearch() {
			this.level = "0";  this.option = "";
			this.dataStore = []; this.data2 = [];
			this.currentPage = -1;
			setTimeout(() => {
				if(this.search.length > 0) {
					let cols = this.colTitle.split("\t");
					let arr = words.split("\n");
					arr.forEach((el1, index1) => { // 0， 3， 6
						let row = el1.split("\t");
						if(row[0].indexOf(this.search) > -1 || row[3].indexOf(this.search) > -1 || row[6].indexOf(this.search) > -1) {
							let json = {};
							row.forEach((el2, index2) => {
								if(cols[index2] != "舊") json[cols[index2]] = el2;
							});
							this.dataStore.push(json)
						}
					});
				}
				this.onChangePage(1);
				window.localStorage["japanese-vocabulary-search"] = this.search;
				window.localStorage["japanese-vocabulary-level"] = "";
				window.localStorage["japanese-vocabulary-option"] = "";
			}, 300);
		},
		onChangeLevel() {
			this.search = ""; this.option = "";
			this.dataStore = []; this.data2 = [];
			this.currentPage = -1;
			setTimeout(() => {
				let cols = this.colTitle.split("\t");
				let arr = words.split("\n");

				arr.forEach((el1, index1) => {
					let row = el1.split("\t");
					if(this.level <= 4 && row[1] == this.level) {
						let json = {};
						row.forEach((el2, index2) => {
							if(cols[index2] != "舊") json[cols[index2]] = el2;
						});
						this.dataStore.push(json)
					}  
				});
				// console.log(this.dataStore[0])
				this.onChangePage(1);
				window.localStorage["japanese-vocabulary-level"] = this.level;
				window.localStorage["japanese-vocabulary-search"] = "";
				window.localStorage["japanese-vocabulary-option"] = "";
			}, 300);
		},
		onChangeOption() {
			this.search = ""; this.level = "0";  
			this.dataStore = []; this.data2 = [];
			this.currentPage = -1;
			let colTitle = this.colTitle.split("\t");
			setTimeout(() => {
				let cols = this.colTitle.split("\t");
				let arr = words.split("\n");

				arr.forEach((el1, index1) => {
					let row = el1.split("\t");
					if(colTitle.length == row.length && row[row.length - 1] == this.option) {
						let json = {};
						row.forEach((el2, index2) => {
							if(cols[index2] != "舊") json[cols[index2]] = el2;
						});
						this.dataStore.push(json)
					}  
				});
				// console.log(this.dataStore[0])
				this.onChangePage(1);
				window.localStorage["japanese-vocabulary-level"] = "";
				window.localStorage["japanese-vocabulary-search"] = "";
				window.localStorage["japanese-vocabulary-option"] = this.option;
			}, 300);
		},
		onDebugSearch() {
			this.search = "";
			this.dataStore = []; this.data2 = [];
			this.currentPage = -1;
			let cols = this.colTitle.split("\t");
			let arr = words.split("\n");

			arr.forEach((el1, index1) => {
				let row = el1.split("\t");
				if(row[5].indexOf(",") > -1) {
				// if(row[5] == "4") {
					let json = {};
					row.forEach((el2, index2) => {
						if(cols[index2] != "舊") json[cols[index2]] = el2;
					});
					this.dataStore.push(json)
				}  
			});
			this.onChangePage(1);
		},
	},
	watch: {
	},
});