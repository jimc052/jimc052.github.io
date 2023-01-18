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
						:style="{color: different(index) < '1:30' ? 'red' : ''}"
					>
						{{different(index)}}
					</div>
				</div>
			</div>
			<i-button type="primary" shape="circle" icon="md-add" 
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
			days: ["日", "一", "二", "三", "四", "五", "六"]
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
				}, 600);
			}
		},
		async fetch() {
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
					}, 600);
				}
			}
		},
		different(index) {
			let diff = "";
			if(index < this.datas.length - 1) {
				let arr1 = this.datas[index + 1].split(":");
				let arr2 = this.datas[index].split(":");
				let xx = ((parseInt(arr2[0], 10) - parseInt(arr1[0], 10)) * 60) 
					+ (parseInt(arr2[1], 10) - parseInt(arr1[1], 10));
				let h = Math.floor(xx / 60);
				let m = xx % 60;
				diff = (h + ":" + (m < 10 ? "0" : "") + m);
			}
			return  diff;
		}
	},
	computed: {
		
	},
	watch: {
	},
});