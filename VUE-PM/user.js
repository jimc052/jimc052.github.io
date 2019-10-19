new Vue({
	template: `<div id="frame">
		<data-table title="員工資料" :columns="columns" :datas="datas" :onEdit="onEdit" :onSort="onSort">
			<div slot="header" style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;"> 
				<options ref="options" :datas="columns" />
				<i-input v-model="search" size="large" :search="true" @on-search="onSearch" placeholder="請輸入關鍵字" style="width: 200px;">
				</i-input>
			</div>
		</data-table>
	</div>`,
	data() {
		return {
			columns: [
				{ title: '姓名', key: 'USR_NAME', width: 120, sortable: true, require: true},
				{ title: '部門', key: 'DEP', width: 100},
				{ title: '職務', key: 'JOB', width: 100},
				{ title: '信箱', key: 'MAIL', width: 180, require: true},
				{ title: '說明', key: 'MEMO'},
				{ title: '啟用', key: 'ACTIVE', align: 'center', width: 60},
			],
			datas: [],
			search: "",
			order: "",
			editData: {},
			modal: false, 
			dels: [],
		};
	},
	created(){
	},
	async mounted () {
		await this.onSearch();
	},
	destroyed() {
  },
	methods: {
		async onSearch(){
			// try {
			// 	let rows = await window.sqlite.execute("Select * from USER order by DEP ");
			// 	console.log(rows)
			// } catch(e) {
			// 	console.log(e)
			// }	

			let keyword = (typeof this.$refs["options"].keyword != "string") ? "" : this.$refs["options"].keyword;
			let where = keyword.length > 0 && this.search.length > 0 ? "where " + keyword + " like '%" + this.search + "%' " : "";

			let sort = this.order.length > 0 && this.order.indexOf("normal") == -1 ? this.order : "DEP";
			let sql = "Select * from USER " + where +  " order by " + sort;
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
				if(this.columns[i].key== "CD_KIND") {

				} else if(this.columns[i].require == true) {
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
				let result = await window.sqlite.execute(sql);
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