new Vue({
	template: '<div id="frame">' +
		'<data-table title="專案資料" :columns="columns" :datas="datas" :onEdit="onEdit" :onSort="onSort">' +
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
				{ title: '名稱', key: 'PRJ_NAME', width: 120},
				{ title: '成員', key: 'MEMBER', width: 200},
				{ title: '版本', key: 'VERSION', width: 150},
				{ title: '說明', key: 'MEMO'},
				{ title: '啟用', key: 'ACTIVE', align: 'center', width: 60},
			],
			datas: [],
			search: "",
		};
	},
	created(){
	},
	mounted(){
		
	},
	destroyed(){
  },
	methods: {
		onSearch() {

		},
		onEdit(type, item, index){
			console.log("onEdit: " + type)
		},
		onSort(item){
			console.log(item)
		}
	}
}).$mount('#frame');
