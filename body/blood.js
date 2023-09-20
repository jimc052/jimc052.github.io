Vue.component('blood', { 
	template:  `
		<div style="height: 100%; display: flex; flex-direction: column;">
			<Spin size="large" fix v-if="spinShow"></Spin>
			<div id="header" style="background: #c01921; color: white;  font-size: 30px;
				display: flex; flex-direction: row; align-items: center;
				justify-content: center;">
				<div style="flex: 1; margin: 0 10px;">
				</div>
				<Icon v-if="calendar == 'ios-calendar'" type="ios-arrow-back" size="32" @click.native="onClickIcon(-1)" 
					style="cursor: pointer; margin-right: 10px;"/>
				{{yymm}}
				<Icon  v-if="calendar == 'ios-calendar'" type="ios-arrow-forward" size="32" @click.native="onClickIcon(1)" 
					style="cursor: pointer; margin-left: 10px;"/>
				<div style="flex: 1; display: flex; flex-direction: row; align-items: center; justify-content: flex-end;">
					<Icon :type="calendar" size="32" 
						@click.native="onClickCalendar"
						style="cursor: pointer; margin: 0px 10px;"
						:style="{color: calendar == 'ios-calendar' ? 'white' : 'silver'}"
					/>
					<Icon type="md-swap" size="32" @click.native="$emit('change-page', 'pee')" 
						style="cursor: pointer; margin: 0px 10px;"/>
				</div>
			</div>
			<div v-if="calendar == 'ios-calendar' " style="flex: 1; overflow-y: auto; background: white;" class="container">
				<div v-for="(item, index) in datas" 
					style="padding: 5px 10px;
						display: flex; flex-direction: row; align-items: center; justify-content: center;"
					:style="{'border-bottom': '1px solid #eee'}"
					@click="onClickRow(item, index);"
				>
					<div style="margin-right: 10px;">
						<span style="font-size: 20px;">{{item.key}}</span>
						<span style="font-size: 12px;"
							:style="{color: '六日'.indexOf(item.week) > -1 ? '#c01921' : ''}">
							{{"(" + item.week + ")"}}
						</span>
					</div>

					<div v-for="(item2, index2) in item.data" 
						style="flex: 1; display: flex; flex-direction: row; 
							justify-content: flex-start; align-items: center; "
					>
						<div style="font-size: 16px; margin-right: 10px;">
							{{index2}}
						</div>
						<div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
							<div v-for="(item3, index3) in item2.split('/')">
								<span v-if="! (index3 == 0)" style="font-size: 14px;">{{"/"}}</span>
								<span v-if="(index3 == 0)" style="font-size: 18px;  "
									:style="{
										color: colorSBP(item3),
										'font-weight': fontDBP(item3)
									}"
								>
									{{item3}}
								</span>
								<span v-if="(index3 == 1)"  style="font-size: 18px;"
									:style="{
										color: colorDBP(item3),
										'font-weight': fontDBP(item3)
									}"
								>
									{{item3}}
								</span>
								<span v-if="index3 == 2"  style="font-size: 18px;">{{item3}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div v-else-if="calendar == 'ios-calendar-outline' " style="flex: 1; overflow-y: auto; background: white;" class="container">
				<div v-for="(item, index) in datas" 
					style="padding: 5px 10px;
						display: flex; flex-direction: row; align-items: center; justify-content: center;"
					:style="{'border-bottom': '1px solid #eee'}"
				>
					<div style="font-size: 18px;">{{index}}</div>
					<div style="flex: 1"></div>
					<div v-for="(item3, index3) in item.split('/')">
						<span v-if="! (index3 == 0)" style="font-size: 14px;">{{"/"}}</span>
						<span v-if="(index3 == 0)" style="font-size: 18px;  "
							:style="{
								color: colorSBP(item3),
								'font-weight': fontSBP(item3)
							}"
						>
							{{item3}}
						</span>
						<span v-if="(index3 == 1)"  style="font-size: 18px;"
							:style="{
								color: colorDBP(item3),
								'font-weight': fontDBP(item3)
							}"
						>
							{{item3}}
						</span>
						<span v-if="index3 == 2"  style="font-size: 18px;">{{item3}}</span>
					</div>
				</div>
			</div>
			<div style="text-align: center; padding: 5px 20px; display: flex; flex-direction: row; align-items: center; justify-content: center;">
				<span style="font-size: 20px;">{{$storage("email")}}</span>
				<div style="flex: 1;"/>
				<span style="font-size: 20px;">
					{{"2023-09-20"}}
				</span>
			</div>

			<i-button type="error" shape="circle" circle icon="md-add" 
				style="position: absolute; bottom: 10px; right: 10px;"
				v-if="canAdd == true && calendar == 'ios-calendar' && (canEdit == true)" 
				@click.native="onAdd()" size="large"
			></i-button>
			<blood-editor :recorder="recorder" @onChange="onChangeRecorder"></blood-editor>
		</div>
	`,
	props: {
	},
	data() {
		return {
			yymm: (new Date()).toString("yyyy-mm"),
			spinShow: false, 
			datas: [],
			firebaseData: {},
			canEdit: false,
			recorder: undefined,
			active: -1,
			calendar: "ios-calendar",
			canAdd: true
		};
	},
	created(){
	},
	async mounted () {
		document.title = "血壓記錄";

		await  this.fetch();

		this.broadcast.$on('onResize', this.onResize);

		this.onResize();
		this.canEdit = true;
		// if(location.href.indexOf("/Users/jimc/") > -1) this.onClickCalendar();
	},
	destroyed() {
		window.ondrop = null;
		window.ondragover = null;
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		onResize() {
			// this.canEdit = (document.body.clientWidth > 500 || location.href.indexOf("/Users/jimc/") > -1) ? true : false;
			let container = document.querySelector(".container");
			container.style.zoom = document.body.clientWidth > 500 ? 1.4 : 0.9;
			// console.log(document.body.clientWidth + ": " + container.style.zoom)
		},
		onChangeRecorder(data) {
			if(typeof data == "object" && data != null) {
				// console.log(JSON.stringify(data))
				if(this.active == -1) {
					this.datas.push(data)
				} else {
					this.$set(this.datas, this.active, data)
				}
				this.firebaseData[data["key"]] = data["data"];
				this.onSave();
				// console.log(JSON.stringify(this.firebaseData, null, 2))
				if(this.active == -1) this.retrieve();
			}
			this.recorder = undefined;
			this.active = -1
		},
		async onClickIcon(index) {
			this.datas = [];
			let arr = this.yymm.split("-");
			arr[1] = parseInt(arr[1], 10) + index;
			if(arr[1] == 0) {
				arr[0] = parseInt(arr[0], 10) - 1;
				arr[1] = 12;
			} if(arr[1] == 13) {
				arr[0] = parseInt(arr[0], 10) + 1
				arr[1] = 1;
			}

			this.yymm = arr[0] + "-" + (arr[1] < 10 ? "0" : "") + arr[1];
			this.canEdit = this.yymm == (new Date()).toString("yyyy-mm");
			await this.fetch();
		},
		async fetch() {
			let ref = FireStore.db.collection("users").doc(FireStore.uid())
					.collection("blood").doc(this.yymm)
			if(this.$isLogin()) {
				this.spinShow = true;
				try {
					let snapshot1 = await ref.get();
					// console.log(snapshot1)
					let data = snapshot1.data();
					// console.log(JSON.stringify(data, null, 2))
					if(typeof data == "object") {
						this.firebaseData = data;
					} else {
						this.firebaseData = {};
					}
					this.retrieve();
				} catch(e) {

				} finally {
					setTimeout(() => {
						this.spinShow = false;
					}, 600);
				}
			}
		},
		async onSave() {
			let ref = FireStore.db.collection("users").doc(FireStore.uid())
					.collection("blood").doc(this.yymm);
			this.spinShow = true;
			try {
				let x = await ref.set(this.firebaseData);
			} catch(e) {
				console.log(e)
			} finally {
				setTimeout(() => {
					this.spinShow = false;
				}, 600);
			}
		},
		onAdd() {
			this.active = -1;
			this.recorder = null;
		},
		retrieve() {
			let week = ["日", "一", "二", "三", "四", "五", "六"]
			this.datas = [];
			for(let key in this.firebaseData) {
				let d = new Date(this.yymm + "-" + key)
				let json = {key, data: this.firebaseData[key], week: week[d.getDay()]};
				this.datas.push(json)
			}
			this.datas.sort(function(a, b){
				return a.key < b.key ? 1 : -1;
			});
			this.canAdd = true;
			if(this.datas.length > 0) {
				let today = (new Date()).toString("yyyy-mm-dd");
				if(today == this.yymm + "-" + this.datas[0].key) {
					this.canAdd = false;
				}
			}
			// console.log(this.yymm + this.datas[0]).key;
			// console.log(JSON.stringify(this.datas[0]))
		},
		onClickRow(item, index) {
			if(this.canEdit == true) {
				this.recorder = item; 
				this.active = index;
			}
		},
		async onClickCalendar() {
			this.datas = [];
			this.calendar = this.calendar == "ios-calendar" 
				? "ios-calendar-outline" : "ios-calendar";
			if(this.calendar == "ios-calendar") {
				this.fetch();
			} else {
				let date = new Date(), ds = {};
				this.spinShow = true;

				for(let i = 0; i <= 11; i++) { // 只要1年的資料
					let yymm = date.addMonths(i  * -1).toString("yyyy-mm");
					// console.log(yymm)
					let data = await this.fetch2(yymm), empty = 0;
					// if(yymm == "2023-02") 
					for(let key in data) {
						let arr = [[], []];
						for(let key2 in data[key]) {
							if(arr[0].length == 0) 
								arr[0] = data[key][key2].split("/");
							else {
								arr[1] = data[key][key2].split("/");
							}
						}
						if(arr[1].length == 3 && arr[1].length == 3) {
							for(let j = 0; j < arr[1].length; j++) {
								arr[0][j] = (parseInt(arr[0][j], 10) + parseInt(arr[1][j], 10)) / 2;
							}
							ds[yymm + "-" + key] = arr[0].join("/");
						} else if(arr[0].length == 0 && arr[1].length == 3) {
							ds[yymm + "-" + key] = arr[1].join("/");
						} else if(arr[0].length == 3 && arr[1].length == 0) {
							ds[yymm + "-" + key] = arr[0].join("/");
						} else {
						}
						if(!(arr[0].length == 0 && arr[1].length == 0)) {
							empty++;
						}
					}
					if(empty == 0) break;
					// console.log(yymm + ": " + empty)
				}
				// console.log(JSON.stringify(ds, null, 2));s
				let result = {}, span = "", arr = [], yymmdd = "";
				for(let i = 0; i <= 365; i++) {
					let today = date.addDays(i * -1);
					yymmdd = today.toString("yyyy-mm-dd");
					// console.log(yymmdd)
					if(span.length == 0) span = yymmdd;
					if(typeof ds[yymmdd] != "undefined") {
						arr.push(ds[yymmdd]);
					}
					if((today.getDay() == 0 || i == 365) && arr.length > 0) {
						span = yymmdd + "~" + span;
						let arr2 = [0, 0, 0];
						for(let j = 0; j < arr.length; j++) {
							let arr3 = arr[j].split("/")
							for(let k = 0; k < arr3.length; k++) {
								arr2[k] += parseInt(arr3[k], 10);
							}
						}
						for(let j = 0; j < arr2.length; j++) {
							arr2[j] = Math.floor(arr2[j] / arr.length);
						}
						result[span] = arr2.join("/")
						span = ""; 
						arr = [];
					}
				}
				this.datas = result;
				setTimeout(() => {
					this.spinShow = false;
				}, 600);
			}
		},
		async fetch2(yymm) {
			let ref = FireStore.db.collection("users").doc(FireStore.uid())
					.collection("blood").doc(yymm)
			if(this.$isLogin()) {
				try {
					let snapshot1 = await ref.get();
					// console.log(snapshot1)
					let data = snapshot1.data();
					if(typeof data == "object") {
						return data;
					} else {
						return {};
					}
				} catch(e) {
					throw e;
				}
			}
		},
		colorSBP(value) { // 收縮壓
			return value >= 140 ? '#c01921' 
				: (value >= 120 ? '#ff9900' : 'rgb(45, 140, 240)')
		},
		colorDBP(value) { // 舒張壓
			return value >= 90 ? '#c01921' 
					: (value >= 80 ? '#ff9900' : 'rgb(45, 140, 240)')
		}, 
		fontSBP(value) {
			return value >= 140 ? '900' : '400';
		},
		fontDBP(value) {
			return value >= 90 ? '900' : '400';
		}
	},
	watch: {
	},
});