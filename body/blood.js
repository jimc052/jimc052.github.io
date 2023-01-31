Vue.component('blood', { 
	template:  `
		<div style="height: 100%; display: flex; flex-direction: column;">
			<Spin size="large" fix v-if="spinShow"></Spin>
			<div id="header" style="background: #c01921; color: white;  font-size: 30px;
				display: flex; flex-direction: row; align-items: center;
				justify-content: center;">
				<div style="flex: 1; margin: 0 10px;">
					<Radio-group v-model="switch1" type="button" size="small" @on-change="onSwitch">
						<Radio label="130"></Radio>
						<Radio label="120"></Radio>
					</Radio-group>
				</div>
				<Icon type="ios-arrow-back" size="32" @click.native="onClickIcon(-1)" 
					style="cursor: pointer; margin-right: 10px;"/>
				{{yymm}}
				<Icon type="ios-arrow-forward" size="32" @click.native="onClickIcon(1)" 
					style="cursor: pointer; margin-left: 10px;"/>
				<div style="flex: 1; display: flex; flex-direction: row; align-items: center; justify-content: flex-end;">
					<Icon type="md-swap" size="32" @click.native="$emit('change-page', 'pee')" 
						style="cursor: pointer; margin: 0px 10px;"/>
				</div>
			</div>
			<div v-if="mode == 'list'" style="flex: 1; overflow-y: auto; background: white;">
				<div v-for="(item, index) in datas" 
					style="padding: 5px 10px;
						display: flex; flex-direction: row; align-items: center; justify-content: center;"
					:style="{'border-bottom': '1px solid #eee'}">

					<div style="margin-right: 10px;">
						<span style="font-size: 20px;">{{item.key}}</span>
						<span style="font-size: 12px;"
							:style="{color: '六日'.indexOf(item.days) > -1 ? '#c01921' : ''}">
							{{"(" + item.days + ")"}}
						</span>
					</div>

					<div v-for="(item2, index2) in item.data" 
						style="flex: 1; display: flex; flex-direction: row; 
							justify-content: flex-start; align-items: center; ">
						<div style="font-size: 16px; margin-right: 10px;">
						{{index2}}
						</div>
						<div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
							<div v-for="(item3, index3) in item2.split('/')">
								<span v-if="! (index3 == 0)" style="font-size: 14px;">{{"/"}}</span>
								<span v-if="(index3 == 0)" style="font-size: 18px;"
									:style="{color: item3 >= switch1 ? '#c01921' : 'rgb(45, 140, 240)'}">{{item3}}</span>
								<span v-if="(index3 == 1)"  style="font-size: 18px;"
									:style="{color: item3 >= (switch1 == 130 ? 90 : 80) ? '#c01921' : 'rgb(45, 140, 240)'}">{{item3}}</span>
								<span v-if="index3 == 2"  style="font-size: 18px;">{{item3}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else style="flex: 1; overflow-y: auto; background: white;">
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
			<i-button v-if="mode == 'table' && table.length > 0"  shape="circle"
				:type="filter == false ? 'primary' : 'warning'" 
				:icon="filter == false ? 'md-color-filter' : 'md-close'" 
				circle @click.native="filter = !filter" size="large"
				style="position: absolute; bottom: 60px; right: 10px;"
			></i-button>

			<i-button v-if="mode == 'table' && table.length > 0" type="error" shape="circle" icon="md-checkmark" 
				circle @click.native="onSave" size="large"
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
			datas: [],
			firebaseData: {},
			mode: "list",
			table: [],
			filter: false,
			switch1: "130",
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
								this.onAdd(event.target.result)
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
			this.onAdd(localStorage["blood-table-drop"]);
		} else if(typeof localStorage["blood-table-array"] == "string") {
			this.table = JSON.parse(localStorage["blood-table-array"]);
			this.mode = "table";
			setTimeout(() => {
				this.beautify();
			}, 600);
		}

		if(typeof localStorage["blood-switch"] == "string") {
			this.switch1 = localStorage["blood-switch"];
		}
	},
	destroyed() {
		window.ondrop = null;
		window.ondragover = null;
  },
	methods: {
		onSwitch(e){
			localStorage["blood-switch"] = e;
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

			this.yymm = arr[0] + "-" + (arr[1] < 10 ? "0" : "") + arr[1]
			await this.fetch();
		},
		async onAdd(result) {
			let arr = result.split("\n"), count = 0;
			console.log(arr)
			this.table = [];
			arr.forEach((el, index) => {
				if(el.trim().length > 0 && (el.indexOf("測量日期") > -1 || el.indexOf(this.yymm) == 0)) {
					let row = el.split(",");
					if(el.indexOf("測量日期") == -1){
						let date = new Date(row[0]);
						row[0] = date.toString("yyyy-mm-dd hh:MM");
					} 
					
					if(el.indexOf("測量日期") == 0 || (el.indexOf("測量日期") == -1 && row[4] >= 70 )){ //  
						let col6 = el.indexOf("測量日期") > -1 ? "刪除" : (row[4] < 65 ? "Y" : "N");
						row.push(col6);
						this.table.push(row)						
					}
				}
			});
			console.log(this.table)
			this.mode = "table";
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
		async onSave() {
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
			let ref = FireStore.db.collection("users").doc(FireStore.uid())
					.collection("blood").doc(this.yymm);
			this.mode = "list";
			this.table = [];
			this.spinShow = true;
			try {
				let x = await ref.set(this.firebaseData);
				this.retrieve();

				delete localStorage["blood-table-drop"];
				delete localStorage["blood-table-array"];
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
				let d = new Date(this.yymm + "-" + key)
				let json = {key, data: this.firebaseData[key], days: days[d.getDay()]};
				this.datas.push(json)
			}
			this.datas.sort(function(a, b){
				return a.key < b.key ? 1 : -1;
			});
			// console.log(this.datas)
		},
		beautify(){
			for(let i = 1; i < this.table.length; i++) {
				// let date = new Date(this.table[i][0]);
				let td3 = document.getElementById(`td_${i}_2`)
				if(this.table[i][2] >= 130) td3.style.color = "#c01921";

				let td4 = document.getElementById(`td_${i}_3`)
				if(this.table[i][3] >= 90) td4.style.color = "#c01921";

				let td5 = document.getElementById(`td_${i}_4`)
				if(this.table[i][4] < 70) td5.style.color = "#c01921";
			}
		}
	},
	watch: {
	},
});