Vue.component('dlg-height', { 
	template:  `<modal v-model="visible"
    title="身高"
    class-name="vertical-center-modal" 
		id="height" :closable="false" style="overflow: hidden;" @on-ok="ok"
	>
		<div style="height: 80px; display: flex; flex-direction: row; align-items: center;  justify-content: center;">
      <div style="flex: 1;"></div>  
      <Input ref="input1" v-model="h" placeholder="請輸入身高" 
        element-id="input1" @on-change="onKeyChange"
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
		height: {
			type: String,
			require: true, 
			default: "" 
		},
	},
	data() {
		return {
      dirty: false,
			h: ""
		};
	},
	created(){
	},
	mounted () {
		let input1 = document.querySelector("#input1");
		input1.addEventListener("keydown", this.keydown);
	},
	destroyed() {
		let input1 = document.querySelector("#input1");
		input1.removeEventListener("keydown", this.keydown);
  },
	methods: {
		keydown(e) {
			if(e.keyCode == 13 && this.dirty == true) {
				this.ok();
			}
		},
    onKeyChange(e) {
			this.dirty = this.h.length > 0 ? true : false;
    },
		ok(){
			// console.log(`height: ${this.h}, min: ${this.h > "100"}, max: ${this.h < "200"}`)
			if(this.isValidNumber(this.h) && parseInt(this.h, 10) > 100 && parseInt(this.h, 10) < 200) {
				this.$emit("onSave", this.h);
			} else {
				alert("請輸入正確數字")
			}
		},
		cancel() {
			this.$emit("onClose");
		},
		isValidNumber(str) {
			const regex = /^-?\d+(\.\d+)?$/;
			return regex.test(str);
		}
	},
	watch: {
		visible(value) {
      if(value == true) {
        setTimeout(() => {
          this.$refs["input1"].focus();
        }, 300);        
      }
		},
		height(value) {
			this.h = value;
		}
	},
});