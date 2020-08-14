Vue.component('vue-table', { 
	template:  `<div style="height: 100%; overflow: auto; display: flex; flex-direction: column;">
		<div ref="frame" style="flex: 1;">
			<Table :id="id" highlight-row :height="height" border :columns="columns" :data="datas2"></Table>
		</div>
		<div style="display: flex; flex-direction: row; padding: 5px 10px;">
			<div style="flex: 1; back">
				<Button type="primary" icon="md-document" size="small"  @click="onClick('document')" />
				<Button type="primary" icon="md-swap" size="small"  @click="onClick('swap')" v-if="id != 'unknown'" />
			</div>
			<Page v-if="datas.length > opts[0]" :total="datas.length" :page-size="pageSize" :page-size-opts="opts" show-elevator show-sizer 
				style="" 
				@on-change="onChange" @on-page-size-change="onPageSizeChange" />
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
		};
	},
	created(){
	},
	async mounted () {
		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
		this.createColumn();
	},
	destroyed() {
		// this.removeEventListener("click", this.onRowClick);
		if(this.datas2.length > 0) this.eventListener(1);
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		onResize(){
			let viewer = this.$refs["frame"];
			this.height = viewer.clientHeight;
		},
		onChange(e) {
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
			// console.log("#" + this.id)
			let arr = document.querySelectorAll("#" + this.id + " table td:first-child")
			// console.log(this.id + ": " + arr.length)
			for(let i = 0; i < arr.length; i++) {
				arr[i].setAttribute("row", i)
				if(opt == 0) 
					arr[i].addEventListener("click", this.onRowClick, true);
				else 
					arr[i].removeEventListener("click", this.onRowClick, true);
			}
		},
		onPageSizeChange(e) {
			this.pageSize = e;
			this.onChange(1);
		},
		onRowClick(e) {
			let el = e.target;
			let index = parseInt(el.innerText, 10) - 1;
			this.$emit("onRowClick", this.datas2[index]);
		},
		createColumn(){
			if(this.datas.length > 0) {
				this.columns.push({
					type: 'index',
					width: 40,
					align: 'center',
					fixed: "left",
					className: "index"
				});
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
				this.onChange(1);
			}
		},
		reset() {
			this.columns = [];
		},
		onClick(e){
			this.$emit("onBtnClick", e);
		}
	},
	watch: {
		datas(value) {
			if(this.columns.length == 0) this.createColumn();
			this.height = 0;
			setTimeout(() => {
				this.onResize();
				this.onChange(1);
			}, 600);
		}
	}
});
/*
https://www.iviewui.com/components/table
*/