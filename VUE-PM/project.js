new Vue({
	template:  `<div id="frame">
		<data-table ref="tbl" title="專案資料" :columns="columns" :datas="datas" :onEdit="onEdit" :onSort="onSort">
			<div slot="header" style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;"> 
				<i-button v-if="dels.length > 0" type="warning" @click="onBtnDel">刪除</i-button>
				<div style="flex: 1;"/>
				<options ref="options" :datas="columns" />
				<i-input v-model="search" size="large" :search="true" @on-search="onSearch" placeholder="請輸入關鍵字" style="width: 200px;">
				</i-input>
			</div>
		</data-table>
		<modal v-model="modal" class-name="vertical-center-modal" title="專案資料" :width="dlgWidth">
			<div v-for="(item, key, index) in columns" style="margin-top: 5px;display: flex; flex-direction: row; justify-content: center; align-items: center;">
				<div style="width: 60px; text-align: right; display: inline-block; margin-right: 5px;">{{item.title}}</div>
				<div v-if="item.key == 'MEMBER'" style="flex: 1;">
					<i-select multiple v-model="editData[item.key]" style="margin-right: 5px;">
						<i-option v-for="item in user" :value="item.USR_NAME" :key="item.USR_NAME">
							{{ item.USR_NAME }}
						</i-option>
					</i-select>
				</div>
				<div v-else-if="item.key == 'ACTIVE'" style="flex: 1;">
					<RadioGroup  v-model="editData[item.key]">
						<Radio label="Y">Y</Radio><Radio label="N">N</Radio>
					</RadioGroup>
				</div>
				<i-input v-else :readonly="editData.PK > -1 && (item.key == 'PRJ_NAME') ? true : false"  
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
				{ title: '名稱', key: 'PRJ_NAME', width: 120, require: true},
				{ title: '成員', key: 'MEMBER', width: 200},
				{ title: '版本', key: 'VERSION', width: 150},
				{ title: '說明', key: 'MEMO'},
				{ title: '啟用', key: 'ACTIVE', align: 'center', width: 60},
			],
			datas: [],
			search: "",
			order: "",
			editData: {},
			modal: false, 
			dels: [],
			user: [],
			dlgWidth: 500
		};
	},
	created(){
	},
	async mounted () {
		vm.loading();
		this.user = [];
		this.datas = [];
		if(vm.isSQL == false) {
			FireStore.db.collection('USER')
			.where("ACTIVE", "==", "Y")
			.get().then(snapshot => {
				snapshot.forEach(doc => {
					// console.log(doc.id, doc.data());
					this.user.push({"USR_NAME": doc.data().USR_NAME});
				});
				vm.loading(false);
			});			
		} else {
			try {
				let sql = "Select * from USER where ACTIVE = 'Y' order by DEP, JOB";
				this.user = await window.sqlite.execute(sql);
			} catch(e) {
			}			
		}

		await this.onSearch();
	},
	destroyed() {
  },
	methods: {
		async onSearch(){
			let keyword = (typeof this.$refs["options"].keyword != "string") ? "" : this.$refs["options"].keyword;
			vm.loading("載入 PROJECT 資料......");
			this.datas = [];
			if(vm.isSQL == false) {
				let ref = FireStore.db.collection('PROJECT');
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
				let where = keyword.length > 0 && this.search.length > 0 ? "where " + keyword + " like '%" + this.search + "%' " : "";
				let sort = this.order.length > 0 && this.order.indexOf("normal") == -1 ? this.order : "";
				let sql = "Select * from PROJECT " + where + (sort.length > 0 ? " order by " + sort : "") ;
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
				this.editData = obj;
				this.modal = true;
			} else if (type == "edit"){
				this.editData = {};
				for(let key in item) {
					if(key == "MEMBER" && item[key].length > 0) {
						this.editData[key] = item[key].split(",")
					} else
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
						this.$Modal.warning({title: "專案資料", content: "請輸入『" + this.columns[i].title  + "』"});
						return;
					}
				}
			}
			let obj = {};
			for(let key in this.editData) {
				if(key == "MEMBER" && Array.isArray(this.editData.MEMBER)) {
						let member = "";
						this.editData[key].forEach(item=>{
							member += (member.length > 0 ? "," : "") + item;
						});
						obj[key] = member;				
				} else {
					obj[key] = this.editData[key]
				}
			}

			if(vm.isSQL == false) {
				try {
					let first = typeof obj.PK == "undefined" ? true : false;
					if(first == true)
						FireStore.insert("PROJECT", obj)
					else {
						FireStore.update("PROJECT", obj)
					}
					if(first == true) {
						this.$refs["tbl"].addRows(obj)
					} else {
						this.$refs["tbl"].updateRow(obj)
					}
				} catch(e) {
					vm.showMessage(e.message)
				}
			} else {
				if(typeof obj.PK == "undefined") {
					obj.PK = (new Date()).getTime();
					sql = sqlite.convertToInsert("PROJECT", obj);
				} else {
					sql = sqlite.convertToUpdate("PROJECT", obj);
				}
				try {
					let result = await window.sqlite.execute(sql);
					if(result > 0) {
						if(sql.sql.indexOf("Insert Into") == 0) {
							this.$refs["tbl"].addRows(obj)
						} else {
							this.$refs["tbl"].updateRow(obj)
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
					if(vm.isSQL)
						await window.sqlite.delete("PROJECT", this.dels[i].PK);
					else
						await FireStore.delete("PROJECT", this.dels[i].PK);
				} catch(e) {
					break;
				}
			}
			this.dels = [];
			this.$refs["tbl"].removeRows()
		}
	}
}).$mount('#frame');