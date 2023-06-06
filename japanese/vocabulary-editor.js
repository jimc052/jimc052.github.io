Vue.component('editor', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
		id="editor"  :fullscreen="true" :closable="false" style="overflow: hidden;" @on-ok="save"
	>
		
		<div slot="footer" style="display: flex; padding: 0px;">
			<div style="flex: 1;" />
			<Button type="default" size="large"  @click="cancel" style="width: 100px;">取消</Button>
			<Button type="primary" size="large"  @click="save" style="width: 100px;">確定</Button>
		</div>
	</modal>`,
	props: {
		word: {
			type: Object,
			require: true, 
			default: null
		},
	},
	data() {
		return {
			visible: false,
			source: ""
		};
	},
	created(){
		// this.visible = this.modal;
	},
	mounted () {
	},
	destroyed() {
  },
	methods: {
    cancel() {
			this.$emit("onClose");
		},
    save() {
      
    }
	},
	watch: {
		word(value) {
			this.visible = value == null ? false : true;

		}
	},
});