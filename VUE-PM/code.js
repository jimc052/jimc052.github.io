new Vue({
	template: `<div id="frame">` +
		`<data-table ref="tbl" title="代碼資料" :columns="columns" :datas="datas" :onEdit="onEdit" :onSort="onSort">` +
			`<div slot="header" style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">` + 
				`<i-button v-if="dels.length > 0" type="warning" @click="onBtnDel">刪除</i-button>` +
				`<div style="flex: 1;"/>` +
				`<options ref="options" :columns="columns" />` +
				`<i-input v-model="search" size="large" placeholder="請輸入關鍵字" style="width: 200px;">` +
					`<Icon type="ios-search" slot="suffix" @click.native="onSearch" style="cursor: pointer;" />` +
				`</i-input>` +
			`</div>` +
		`</data-table>` +
		`<modal v-model="modal" class-name="vertical-center-modal" title="代碼資料" width="400">` +
			`<div v-for="(item, key, index) in columns" style="margin-top: 5px;display: flex; flex-direction: row; justify-content: center; align-items: center;">` +
				`<div style="width: 60px; text-align: right; display: inline-block; margin-right: 5px;">{{item.title}}</div>` +
				`<div v-if="item.key == 'ACTIVE'" style="flex: 1;"><RadioGroup  v-model="editData[item.key]"><Radio label="Y">是</Radio><Radio label="N">否</Radio></RadioGroup></div>` +
				`<i-input v-else :readonly="editData.PK > -1 && (item.key == 'CD_KIND' || item.key == 'CD_NAME') ? true : false" ` + 
					`v-model="editData[item.key]" size="large" style="flex: 1;"></i-input>` +
			`</div>` +
			`<div slot="footer">` +
				`<i-button @click="modal=false">取消</i-button>` +
				`<i-button type="primary" @click="onSave">確定</i-button>` +
			`</div>` +
		`</modal>` +
	`</div>`, // 
	data() {
		return {
			columns: [
				{title: '代碼分類', key: 'CD_KIND', width: 150, sortable: true, require: true},
				{title: '關鍵代碼', key: 'CD_KEY', width: 160, sortable: true},
				{title: '代碼名稱', key: 'CD_NAME', width: 160, require: true},
				{title: '說明', key: 'MEMO'},
				{title: '啟用', key: 'ACTIVE', align: 'center', width: 60},
			],
			datas: [],
			search: "",
			order: "",
			editData: {},
			modal: false, 
			dels: []
		};
	},
	created(){
	},
	 mounted(){
		for(let i = 0; i < 30; i++) {
			this.datas.push({PK: i, CD_KIND: i})
		}
		this.onSearch();
	},
	destroyed(){
  },
	methods: {
		async onSearch(){
			let keyword = (typeof this.$refs["options"].keyword != "string") ? "" : this.$refs["options"].keyword;
			let where = keyword.length > 0 && this.search.length > 0 ? "where " + keyword + " like '%" + this.search + "%' " : "";
			let sort = this.order.length > 0 ? this.order : "CD_KIND, CD_NAME";
			let sql = "Select * from CODE " + where +  " order by " + sort;
			try {
				let rows = await window.sqlite.execute(sql);
				this.datas = rows;
			} catch(e) {
			}
		},
		onEdit(type, item, index){
			if(type == "new") {
				let obj = {ACTIVE: "Y"};
				if(typeof this.editData.CD_KIND != "undefined")
					obj.CD_KIND = this.editData.CD_KIND
				this.editData = obj;
				this.modal = true;
			} else if (type == "edit"){
				this.editData = {};
				for(let key in item) {
					this.editData[key] = item[key];
				}
				this.modal = true;
			} else if(type == "selection") {
				this.dels = item;
			}
		},
		onSort(item){
			this.order = item.key + " " + item.order;
			this.onSearch();
		},
		async onSave() {
			let sql = {}
			// {title: '代碼分類', key: 'CD_KIND', width: 150, sortable: true, require: true},
			for(let i = 0; i < this.columns.length; i++) {
				if(this.columns[i].require == true) {
					let val = this.editData[this.columns[i].key];
					if(typeof val == "undefined" || val.length == 0) {
						this.$Modal.warning({title: "代碼資料", content: "請輸入『" + this.columns[i].title  + "』"});
						return;
					}
				}
			}
			if(typeof this.editData.PK == "undefined") {
				sql = sqlite.convertToInsert("CODE", this.editData);
			} else {
				sql = sqlite.convertToUpdate("CODE", this.editData);
			}
			try {
				let result = await window.sqlite.execute(sql.sql, sql.values);
				if(result > 0) {
					if(sql.sql.indexOf("Insert Into") == 0) {
						this.$refs["tbl"].addRows(this.editData)
					} else {
						this.$refs["tbl"].updateRow(this.editData)
					}
				}
			} catch(e){
				return;
			}
			this.modal = false;
		},
		async onBtnDel(){
			for(let i = 0; i < this.dels.length; i++){
				try {
					let result = await window.sqlite.execute("delete from CODE Where PK=" + this.dels[i].PK);
				} catch(e) {
					break;
				}
			}
			this.$refs["tbl"].removeRows()
		}
	}
}).$mount('#frame');