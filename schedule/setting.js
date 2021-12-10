Vue.component('setting', {
	template:  `<modal title="設定" v-model="visible" :width="460"
			@on-visible-change="onVisibleChange"
		>
		<div style="display: flex; flex-direction: row; align-items: center;">
			<fieldset style="padding: 10px; heigh: 100%;">
				<legend>設定</legend>
				<div style="display: flex; flex-direction: row; align-items: center;">
					<div style="">上班時間：</div>
					<TimePicker format="HH:mm" placeholder="上班時間" style="width: 100px;"
						size="large" :value="date" @on-change="onChangeTime"
						:disabled-hours="[0,1,2,3,4,5,6,10,11,12,13,14,15,16,17,18,19,20,21,22,23]"
					/>
				</div>
				<div style="margin-top: 20px; display: flex; flex-direction: row; align-items: center;">
					<div style="">鬧鈴間隔：</div>
					<InputNumber :min="1"  :max="10" v-model="periodInMinutes"  style="width: 100px;" />
				</div>			
			</fieldset>
			<fieldset  style="padding: 10px; heigh: 100%; margin-left: 5px;">
				<legend>預設</legend>
				<Input v-model="date1" size="large" placeholder="yyyy-mm-dd" />

				<div style="margin-top: 10px; display: flex; flex-direction: row; align-items: center;">
					<div style="">上班時間：</div>
					<TimePicker format="HH:mm" placeholder="上班時間" style="width: 100px;"
						size="large" :value="date2"
						:disabled-hours="[0,1,2,3,4,5,6]"
						@on-change="onChangeTime2"
					/>
				</div>
				<div style="margin-top: 10px; display: flex; flex-direction: row; align-items: center;">
					<div style="">下班時間：</div>
					<TimePicker format="HH:mm" placeholder="下班時間" style="width: 100px;"
						size="large" value="date3" 
						:disabled-hours="[0,1,2,3,4,5,6,7,8,9]"
						@on-change="onChangeTime3"
					/>
				</div>
			</fieldset>	
		</div>


		<div slot="footer">
			<i-button  size="large" @click="visible = false">取消</i-button>
			<i-button type="primary" size="large" @click="onOK">確定</i-button>
		</div>
	</modal>`,
	props: {
	},
	data() {
		return {
			visible: false,
			date: new Date(),
			periodInMinutes: 3,
			t: "",
			date: "",
			date1: "",
			date2: "",
			date3: "",
			t2: "",
			t3: ""
		};
	},
	created(){
	},
	mounted () {
		// console.log(holiday)
		// this.value = new Date(this.date)
	},
	destroyed() {
  },
	methods: {
		onVisibleChange(v){
			if(v == true) {
				this.date = new Date("2020-02-16T" + this.$storage("morning"));
				// this.date2 = this.date;
				this.periodInMinutes = parseInt(this.$storage("periodInMinutes"), 10);
			}
		},
		onOK(){
			let b = false;
			if(this.date1.length == 10 && this.date1.split("-").length == 3 && this.date1 >= (new Date()).toString("yyyy-mm-dd")) {
				let preload = {};
				let s = window.localStorage["schedule=proload"];
				if(typeof s == "string" && s.length > 0) {
					preload = JSON.parse(s);
				}
				if(typeof preload[this.date1] == "undefined") preload[this.date1] = {};
				if(this.t2.length > 0) {
					preload[this.date1]["上班"] = this.t2;
					b = true;
				}
				if(this.t3.length > 0) {
					preload[this.date1]["下班"] = this.t3;
					b = true;
				}
				if(b == true) {
					window.localStorage["schedule=proload"] = JSON.stringify(preload);
					this.$emit("onChangePreload", preload);
				}
			}
			if(this.t.length > 0) this.$storage("morning", this.t)
			if(this.periodInMinutes != parseInt(this.$storage("periodInMinutes"), 10)) {
				this.$storage("periodInMinutes", this.periodInMinutes);
				this.$emit("onChangeSetting", this.periodInMinutes);
			}
			this.visible = false;
		},
		onChangeTime(t){
			this.t = t;
		},
		onChangeTime2(e) {
			this.t2 = e;
		},
		onChangeTime3(e) {
			this.t3 = e;
		}
	},
	watch: {
		
	}
});
