Vue.component('list', { 
	template:  `
		<div style="height: 100%; display: flex; flex-direction: column;">
			<Spin size="large" fix v-if="spinShow"></Spin>
			<div id="header" style="background: rgb(45, 140, 240); color: white; text-align: center; ">{{yymm}}</div>
			<div style="flex: 1; overflow-y: auto;">
				<div v-for="(item, index) in firebaseData">
					<div>{{index}}</div>
					<div>{{item}}</div>
				</div>
			</div>
			<i-button v-if="$isLogin()" type="primary" shape="circle" icon="md-add" 
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
			yymm: (new Date()).toString("yyyy-mm"),
			spinShow: false, 
			datas: [],
			firebaseData: {}
		};
	},
	created(){
	},
	async mounted () {
		await  this.retrieve();
		// await this.onSave()
	},
	destroyed() {
  },
	methods: {
		onAdd() {
			let arr = `2023-01-08 6:38	128	99	95
2023-01-08 19:49	134	92	89
2023-01-09 6:37	123	94	89
2023-01-09 19:14	125	91	80
2023-01-10 6:12	118	88	82
2023-01-10 20:20	132	89	81
2023-01-11 5:54	126	87	79
2023-01-11 20:22	129	87	85
2023-01-12 5:25	129	92	72
2023-01-12 20:07	129	85	84
2023-01-13 6:12	127	86	77
2023-01-13 23:02	128	85	95
2023-01-14 7:18	131	89	92
2023-01-14 20:00	117	81	102
2023-01-15 6:16	121	83	90
2023-01-15 21:04	119	83	92
2023-01-16 5:59	111	82	80`.split("\n");
			console.log(arr)
			let json = {};
			arr.forEach((el, index) => {
				// console.log(el)
				let row = el.split("\t");
				let arr2 = row[0].split(" ")
				let key = arr2[0].substr(8);
				if(arr2[1].length == 4) arr2[1] = "0" + arr2[1];
				if(typeof json[key] == "undefined") json[key] = {};
				json[key][arr2[1]] = row[1] + "/" + row[2] + "/" + row[3]
			});
			console.log(json)
			this.onSave(json)
		},
		async retrieve() {
			console.log(this.yymm)
			this.ref = FireStore.db.collection("users").doc(FireStore.uid())
					.collection("blood").doc(this.yymm)
			if(this.$isLogin()) {
				this.spinShow = true;
				try {
					let snapshot1 = await this.ref.get();
					console.log(snapshot1)
					let data = snapshot1.data();
					console.log(data)
					if(typeof data == "object")
						this.firebaseData = data;
				} catch(e) {

				} finally {
					setTimeout(() => {
						this.spinShow = false;
					}, 600);
				}
			}
		},
		async onSave(myRecords) {
			this.spinShow = true;
			try {
				let x = await this.ref.set(myRecords);
			} catch(e) {
				console.log(e)
			} finally {
				setTimeout(() => {
					this.spinShow = false;
				}, 600);
			}
		},
	},
	watch: {
	},
});