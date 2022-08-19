Vue.component('calendar', {
	template:  `<div id="calendar" style="display: flex; flex-direction: column; height: 100%; width: 100%;">
	<Spin size="large" fix v-if="spinShow"></Spin>
		<div :style="{background: '#2d8cf0', 
			'display': 'flex', 'flex-direction': 'row', 'justify-content': 'flex-start',
			'align-items': 'center', color: 'white' }"
		>
			<div style="flex: 1;"></div>
			<Icon type="ios-arrow-back" size="28" @click.native="onClickIcon(-1)" 
			style="cursor: pointer; margin-right: 10px;"/>
			<div class="title" >{{month.toString("yyyy-mm")}}</div>
			<Icon type="ios-arrow-forward" size="28" @click.native="onClickIcon(1)" 
			style="cursor: pointer; margin-left: 10px;" />
			<div style="flex: 1; text-align: right;">
				<!--
				<Icon type="md-more" size="28" @click.native="onClickIconMore" 
				style="cursor: pointer; margin-right: 10px;" />
				-->
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
						cursor: day.available && day.workday >= 2 && edit == true ? 'pointer' : 'default'
					}"
				>

					<div class="date text" 
						:class="{inavailable: day.workday < 2, weekend: day.available == true && index2 >= 5}">
            {{day.day}}
          </div>
					<div v-if="typeof day.holiday == 'string'" 
						class="text holiday" :class="{inavailable: day.workday < 2}"
					>
						{{day.holiday}}
					</div>

					<div style="flex: 1" />

					<div class="text shift" :class="{inavailable: day.workday < 2, am: day.shift == '早班', pm: day.shift == '晚班', break: day.shift == '休假' }">
						{{day.shift}}
					</div>
					
				</div>
			</div>
		</div>

    <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; padding: 10px;" 
			v-if="month.toString('yyyymm') >= today.toString('yyyymm')"
		>
			<div style="flex: 1" />

			<RadioGroup v-if="edit == true" v-model="shift" type="button" button-style="solid" size="large" @on-change="onRadioChange">
					<Radio label="早班"></Radio>
					<Radio label="晚班"></Radio>
					<Radio label="休假"></Radio>
					<Radio label="無"></Radio>
			</RadioGroup>
			
			<div style="flex: 1" />

			<Button v-if="edit == false" size="large" icon="md-create" type="primary" @click="onClickIconEdit" />
			<ButtonGroup>
				<Button v-if="$isLogin() && dirty == true && edit == true" size="large"
					icon="md-cloud-upload" type="success" @click="onClickIconSave" />

				<Button v-if="edit == true" size="large" icon="md-close" type="primary" @click="onClickIconClose" />			
			</ButtonGroup>
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
      shift: "早班", 
			edit: false,
			dirty: false,
			spinShow: false
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
			// console.log(value, this.shift)
		},
		onClickCell(x, y, data){
			if(this.edit == true && data.available && data.workday >= 2 && data.shift != this.shift) {  // 
				let arr = this.schedule[x];
				data.shift = (this.shift == "無") ? undefined : this.shift;
				arr[y] = data;
				this.$set(this.schedule, x, arr);
				
				let json = {};
				for(let i = 0; i < this.schedule.length; i++) {
					for(let j = 0; j < this.schedule[i].length; j++) {
						let row = this.schedule[i][j];
						if(typeof row.shift == "string") {
							json["" + row.day] = row.shift;
						}
					}
				}
				this.$storage("shiftTime=" + this.month.toString("yyyy-mm"), json);
				// console.log(this.$storage("shiftTime=" + this.month.toString("yyyy-mm")))
				this.dirty = true;
			}
			// this.$refs["setting"].visible = true;
		},
		onClickIconEdit(){
			this.edit = true;
		},
		onClickIconClose() {
			this.dirty = false;
			this.edit = false;
		},
		async onClickIconSave() {
			this.spinShow = true;
			let key = this.month.toString("yyyy-mm");
			try {
				let ref = FireStore.db.collection("users").doc(FireStore.uid())
					.collection("ShiftTime").doc(key);
				let myRecords = {};
				let s = this.$storage("shiftTime=" + key)
				if(typeof s == "string" && s.length > 0) {
					myRecords = JSON.parse(s)
				}
				let x = await ref.set(myRecords);
			} catch(e) {
				console.log(e)
			} finally {
				setTimeout(() => {
					this.spinShow = false;
				}, 600);
			}
			this.dirty = false;
			this.edit = false;
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
      // this.visible = this.month.toString("yyyy-mm") >= this.today.toString("yyyy-mm") ? true : false;
      // console.log(this.month.toString("yyyy-mm") + "/" + this.today.toString("yyyy-mm"))
			this.retrieve()
		},
		async retrieve() {
			this.onClickIconClose();
			let y = this.month.getFullYear(), m = this.month.getMonth();
			let d1 = new Date(y, m,  1);
			let month = d1.toString("yyyy-mm");
			let days = d1.getDay() * -1;
			let mySchedule = [];
			let myRecords = {}; 
			if(this.$isLogin()) {
				this.spinShow = true;
				try {
					let snapshot1 = await FireStore.db.collection("users").doc(FireStore.uid())
								.collection("ShiftTime").doc(month).get();
					let data = snapshot1.data();
					if(typeof data == "object")
						myRecords = data;
				} catch(e) {

				} finally {
					setTimeout(() => {
						this.spinShow = false;
					}, 600);
				}
			} else {
				let s = this.$storage("shiftTime=" + month);
				if(typeof s == "string" && s.length > 0) {
					myRecords = JSON.parse(s)
				}
			}

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
					// <!-- 工作日 workday： 1 今天以前，2 今天，3 今天以後 -->
					if(s1.indexOf(month) > -1) {// (d1.getDay() > 0 && d1.getDay() < 6) || workday.indexOf(s1) > -1) {
						obj.workday = s1 == today ? 2 : (s1 > today ? 3 : 1)
					}
					obj.editable = s1 >= this.today.toString("yyyy-mm-dd");
					if(obj.available == true && typeof myRecords["" + obj.day] == "string") {
						obj.shift = myRecords["" + obj.day];
						delete myRecords["" + obj.day];
					}
					arr.push(obj);
					d1.addDays(1);
				}
				mySchedule.push(arr);
				if(d1.toString("yyyy-mm") > month) break;
			}

			this.schedule = mySchedule;
		}
	},
	watch: {
	}
});
