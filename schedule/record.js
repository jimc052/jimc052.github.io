Vue.component('record', {
	template:  `<div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
		<div v-for="item in rows">
			{{item[0] + "：" + item[1]}}
		</div>
		<div v-if="date == alarm.substr(0, 10)" 
			style="cursor: pointer; display: flex; flex-direction: row; align-items: center; color: red;"
			@click.stop="onClickIcon()">
			<Icon type="ios-alarm" size="20" 
				style="margin-right: 5px; color: red;"/>
			{{alarm.substr(11)}}
		</div>
		<span class="preload" v-for="item in preloads">
			{{item[0] + "：" + item[1]}}
		</span>
	</div>`,
	props: {
		datas: {
			type: Object,
			require: true
		},
		date: {
			type: String,
			require: true
		},
		alarm: {
			type: String,
			require: false, 
			default: ''
		},
		preload: {
			type: Object,
			require: false
		},
	},
	data() {
		return {
			rows: [],
			preloads: []
		};
	},
	created(){	
	},
	async mounted () {
		this.retrieve()
		// console.log(this.date) // 2021-12-01
		// if(typeof this.preload == "object") console.log(this.preload)
		// if(this.date == this.alarm.substr(0, 10)) console.log("alarm: " + this.alarm) // 2021-12-09T08:50
		// console.log(this.datas)
	},
	destroyed() {
  },
	methods: {
		onClickIcon(){
			this.$emit('onAlarmSet');
		},
		retrieve() {
			this.rows = [];
			if(this.datas != null && typeof this.datas[this.date.substr(8)] == "object") {
				let json = this.datas[this.date.substr(8)];
				for(let key in json){
					this.rows.push([key, json[key]])
				}	
			};
			this.preloads = [];
			if(typeof this.preload == "object" && this.rows.length == 0) {
				let alarm = this.date == this.alarm.substr(0, 10) 
					? this.alarm.substr(this.alarm.length - 5) 
					: undefined;
				for(let key in this.preload){
					if(typeof alarm == "string" && this.preload[key] <= alarm)
						continue;
					this.preloads.push([key, this.preload[key]])
				}	
			}
		}
	},
	watch: {
		datas(value) {
			this.retrieve()
		},
		preload(value) {

		},
		alarm(value) {
			this.retrieve()
		}
	}
});
/*
<div v-else-if="day.workday == 3 && typeof preload[day.date] == 'object'" style="height: 100%;  display: flex; flex-direction: column;">
						<div style="text-align: center;">{{day.day}}</div>
						<div v-if="typeof preload[day.date]['上班']== 'string'" style="font-size: 12px; color: purple;">
							{{'上班：' + preload[day.date]['上班']}}
						</div>
						<div v-if="typeof preload[day.date]['下班']== 'string'" style="font-size: 12px; color: purple;">
							{{'下班：' + preload[day.date]['下班']}}
						</div>
					</div>
*/
