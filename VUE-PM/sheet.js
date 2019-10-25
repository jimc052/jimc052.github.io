new Vue({
	template:  `<div id="frame">
		<data-table ref="tbl" title="需求單" :columns="columns" :datas="datas" :onEdit="onEdit" :onSort="onSort">
			<div slot="header" style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;"> 
				<i-button v-if="dels.length > 0" type="warning" @click="onBtnDel">刪除</i-button>
				<div style="flex: 1;"/>
				<options ref="options" :datas="columns" />
				<i-input v-model="search" size="large" :search="true" @on-search="onSearch" placeholder="請輸入關鍵字" style="width: 200px;">
				</i-input>
			</div>
		</data-table>
		<SheetEdit :visible="modal" :data="editData" @onClose="onClose" />
	</div>`,
	data() {
		return {
			columns: [
				{ title: '建檔日', key: 'PK', width: 90, fixed: 'left', sortable: true, 
					render: (h, {row}) => {
						let d = new Date(parseInt(row.PK,10));
						return h('span', d.toString("yyyy/mm/dd") )
					}
				},
				{ title: '專案', key: 'PRJ_NAME', width: 120, fixed: 'left', sortable: true},
				{ title: '主旨', key: 'TITLE'},
				{ title: '單號', key: 'ORD_NO', width: 120},
				{ title: 'RD', key: 'RD', width: 90},
				{ title: 'PM', key: 'PM', width: 90},
				{ title: '進度', key: 'STATUS', width: 80},
				{ title: '說明', key: 'MEMO'},
				// { title: '啟用', key: 'ACTIVE', align: 'center', width: 60},
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
		/*
		try {
			let sql = "Select * from USER where ACTIVE = 'Y' order by DEP, JOB";
			this.user = await window.sqlite.execute(sql);
		} catch(e) {
		}
		*/
		await this.onSearch();
	},
	destroyed() {
  },
	methods: {
		async onSearch(){
			let keyword = (typeof this.$refs["options"].keyword != "string") ? "" : this.$refs["options"].keyword;
			vm.loading("載入 SHEET 資料......");
			this.datas = [];
			let ref = FireStore.db.collection('SHEET');
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
			vm.loading(false);

			/*
			let keyword = (typeof this.$refs["options"].keyword != "string") ? "" : this.$refs["options"].keyword;
			let where = keyword.length > 0 && this.search.length > 0 ? "where " + keyword + " like '%" + this.search + "%' " : "";

			let sort = this.order.length > 0 && this.order.indexOf("normal") == -1 ? this.order : " PK desc ";
			let sql = "Select * from SHEET " + where + (sort.length > 0 ? " order by " + sort : "") ;
			try {
				let rows = await window.sqlite.execute(sql);
				rows.forEach(item=>{
					if(typeof item.MEMBER == "string" && item.MEMBER.length > 0){
						let arr = item.MEMBER.split(",");
						item.MEMBER = JSON.parse('["' + arr.join('", "') + '"]');
					}
				})
				this.datas = rows;
			} catch(e) {
			}
			*/
		},
		onEdit(type, item, index){
			if(type == "new") {
				let obj = {ACTIVE: "Y"};
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
		async onBtnDel(){
			for(let i = 0; i < this.dels.length; i++){
				try {
					// let result = await window.sqlite.delete("SHEET", this.dels[i].PK);
					await FireStore.delete("SHEET", this.dels[i].PK);
				} catch(e) {
					break;
				}
			}
			this.$refs["tbl"].removeRows()
			this.dels = [];
		},
		onClose(mode, data){
			if(typeof mode == "string") {
				if(mode == "insert")
					this.$refs["tbl"].addRows(data)
				else
					this.$refs["tbl"].updateRow(data)
			}
			this.modal = false;
		}
	}
}).$mount('#frame');