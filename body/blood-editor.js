Vue.component('blood-editor', {
	template:  `<modal title="血壓" v-model="visible"
		@on-visible-change="onVisibleChange"	
	>
		<span>日期：</span><Input ref="inputDay" v-model="day"
			style="width: 60px; font-size: 20px; padding: 5px;" size="large" clearable 
			/>
		<div>
			<span>早上：</span>
				<Input ref="inputTime1" v-model="time1"
					style="width: 100px; font-size: 20px; padding: 5px;" size="large" clearable 
					/>
				<Input ref="inputData1" v-model="data1" element-id="blood1"
					style="width: 140px; font-size: 20px; padding: 5px;" size="large" clearable 
					@on-change="onKeyChange" />
		</div>

		<div>
			<span>晚上：</span>
				<Input ref="inputTime2" v-model="time2"
				style="width: 100px; font-size: 20px; padding: 5px;" size="large" clearable 
				/>

				<Input ref="inputData2" v-model="data2" element-id="blood2"
				style="width: 140px; font-size: 20px; padding: 5px;" size="large" clearable 
				@on-change="onKeyChange"/>
		</div>

		<div slot="footer">
			<i-button  size="large" @click="$emit('onChange', undefined)">取消</i-button>
			<i-button type="primary" size="large" @click="onOK" v-if="dirty == true">確定</i-button>
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
			dirty: false
		};
	},
	created(){
	},
	mounted () {
		// console.log(holiday)
		let blood1 = document.querySelector("#blood1");
		let blood2 = document.querySelector("#blood2");
		blood1.addEventListener("keydown", this.keydown);
		blood2.addEventListener("keydown", this.keydown);
	},
	destroyed() {
		blood1.removeEventListener("keydown", this.keydown);
		blood2.removeEventListener("keydown", this.keydown);
  },
	methods: {
		keydown(e) {
			if(e.keyCode == 13 && this.dirty == true) {
				this.onOK();
			} else {
				// if (e.key == "/" || (e.keyCode >= 48 && e.keyCode <= 57)) {
				// 	this.dirty = true;
				// }
			}
		},
		onKeyChange(e){
			e.returnValue = false;
			let s = e.target.id == "blood1" ? "data1" : "data2";
			if(this[s].length == 3 || this[s].length == 6) this[s] += "/";
			this.dirty = true;
		},
		onVisibleChange(v){
			if(v == false) {
				this.$emit("onChange", undefined);
				this.dirty = false;
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
				else {
					const regex = /^(\d+\/)+\d+$/;
					if (! regex.test(this.data1)) {
						msg = "請在早上輸入正確 '收縮/舒張/脈搏' ";
					}
				}
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
				else {
					const regex = /^(\d+\/)+\d+$/;
					if (! regex.test(this.data2)) {
						msg = "請在晚上輸入正確 '收縮/舒張/脈搏' ";
					}
				}
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
			} else {
				alert(msg)
			}
		},
	},
	watch: {
		recorder(value) {
			this.dirty = false;
			let date = new Date();
			this.visible = typeof this.recorder == "undefined" ? false : true;
			if(typeof this.recorder != "undefined") {
				this.day = ""; this.time1 = ""; this.time2 = ""; this.data1 = ""; this.data2 = "";
				if(this.recorder == null) {
					this.day = date.toString("dd");
					this.time1 = date.toString("hh:MM");
					setTimeout(() => {
						document.querySelector("#blood1").focus();
					}, 600);
				} else {
					this.day = this.recorder.key;
					for(let key in this.recorder.data){
						if(key < "12:00") {
							this.time1 = key;
							this.data1 = this.recorder.data[key];
						} else {
							this.time2 = key;
							this.data2 = this.recorder.data[key];
						}
					}
					let time2 = date.toString("hh:MM");
					if(this.time2.length == 0 && time2 >= "19:00") {
						this.time2 = time2;
						setTimeout(() => {
							document.querySelector("#blood2").focus();
						}, 600);
						
					}
				}
			}
		}
	}
});