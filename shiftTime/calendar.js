/*
<!-- 非當月 -->
					<div v-if="day.available == false" style="height: 100%; display: flex; flex-direction: column;">
						<div style="text-align: center; color: #D3D3D3;">{{day.day}}</div>
						<div v-if="typeof day.holiday == 'string'" 
							style="text-align: center; color: rgba(0,0,0, 0.3);  background-color: rgba(0, 255, 0, 0.2);">
							{{day.holiday}}
						</div>
            <div style="text-align: center;">{{day.shift}}</div>
					</div>
          <div v-else style="height: 100%; display: flex; flex-direction: column;" v-on:click="onClickCell(index1, index2, day)">
            <!-- 國定假日 -->
            <div v-if="typeof day.holiday == 'string'" style="flex: 1;">
              <div style="text-align: center;">{{day.day}}</div>
              <div style="text-align: center; background-color: green; color: white;">
                {{day.holiday}}
              </div>
            </div>
            <!-- 周末，周日 -->
            <div v-else-if="index2 >= 5" style="flex: 1; text-align: center; color: #FF8C00;">
              {{day.day}}
            </div>
            <div v-else style="flex: 1; text-align: center;">{{day.day}}</div>

            <div style="text-align: center;">{{day.shift}}</div>
          </div>
*/
Vue.component('calendar', {
	template:  `<div id="calendar" style="display: flex; flex-direction: column; height: 100%; width: 100%;">
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

		<div style="flex: 1; display: flex; flex-direction: column;" class="cls1">
			<div class="row" v-for="(weeks, index1) in schedule" style="flex: 1; display: flex; flex-direction: row;">
				<div class="col" v-for="(day, index2) in weeks"
					v-on:click="onClickCell(index1, index2, day)"

					:style="{flex: '1', height: '100%', padding: '5px', 
						backgroundColor: day.available ? (day.workday == 2 ? 'rgba(45, 140, 250, 0.2)' : 'white') : '#F8F8F8',
					}">

					<div class="date" :class="{inavailable: day.available == false, weekend: day.available == true && index2 >= 5}">
            {{day.day}}
          </div>
					<div v-if="typeof day.holiday == 'string'" 
						style="text-align: center; " :class="{holiday0: !day.available, holiday1: day.available,}">
						{{day.holiday}}
					</div>

					<div style="flex: 1" />

					<div >
						{{day.workday}}
					</div>
				</div>
			</div>
		</div>

    <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; padding: 10px;" >
			<div style="flex: 1" />
			<RadioGroup v-model="mode" type="button" button-style="solid" size="large" @on-change="onRadioChange">
					<Radio label="早班"></Radio>
					<Radio label="晚班"></Radio>
					<Radio label="休假"></Radio>
					<Radio label="無"></Radio>
			</RadioGroup>
			
			<div style="flex: 1" />

			<Icon type="md-checkmark" size="28" @click.native="onClickIconMore" 
				style="cursor: pointer; margin-right: 10px;" />
			<Icon type="md-close" size="28" @click.native="onClickIconMore" 
				style="cursor: pointer; margin-right: 10px;" />
			<Icon type="md-cloud-upload" size="28" @click.native="onClickIconMore" 
				style="cursor: pointer; margin-right: 10px;" />
			<Icon type="md-create" size="28" @click.native="onClickIconMore" 
			style="cursor: pointer; margin-right: 10px;" />
    </div>
	</div>`,
	props: {
	},
	data() {
		return {
			schedule: [],
			recorder: null,
			weekday: ["一", "二", "三", "四", "五", "六", "日"],
			today: new Date(),
			month: new Date(),
			visible: false, 
      mode: "早班"
		};
	},
	created(){	
		
	},
	async mounted () {
		this.retrieve();
	},
	destroyed() {
  },
	methods: {
		onRadioChange(value) {
			console.log(value)
		},
		onClickCell(x, y, data){
			console.log(x, y, JSON.stringify(data));
			// this.$refs["setting"].visible = true;
		},
		onClickIconMore(){
			// this.$refs["setting"].visible = true;
		},
		onChangeSetting(value){
			console.log("onChangeSetting: " + value)
			this.setAlarm(this.alarm)
		},
		isToday(today){
			if(this.$isDebug()) return true;
			if(typeof today == "undefined") today = this.today;
			return today.toString("yyyy-mm-dd") == (new Date()).toString("yyyy-mm-dd");
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
      this.visible = this.month.toString("yyyy-mm") >= this.today.toString("yyyy-mm") ? true : false;
      console.log(this.month.toString("yyyy-mm") + "/" + this.today.toString("yyyy-mm"))
			this.retrieve()
		},
		retrieve() {
			let y = this.month.getFullYear(), m = this.month.getMonth();
			let {schedule, recorder} = this.parseSchedule(y, m);
			this.recorder = recorder;
			this.schedule = schedule;
		},
    parseSchedule(y, m) {
			let d1 = new Date(y, m,  1);
			let month = d1.toString("yyyy-mm");
			let days = d1.getDay() * -1;
			let myRecords = this.$storage("shiftTime=" + month);
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
      console.log(mySchedule)
			return {schedule: mySchedule, recorder: myRecords};
		},
		onClickDay(day) {
		}, 
	},
	watch: {
		
	}
});
