Vue.component('column-list', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal columnlist" title="欄位資料"
		 :fullscreen="false" :closable="true" id="colList"
			@on-visible-change="onVisibleChange" style="overflow: hidden;"
			:width="800"
	>
		<Table v-if="visible" highlight-row :height="height"  border :columns="columns" :data="list"
			@on-column-width-resize="onColumnResize" 
			@on-row-dblclick="onRowDblclick"
			@on-cell-click="onCellClick"
			:draggable="true" @on-drag-drop="onDragDrop"
			:row-class-name="rowClassName"
		>
			<template slot-scope="{row, index}" slot="visible">
				<Icon type="md-checkmark" size="16" @click.native="onClickIcon(row, index)" 
					:style="{
						padding: '2px',
						margin: '0 3px',
						borderRadius: '3px',
						border: '1px solid ' + (typeof row.visible == 'undefined' || row.visible == true ? '#2d8cf0' : '#eee'),
						color: typeof row.visible == 'undefined' || row.visible == true ? '#2d8cf0' : '#eee', cursor: 'pointer'
					}"
				/>
			</template>
		</Table>
	</modal>`,
  components: {
  },
	props: {
		modal: {
			type: Boolean,
			require: true, 
			default: false 
		},
		data: {
			type: Object,
			require: true, 
			default: {} 
		},
	},
	data() {
		return {
			currendIndex: -1,
			id: "",
			visible: false,
			enabled: true,
      list: [],
			dirty: false,
			columns: [{
				type: 'index',
				width: 40,
				align: 'center',
				fixed: "left",
				className: "index",
			}, { 
				title: "欄位",
				key: "key",
				resizable: true,
				width: 150,
			},{ 
				title: "標題",
				key: "title",
				resizable: true,
				className: "editable",
				render: this.render
			},{ 
				title: "欄寬",
				key: "width",
				width: 90,
				align: 'right',
				className: "editable",
				textAlign: 'right',
				maxlength: 3,
				type: "number",
				render: this.render, 
			},{ 
				title: "顯示",
				key: "visible",
				width: 90,
				slot: "visible",
        align: 'center'
			}],
			height: 300
		};
	},
	created(){
		this.visible = this.modal;
	},
	mounted () {
		this.height = document.body.clientHeight - 250;
	},
	destroyed() {
  },
	methods: {
		render(h, p){
			let key = p.column.key;
			if(this.currendIndex === p.index) {
				if(this.cell == key) {
					setTimeout(() => {
						let obj = document.querySelector("#column_list_inp_" + this.cell + "_" + this.currendIndex);
						if(obj) {
							obj.focus();
						}
					}, 400);					
				}
				return h('input', {
					style: {
						width: '100%',
						padding: '2px 2px',
						borderRadius: '4px',
						border: '1px solid #e9eaec',
						textAlign: typeof p.column.textAlign == "string" ? p.column.textAlign : "left", // 'right'
					},
					attrs: {
						id: "column_list_inp_" + key + "_" + this.currendIndex,
						maxlength: p.column.maxlength, 
						type: typeof p.column.type == "string" ? p.column.type : "text", //  "number"
					},
					domProps: {
						value: p.row[key]
					},
					on: {
						input: (event) => {
							let obj = {};
							obj[key] = event.target.value;
							this.$set(this.list, p.index, Object.assign(p.row, obj));
							this.dirty = true;
						}
					}
				});
			} else
				return h('span', p.row[key]);
		},
		rowClassName(row,index){
			return (index=== this.currendIndex) ? "editable-row" : '';
		},
		onCellClick(row, column, data, event){
			this.cell = column.key;
			
		},
		onRowDblclick(row, index){
			this.currendIndex = index;
		},
		onDragDrop(a,b){
      this.list.splice(b,1,...this.list.splice(a, 1 , this.list[b]));
		},
		onColumnResize(){

		},
		onVisibleChange(e) {
			if(e == false) {
				let data;
				if(this.dirty == true) {
					data = {id: this.data.id, columns: []};
					this.list.forEach((el, index) => {
						data.columns.push({
							key: el.key, 
							title: el.title, 
							width: el.width,
							visible: typeof el.visible == "boolean" ? el.visible : undefined
						})
					});
					if(this.data.id != "unknown")
						window.localStorage["JSON-Cols-" + this.data.id] = JSON.stringify(data.columns);
				}
				this.$emit("onClose", data);
				this.dirty = false;
				let div = document.querySelector(".columnlist .ivu-modal-body");
				div.scrollTop = 0;
				this.list = [];
			} else {
				let h = document.body.clientHeight;
				let div = document.querySelector(".columnlist .ivu-modal-body");
				div.style.maxHeight = (h - 200) + 'px';
				div = document.querySelector(".columnlist .ivu-modal");
				setTimeout(() => {
					let top = (document.body.clientHeight - div.clientHeight) / 2;
					div.style.top = top + "px";
				}, 300);
			}
		},
		checkMove: function(e) {
			// window.console.log("Future index: " + e.draggedContext.futureIndex);
			this.dirty = true;
		},
		onChangeTitle(e, index){
			this.list[index].title = e.target.value;
			this.dirty = true;
		},
		onChangeWidth(e, index){
			this.list[index].width = e.target.value;
			this.dirty = true;
		},
		onClickIcon(row, index) {
			let visible = typeof row.visible == "boolean" 
				? !row.visible : false;
			this.$set(this.list, index, Object.assign(row, {visible}));
			this.dirty = true;
		}
	},
	watch: {
		modal(value) {
			this.visible = value;
			this.currendIndex = -1;
		},
		data(value){
			this.list = [];

			let columns = [], start = 1;
			if(this.data.id != "unknown") {
				let s = window.localStorage["JSON-Cols-" + this.data.id];
				if(typeof s == "string" && s.length > 0){
					start = 0;
					columns = JSON.parse(s);
				}
			}
			
			if(columns.length == 0)
				columns = value.columns;

			for(let i = start; i < columns.length; i++){
				this.list.push({
					key: columns[i].key, 
					title: columns[i].title, 
					width: columns[i].width,
					visible: columns[i].visible
				})
			}
		},
	},
	computed: {
  },
});
