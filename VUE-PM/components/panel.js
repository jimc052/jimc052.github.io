Vue.component('panel', {
	template: `<div v-if="datas.length > 0" style="display: flex; flex-direction: column; padding: 0px; border: 1px #e6e6e6 solid; padding: 5px; border-radius: 10px;" >
			<span style="font-size: 16px; padding: 0 10px;" :data-type="type">{{title}}</span>
			<div style="overflow-y: auto; width: 300px;">
				<List border size="large" style="background-color: white;">
					<ListItem v-for="(item, index) in datas" :key="item.PK" 
						:data-title="title" :data-pk="item.PK" :id="'li_' + serial + '_' + index"
						style="display: block; width: 100%; cursor: pointer;" @click.native="onClick(item, index)" 
						:draggable="type == 'STATUS'" 
						@dragstart.native="dragstart" @dragend.native="dragend" @dragover.native="dragover"
						@dragenter.native="dragenter" @dragleave.native="dragleave"
						@drop.native="drop"
						>
						<div>
						<div v-if="type == 'STATUS'" >
							<div  style="display: flex; flex-direction: row; padding: 0px;">
								<div style="flex: 1; font-size: 14px;">{{item.PRJ_NAME}}</div>
								<div>{{item.RD}}</div>
							</div>
						</div>
						<div v-else-if="type == 'PRJ_NAME'" >
							<div  style="display: flex; flex-direction: row; padding: 0px;">
								<div style="flex: 1; font-size: 14px;">{{item.RD}}</div>
								<div>{{item.STATUS}}</div>
							</div>
						</div>
						<div v-else >
							<div  style="display: flex; flex-direction: row; padding: 0px;">
								<div style="flex: 1; font-size: 14px;">{{item.PRJ_NAME}}</div>
								<div>{{item.STATUS}}</div>
							</div>
						</div>
						<div>{{item.TITLE}}</div>
						<div style="text-align: right">{{toDate(item.PK)}}</div>
						</div>
					</ListItem>
				</List>
			</div>
		</div>`, //ivu-list-items ivu-list-item
	props: {
		type: String,
		title: String,
		serial: Number,
		datas: {
			type: Array,
			default: [],
			require: true
		},
	},
	data() {
		return {
		};
	},
	created(){
	},
	async mounted () {
	},
	destroyed() {
  },
	methods: {
		onClick(item, index){
			this.$emit("onClick", {item, index, type: this.type});
		},
		dragstart(e) {
			e.dataTransfer.setData('text/plain', e.target.id);
			e.target.classList.add("drag");
			this.dragObject = e.target;
		},
		dragend(e) {
			e.preventDefault();
			e.target.classList.remove("drag");
			delete this.dragObject;
			let arr = document.querySelectorAll(".dragenter");
			arr.forEach(item=>{
				item.classList.remove("dragenter");
			})
		},
		dragover(e) {
			e.preventDefault();
			// if(e.target.tagName == "LI") {
			// 	console.log("dragover")
			// }
			return false;
		},
		dragenter(e) {
			e.preventDefault();
			if(typeof this.dragObject == "undefined"){
				let el = e.target;
				while(el.tagName != "LI") {
					el = el.parentElement;
					if(el == null) return;
				}
				el.classList.add("dragenter");
			}
			return false;
		},
		dragleave(e) {
			e.preventDefault();
			if(typeof this.dragObject == "undefined"){
				let el = e.target;
				if(el.tagName == "LI") {
					el.classList.remove("dragenter");
				}
			}
			return false;
		},
		drop(e) {
			e.preventDefault();
			let el = e.target, i = 0;
			while(el.tagName != "LI" && i < 20) {
				el = el.parentElement;
				if(el == null) return;
				i++; // 預防用
			}
			let source = document.getElementById(e.dataTransfer.getData('text/plain'));
			this.$emit("onDrop", source, el)
		},
		toDate(value) {
			return (new Date(value)).toString("yyyy/mm/dd hh:MM");
		}
	},
	computed: {
	},
	watch:{
		title(value) {
			// console.log(value)
		},
		datas(value) {
			// console.log(value)
		}
	}

});