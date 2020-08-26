Vue.component('vue-table', { 
	template:  `<div style="height: 100%; overflow: auto; display: flex; flex-direction: column;">
		<div ref="frame" style="flex: 1;">
			<Table :id="id" highlight-row :height="height" border :columns="columns" :data="datas2"
				@on-column-width-resize="onColumnResize"

			></Table>
		</div>
		<div style="display: flex; flex-direction: row; padding: 5px 10px;">
			<div style="flex: 1; back">
				<Button type="primary" icon="md-document" size="small"  @click="onClick('document')" />
				<Button type="primary" icon="md-swap" size="small"  @click="onClick('swap')" v-if="id != 'unknown'" />
				<Button type="primary" icon="md-grid" size="small"  @click="onClickGrid"  v-if="columns.length > 0" />
			</div>
			<Page v-if="datas.length > opts[0]" :total="datas.length" 
				:page-size="pageSize" :page-size-opts="opts" show-elevator show-sizer 
				style="" 
				@on-change="onChangePage" @on-page-size-change="onPageSizeChange" />
		</div>
	</div>`,
	props: {
		datas: {
			type: Array,
			// require: true, 
			default: [] // 
		},
		id: {
			type: String,
			// require: true, 
			default: "unknown" // 
		},
	},
	data() {
		return {
			columns: [],
			height: 0,
			opts: [15, 20, 30, 40],
			pageSize: 15,
			datas2: [],
			row: {},
			currentPage: 0
		};
	},
	created(){
		let s = window.localStorage["JSON-tbl-pageSize-" + this.id];
		if(typeof s != "undefined") {
			this.pageSize = parseInt(s, 10);
		}		
	},
	async mounted () {
		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
		this.createColumns();
	},
	destroyed() {
		// this.removeEventListener("click", this.onRowClick);
		if(this.datas2.length > 0) this.eventListener(1);
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		onColumnResize(width, start, col) {
			console.log(col)
		},
		onResize(){
			let viewer = this.$refs["frame"];
			if(typeof viewer == "object") {
				this.height = viewer.clientHeight;
				viewer.style.height = this.height + "px";
			}
		},
		onChangePage(e) {
			if(this.currentPage == e) return;
			this.currentPage = e;
			if(this.datas2.length > 0) this.eventListener(1);
			this.datas2 = [];
			let start = (e - 1) * this.pageSize, end = start + this.pageSize;
			if(end > this.datas.length) end = this.datas.length;
			for(let i = start; i < end; i++) {
				this.datas2.push(this.datas[i]);
			}

			setTimeout(()=>{
				this.eventListener(0);
			}, 600)
		},
		eventListener(opt){
			let arr = document.querySelectorAll("#" + this.id + " div.ivu-table-fixed-body table td:first-child")
			for(let i = 0; i < arr.length; i++) {
				if(opt == 0) {
					arr[i].setAttribute("row", i);
					arr[i].addEventListener("click", this.onRowClick, true);
				} else 
					arr[i].removeEventListener("click", this.onRowClick, true);
			}
		},
		onPageSizeChange(e) {
			this.currentPage = 0;
			this.pageSize = e;
			this.onChangePage(1);
			window.localStorage["JSON-tbl-pageSize-" + this.id] = e;
		},
		onRowClick(e) {
			let el = e.target;
			while(el.tagName != "TD"){
				el = el.parentNode;
			}
			let row = el.getAttribute("row")
			let index = parseInt(row, 10);
			this.$emit("onRowClick", this.datas2[index]);
		},
		createColumns(arg){
			this.columns = [];
			
			if(this.datas.length > 0) {
				this.columns.push({
					type: 'index',
					width: 40,
					align: 'center',
					fixed: "left",
					className: "index",
					indexMethod: (row)=>{
						return row._index + ((this.currentPage-1) * this.pageSize) + 1;
					}
				});
				let arr = typeof arg == "object" ? arg : [];
				if(arr.length == 0) {
					let s = window.localStorage["JSON-Cols-" + this.id];
					if(typeof s == "string" && s.length > 0) 
						arr = JSON.parse(s);
				}

				if(arr.length > 0)  {
					arr.forEach(el => {
						if(typeof el.visible == "undefined" || el.visible == true){
							this.columns.push(el)
						}
					});
				} else {
					let div = document.createElement("div");
					div.style.display = "inline-block";
					div.style.position = "absolute";
					div.style.visibility = "hidden";
		
					document.body.insertAdjacentElement('beforebegin', div);
					for(let key in this.datas[0]) {
						div.innerHTML = key;
						this.columns.push({ 
							title: key,
							key: key,
							resizable: true,
							width: div.clientWidth + 20,
						})
					}
					let parent = div.parentNode;
					parent.removeChild(div);					
				}
				this.onChangePage(1);
			}
		},
		reset() {
			this.columns = [];
			this.datas2 = [];
		},
		onClick(e){
			this.$emit("onBtnClick", e);
		},
		onClickGrid(){
			this.$emit("onBtnClick", {id: this.id, columns: this.columns});
		}
	},
	watch: {
		datas(value) {
			this.currentPage = 0;
			if(this.columns.length == 0) this.createColumns();
			this.height = 0;
			setTimeout(() => {
				this.onResize();
				this.onChangePage(1);
			}, 600);
		}
	}
});
/*
https://www.iviewui.com/components/table
*/