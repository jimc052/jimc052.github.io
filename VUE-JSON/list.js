Vue.component('list', { 
	template:  `<div id="list">
		<div v-if="mode == '' && datas.length > 0" style="flex: 1; padding: 0px;">
			<vue-table :datas="datas" @onRowClick="onRowClick" @onBtnClick="onBtnClick" />
		</div>
		<Tabs v-else-if="mode == 'tabs' && tabs.length > 0" :value="activeTabs" type="card" :animated="false" style="flex: 1; padding: 3px;" @on-click="onTabClick">
			<TabPane class="col" v-for="(item, index) in tabs" :label="item" :name="item" :key="index">
				<vue-table :id="item" :datas="Array.isArray(json[item]) ? json[item] : [json[item]] "
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
				<vue-table :datas="datas" ref="menu-table" @onRowClick="onRowClick" @onBtnClick="onBtnClick" id="menu" />
			</div>
		</Split>
		<div v-else style="flex: 1;"></div>
		<editor :modal="modalDoc" @onClose="onCloseDoc" />
		<detail :modal="modalDetail" :row="row" @onClose="onCloseDetail"  />
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
			modalDoc: false,
			modalDetail: false,
			spliteRate: 0.5,
			width: '200',
			datas: [],
			menu: [],
			activeMenu: "",
			tabs: [],
			activeTabs: "",
			json: null,
			row: {}
		};
	},
	created(){
		this.spliteRate = 200 / document.body.clientWidth;
	},
	async mounted () {
		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
	},
	destroyed() {
		this.broadcast.$off('onResize', this.onResize);
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
				this.datas = [];
				this.$refs["menu-table"].reset();
				if(e.length > 0)
					this.datas = Array.isArray(this.json[e]) ? this.json[e] : [this.json[e]];				
			}
		},
		onBtnClick(e){
			if(e == "document")
			this.modalDoc = true;
			else {
				this.mode = this.mode == "menu" ? "tabs" : "menu";
				window.localStorage["JSON-mode"] = this.mode;
				
				setTimeout(() => {
					this.activeMenu = "";
					if(this.mode == "menu")
						this.onMenuSelect(this.menu[0])
					else
						this.onTabClick(this.activeTabs)					
				}, 600);
			}
		},
		onCloseDoc(result) {
			this.modalDoc = false;
			if(typeof result == "string" && result.length > 0) {
				vm.txt = result;
			}
		},
		onCloseDetail(){
			this.modalDetail = false;
		},
		onRowClick(row) {
			this.row = row;
			this.modalDetail = true;
		}
	},
	watch: {
		txt(value) {
			this.datas = [];
			this.menu = [];
			this.activeMenu = "";
			this.tabs = [];
			this.activeTabs = "";
			this.json = null;
			try {
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
					}, 300);
				}
				window.localStorage["JSON-data"] = value;
			} catch(e) {
				console.log(e)
			}
		}
	}
});
/*
https://www.iviewui.com/components/table
*/