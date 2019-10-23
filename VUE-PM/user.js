new Vue({
	template:  `<div id="frame">
		<data-table ref="tbl" title="員工資料" :columns="columns" :datas="datas" :onEdit="onEdit" :onSort="onSort">
			<div slot="header" style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;"> 
				<i-button v-if="dels.length > 0" type="warning" @click="onBtnDel">刪除</i-button>
				<div style="flex: 1;"/>
				<options ref="options" :datas="columns" />
				<i-input v-model="search" size="large" :search="true" @on-search="onSearch" placeholder="請輸入關鍵字" style="width: 200px;">
				</i-input>
			</div>
		</data-table>
		<modal v-model="modal" class-name="vertical-center-modal" title="員工資料" :width="dlgWidth">
			<div v-for="(item, key, index) in columns" style="margin-top: 5px;display: flex; flex-direction: row; justify-content: center; align-items: center;">
				<div style="width: 60px; text-align: right; display: inline-block; margin-right: 5px;">{{item.title}}</div>
				<div v-if="item.key == 'DEP'" style="flex: 1;">
					<i-select v-model="editData[item.key]" style="width:120px; margin-right: 5px;">
						<i-option v-for="item in dep" :value="item.CD_NAME" :key="item.CD_NAME">
							{{ item.CD_NAME }}
						</i-option>
					</i-select>
				</div>
				<div v-else-if="item.key == 'JOB'" style="flex: 1;">
					<i-select v-model="editData[item.key]" style="width:120px; margin-right: 5px;">
						<i-option v-for="item in job" :value="item.CD_NAME" :key="item.CD_NAME">
							{{ item.CD_NAME }}
						</i-option>
					</i-select>
				</div>
				<div v-else-if="item.key == 'ACTIVE'" style="flex: 1;">
					<RadioGroup  v-model="editData[item.key]">
						<Radio label="Y">Y</Radio><Radio label="N">N</Radio>
					</RadioGroup>
				</div>
				<i-input v-else :readonly="editData.PK > -1 && (item.key == 'USR_NAME') ? true : false"  
					v-model="editData[item.key]" size="large" style="flex: 1;"
					:type="item.key == 'MEMO' ? 'textarea' : 'text'" :rows="5"></i-input>
			</div>
			<div slot="footer">
				<i-button @click="modal=false">取消</i-button>
				<i-button type="primary" @click="onSave">確定</i-button>
			</div>
		</modal>
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
			dep: [],
			job: [],
			dlgWidth: 400
		};
	},
	created(){
	},
	async mounted () {
		try {
			let sql = "Select * from CODE where CD_KIND = '部門' and ACTIVE = 'Y' order by CD_KEY, CD_NAME";
			this.dep = await window.sqlite.execute(sql);

			sql = "Select * from CODE where CD_KIND = '職務' and ACTIVE = 'Y' order by CD_KEY, CD_NAME";
			this.job = await window.sqlite.execute(sql);
		} catch(e) {
		}

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
			this.dlgWidth = document.body.clientWidth > 600 ? 550 : document.body.clientWidth - 10;
			if(type == "new") {
				let obj = {ACTIVE: "Y"};
				if(typeof this.editData.DEP != "undefined")
					obj.DEP = this.editData.DEP;
				if(typeof this.editData.JOB != "undefined")
					obj.JOB = this.editData.JOB;
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
			for(let i = 0; i < this.columns.length; i++) {
				if(this.columns[i].require == true) {
					let val = this.editData[this.columns[i].key];
					if(typeof val == "undefined" || val.length == 0) {
						this.$Modal.warning({title: "員工資料", content: "請輸入『" + this.columns[i].title  + "』"});
						return;
					}
				}
			}
			if(typeof this.editData.PK == "undefined") {
				this.editData.PK = (new Date()).getTime();
				sql = sqlite.convertToInsert("USER", this.editData);
			} else {
				sql = sqlite.convertToUpdate("USER", this.editData);
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
					let result = await window.sqlite.delete("USER", this.dels[i].PK);
				} catch(e) {
					break;
				}
			}
			this.$refs["tbl"].removeRows();
			this.dels = [];
		}
	}
}).$mount('#frame');