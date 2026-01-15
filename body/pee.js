Vue.component('pee', { 
	template:  `
		<div style="height: 100%; zoom: 1.2; display: flex; flex-direction: column; position: relative; overflow: hidden;">
			<Spin size="large" fix v-if="spinShow"></Spin>
			<div id="header" style="background: rgb(45, 140, 240); color: white; font-size: 24px;
				display: flex; flex-direction: row; align-items: center; padding: 5px 0px;
				justify-content: center;">
				<div style="">
					<Icon type="md-refresh" size="28" @click.native="refresh()" 
						style="cursor: pointer; margin: 0px 10px;"/>
				</div>
				<div style="flex: 1;" />
				<Icon type="ios-arrow-back" size="28" @click.native="onClickIcon(-1)" 
					style="cursor: pointer; margin-right: 10px;"/>
				<span style="font-size: inherit; cursor: pointer; " @click="onClickIcon(0)">
					{{yymmdd}}
				</span>
				<Icon type="ios-arrow-forward" size="28" @click.native="onClickIcon(1)" 
					style="cursor: pointer; margin-left: 10px;"/>
				<div style="flex: 1;" />
				<div style="">
					<Icon type="md-swap" size="28" @click.native="$emit('change-page', 'blood')" 
						style="cursor: pointer; margin: 0px 10px;"/>
				</div>
			</div>
			<div v-if="nextTime.length > 0" style="font-size: 24px; text-align: center;"
				:style="{
					margin: (nextTime.length > 0 ? '5px ' : '') + ' 0px',
					color: nextTime.indexOf('逾時') > -1 ? 'rgb(45, 140, 240)' : '#c01921' 
				}"
			>
				{{nextTime}}
			</div>
			<div style="flex: 1; overflow-y: auto; background: white;">
				<div v-for="(item, index) in datas"
					style="padding: 5px 10px; 
						display: flex; flex-direction: row; align-items: center; justify-content: center;"
					:style="{'border-bottom': '1px solid #eee'}"
				>

					<div style="font-size: 25px; margin-right: 10px; width: 80px; ">{{(datas.length - index) + "."}}</div>

					<div style="flex: 1"></div>

					<Icon v-if="active == index" type="md-trash" size="20" @click.native="trash()" 
						style="cursor: pointer; margin: 0px 10px;"/>

					<Input v-if="active == index" ref="input" 
						:value="item.replace(':', '')" type="number" class="my-custom-input"
						style="width: 140px; padding: 5px;" size="large" 
						@on-enter="onEnter" placeholder="輸入時間(hhmm)" element-id="input1"
					/>

					<Icon v-if="active == index" type="md-undo" size="20" @click.native="undo()" 
						style="cursor: pointer; margin: 0px 10px;"/>

					<div v-else style="width: 120px; font-size: 25px; text-align: center; cursor: pointer; "
						@click="onEdit(index)"
					>{{item}}</div>
					
					<div style="flex: 1"></div>
					<div style="font-size: 25px; width: 80px; text-align: right;"
						:style="{color: timeSpan(index) < '1:30' ? 'red' : ''}"
					>
						{{timeSpan(index)}}
					</div>
				</div>
				<div v-if="yesterday.length > 0" style="color: #A9A9A9; font-size: 25px; padding: 5px; text-align: center;">
					{{yesterday}}
				</div>
			</div>
			
			<i-button v-if="datas.length > 0 && isToday()" type="warning" shape="circle" icon="md-clock" 
				circle @click.native="onTimer" size="large"
				style="position: absolute; bottom: 10px; left: 10px;"
			></i-button>
			<i-button v-if="isToday()" type="primary" shape="circle" icon="md-add" 
				circle @click.native="onAdd" size="large"
				style="position: absolute; bottom: 10px; right: 10px;"
			></i-button>

			<div style="font-size: 20px; text-align: center; padding: 5px; color: rgb(45, 140, 240)"
				@click="onClearEdit()"
			>
				{{"2026-01-15 15:50"}}</div>
		</div>
	`,
	props: {
		// editable: {
		// 	type: Boolean,
		// 	require: true, 
		// 	default: true
		// },
	},
	data() {
		return {
			yymmdd: (new Date()).toString("yyyy-mm-dd"),
			spinShow: false, 
			datas: [],
			nextTime: "",
			active: -1,
			canEdit: false,
			yesterday: ""
		};
	},
	created(){
	},
	async mounted () {
		document.title = "解尿記錄";
		this.datas = await this.fetch(this.yymmdd, true);
		await this.fetchYesterday(this.yymmdd);
		window.onresize = () => {
			return (() => {
				this.onResize();
			})()
		}
		this.onResize();
	},
	destroyed() {
		window.onresize = null;
  },
	methods: {
		undo() {
			this.active = -1;
		},
		async trash() {
			this.datas.splice(this.active, 1);
			this.active = -1;
			await this.save();
			setTimeout(() => {
				this.showNextTime(this.datas.length > 0 ? this.datas[0] : "");	
			}, 600);
		},
		refresh() {
			location.reload();
		},
		onResize() {
			// if(document.body.clientWidth > 500 || location.href.indexOf("/Users/jimc/") > -1)
				this.canEdit = true; // (document.body.clientWidth > 500 || location.href.indexOf("/Users/jimc/") > -1) ? true : false;
		},
		async onClickIcon(index) {
			this.datas = [];
			let d = new Date(this.yymmdd);
			this.yymmdd = d.addDays(index).toString("yyyy-mm-dd");
			this.datas = await this.fetch(this.yymmdd, true);
			await this.fetchYesterday(this.yymmdd);
		},
		async onAdd() {
			let now = new Date();
			let today = now.toString("yyyy-mm-dd");
			if(today != this.yymmdd) {
				this.yymmdd = today;
				this.datas = await this.fetch(this.yymmdd, false);
			}
			if(this.datas.length > 0) {
				let lastTime = new Date(this.yymmdd + " " + this.datas[0]);
				let minutes = (now.getTime() - lastTime.getTime()) / (60 * 1000);
				if(minutes < 3) {
					alert("時間太短: " + Math.floor(minutes) + " 分")
					return;
				}
			}
			this.datas.unshift(now.toString("hh:MM"));
			this.showNextTime(this.datas[0]);
			await this.save();
		},
		async save() {
			this.datas.sort().reverse();
			return new Promise(async (success, error) => { 
				let ref = FireStore.db.collection("users").doc(FireStore.uid())
						.collection("pee").doc(this.yymmdd)
				this.spinShow = true;
				try {
					let x = await ref.set({pee: this.datas.join(",")});
				} catch(e) {
					console.log(e)
				} finally {
					setTimeout(() => {
						this.spinShow = false;
						success();
					}, 600);
				}
			});
		},
		onEdit(index) {
			if(this.active > -1) {
				this.active = -1;
			} else if(this.canEdit == true) {
				this.active = index;
				setTimeout(() => {
				let input1 = document.querySelector("#input1");
				if(input1 != null)
					input1.style.fontSize = "20px";				
				}, 300);
			}
		},
		async onEnter(event){
			const value = event.target.value;
			let msg = "", arr = ["00", "00"];
			if(value.length == 4 && value.indexOf(":") == -1) {
				arr[0] = value.substring(0, 2);
				arr[1] = value.substring(2, 4);
				if (!this.isValidHour(arr[0])) {
					msg = "小時必須介於 00 和 23 之間";
				} else if (!this.isValidMinute(arr[1])) {
					msg = "分鐘必須介於 00 和 59 之間";
				}
			} else {
				msg = "請輸入正確時間格式(hhMM)";
			}

			if(msg.length == 0) {
				this.$set(this.datas, this.active, arr[0] + ":" + arr[1]);
				if(this.active == 0) {
					this.showNextTime(arr[0] + ":" + arr[1])
				}
				await this.save();
				this.active = -1;
			} else {
				alert(msg)
			}
		},
		onClearEdit() {
			this.active = -1;
		},
		isValidHour(hour) {
			const h = parseInt(hour, 10);
			return !isNaN(h) && h >= 0 && h <= 23;
		},
		isValidMinute(minute) {
			const m = parseInt(minute, 10);
			return !isNaN(m) && m >= 0 && m <= 59;
		},
		async fetch(yymmdd, showNextTime) {
			return new Promise(async (success, error) => {
				let datas = [];
				let ref = FireStore.db.collection("users").doc(FireStore.uid())
						.collection("pee").doc(yymmdd)
				if(this.$isLogin()) {
					this.spinShow = true;
					try {
						let snapshot1 = await ref.get();
						let data = snapshot1.data();
						// console.log(data)
						if(typeof data == "object" && typeof data.pee == "string") {
							datas = data.pee.split(",")
						} else {
							datas = [];
						}
						if(showNextTime == true)
							this.showNextTime(datas.length > 0 ? datas[0] : "");
					} catch(e) {

					} finally {
						setTimeout(() => {
							this.spinShow = false;
							success(datas);
						}, 600);
					}
				} else {
					success(datas);
				}
			});
		},
		async fetchYesterday(yymmdd) {
			if(this.datas.length == 0){
				this.yesterday = "";
				return ;
			}
			let d = new Date(yymmdd);
			yymmdd = d.addDays(-1).toString("yyyy-mm-dd");
			let datas = await this.fetch(yymmdd, false);
			if(datas.length > 0) {
				this.yesterday = yymmdd + " " + datas[0];
				if(datas.length > 1) {
					// this.yesterday += "<br />" + yymmdd + " " + datas[1];
				}
			} else {
				this.yesterday = "";
			}
		},
		timeSpan(index) {
			let diff = "";
			if(index < this.datas.length - 1) {
				diff = this.compare(this.datas[index + 1], this.datas[index])
			}
			return  diff;
		},
		compare(t1, t2) {
			let arr1 = t1.split(":");
			let arr2 = t2.split(":");
			let xx = ((parseInt(arr2[0], 10) - parseInt(arr1[0], 10)) * 60) 
				+ (parseInt(arr2[1], 10) - parseInt(arr1[1], 10));
			let h = Math.floor(xx / 60);
			let m = xx % 60;
			return (h + ":" + (m < 10 ? "0" : "") + m);
		},
		onTimer() {
			let span = this.compare(this.datas[0], (new Date()).toString("hh:MM"));
			let next = "";
			if(span < "1:30") {
				let arr = this.datas[0].split(":");
				let h = parseInt(arr[0], 10) + 2;
				if(h < 10) h = "0" + h;
				next = "\n\n建議在 " + h + ":" + arr[1] + " 進行"
			}
			let goat = "", minutes = span.split(":")
				, total = 120 - (parseInt(parseInt(minutes[0], 10) * 60) + parseInt(minutes[1], 10));
			if(total > 0) {
				goat = "\n\n還有時間：" + total + " 分鐘";
			}
			alert("時間跨距：" + span + goat + next)
		}, 
		isToday() {
			return (new Date()).toString("yyyy-mm-dd") == this.yymmdd;
		},
		showNextTime(time) {
			let nextTime = "";
			if(time.length > 0 && this.isToday() == true){
				if(time > "04:00" && time < "23:00") {
					let arr1 = time.split(":");
					let h = parseInt(arr1[0], 10) + 2;
					if(h < 10) h = "0" + h;
					let h2 = (new Date()).toString("hh");
					let m2 = (new Date()).toString("MM");
					if(h2 + ":" + m2 < h + ":" + arr1[1])
						nextTime = '預計：' + h + ":" + arr1[1];
					else {
						h = parseInt(h, 10);
						let m = parseInt(arr1[1], 10);
						h2 = parseInt(h2, 10);
						m2 = parseInt(m2, 10);
						let minutes = ((h2 * 60) + m2) - ((h * 60) + m);
						nextTime = '逾時：' + minutes + " 分" 
					}
				}
			}
			this.nextTime = nextTime;
		}
	},
	computed: {
	},
	watch: {
	},
});