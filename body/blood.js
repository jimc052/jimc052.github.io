Vue.component('blood', { 
	template:  `
		<div style="height: 100%; display: flex; flex-direction: column;">
			<Spin size="large" fix v-if="spinShow"></Spin>
			<div id="header" style="background: #c01921; color: white;  font-size: 30px;
				display: flex; flex-direction: row; align-items: center;
				justify-content: center;">
				<div style="flex: 1; margin: 0 10px;">
				</div>
				<Icon type="ios-arrow-back" size="32" @click.native="onClickIcon(-1)" 
					style="cursor: pointer; margin-right: 10px;"/>
				{{yymm}}
				<Icon type="ios-arrow-forward" size="32" @click.native="onClickIcon(1)" 
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
			<div v-if="table.length == 0 && calendar == 'ios-calendar' " style="flex: 1; overflow-y: auto; background: white;" class="container">
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
										color: item3 >= 140 ? '#c01921' 
											: (item3 >= 120 ? '#ff9900' : 'rgb(45, 140, 240)'),
										'font-weight': item3 >= 140 ? '900' : '400'
									}"
								>
									{{item3}}
								</span>
								<span v-if="(index3 == 1)"  style="font-size: 18px;"
									:style="{
										color: item3 >= 90 ? '#c01921' 
											: (item3 >= 80 ? '#ff9900' : 'rgb(45, 140, 240)'),
										'font-weight': item3 >= 90 ? '900' : '400'
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
			
			<div v-else-if="table.length == 0 && calendar == 'ios-calendar-outline' " style="flex: 1; overflow-y: auto; background: white;" class="container">
				<div v-for="(item, index) in datas" 
					style="padding: 5px 10px;
						display: flex; flex-direction: row; align-items: center; justify-content: center;"
					:style="{'border-bottom': '1px solid #eee'}"
				>
					<div>{{index}}</div>
					<div style="flex: 1"></div>
			
					<!-- start -->
					<div v-for="(item3, index3) in item.split('/')">
						<span v-if="! (index3 == 0)" style="font-size: 14px;">{{"/"}}</span>
						<span v-if="(index3 == 0)" style="font-size: 18px;  "
							:style="{
								color: item3 >= 140 ? '#c01921' 
									: (item3 >= 120 ? '#ff9900' : 'rgb(45, 140, 240)'),
								'font-weight': item3 >= 140 ? '900' : '400'
							}"
						>
							{{item3}}
						</span>
						<span v-if="(index3 == 1)"  style="font-size: 18px;"
							:style="{
								color: item3 >= 90 ? '#c01921' 
									: (item3 >= 80 ? '#ff9900' : 'rgb(45, 140, 240)'),
								'font-weight': item3 >= 90 ? '900' : '400'
							}"
						>
							{{item3}}
						</span>
						<span v-if="index3 == 2"  style="font-size: 18px;">{{item3}}</span>
					</div>
				</div>
				<!-- end -->
			</div>
			<div v-else style="flex: 1; overflow-y: auto; background: white;" class="container">
				<table style="border-collapse: collapse; width: 100%;" >
					<tr v-for="(item, index) in table" style="cursor: pointer;"
						:style="{background: item[6] == 'Y' ? '#eee' : 'white'}"
						v-if="index == 0 || (filter == true && item[6] == 'N') ||  filter == false"
					>
						<td :id="'td_' + index + '_' + index2" v-for="(item2, index2) in item" @click.stop="onChange(index)"
						>
							<div v-if="index > 0 && index2 == 0">
								<Icon :type="item[0].substr(10).trim() <= '12' ? 'ios-sunny' : 'ios-moon' " 
									:size="item[0].substr(10).trim() <= '12' ? 20 : 16"
									:style="{color: item[0].substr(10).trim() <= '12' ? '#c01921' : 'dimgray'}"
								>
								</Icon>
								<span :style="{color: item[0].substr(10).trim() <= '12' ? '#c01921' : 'dimgray'}">{{item2}}</span>
							</div>
							<Icon v-else-if="index > 0 && index2 == 6 && item2 == 'Y' " 
								type="ios-trash" size="16" color='#c01921'> </Icon>
							<div v-else>
								{{item2}}
							</div>
						</td>
					</tr>
				</table>
			</div>
			<i-button v-if="table.length > 0"  shape="circle"
				:type="filter == false ? 'primary' : 'warning'" 
				:icon="filter == false ? 'md-color-filter' : 'md-close'" 
				circle @click.native="filter = !filter" size="large"
				style="position: absolute; bottom: 60px; right: 10px;"
				
			></i-button>

			<i-button v-if="calendar == 'ios-calendar' && (canEdit == true || table.length > 0)" type="error" shape="circle" 
				:icon="table.length > 0 ? 'md-checkmark' : 'md-add'" 
				circle @click.native="table.length > 0 ? onSaveTable() : onAdd()" size="large"
				style="position: absolute; bottom: 10px; right: 10px;"
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
			table: [],
			filter: false,
			canEdit: false,
			recorder: undefined,
			active: -1,
			calendar: "ios-calendar"
		};
	},
	created(){
	},
	async mounted () {
		document.title = "血壓記錄";

		window.ondrop = (e) => {
			e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.items) {
        const data = e.dataTransfer.items;
        for (var i = 0; i < data.length; i++) {
          // console.log(data[i]);
          if (data[i].kind === "file") {
            var file = data[i].getAsFile();
            // console.log('file[' + i + '].name = ' + file.name);
            let reader = new FileReader();
            reader.onload = (event) => {
              // let json = JSON.parse(event.target.result);
              if (file.name.indexOf(".csv") > -1 ) {
                // console.log(event.target.result);
								localStorage["blood-table-drop"] = event.target.result;
								this.onDrop(event.target.result)
              }
            };
            reader.readAsText(file);
						break;
          }
        }
      }
    };

		window.ondragover = (e) =>{
      e.preventDefault();
    }
		await  this.fetch();

		if(typeof localStorage["blood-table-drop"] == "string") {
			this.onDrop(localStorage["blood-table-drop"]);
		} else if(typeof localStorage["blood-table-array"] == "string") {
			this.table = JSON.parse(localStorage["blood-table-array"]);
			setTimeout(() => {
				this.beautify();
			}, 600);
		}
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
		onChange(index){
			if(index > 0){
				let item = this.table[index]
				item[6] = item[6] == "Y" ? "N" : "Y";
				this.$set(this.table, index, item);
				delete localStorage["blood-table-drop"];
				localStorage["blood-table-array"] = JSON.stringify(this.table);
			}
		},
		onChangeRecorder(data) {
			if(typeof data == "object" && data != null) {
				console.log(JSON.stringify(data))
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
		async onDrop(result) {
			let arr = result.split("\n"), count = 0;
			// console.log(arr)
			this.table = [];
			arr.forEach((el, index) => {
				if(el.trim().length > 0 && (el.indexOf("測量日期") > -1 || el.indexOf(this.yymm) == 0)) {
					let row = el.split(","), date = null;
					if(el.indexOf("測量日期") == -1){
						date = new Date(row[0]);
						row[0] = date.toString("yyyy-mm-dd hh:MM");
					} 
					if(el.indexOf("測量日期") == 0){ //  
						let col6 = "刪除";
						row.push(col6);
						this.table.push(row)						
					} else if(row[4] >= 65 || date.getHours() <= 5 || date.getHours() > 18){ //  
						let col6 =(row[4] < 65 ? "Y" : "N");
						row.push(col6);
						this.table.push(row)						
					}
				}
			});
			// console.log(this.table)
			setTimeout(() => {
				this.beautify();
			}, 600);
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
		async onSaveTable() {
			let json = {};
			for(let i = 1; i < this.table.length; i++){
				let row = this.table[i];
				if(row[6] == "Y") continue;
				let arr2 = row[0].split(" ")
				let key = arr2[0].substr(8);
				if(arr2[1].length == 4) arr2[1] = "0" + arr2[1];
				if(typeof json[key] == "undefined") json[key] = {};
				json[key][arr2[1]] = row[2] + "/" + row[3] + "/" + row[4];
			}
			this.firebaseData = Object.assign(this.firebaseData, json);
			await this.onSave();

			this.table = [];
			this.retrieve();
			delete localStorage["blood-table-drop"];
			delete localStorage["blood-table-array"];
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
			// console.log(JSON.stringify(this.datas))
		},
		beautify(){
			for(let i = 1; i < this.table.length; i++) {
				let td3 = document.getElementById(`td_${i}_2`);
				let value = this.table[i][2];
				td3.style.color = (value >= 140 ? '#c01921' : (value >= 120 ? '#ff9900' : 'rgb(45, 140, 240)'));

				let td4 = document.getElementById(`td_${i}_3`)
				value = this.table[i][3];
				td4.style.color = (value >= 90 ? '#c01921' : (value >= 80 ? '#ff9900' : 'rgb(45, 140, 240)'));

				let td5 = document.getElementById(`td_${i}_4`)
				if(this.table[i][4] < 70) td5.style.color = "#c01921";
			}
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
				let date = new Date(), 
					ds = {};
				this.spinShow = true;

				for(let i = 0; i <= 5; i++) {
					let yymm = date.addMonths(i  * -1).toString("yyyy-mm");
					let data = await this.fetch2(yymm);
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
							ds[yymm + "-" + key] = arr[0].join("/")
						} else if(arr[0].length == 0 && arr[1].length == 3) {
							ds[yymm + "-" + key] = arr[1].join("/");
						} else if(arr[0].length == 3 && arr[1].length == 0) {
							ds[yymm + "-" + key] = arr[0].join("/");
						}
					}
				}

				let today = date.addDays(-1), result = {};
				for(let i = 0; i < 24; i++) {
					let span = "", arr = [];
					for(let j = 0; j < 7; j++) {
						let yymmdd = today.toString("yyyy-mm-dd");
						if(j == 0) 
							span = yymmdd;
						else if(j == 6)
							span = yymmdd + "~" + span;
						if(typeof ds[yymmdd] != "undefined") {
							arr.push(ds[yymmdd]);
						}
						today = today.addDays(-1);
					}
					if(arr.length > 0) {
						let arr2 = [0, 0, 0];
						for(let j = 0; j < arr.length; j++) {
							let arr3 = arr[j].split("/")
							// console.log("arr3: " + (j) + " => " + JSON.stringify(arr3));
							for(let k = 0; k < arr3.length; k++) {
								arr2[k] += parseInt(arr3[k], 10);
							}
						}
						for(let j = 0; j < arr2.length; j++) {
								arr2[j] = Math.floor(arr2[j] / arr.length);
						}
						// arr[0][j] = (parseInt(arr[0][j], 10) + parseInt(arr[1][j], 10)) / 2;
						// console.log("區間：" + span)
						// console.log(JSON.stringify(arr2));
						result[span] = arr2.join("/")
					} else {
						// console.log(span + ": none")
					}
				}
				this.datas = result;
				// console.log(JSON.stringify(result, 2, null));
				// console.log(today)
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
	},
	watch: {
	},
});