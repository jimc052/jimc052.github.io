Vue.component('blood-editor', {
	template:  `<modal title="血壓" v-model="visible" :width="450"
		@on-visible-change="onVisibleChange"	
	>
		<span>日期：</span><Input ref="inputDay" v-model="day"
			style="width: 60px; font-size: 20px; padding: 5px;" size="large" clearable 
			@on-enter="onEnter"/>
		<div>
			<span>早上：</span><Input ref="inputTime1" v-model="time1"
				style="width: 100px; font-size: 20px; padding: 5px;" size="large" clearable 
				@on-enter="onEnter"/>
			<Input ref="inputData1" v-model="data1"
				style="width: 140px; font-size: 20px; padding: 5px;" size="large" clearable 
				@on-enter="onEnter"/>
		</div>

		<div>
			<span>晚上：</span><Input ref="inputTime2" v-model="time2"
				style="width: 100px; font-size: 20px; padding: 5px;" size="large" clearable 
				@on-enter="onEnter"/>

				<Input ref="inputData2" v-model="data2"
				style="width: 140px; font-size: 20px; padding: 5px;" size="large" clearable 
				@on-enter="onEnter"/>
		</div>

		<div slot="footer">
			<i-button  size="large" @click="$emit('onChange', undefined)">取消</i-button>
			<i-button type="primary" size="large" @click="onOK">確定</i-button>
		</div>
	</modal>`,
	props: {
		recorder: {
			type: Object,
			// require: true
		}
	},
	data() {
		return {
			visible: false,
			day: "",
			time1: "",
			time2: "",
			data1: "",
			data2: "",
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
		onEnter(){

		},
		onVisibleChange(v){
			if(v == false) {
				this.$emit("onChange", undefined);
			}
		},
		onOK(){
			let msg = "";
			if(this.day.length == 0) {
				msg = "請輸入日期";
			} else if(this.day.length == 1) {
				this.day = "0" + this.day;
			}
			if(msg.length == 0 && this.time1.length > 0) {
				let arr = this.time1.split(":");
				if(arr.length != 2) 
					msg = "請在早上輸入冒號";
				else if(arr[0].length > 2 || arr[1].length > 2)
					msg = "請在早上輸入 2 位數字";

				if(msg.length == 0) {
					if(arr[0].length == 1) arr[0] = "0" + arr[0];
					if(arr[1].length == 1) arr[1] = "0" + arr[1];
					this.time1 = arr[0] + ":" + arr[1];
				}
			}
			if(msg.length == 0 && this.time1.length > 0) {
				let arr = this.data1.split("/");
				if(arr.length != 3) 
					msg = "請在早上輸入正確 '收縮/舒張/脈搏' ";

			}

			if(msg.length == 0 && this.time2.length > 0) {
				let arr = this.time2.split(":");
				if(arr.length != 2) 
					msg = "請在晚上輸入冒號";
				else if(arr[0].length > 2 || arr[1].length > 2)
					msg = "請在晚上輸入 2 位數字";
				if(msg.length == 0) {
					if(arr[0].length == 1) arr[0] = "0" + arr[0];
					if(arr[1].length == 1) arr[1] = "0" + arr[1];
					this.time2 = arr[0] + ":" + arr[1];
				}
			}
			if(msg.length == 0 && this.time2.length > 0) {
				let arr = this.data2.split("/");
				if(arr.length != 3) 
					msg = "請在晚上輸入正確 '收縮/舒張/脈搏' ";
			} 

			if(msg.length == 0 && this.time1.length == 0 && this.time2.length == 0){
				msg = "請輸入資料";
			} else if(msg.length == 0) {
				let myData = {key: this.day, 
					data: {},
					week: this.recorder == null ? "" : this.recorder.week
				};
				if(this.time1.length > 0) {
					myData.data[this.time1] = this.data1;
				}
				if(this.time2.length > 0) {
					myData.data[this.time2] = this.data2;
				}
				this.$emit("onChange", myData);
				/*
				{
					"01":{"06:15":"123/84/86","20:47":"130/85/82"},
					"02":{"05:49":"116/77/76","21:05":"126/82/78"},
					"03":{"05:58":"117/77/71"}
				}
				*/
			} else {
				alert(msg)
			}
		},
	},
	watch: {
		recorder(value) {
			this.visible = typeof this.recorder == "undefined" ? false : true;
			if(typeof this.recorder != "undefined") {
				this.day = ""; this.time1 = ""; this.time2 = ""; this.data1 = ""; this.data2 = "";
				
				if(this.recorder == null) {
					let date = new Date();
					this.day = date.toString("dd");
				} else {
					this.day = this.recorder.key;
					for(let key in this.recorder.data){
						if(key < "12:00") {
							this.time1 = key;
							this.data1 = this.recorder.data[key]
						} else {
							this.time2 = key;
							this.data2 = this.recorder.data[key]
						}
					}
				}
			}
		}
	}
});