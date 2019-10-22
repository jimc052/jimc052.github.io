Vue.component('data-table', { 
	template: `<div style="height: 100%; display: flex; flex-direction: column;">
			<header-bar :title="title"></header-bar>
			<slot name="header"></slot>
			<div ref="tbl" style="flex: 1; overflow: hidden">
				<Table :columns="cols" :data="myData" border :height="maxHeight" 
					@on-row-click="onRowClick" @on-selection-change="onSelectionChange" 
					@on-sort-change="onChangeSort">
				</Table>
			</div>
			<Page ref="page" v-if="datas.length > pageSize" :total="datas.length" 
				@on-change="onPageChange" @on-page-size-change="onPageSizeChange" 
				:page-size="pageSize" style="margin: 5px;" show-total show-elevator show-sizer />
			<slot name="footer"></slot>
			<i-button type="primary" shape="circle" class="absolute-bottom" icon="md-add" 
				circle @click.native="onNewRow" size="large"></i-button>
		</div>`
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
			myData: [],
			cols: [{ 
				type: 'selection',
				width: 60,
				align: 'center',
			}]
		};
	},
	created(){
		let self = this;
		window.onresize = () => {
			self.resize(600);
		}
		if(typeof this.columns[0].fixed == "string") {
			this.cols[0].fixed = "left";
		}
		this.columns.forEach(item=>{
			this.cols.push(item);
		});
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
			this.onEdit("edit", this.myData[index], index);
		},
		onSelectionChange(){
			let arr = document.querySelectorAll(".ivu-table-tbody .ivu-table-cell-with-selection input");
			setTimeout(()=>{
				let arr2 = [];
				for(let i = 0; i < arr.length; i++) {
					if(arr[i].checked == true) arr2.push(this.myData[i]);
				}
				this.onEdit("selection", arr2);
			}, 300)
		}, 
		onChangeSort(item){
			if(typeof this.onSort == "function") this.onSort(item);
		},
		addRows(item) {
			if(this.myData.length < this.pageSize){
				this.myData.push(item)
			}
			this.datas.push(item)
		},
		updateRow(item) {
			for(let i = 0; i < this.datas.length; i++) {
				if(this.datas[i].PK == item.PK) {
					this.datas[i] = item;
					break;
				}
			}
			for(let i = 0; i < this.myData.length; i++) {
				if(this.myData[i].PK == item.PK) {
					this.$set(this.myData, i, item);
					break;
				}
			}
		},
		removeRows(){
			let arr = document.querySelectorAll(".ivu-table-tbody .ivu-table-cell-with-selection input");
			let currentPage = typeof this.$refs["page"] == "undefined" ? 1 : this.$refs["page"].currentPage;
			let x = (currentPage - 1) * this.pageSize;
			for(let i = arr.length - 1; i >= 0; i--) {
				if(arr[i].checked == true) {
					this.myData.splice(i, 1)
					this.datas.splice(x + i, 1)
				}
			}
			let y = Math.ceil(this.datas.length / this.pageSize);
			if(y >= currentPage) {
				y = currentPage;
			}
			this.onPageChange(y);
		},
	},
	watch: {
		datas(val) {
			if(val.length > 0)
				this.onPageChange(1)
			else {
				this.myData = [];
			}
		}
	},
});
