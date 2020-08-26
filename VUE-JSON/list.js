Vue.component('list', { 
	template:  `<div id="list">
		<Tabs v-if="mode == 'tabs' && tabs.length > 0" :value="activeTabs" type="card" :animated="false" style="flex: 1; padding: 3px;" @on-click="onTabClick">
			<TabPane class="col" v-for="(item, index) in tabs" :label="item" :name="item" :key="index">
				<vue-table :ref="'tbl-' + item" :id="item"
					:datas="Array.isArray(json[item]) ? json[item] : [json[item]] "
					@onRowClick="onRowClick" @onBtnClick="onBtnClick" />
			</TabPane>
    </Tabs>
		<Split v-else-if="mode == 'menu'" v-model="spliteRate" min="100"  style="flex: 1;">
			<div slot="left" class="split-pane">
				<Menu :active-name="activeMenu" :width="width" @on-select="onMenuSelect">
					<MenuItem v-for="(item, index) in menu" :name="item" :key="index">
							{{item}}
					</MenuItem>
				</Menu>
			</div>
			<div slot="right" class="split-pane">
				<vue-table ref="tbl" :datas="datas" :id="activeMenu"
					@onRowClick="onRowClick" @onBtnClick="onBtnClick" />
			</div>
		</Split>
		<div v-else style="flex: 1; padding: 0px;">
			<vue-table ref="tbl" :datas="datas" 
				@onRowClick="onRowClick" @onBtnClick="onBtnClick" />
		</div>
		<editor ref="editor" :modal="modalEditor" @onClose="onCloseEditor" />
		<detail :modal="modalDetail" :row="row" @onClose="onCloseDetail"  />
		<column-list :data="dataCols" :modal="modalCols" @onClose="onCloseCols" />
	</div>`,
	props: {
		txt: {
			type: String,
			require: true, 
		},
	},
	data() {
		return {
			mode: "",
			modalEditor: false,
			modalDetail: false,
			modalCols: false,
			spliteRate: 0.5,
			width: '200',
			datas: [],
			menu: [],
			activeMenu: "",
			tabs: [],
			activeTabs: "",
			json: null,
			row: {},
			dataCols: {}
		};
	},
	created(){
		this.spliteRate = 200 / document.body.clientWidth;
	},
	async mounted () {
		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
		window.addEventListener('keydown', this.onKeydown, false);
	},
	destroyed() {
		this.broadcast.$off('onResize', this.onResize);
		window.removeEventListener('keydown', this.onKeydown, false);
  },
	methods: {
		onResize(){
			// let viewer = this.$refs["frame"];
			// if(typeof viewer == "object")
			// 	this.height = viewer.clientHeight;
			// let scrollTop = viewer.scrollTop, clientHeight = viewer.clientHeight;
		},
		onTabClick(e) {
			// console.log(e)
			// let datas = Array.isArray(this.json[e]) ? this.json[e] : [this.json[e]];
			// console.log(datas)
			// this.$refs['tbl-' + e].datas = datas; // ok
		},
		onMenuSelect(e) {
			if(this.activeMenu != e) {
				this.activeMenu = e;
				this.$refs["tbl"].reset();
				this.datas = [];
				setTimeout(() => {
					if(e.length > 0) {
						this.datas = Array.isArray(this.json[e]) ? this.json[e] : [this.json[e]];
					}
				}, 300);
			}
		},
		onBtnClick(e){
			if(e == "document")
				this.modalEditor = true;
			else if(e == "swap"){
				this.mode = this.mode == "menu" ? "tabs" : "menu";
				window.localStorage["JSON-mode"] = this.mode;
				
				setTimeout(() => {
					this.activeMenu = "";
					if(this.mode == "menu") {
						this.onMenuSelect(this.menu[0])
					} else
						this.onTabClick(this.activeTabs)					
				}, 600);
			} else {
				this.dataCols = e;
				this.modalCols = true;
			}
		},
		onCloseEditor(result) {
			this.modalEditor = false;
			if(typeof result == "string") { //  && result.length > 0
				vm.txt = result;
			}
		},
		onCloseDetail(){
			this.modalDetail = false;
		},
		onCloseCols(result) {
			let ref;
			if(typeof result == "object") {
				if(this.mode == "tabs")
					ref = this.$refs['tbl-' + result.id]
				else {
					ref = this.$refs['tbl'];
				}
				if(Array.isArray(ref))
					ref[0].createColumns(result.columns)
				else 
					ref.createColumns(result.columns)
				// ref[0].createColumns(result.columns);
				// console.log(ref)
			}
			this.modalCols = false;
		},
		onRowClick(row) {
			this.row = row;
			this.modalDetail = true;
		},
		onKeydown(event){
			let self = this;
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			let sk = event.shiftKey, code = event.keyCode;
			let char = (event.keyCode >=48 && event.keyCode <=122) ? String.fromCharCode(event.keyCode).toUpperCase() : ""
			if(code == 27) {
				if(this.modalEditor == true)
					this.modalEditor = false;
				if(this.modalDetail == true)
					this.modalDetail = false;
				if(this.modalCols == true)
					this.modalCols = false;
			} else if(this.modalEditor == true && char == "S"){
				this.$refs["editor"].save();
			} else if(this.modalEditor == true || this.modalDetail == true || this.modalCols == true){
				return;
			} else if(pk == true && char == "E"){
				this.modalEditor = true;

				// setTimeout(()=>{ // chrome 不能用 paste
					// let el = document.querySelector("#editorTxt");
					// document.querySelector("#editorTxt").style.color = "red";
					// el.select();
					// let range = document.createRange();
					// range.selectNode(el);
					// window.getSelection().addRange(range);
					// document.execCommand("paste");
				// }, 600)
			} else {
				return;
			}

			event.preventDefault();
      event.stopImmediatePropagation();
			event.stopPropagation();
		}
	},
	watch: {
		txt(value) {
			vm.loading();
			this.datas = [];
			this.menu = [];
			this.activeMenu = "";
			this.tabs = [];
			this.activeTabs = "";
			this.json = null;
			setTimeout(() => {
				try {
					if(value.length > 0 && (value.indexOf("DATAFILE") > -1 || value.indexOf("SQLTMMF") > -1 ||value.indexOf("DASQLTMMFTAFILE") > -1)) {
						logFile();
					} else if(value.length > 0) {
						let json = JSON.parse(value);
						if(Array.isArray(json)){
							this.mode = "";
							this.datas = json;
						} else if(typeof json == "object") {
							this.json = json;
							let s  = window.localStorage["JSON-mode"];
							let activeMenu = "";
							for(let key in json) {
								if(activeMenu == "") activeMenu = key;
								if(this.activeTabs == "") this.activeTabs = key;
								if(!Array.isArray(json[key])) {
									json[key] = [json[key]]
								}
								this.menu.push(key);
								this.tabs.push(key);
							}
							this.mode = typeof s == "string" && s == "tabs" ? s : "menu";
							setTimeout(() => {
								if(this.mode == "menu")
									this.onMenuSelect(activeMenu)
								else {
									this.onTabClick(this.activeTabs)
								}
								vm.loading(false);
							}, 300);
						}					
					}
					window.localStorage["JSON-data"] = value;
				} catch(e) {
					console.log(e)
					vm.loading(false);
				}				
			}, 600);
			function logFile() { // 還沒寫..................
				let result = {};
				let cols = ["DATAFILE", "SQLTMMF", "SQLARRAY"];
				let arr = value.split("\n");
				for(let i = 0; i < arr.length; i++){
					let row = arr[i]
					for(let j = 0; j < cols.length; j++){
						let col = cols[j];
						if(row.indexOf(col + " = ") == 0) {
							let s = row.replace(col + " =", "").trim();
							if(typeof s == "string" && s.length > 0) {
								result[col] = s;
								this.rows++;
							}
							cols.splice(j, 1);
							break;
						}
					}
					if(cols.length == 0) break;
				}
			}
		}
	}
});
/*
https://www.iviewui.com/components/table
*/