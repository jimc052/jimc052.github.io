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
			this.$refs["bmi"].style.color = null;
      this.calculate();
			return false;
    },
    calculate() {
			let _w = this.fillWeight();
      if(this.isValidNumber(_w)) {
				let value = this.$calculateBMI(parseFloat(_w), parseInt(this.height, 10));
        this.$refs["bmi"].innerHTML = value;

				this.$refs["bmi"].style.color = value >= '18.00' && value <= '24.00' ? 'blue' : 'red';
        this.isOK = true;
      } else {
      	this.isOK = false;
			}
    },
		ok(){
			if(this.isOK) {
				this.$emit("onSave", {weight: this.fillWeight(), bmi: this.$refs["bmi"].innerHTML});
			} else {
				alert("請輸入正確數字")
			}
		},
		fillWeight() {
			let _w = this.weight;
			let index = _w.indexOf(".");
			let len = _w.length;
			if(index == len - 1) {
				_w = _w.substr(0, len - 1)
			} else if(index > 0 && len > index + 1) {
				_w = _w.substr(0, index + 2);
			}
			// console.log(`index: ${index}, length: ${len}, value: ${_w}`)
			return _w;
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
						input.maxlength = 4;
          }
        }, 100);
      }
		},
	},
});