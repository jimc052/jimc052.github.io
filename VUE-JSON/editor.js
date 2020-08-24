Vue.component('editor', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
		id="editor"  :fullscreen="true" :closable="false" style="overflow: hidden;" @on-ok="ok"
	>
		<textarea v-model="source" ref="textarea"
			id="editorTxt"
			style="width: 100%; height: 100%; font-size: 18px; padding: 5px;"
		></textarea>
		<div slot="footer" style="display: flex;">
			<div style="flex: 1;" />
			<Button type="default" size="small"  @click="cancel" style="width: 100px;">取消</Button>
			<Button type="warning" size="large"  @click="clear" style="width: 100px;">清除</Button>
			<Button type="primary" size="large"  @click="ok" style="width: 100px;">確定</Button>
		</div>
	</modal>`,
	props: {
		modal: {
			type: Boolean,
			require: true, 
			default: false 
		},
		// source: {
		// 	type: String,
		// 	require: true, 
		// 	default: false 
		// }
	},
	data() {
		return {
			visible: false,
			source: ""
		};
	},
	created(){
		this.visible = this.modal;
	},
	mounted () {
		drop(this.$refs["textarea"], (type, result)=>{
			if(typeof result == "object") {
				this.source = vm.txt;
			}
		});
		// let el = document.querySelector("#editorTxt");
		this.$refs["textarea"].select();
	},
	destroyed() {
  },
	methods: {
		ok(){
			this.$emit("onClose", this.source);
		},
		cancel() {
			this.$emit("onClose");
		},
		clear(){
			this.source = "";
		}
	},
	watch: {
		modal(value) {
			this.visible = value;
			if(value == true && typeof vm.txt == "string") {
				this.source = vm.txt;
			}
		}
	},
});