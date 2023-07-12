let token = Date.now 
// open -a Google\ Chrome "index.html"
Vue.component('pronounce', { 
	template:  `
	<div style="height: 100%; width: 100%; overflow: auto; display: flex; flex-direction: column; padding-right: 5px;">
		<div style="display: flex; flex-direction: row; margin: 5px 0px;">
			<RadioGroup v-model="index" type="button" style="" @on-change="onChangeIndex">
				<Radio label="0">清音</Radio>
				<Radio label="1">濁音</Radio>
				<Radio label="2">拗音</Radio>
			</RadioGroup>
			<div :style="{flex: width < 400 ? 1 : null, width: width < 400 ? null : '20px'}" />
			<RadioGroup v-if="width < 600" v-model="word" type="button" style="margin-left: 10px;">
				<Radio label="平">平假</Radio>
				<Radio label="片">片假</Radio>
			</RadioGroup>
		</div>

		<table id="tbl50" style="border-collapse:collapse; width: 100%;">
			<tr>
				<td @click="playAll()" style="cursor: pointer;" />
				<td v-for="(item1, index1) in ['a','i','u','e','o']" :key="index1" @click="playColumn(index1)" style="cursor: pointer;">
				{{item1}}
				</td>
			</tr>
			<tr v-for="(item1, index1) in datas[index]" :key="index1">
				<td @click="playRow(index1)" style="cursor: pointer;">
					{{item1[0][word].substr(0, 1)}}
				</td>
				<td v-for="(item2, index2) in item1" :key="index2" 
					:class="{cell: item2 != null, active: active == index1 + '-' + index2}"
					@click="play(index1, index2)"
				>

					<div v-if="width < 600" style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
						{{item2 == null ? "" : item2[word]}}
					</div>
					<div v-else style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
						<span>{{item2 == null ? "" : item2["平"]}}</span>
						<span style="margin-left: 5px; color: orange;">{{item2 == null ? "" : item2["片"]}}</span>
					</div>

					<div style="color: #2d8cf0" :class="{active: active == index1 + '-' + index2}">
						{{item2 == null ? "" : item2["mp3"]}}
					</div>
				</td>
			</tr>
		</table>
	</div>`,
	//
	props: {
	},
	data() {
		return {
			index: "0",
			word: "平",
			active: "",
			mode: "",
			width: 0,
			datas: this.$japanese(),
			// mp3: false
		};
	},
	created(){
	},
	async mounted () {
		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
		window.addEventListener('keydown', this.onKeydown, false);
	},
	destroyed() {
		this.broadcast.$off('onResize', this.onResize);
		window.removeEventListener('keydown', this.onKeydown, false);
  },
	methods: {
		onResize(){
			this.width = document.body.clientWidth;
		},
		onChangeIndex(e) {
			// document.querySelector("#tbl50").innerHTML = "";
			this.active = "";
			if(this.index != "0") {
				this.word = "平"
			}
			setTimeout(() => {
				let tr = document.querySelectorAll("#tbl50 tr");
				for(let i = 0; i < tr.length; i++) {
					let td = tr[i].querySelectorAll("td");
					if(this.index == "2") {
						td[2].classList.add("hidden");
						td[4].classList.add("hidden");
					} else {
						td[2].classList.remove("hidden");
						td[4].classList.remove("hidden");
					}
				}
			}, 100);
		},
		async play(row, col) {
			if(Player.mode != "") await Player.wait(1);
			this.mode = "";
			token = Date.now();
			this.active = row + "-" + col;
			let data = this.datas[this.index];
			if(data[row][col] != null) {
				await Player.play(data[row][col].mp3);
			}
		},
		async playColumn(col) {
			if(Player.mode != "") await Player.wait(1);
			this.mode = "col";
			let data = this.datas[this.index];
			let now = token = Date.now();

			for(let i = 0; i < data.length; i++){
				// console.log("playRow: " + now + ", " + token)
				if(now != token) break;
				if(data[i][col] != null ) {
					this.active = i + "-" + col;
					await Player.play(data[i][col].mp3);
				}
			}
			setTimeout(() => {
				this.active = "";
			}, 1000);
		},
		async playRow(row) {
			if(Player.mode != "") await Player.wait(1);
			this.mode = "row";
			let now = token = Date.now();
			let data = this.datas[this.index];
			do {
				for(let i = 0; i < data.length; i++){
					if(now != token) break;
					if(data[row][i] != null){
						this.active = row + "-" + i;
						await Player.play(data[row][i].mp3);
					}
				}
				await Player.wait(1);
				this.active = "";
			} while (now == token)
		},
		async playAll() {
			if(Player.mode != "") await Player.wait(1);
			this.mode = "all";
			let now = token = Date.now();
			let data = this.datas[this.index];
			for(let i = 0; i < data.length; i++){
				let row = data[i];
				for(let j = 0; j < row.length; j++){
					if(now != token) break;
					if(row[j] != null){
						this.active = i + "-" + j;
						await Player.play(row[j].mp3);
					}
				}
			}
			setTimeout(() => {
				this.active = "";
			}, 1000);
		},
		onKeydown(event){
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			// let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			// let sk = event.shiftKey, code = event.keyCode;
			// let char = (event.keyCode >=48 && event.keyCode <=122) ? String.fromCharCode(event.keyCode).toUpperCase() : "";
			// console.log(event.keyCode + ", " + this.active)
			// console.log(o.id)
			if(o.tagName == "INPUT") return;
			let row = 0, col = 0;
			if(typeof this.active == "string" && this.active.indexOf("-") > 0) {
				let arr = this.active.split("-");
				row = arr[0];
				col = arr[1]
			} else if(event.keyCode >= 37 && event.keyCode <= 40){
				this.play(0, 0, true);
				return;
			}
			let datas = this.datas[this.index];

			if(event.keyCode == 37) { // left
				do {
					col--;
					if(col == -1) {
						return;
					}
					if(datas[row][col] != null) {
						break;
					}
				} while(col > -1)
			} else if(event.keyCode == 38) { // up
				do {
					row--;
					if(row == -1) {
						return;
					}
					if(datas[row][col] != null) {
						break;
					}
				} while(row > -1)				
			} else if(event.keyCode == 39) { // right
				do {
					col++;
					if(col >= datas[row].length) {
						row++;
						if(row >= datas.length) {
							row = 0;
						}
						col = 0;
						// return;
					}
					if(datas[row][col] != null) {
						break;
					}
				} while(col < datas[row].length)
			} else if(event.keyCode == 40) { // down
				if(this.mode == "row") {
					row++;
					col = 0;
					if(row >= datas.length) {
						row = 0;
					}
					this.playRow(row);
					return;
				} else {
					do {
						row++;
						if(row >= datas.length) {
							return;
						}
						if(datas[row][col] != null) {
							break;
						}
					} while(row < datas.length)					
				}
			} else {
				return;
			}
			this.play(row, col, true);
			// if(b == true) {
				event.preventDefault();
				event.stopImmediatePropagation();
				event.stopPropagation();				
			// }
		},
	},
	watch: {
	},
});


/*
https://www.iviewui.com/components/table
https://www.iviewui.com/view-ui-plus/component/base/icon
*/