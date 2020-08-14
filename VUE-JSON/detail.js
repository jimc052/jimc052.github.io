Vue.component('detail', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal"
		title="明細資料"
		id="detail"  :fullscreen="false" :closable="true" style="overflow: hidden;"
		@on-visible-change="onVisibleChange"
	>
		<div v-for="(item, index) in row2" :key="index" style="display: flex; flex-direction: row;"
		>
			<div>{{item.title + "："}}</div>
			<div>{{item.value}}</div>
		</div>
		<div slot="footer" style="display: flex;">
			<div style="flex: 1;" />
			<Button type="primary" size="large"  @click="visible = false" style="width: 100px;">確定</Button>
		</div>
	</modal>`,
	props: {
		modal: {
			type: Boolean,
			require: true, 
			default: false 
		},
		row: {
			type: Object,
			require: true, 
			default: {} 
		},
	},
	data() {
		return {
			visible: false,
			source: "",
			row2: []
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
				this.$emit("onClose");
				let div = document.querySelector("#detail .ivu-modal-body");
				div.scrollTop = 0;
			} else {
				// detail
				let h = document.body.clientHeight;
				let div = document.querySelector("#detail .ivu-modal-body");
				div.style.maxHeight = (h - 200) + 'px';

				div = document.querySelector("#detail .ivu-modal");
				setTimeout(() => {
					let top = (document.body.clientHeight - div.clientHeight) / 2;
					div.style.top = top + "px";
				}, 300);
				
			}
		}
	},
	watch: {
		modal(value) {
			this.visible = value;
		},
		row(value){
			this.row2 = [];
			let div = document.querySelector("#detail .ivu-modal-body");
			div.scrollTop = 0;
			for(let key in this.row) {
				this.row2.push({title: key, value: this.row[key]})
			}
		}
	},
});