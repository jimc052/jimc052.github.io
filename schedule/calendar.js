Vue.component('calendar', {
	template:  `<div id="calendar" style="display: flex; flex-direction: column; height: 100%;">
		<div :style="{background: '#2d8cf0', 
			'display': 'flex', 'flex-direction': 'row', 'justify-content': 'flex-start',
			'align-items': 'center', color: 'white' }"
		>
			<div style="flex: 1;"></div>
			<Icon type="ios-arrow-back" size="28" @click.native="onClickIcon(-1)" 
			style="cursor: pointer; margin-right: 10px;"/>
			<div style="font-size: 30px;">{{month.toString("yyyy-mm")}}</div>
			<Icon type="ios-arrow-forward" size="28" @click.native="onClickIcon(1)" 
			style="cursor: pointer; margin-left: 10px;" />
			<div style="flex: 1; text-align: right;">
				<Icon type="md-more" size="28" @click.native="onClickIconMore" 
				style="cursor: pointer; margin-right: 10px;" />
			</div>
		</div>

		<div style="display: flex; flex-direction: row; background-color: #e5e5e5">
			<div v-for="(item, index) in weekday"  style="flex: 1; padding: 5px 0 ">
				<div :style="{'text-align': 'center', color: index >= 5 ? '#FF8C00' : ''}">
					{{'星期' + item}}
				</div>
			</div>
		</div>

		<div style="flex: 1; display: flex; flex-direction: column;">
			<div class="row" v-for="(weeks, index1) in schedule" style="flex: 1; display: flex; flex-direction: row;">
				<div class="col" v-for="(day, index2) in weeks" 
					:style="{flex: '1', height: '100%', padding: '5px', 
						backgroundColor: day.available ? (day.workday == 2 ? 'rgba(45, 140, 250, 0.2)' : 'white') : '#F8F8F8',

					}">
					<!-- 非當月 -->
					<div v-if="day.available == false" style="height: 100%; display: flex; flex-direction: column;">
						<div style="text-align: center; color: #D3D3D3;">{{day.day}}</div>
						<div v-if="typeof day.holiday == 'string'" 
							style="text-align: center; color: rgba(0,0,0, 0.3);  background-color: rgba(0, 255, 0, 0.2);">
							{{day.holiday}}
						</div>
					</div>
					<!-- 國定假日 -->
					<div v-else-if="typeof day.holiday == 'string'" style="height: 100%;">
						<div style="text-align: center;">{{day.day}}</div>
						<div style="text-align: center; background-color: green; color: white;">
							{{day.holiday}}
						</div>
					</div>
					<!-- 工作日 workday： 1 今天以前，2 今天，3 今天以後 -->
					<div v-else-if="day.workday > 0" style="height: 100%;  display: flex; flex-direction: column;">
						<div style="text-align: center;">{{day.day}}</div>
						<record :workday="day.workday" 
							:preload="preload[day.date]" 
							:datas="recorder" 
							:date="day.date" 
							:alarm="alarm" 
							@onAlarmSet="onAlarmSet"
						></record>
					</div>
					<!-- 周末，周日 -->
					<div v-else :style="{height: '100%'}">
						<div :style="{'text-align': 'center', color: '#FF8C00'}">{{day.day}}</div>
					</div>
				</div>
			</div>
		</div>
		<i-button v-if="btn.length > 0" type="primary" shape="circle" size="large"
			@click.native="onAdd" id="btnAdd" 
			style="position: absolute; bottom: 10px; right: 10px;">
			{{btn}}
		</i-button>
		
		<datePick ref="datePick" :date="alarm" @onChangeAlarm="onChangeAlarm" />
		<setting ref="setting" :date="alarm" @onChangeSetting="onChangeSetting" @onChangePreload="onChangePreload" />
	</div>`,
	props: {
	},
	data() {
		return {
			schedule: [],
			preload: {},
			recorder: null,
			weekday: ["一", "二", "三", "四", "五", "六", "日"],
			today: new Date(),
			month: new Date(),
			btn: "上",
			alarm: "",
			visible: false
		};
	},
	created(){	
		window.onmessage = function(e){
			// this.console.log(e.data)
			if(typeof e.data.from == "string" && e.data.from == "background"){
			// if(e.origin.indexOf('://localhost:') == -1 && e.origin.indexOf('://jimc052.github.io/') == -1){
				console.log(e.data)
			}
		};
	},
	async mounted () {
		// delete window.localStorage["schedule=2020-02"] 
		// delete window.localStorage["alarm"];

		window.postMessage({cmd: 'getAlarms'}, "*");
		let s = window.localStorage["schedule=proload"];
		if(typeof s == "string" && s.length > 0) {
			this.preload = JSON.parse(s);
		}
		if(this.$isDebug()){
			// this.today = new Date(2022, 4, 1, 8, 52)
			// this.preload = {
				// "2022-08-12":{"上班":"08:00","下班":"19:00"},
				// "2021-12-21":{"上班":"11:00","下班":"19:00"}, 
			// };
		}
	
		let arr = [];
		let today = this.today.toString("yyyy-mm-dd");
		for(let key in this.preload) {
			if(key < today) {
				arr.push(key)
			}
		}
		if(typeof this.preload[today] == "object") {
			let now = (new Date()).toString("hh:MM");
			for(let key in this.preload[today]) {
				if(now >= this.preload[today][key]) {
					delete this.preload[today][key];
					window.localStorage["schedule=proload"] = JSON.stringify(this.preload);
				}
			}
		}
		if(arr.length > 0) {
			arr.forEach(item =>{
				delete this.preload[item]
			})
			window.localStorage["schedule=proload"] = JSON.stringify(this.preload);
		}
		console.log(JSON.stringify(this.preload))

		this.alarm = this.$storage("alarm");
		this.retrieve();
	},
	destroyed() {
  },
	methods: {
		onClickIconMore(){
			this.$refs["setting"].visible = true;
		},
		onChangeSetting(value){
			console.log("onChangeSetting: " + value)
			this.setAlarm(this.alarm)
		},
		onChangePreload(value){
			this.preload = value;
			this.retrieve();
		},
		onAlarmSet(){
			this.$refs["datePick"].visible = true;
		},
		onChangeAlarm(d){
			console.log(d)
			this.setAlarm(d)
		},
		isToday(today){
			if(this.$isDebug()) return true;
			if(typeof today == "undefined") today = this.today;
			return today.toString("yyyy-mm-dd") == (new Date()).toString("yyyy-mm-dd");
		},
		onAdd() {
			if(this.isToday() == false) {
				alert("日期逾時，請更新網頁")
			} else {
				let url = this.$storage("schedule-url");
				// let url = 'https://bccjd.jabezpos.com/main?designer=BCC_EIP';
				// 'https://jd.jabezpos.com/?designer=BCC_EIP&database=ERPS&solution=SOLUTION1';
				// let url = 'https://bccjd.jabezpos.com/main?designer=BCC_EIP';
				if(this.$isDebug() == false){
					window.open(url, "",
						"resizable=yes,toolbar=no,status=no,location=no,menubar=no,scrollbars=yes"
					);
				}
				
				let month = this.today.toString("yyyy-mm");
				let dd = this.today.toString("dd");
				if(this.recorder == null || typeof this.recorder == "undefined") {
					this.recorder = {};
				}
				if(typeof this.recorder[dd] == "undefined") {
					this.recorder[dd] = {};
				}
			
				this.recorder[dd][this.btn] = (new Date()).toString("hh:MM");

				this.$set(this.recorder, dd, this.recorder[dd])
				// this.recorder[dd].push(obj);
				this.$storage("schedule=" + month, this.recorder);
				let d1 = this.today;
				if(this.btn == "下班") {
					let d1 = this.today.addDays(1);
					let s1 = d1.toString("yyyy-mm-dd");
					while(typeof holiday[s1] == "string") {
						d1 = this.today.addDays(1);
						s1 = d1.toString("yyyy-mm-dd");
					}
				}

				let y = d1.getFullYear(), m = d1.getMonth();
				let {schedule, recorder} = this.parseSchedule(y, m);
				if(recorder == null) recorder = {};
				let {time, btn} = this.arrangeAlarm(d1, schedule, recorder);
				if(time.length == 0) {
					if(m == 11) {
						y++; m = 0;
					} else {
						m++;
					}
					let d1 = new Date(y, m, 1)
					let {schedule, recorder} = this.parseSchedule(y, m);
					if(recorder == null) recorder = {};
					let {time} = this.arrangeAlarm(d1, schedule, recorder);
					this.setAlarm(time);
					this.btn = "";
				} else {
					this.setAlarm(time);
					this.btn = (this.btn == "上班") ? "下班" : "";
				}
			}
		},
		setAlarm(date){
			// if(date.length < 10) return;
			this.alarm = date;
			this.$storage("alarm", date);
			let periodInMinutes = this.$storage("periodInMinutes");
			let d = new Date(date);
			window.postMessage({cmd: 'setAlarm', name: date, 
				when: d.getTime(),
				periodInMinutes: parseInt(periodInMinutes, 10)
			}, "*");
		},
		onClickIcon(index) {
			this.today = new Date();
			let y = this.month.getFullYear()
			let m = this.month.getMonth() + index;
			if(m <= -1) {
				m = 11;
				y--;
			} else if(m >= 12) {
				m = 0;
				y++;
			}
			this.month = new Date(y, m,  1);
			this.retrieve()
		},
		retrieve() {
			this.btn = "";
			// this.schedule = []; this.schedule = [];
			let y = this.month.getFullYear(), m = this.month.getMonth();
			let {schedule, recorder} = this.parseSchedule(y, m);
			this.recorder = recorder;
			this.schedule = schedule;
			//  && this.alarm.length == 0
			if(this.month.toString("yyyy-mm") == this.today.toString("yyyy-mm")) {
				let {time, btn, isPreload} = this.arrangeAlarm(this.today, schedule, recorder); 
				// console.log(time, btn)
				if(time.length == 0) {
					if(m == 11) {
						y++; m = 0;
					} else {
						m++;
					}
					let d1 = new Date(y, m, 1)
					let {schedule, recorder} = this.parseSchedule(y, m);
					if(recorder == null) recorder = {};
					let {time} = this.arrangeAlarm(d1, schedule, recorder);
					this.setAlarm(time);
				} else {
					if(this.alarm.length == 0 || this.alarm.substr(0, 10) < this.today.toString("yyyy-mm-dd"))
						this.setAlarm(time);
					else if(isPreload == true && time >= this.today.toString("yyyy-mm-ddThh:MM") )
						this.setAlarm(time);
					if(time.substr(0, 10) == this.today.toString("yyyy-mm-dd")) // isPreload
						this.btn = btn;
				}
			}
		},
		parseSchedule(y, m) {
			let d1 = new Date(y, m,  1);
			let month = d1.toString("yyyy-mm");
			let days = d1.getDay() * -1;
			let myRecords = this.$storage("schedule=" + month);
			let mySchedule = [];

			d1.addDays(days + (days == 0 ? -6 : 1));
			let today = this.today.toString("yyyy-mm-dd");
			for(let i = 0; i <= 5; i++) {
				let arr = [];
				for(let j = 0; j <= 6; j++) {
					let s1 = d1.toString("yyyy-mm-dd");
					// console.log(s1 + ": " + d1.getDay())
					let obj = {
						date: s1,
						day: d1.toString("d"),
						available: s1.substr(0, 7) == month,
						holiday: typeof holiday[s1] == "string" ? holiday[s1] : undefined,
						workday: 0,
					};
					if((d1.getDay() > 0 && d1.getDay() < 6) || workday.indexOf(s1) > -1) {
						obj.workday = s1 == today ? 2 : (s1 > today ? 3 : 1)
					}
					obj.editable = s1 >= this.today.toString("yyyy-mm-dd");
					arr.push(obj);
					d1.addDays(1);
				}
				mySchedule.push(arr)
				if(d1.toString("yyyy-mm") > month) break;
			}
			return {schedule: mySchedule, recorder: myRecords};
		},
		arrangeAlarm(date, schedule, records){
			let s1 = date.toString("yyyy-mm-dd");
			let morning = this.$storage("morning");
			let preload = typeof this.preload[s1] == "undefined" ? {} : this.preload[s1];
			for(let i = 0; i < schedule.length; i++) {
				let week = schedule[i];
				for(let j = 0; j < week.length; j++) {
					let row = week[j];
					if(row.date >= s1 && row.workday == 2) { // 工作日
						let dd = row.date.substr(8);
						let state = "";
						if(records) {
							if(typeof records[dd] == "undefined") records[dd] = {};

							if(typeof records[dd]["下班"] == "string")
								continue;
							else if(typeof records[dd]["上班"] == "string")
								state = "下班";
							else 
								state = "上班";
						} else {
							if(row.date > s1 || (new Date()).getHours() > 12)
								state = "下班";
							else 
								state = "上班";
						}
						if(state.length > 0) {
							if(typeof preload[state] == "string") {
								return {time: row.date + "T" + preload[state], btn: state, isPreload: true};
							} else 
								return {time: row.date + "T" + (state == "上班" ? morning : "18:00"), btn: state};
						}
					} else if(row.date >= s1 && row.workday == 3) { //今天以後
						preload = typeof this.preload[row.date] == "undefined" ? {} : this.preload[row.date]
						if(typeof preload["上班"] == "string") {
							return {time: row.date + "T" + preload["上班"], btn: "上班", isPreload: true};
						} else 
							return {time: row.date + "T" + morning, btn: "上班"};
					}
				}
			}
			return {time: "", btn: ""};
		},
		onClickDay(day) {
			if(this.isToday() == false) {
				alert("日期逾時，請更新網頁")
			}
		}, 
	},
	watch: {
		
	}
});

// OK 的 function
// window.postMessage({cmd: 'clearAlarms'}, "*");
// window.postMessage({cmd: 'getAlarms'}, "*");
// window.postMessage({cmd: 'setAlarm', name: "測試 alarm", 
// 	when: Date.now() + (1000 * 60) ,
// 	periodInMinutes: 3
// }, "*");