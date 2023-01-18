Vue.component('pee', { 
	template:  `
		<div style="height: 100%; display: flex; flex-direction: column; position: relative; overflow: hidden;">
			<Spin size="large" fix v-if="spinShow"></Spin>
			<div id="header" style="background: rgb(45, 140, 240); color: white;  font-size: 30px;
				display: flex; flex-direction: row; align-items: center;
				justify-content: center;">
				<div style="flex: 1;" />
				<Icon type="ios-arrow-back" size="32" @click.native="onClickIcon(-1)" 
					style="cursor: pointer; margin-right: 10px;"/>
				{{yymmdd}}
				<Icon type="ios-arrow-forward" size="32" @click.native="onClickIcon(1)" 
					style="cursor: pointer; margin-left: 10px;"/>
				<div style="flex: 1; display: flex; flex-direction: row; align-items: center; justify-content: flex-end;">
					<Icon type="md-swap" size="32" @click.native="$emit('change-page', 'blood')" 
						style="cursor: pointer; margin: 0px 10px;"/>
				</div>
			</div>
			<div style="flex: 1; overflow-y: auto; background: white;">
				<div v-for="(item, index) in datas" 
					style="padding: 5px 10px; 
						display: flex; flex-direction: row; align-items: center; justify-content: center;"
					:style="{'border-bottom': '1px solid #eee'}">
					<div style="font-size: 25px; margin-right: 10px; width: 80px; ">{{(datas.length - index) + "."}}</div>
					<div style="flex: 1; font-size: 25px; text-align: center">{{item}}</div>
					<div style="font-size: 25px; width: 80px; text-align: right;"
						:style="{color: timeSpan(index) < '1:30' ? 'red' : ''}"
					>
						{{timeSpan(index)}}
					</div>
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
			// days: ["日", "一", "二", "三", "四", "五", "六"]
		};
	},
	created(){
	},
	async mounted () {
		document.title = "解尿記錄";
		await  this.fetch();
	},
	destroyed() {
  },
	methods: {
		async onClickIcon(index) {
			this.datas = [];
			let d = new Date(this.yymmdd);
			this.yymmdd = d.addDays(index).toString("yyyy-mm-dd");
			await this.fetch();
		},
		async onAdd() {
			let execute = () => {
				return new Promise(async (success, error) => { 
					this.datas.unshift((new Date()).toString("hh:MM"));
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
			}

			let today = (new Date()).toString("yyyy-mm-dd");
			if(today != this.yymmdd) {
				this.yymmdd = today;
				await this.fetch();
			}
			await execute();
		},
		async fetch() {
			return new Promise(async (success, error) => { 
				let ref = FireStore.db.collection("users").doc(FireStore.uid())
						.collection("pee").doc(this.yymmdd)
				if(this.$isLogin()) {
					this.spinShow = true;
					try {
						let snapshot1 = await ref.get();
						let data = snapshot1.data();
						// console.log(data)
						if(typeof data == "object" && typeof data.pee == "string") {
							this.datas = data.pee.split(",")
						} else {
							this.datas = [];
						}
					} catch(e) {

					} finally {
						setTimeout(() => {
							this.spinShow = false;
							success();
						}, 600);
					}
				} else {
					success();
				}
			});
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
				next = "\n\n建議在 " + h + ":" + arr[1] + "進行"
			}
			alert("時間跨距：" + span + next)
		}, 
		isToday() {
			return (new Date()).toString("yyyy-mm-dd") == this.yymmdd;
		}
	},
	computed: {
	},
	watch: {
	},
});