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
				{ title: '部門', key: 'DEP', width: 100, sortable: true},
				{ title: '職務', key: 'JOB', width: 100},
				{ title: '信箱', key: 'MAIL', width: 180, require: true},
				{ title: '密碼', key: 'PWD', width: 0, require: true},
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
			vm.loading();
			this.datas = [];
			if(vm.isSQL == false) {
				for(let i = 0; i < this.columns.length; i++) {
					if(this.columns[i].key == "PWD") {
						this.columns.splice(i, 1)
						break;
					}
				}
				
				FireStore.db.collection('CODE')
				.where("ACTIVE", "==", "Y").get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						// console.log(doc.id, doc.data());
						if(doc.data().CD_KIND == "部門")
							this.dep.push({"CD_NAME": doc.data().CD_NAME});
						else if(doc.data().CD_KIND == "職務")
							this.job.push({"CD_NAME": doc.data().CD_NAME});
					});
					vm.loading(false);
				});
			} else {
				let sql = "Select * from CODE where CD_KIND = '部門' and ACTIVE = 'Y' order by CD_KEY, CD_NAME";
				this.dep = await window.sqlite.execute(sql);

				sql = "Select * from CODE where CD_KIND = '職務' and ACTIVE = 'Y' order by CD_KEY, CD_NAME";
				this.job = await window.sqlite.execute(sql);
			}
		} catch(e) {

		}
		await this.onSearch();
	},
	destroyed() {
  },
	methods: {
		async onSearch(){
			let keyword = (typeof this.$refs["options"].keyword != "string") ? "" : this.$refs["options"].keyword;

			vm.loading("載入 USER 資料......");
			this.datas = [];
			if(vm.isSQL == false) {
				let ref = FireStore.db.collection('USER');
				let snapshot = await ref.get();
				snapshot.forEach(doc => {
					if(keyword == "" || this.search.trim() == "" || (keyword.length > 0 && doc.data()[keyword].indexOf(this.search) > -1))
						this.datas.push(Object.assign({PK: doc.id}, doc.data()))
				});
				if(this.order.length > 0 && this.order.indexOf(",normal") == -1) {
					let arr = this.order.split(",")
					this.datas.sort(function (a, b) {
						if(arr[1] == "desc")
							return a[arr[0]] < b[arr[0]] ? 1 : -1;
						else 
							return a[arr[0]] > b[arr[0]] ? 1 : -1;
					});
				}
			} else {
				let keyword = (typeof this.$refs["options"].keyword != "string") ? "" : this.$refs["options"].keyword;
				let where = keyword.length > 0 && this.search.length > 0 ? "where " + keyword + " like '%" + this.search + "%' " : "";
	
				let sort = this.order.length > 0 && this.order.indexOf("normal") == -1 ? this.order : "DEP";
				let sql = "Select * from USER " + where +  " order by " + sort;
				try {
					let rows = await window.sqlite.execute(sql);
					this.datas = rows;
				} catch(e) {
				}
			}
			vm.loading(false);
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
			this.order = item.key + "," + item.order;
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
			if(vm.isSQL == false) {
				try {
					let first = typeof this.editData.PK == "undefined" ? true : false;
					if(first == true)
						FireStore.insert("USER", this.editData)
					else {
						FireStore.update("USER", this.editData)
					}
					if(first == true) {
						this.$refs["tbl"].addRows(this.editData)
					} else {
						this.$refs["tbl"].updateRow(this.editData)
					}
				} catch(e) {
					vm.showMessage(e.message)
				}
			} else {
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
			}
			this.modal = false;
		},
		async onBtnDel(){
			for(let i = 0; i < this.dels.length; i++){
				try {
					// let result = 
					if(vm.isSQL == true)
						await window.sqlite.delete("USER", this.dels[i].PK);
					else
						await FireStore.delete("USER", this.dels[i].PK);
				} catch(e) {
					break;
				}
			}
			this.$refs["tbl"].removeRows();
			this.dels = [];
		}
	}
}).$mount('#frame');