Vue.component('dlg-weight', { 
	template:  `<modal v-model="visible"
    title="體重"
    class-name="vertical-center-modal" 
		id="weight" :closable="false" style="overflow: hidden;" @on-ok="ok"
	>
    <div style="height: 80px; display: flex; flex-direction: column; align-items: center;  justify-content: center;">
      <div style="display: flex; flex-direction: row; align-items: center;  justify-content: center;">
        <div style="flex: 1;">身高：{{height}}公分</div>
      </div>
      <div style="display: flex; flex-direction: row; align-items: center;  justify-content: center; width: 100%;">
        <div style="flex: 1;"></div>
        <Input ref="input2" v-model="weight" placeholder="請輸入體重" 
          element-id="input2" @on-change="onKeyChange"
          style="width: 110px; font-size: 20px; padding: 5px;" size="large" clearable />
        <div style="flex: 1;">公斤</div>
      </div>
     <div style="flex: 1;">BMI：<span ref="bmi"></span></div>
    </div>
		<div slot="footer" style="display: flex; padding: 0px;">
			<div style="flex: 1;" />
			<Button type="default" size="large"  @click="cancel" style="width: 100px;">取消</Button>
      <Button v-if="isOK" type="success" size="large"  @click="ok" style="width: 100px;">確定</Button>
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
      isOK: false,
			weight: ""
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
      this.$refs["bmi"].innerHTML = "";
      this.calculate();
    },
    calculate() {
      if(this.isValidNumber(this.weight)) {
        this.$refs["bmi"].innerHTML = this.$calculateBMI(parseFloat(this.weight), parseInt(this.height, 10));
        this.isOK = true;
      } else 
      this.isOK = false;
    },
		ok(){
			if(this.isOK) {
				this.$emit("onSave", {weight: this.weight, bmi: this.$refs["bmi"].innerHTML});
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
          this.$refs["input2"].focus();
        }, 300);
        
        let idTime = setInterval(() => {
          let input = document.querySelector("#input2");
          if(input != null) {
            clearInterval(idTime);
            input.style.width = "100px";
          }
        }, 100);
      }
		},
	},
});