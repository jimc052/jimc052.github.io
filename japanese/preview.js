Vue.component('preview', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
		id="preview" :fullscreen="true" :closable="false" style="overflow: hidden;"
	>

		<div slot="footer" style="display: flex; padding: 0px;">
			<div style="flex: 1;" />
			<Button type="default" size="large"  @click="cancel" style="width: 100px;">取消</Button>
			<Button  type="primary" size="large"  @click="print" style="width: 100px; margin-left: 10px;">列印</Button>
		</div>
	</modal>`,
	props: {
		datastore: {
			type: Array,
			require: true, 
			default: undefined
		},
	},
	data() {
		return {
			visible: false,

		};
	},
	created(){
	},
	mounted () {
	},
	destroyed() {
  },
	methods: {
    cancel() {
			this.$emit("onClose");
		},
    print() {
      // this.$emit("onClose", this.target);
    },
    render() {
      let div = document.querySelector("#preview .ivu-modal-body");
      div.style.overflow = "auto"
      console.log(div)
      if(this.visible == true){

      } else {

      }

    }
	},
	watch: {
		datastore(value) {
			this.visible = value == null || typeof value == "undefined" ? false : true;
      this.render();
		}
	},
});