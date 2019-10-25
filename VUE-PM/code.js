
new Vue({
	template: `<div id="frame">
		<data-table ref="tbl" title="代碼資料" :columns="columns" :datas="datas" :onEdit="onEdit" :onSort="onSort">
			<div slot="header" style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;"> 
				<i-button v-if="dels.length > 0" type="warning" @click="onBtnDel">刪除</i-button>
				<div style="flex: 1;"/>
				<options ref="options" :datas="columns" />
				<i-input v-model="search" size="large" :search="true" @on-search="onSearch" placeholder="請輸入關鍵字" style="width: 200px;">
				</i-input>
			</div>
		</data-table>
		<modal v-model="modal" class-name="vertical-center-modal" title="代碼資料" :width="dlgWidth">
			<div v-for="(item, key, index) in columns" style="margin-top: 5px;display: flex; flex-direction: row; justify-content: center; align-items: center;">
				<div style="width: 60px; text-align: right; display: inline-block; margin-right: 5px;">{{item.title}}</div>
				<div v-if="item.key == 'CD_KIND' && typeof editData.PK == 'undefined'" style="flex: 1;">
					<i-select v-model="editData[item.key]" style="width:120px; margin-right: 5px;">
						<i-option v-for="item in kinds" :value="item" :key="item">
							{{ item }}
						</i-option>
					</i-select>
				</div>
				<div v-else-if="item.key == 'ACTIVE'" style="flex: 1;">
					<RadioGroup  v-model="editData[item.key]">
						<Radio label="Y">Y</Radio><Radio label="N">N</Radio>
					</RadioGroup>
				</div>
				<i-input v-else :readonly="editData.PK > -1 && (item.key == 'CD_KIND' || item.key == 'CD_NAME' || item.key == 'CD_KEY') ? true : false"  
					v-model="editData[item.key]" size="large" style="flex: 1;"  
					:type="item.key == 'MEMO' ? 'textarea' : 'text'" :rows="5"></i-input>
			</div>
			<div slot="footer">
				<i-button @click="modal=false">取消</i-button>
				<i-button type="primary" @click="onSave">確定</i-button>
			</div>
		</modal>
	</div>`, // 
	data() {
		return {
			columns: [
				{title: '代碼分類', key: 'CD_KIND', width: 150, sortable: true, require: true},
				{title: '代碼名稱', key: 'CD_NAME', width: 160, require: true},
				{title: '關鍵代碼', key: 'CD_KEY', width: 160},
				{title: '說明', key: 'MEMO', resizable: true},
				{title: '啟用', key: 'ACTIVE', align: 'center', width: 60},
			],
			datas: [],
			search: "",
			order: "",
			editData: {},
			modal: false, 
			dels: [],
			kinds: ['部門', '職務', '進度'],
			dlgWidth: 400
		};
	},
	created(){
	},
	async mounted(){
		await this.onSearch();
	},
	destroyed(){
  },
	methods: {
		async onSearch(){
			vm.loading("載入 CODE 資料......");
			this.datas = [];
			let ref = FireStore.db.collection('CODE');
			ref.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					this.datas.push(Object.assign({PK: doc.id}, doc.data()))
				});
				vm.loading(false);
			});
			
			/* sqlite ok 的，但不用了
			let keyword = (typeof this.$refs["options"].keyword != "string") ? "" : this.$refs["options"].keyword;
			let where = keyword.length > 0 && this.search.length > 0 ? "where " + keyword + " like '%" + this.search + "%' " : "";

			let sort = this.order.length > 0 && this.order.indexOf("normal") == -1 ? this.order : "CD_KIND, CD_KEY, CD_NAME";
			let sql = "Select * from CODE " + where +  " order by " + sort;
			try {
				let rows = await window.sqlite.execute(sql);
				this.datas = rows;
			} catch(e) {
			}
			*/
		},
		onEdit(type, item, index){
			this.dlgWidth = document.body.clientWidth > 600 ? 550 : document.body.clientWidth - 10;
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
			try {
				let first = typeof this.editData.PK == "undefined" ? true : false;
				if(first == true)
					FireStore.insert("CODE", this.editData)
				else {
					FireStore.update("CODE", this.editData)
				}
				if(first == true) {
					this.$refs["tbl"].addRows(this.editData)
				} else {
					this.$refs["tbl"].updateRow(this.editData)
				}
			} catch(e) {
				vm.showMessage(e.message)
			}
			/*
			if(typeof this.editData.PK == "undefined") {
				this.editData.PK = (new Date()).getTime();
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
			*/
			this.modal = false;
		},
		async onBtnDel(){
			vm.loading()
			for(let i = 0; i < this.dels.length; i++){
				try {
					// let result = await window.sqlite.delete("CODE", this.dels[i].PK);
					await FireStore.delete("CODE", this.dels[i].PK);
				} catch(e) {
					vm.loading(false)
					break;
				}
			}
			vm.loading(false)
			this.$refs["tbl"].removeRows();
			this.dels = [];
		}
	}
}).$mount('#frame');