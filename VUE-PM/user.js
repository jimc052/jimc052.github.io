new Vue({
	template: '<div id="frame">' +
			'<data-table title="員工資料" :columns="columns" :datas="datas" :onEdit="onEdit" :onSort="onSort">' +
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
				{ title: '姓名', key: 'USR_NAME', width: 120, sortable: true},
				{ title: '部門', key: 'DEP', width: 100},
				{ title: '職務', key: 'JOB', width: 100},
				{ title: '信箱', key: 'MAIL', width: 180},
				{ title: '說明', key: 'MEMO'},
				{ title: '啟用', key: 'ACTIVE', align: 'center', width: 60},
			],
			datas: [],
			search: ""
		};
	},
	created(){
	},
	async mounted () {
		for(let i = 0; i < 30; i++) {
			this.datas.push({USR_NAME: i})
		}
		try {
			let rows = await window.sqlite.execute("Select * from USER");
			console.log(rows)
		} catch(e) {
			console.log(e)
		}		
	},
	destroyed() {
  },
	methods: {
		onSearch(){
			console.log("onSearch")
		},
		onEdit(type, item, index){
			console.log("onEdit: " + type)
		},
		onSort(item){
			console.log(item)
		}
	}
}).$mount('#frame');