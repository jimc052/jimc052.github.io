Vue.component('setting', {
	template:  `<modal title="設定" v-model="visible" :width="310"
			@on-visible-change="onVisibleChange"
		>
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
			t: ""
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
				this.periodInMinutes = parseInt(this.$storage("periodInMinutes"), 10);
			}
		},
		onOK(){
			if(this.t.length > 0) this.$storage("morning", this.t)
			if(this.periodInMinutes != parseInt(this.$storage("periodInMinutes"), 10)) {
				this.$storage("periodInMinutes", this.periodInMinutes);
				this.$emit("onChangeSetting", this.periodInMinutes);
			}
			this.visible = false;
		},
		onChangeTime(t){
			this.t = t;
		}
	},
	watch: {
		
	}
});
