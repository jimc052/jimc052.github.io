Vue.component('data-table', { 
	template: '<div style="height: 100%; display: flex; flex-direction: column;">' +
			'<header-bar :title="title"></header-bar>' +
			'<slot name="header"></slot>' +
			'<div ref="tbl" style="flex: 1; overflow: hidden">' +
				'<Table :columns="columns" :data="myData" border :height="maxHeight" @on-row-click="onRowClick" @on-selection-change="onSelectionChange" @on-sort-change="onChangeSort" ></Table>				></Table>' +
			'</div>' +
			'<Page ref="page" v-if="datas.length > 10" :total="datas.length" @on-change="onPageChange" @on-page-size-change="onPageSizeChange" :page-size="pageSize" style="margin: 5px;" show-total show-elevator show-sizer  />' +
			'<slot name="footer"></slot>' +
			'<i-button type="primary" shape="circle" class="absolute-bottom" icon="md-add" circle @click.native="onNewRow"></i-button>' +
		'</div>'
	,
	props: {
		title: String,
		columns: {
			type: Array,
			default: [],
			require: true
		},
		datas: {
			type: Array,
			default: [],
			require: true
		},
		onEdit: {
			type: Function,
			require: true
		},
		onSort: {
			type: Function,
		}
	},
	data(){
		return {
			maxHeight: 500, 
			pageSize: 20,
			myData: []
		};
	},
	created(){
		let self = this;
		window.onresize = () => {
			self.resize(600);
		}

		// this.columns.push({ // 可以用的
		// 	title: 'Action',
		// 	key: 'action',
		// 	width: 110,
		// 	align: 'center',
		// 	render: (h, params) => {
		// 		return h('div', [
		// 				h('Button', {
		// 						props: {
		// 								type: 'primary',
		// 								size: 'small'
		// 						},
		// 						style: {
		// 								marginRight: '5px'
		// 						},
		// 						on: {
		// 								click: () => {
		// 									self.onEdit("edit", params)
		// 								}
		// 						}
		// 				}, '編輯'),
		// 				h('Button', {
		// 						props: {
		// 								type: 'error',
		// 								size: 'small'
		// 						},
		// 						on: {
		// 							click: () => {
		// 								self.onEdit("del", params)
		// 							}
		// 						}
		// 				}, '刪除')
		// 		]);
		// 	}
		// });

		this.columns.unshift({ // ok 的，可以用
			type: 'selection',
			width: 60,
			align: 'center'
		})
	},
	mounted(){
		this.resize();
		setTimeout(() => {
			this.onPageChange(1);
		}, 300);
	},
	destroyed(){
  },
	methods: {
		resize(t) {
			setTimeout(()=>{
				this.maxHeight = this.$refs["tbl"].clientHeight;
			}, typeof t == "undefined" ? 300 : t);
		},
		onPageChange(page){
			let arr = [];
			if(this.datas.length == 0) return;
			let x = (page - 1) * this.pageSize;
			for(let i = x; i < x + this.pageSize; i++) {
				if(i >= this.datas.length) break;
				arr.push(this.datas[i]);
			}
			this.myData = arr;
			
		},
		onPageSizeChange(i){
			this.pageSize = parseInt(i, 10)
			this.onPageChange(1);
		}, 
		onNewRow(){
			this.onEdit("new")
		}, 
		onRowClick(item, index){
			// this.myData[index].CD_KIND += "xx";
			this.onEdit("edit", this.myData[index], index);
		},
		onSelectionChange(){
			let arr = document.querySelectorAll(".ivu-table-tbody .ivu-table-cell-with-selection input");
			setTimeout(()=>{
				let arr2 = [];
				for(let i = 0; i < arr.length; i++) {
					if(arr[i].checked == true) arr2.push(i);
				}
				this.onEdit("selection", arr2);
			}, 300)
		}, 
		onChangeSort(item){
			if(typeof this.onSort == "function") this.onSort(item);
		},
		addRows(item) {
			
			if(myData.length < this.pageSize){

			}
		},
		updateRow(item) {
			// console.log("currentPage: " + this.$refs["page"].currentPage)
		},
		removeRows(){
			let arr = document.querySelectorAll(".ivu-table-tbody .ivu-table-cell-with-selection input");
				for(let i = arr.length - 1; i >= 0; i--) {
					if(arr[i].checked == true) {

					}
				}

			this.onPageChange(this.$refs["page"].currentPage);
		}
	}
});
