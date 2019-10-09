new Vue({
	template: '<div id="frame">' +
		'<data-table title="代碼資料" :columns="columns" :datas="datas" :onEdit="onEdit" :onSort="onSort">' +
			'<div slot="header" style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center;">' + 
				'<options ref="options" :columns="columns" />' +
				'<i-input v-model="search" size="large" placeholder="請輸入關鍵字" style="width: 200px;">' +
					'<Icon type="ios-search" slot="suffix" @click.native="onSearch" style="cursor: pointer;" />' +
				'</i-input>' +
			'</div>' +
		'</data-table>' +
	'</div>',
	data() {
		return {
			columns: [
				{title: '代碼分類', key: 'CD_KIND', width: 150, sortable: true,},
				{title: '關鍵代碼', key: 'CD_KEY', width: 160, sortable: true},
				{title: '代碼名稱', key: 'CD_NAME', width: 160},
				{title: '說明', key: 'MEMO'},
				{title: '啟用', key: 'ACTIVE', align: 'center', width: 60},
			],
			datas: [],
			search: "",
			order: "",
		};
	},
	created(){
	},
	 mounted(){
		for(let i = 0; i < 30; i++) {
			this.datas.push({CD_KIND: i})
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
			} catch(e) {
				
			}
		},
		onEdit(type, item, index){
			console.log("onEdit: " + type)
			item.CD_KIND += " yyyy";
		},
		onSort(item){
			this.order = item.key + " " + item.order;
			this.onSearch();
		}
	}
}).$mount('#frame');