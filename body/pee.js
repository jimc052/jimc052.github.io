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
				<div style="flex: 1;" />
				<Icon type="md-swap" size="32" @click.native="$emit('change-page', 'blood')" 
					style="cursor: pointer; margin: 0px 10px;"/>
			</div>
			<div style="flex: 1; overflow-y: auto; background: white;">
				<div v-for="(item, index) in datas" 
					style="padding: 5px 10px;
						display: flex; flex-direction: row; align-items: center; justify-content: center;"
					:style="{'border-bottom': '1px solid #eee'}">

				</div>
			</div>
			<i-button type="primary" shape="circle" icon="md-add" circle @click.native="onAdd" size="large"
				style="position: absolute; bottom: 50px; right: 50px;"
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
			firebaseData: {}
		};
	},
	created(){
	},
	async mounted () {
		document.title = "解尿記錄";
		// await  this.fetch();
	},
	destroyed() {
  },
	methods: {
		async onClickIcon(index) {
			this.datas = [];
			let arr = this.yymmdd.split("-");
			arr[1] = parseInt(arr[1], 10) + index;
			if(arr[1] == 0) {
				arr[0] = parseInt(arr[0], 10) - 1;
				arr[1] = 12;
			} if(arr[1] == 13) {
				arr[0] = parseInt(arr[0], 10) + 1
				arr[1] = 1;
			}

			this.yymmdd = arr[0] + "-" + (arr[1] < 10 ? "0" : "") + arr[1]
			await this.fetch();
		},
		async onAdd(result) {
			let arr = result.split("\n"), count = 0;
			// console.log(arr)
			let json = {};
			arr.forEach((el, index) => {
				if(el.indexOf("測量日期") == -1 && el.trim().length > 0 && el.indexOf(this.yymmdd) == 0) {
					// console.log(el)
					let row = el.split(",");
					if(row.length >=5 && parseInt(row[4], 10) > 65) {
						let arr2 = row[0].split(" ")
						let key = arr2[0].substr(8);
						if(arr2[1].length == 4) arr2[1] = "0" + arr2[1];
						if(typeof json[key] == "undefined") json[key] = {};
						json[key][arr2[1]] = row[2] + "/" + row[3] + "/" + row[4];
						count++;
					}
				}
			});
			console.log(JSON.stringify(json))
			if(count > 0) {
				await this.onSave(json);
				this.retrieve();
			}
			alert(this.yymmdd + "\n轉入 " + count + " 筆資料")
		},
		async fetch() {
			let ref = FireStore.db.collection("users").doc(FireStore.uid())
					.collection("pee").doc(this.yymmdd)
			if(this.$isLogin()) {
				this.spinShow = true;
				try {
					let snapshot1 = await ref.get();
					// console.log(snapshot1)
					let data = snapshot1.data();
					// console.log(data)
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
		async onSave(myRecords) {
			this.firebaseData = Object.assign(this.firebaseData, myRecords);
			let ref = FireStore.db.collection("users").doc(FireStore.uid())
					.collection("pee").doc(this.yymmdd)
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
		retrieve() {
			let days = ["日", "一", "二", "三", "四", "五", "六"]
			this.datas = [];
			for(let key in this.firebaseData) {
				let d = new Date(this.yymmdd + "-" + key)
				let json = {key, data: this.firebaseData[key], days: days[d.getDay()]};
				this.datas.push(json)
			}
			this.datas.sort(function(a, b){
				return a.key < b.key ? 1 : -1;
			});
			// console.log(this.datas)
		}
	},
	watch: {
	},
});