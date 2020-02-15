Vue.component('datePick', {
	template:  `<modal title="定時" v-model="visible" :width="310">
		<DatePicker type="date" placeholder="Select date" style="width: 200px"
		:options="options" size="large" :value="value" ref="dateP"
		@on-change="onChangeDate"
		></DatePicker>

		<TimePicker format="HH:mm" placeholder="Select time" style="width: 112px; margin-top: 20px;"
			size="large" :value="value" @on-change="onChangeTime"
		>
		
		</TimePicker>
		<div slot="footer">
			<i-button  size="large" @click="visible = false">取消</i-button>
			<i-button type="primary" size="large" @click="onOK">確定</i-button>
		</div>
	</modal>`,
	props: {
		date: {
			type: String,
			require: true
		}
	},
	data() {
		return {
			visible: false,
			options: {
				disabledDate (date) {
					let b = date && date.toString("yyyy-mm-dd") < (new Date()).toString("yyyy-mm-dd")
					// console.log(date.toString("yyyy-mm-dd") + ": " + b)
					return b;
				}
			},
			value: new Date(),
			d: "",
			t: ""
		};
	},
	created(){
	},
	mounted () {
		// console.log(holiday)
	},
	destroyed() {
  },
	methods: {
		onOK(){
			console.log(this.date)
			if(this.d.length > 0 || this.t.length > 0) {
				if(this.d.length == 0) 
					this.d = this.date.substr(0, 10)
				if(this.t.length == 0) 
					this.t = this.date.substr(11)
				
				if(this.d.length > 0 && typeof holiday[this.d] == "string") {
					alert(holiday[this.d])
						return;
				}
	

				let d1 = (new Date(this.d + "T" + this.t));
				if((d1.getDay() == 0 || d1.getDay() == 6) && workday.indexOf(this.d) == -1) {
					alert("星期假日")
					return;
				}

				if((new Date()).getTime() > d1.getTime()) {
					alert("不能用過去的時間")
					return;
				} else {
					this.$emit("onChangeAlarm", this.d + "T" + this.t);
				}
				// this.$emit("onChangeAlarm", s);
			}
			this.visible = false;
		},
		onChangeDate(d){
			this.d = d;
		},
		onChangeTime(t){
			this.t = t;
		}
	},
	watch: {
		date(value) {
			this.value = new Date(this.date)
		}
	}
});
