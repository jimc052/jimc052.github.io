Vue.component('column-list', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal columnlist" title="欄位資料"
		 :fullscreen="false" :closable="true" 
		@on-visible-change="onVisibleChange"
		style="overflow: hidden;"
	>
		<draggable :list="list" :disabled="!enabled" class="list-group" ghost-class="ghost"
			:move="checkMove" @start="onStart" @end="dragging = false"
		>
			<div class="list-group-item" v-for="(el, index) in list" :key="el.key">
				<div style="width: 20px; text-align: right; color: #515a6e; font-size: 12px;">{{ index  + 1 }}</div>
				<div style="width: 120px;">{{ el.key }}</div>
				<Input :value="el.title" @on-change="onChangeTitle($event, index)" style="flex: 1;"  />
				<Input :value="el.width"  @on-change="onChangeWidth($event, index)"
					style="width: 60px; text-align: right" type="number" />
				<Icon type="md-checkmark" size="20" @click.native="onClickIcon(index)" 
					:style="{
						padding: '2px',
						margin: '0 5px',
						borderRadius: '5px',
						border: '1px solid ' + (typeof el.visible == 'undefined' || el.visible == true ? '#2d8cf0' : '#eee'),
						color: typeof el.visible == 'undefined' || el.visible == true ? '#2d8cf0' : '#eee', cursor: 'pointer'
					}"/>
			</div>
		</draggable>
	</modal>`,
  components: {
    draggable: window["vuedraggable"]
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
			id: "",
			visible: false,
			enabled: true,
      list: [],
			dragging: false,
			dirty: false
		};
	},
	created(){
		this.visible = this.modal;
	},
	mounted () {
	},
	destroyed() {
  },
	methods: {
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
		onClickIcon(index) {
			let visible = typeof this.list[index].visible == "boolean" 
				? !this.list[index].visible : false;
			this.$set(this.list, index, 
				{
					key: this.list[index].key, 
					title: this.list[index].title, 
					width: this.list[index].width,
					visible
				});
			this.dirty = true;
		},
		onStart(e) {
			this.dragging = true;
		}
	},
	watch: {
		modal(value) {
			this.visible = value;
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
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },
});

// https://github.com/SortableJS/Vue.Draggable