Vue.component('height', { 
	template:  `<modal v-model="visible" 
    title="身高"
    class-name="vertical-center-modal" 
		id="height" :closable="false" style="overflow: hidden;" @on-ok="ok"
	>
		<div style="height: 300px; display: flex; flex-direction: row; align-items: center;  justify-content: center;">
      <div style="flex: 1;"></div>  
      <Input ref="input" v-model="height" placeholder="請輸入身高" 
        element-id="input" @on-change="onKeyChange"
		  	style="flex: 1; font-size: 20px; padding: 5px;" size="large" clearable />
      <div style="flex: 1;">公分</div>
    </div>
		<div slot="footer" style="display: flex; padding: 0px;">
			<div style="flex: 1;" />
			<Button type="default" size="large"  @click="cancel" style="width: 100px;">取消</Button>
			<Button v-if="dirty" type="primary" size="large"  @click="ok" style="width: 100px;">確定</Button>
		</div>
	</modal>`,
	props: {
		visible: {
			type: Boolean,
			require: true, 
			default: false 
		},
	},
	data() {
		return {
      dirty: false,
      height: "0"
		};
	},
	created(){
	},
	mounted () {
	},
	destroyed() {
  },
	methods: {
    onKeyChange(e) {
      console.log(e)
    },
		ok(){
			this.$emit("onSave", this.height);
		},
		cancel() {
			this.$emit("onClose");
		},

	},
	watch: {
		visible(value) {
      console.log(value)
      if(value == true) {
        setTimeout(() => {
          this.$refs["input"].focus();
        }, 300);        
      }
		}
	},
});