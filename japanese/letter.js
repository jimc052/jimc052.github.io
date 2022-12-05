let idTime;
Vue.component('letter', { 
	template:  `<div id="frame" style="height: 100%; width: 100%; overflow: auto; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
		<div id="header" style="display: flex; flex-direction: row; margin: 5px; z-index: 10;" :style="{width: size + 'px'}">
			<RadioGroup v-if="!isTest" v-model="index" type="button" style="" @on-change="onChangeIndex">
				<Radio label="0">清音</Radio>
				<Radio label="1">濁音</Radio>
			</RadioGroup>
			<div v-else style="color: #2d8cf0; font-size: 20px">{{index == 0 ? "清音" : (index == 1 ? "濁音" : "") }}</div>

			<div style="flex: 1"></div>

			<RadioGroup v-if="!isTest" v-model="word" type="button" @on-change="onChangeWord">
				<Radio label="平">平假</Radio>
				<Radio label="片" v-if="index == 0">片假</Radio>
			</RadioGroup>
			<div v-else style="color: #2d8cf0; font-size: 20px">{{word + "假"}}</div>
		</div>

		<vm-canvas ref="canvas" v-if="size > 0" style="margin-top: 20px;" :size="size" 
			:char="row > -1 ? datas[index][row][col][word] : '' " 
			:style="{width: size + 'px'}"
		>
		</vm-canvas>

		<div v-if="row > -1 && isTest == false" style="margin-top: 10px; display: flex; flex-direction: row; justify-content: space-between;" :style="{width: size + 'px'}">
			<div class="button"><Icon type="md-volume-up" size="25" @click="reset()" /></div>
			<div class="button"><Icon type="md-sync" size="25" @click="showOption()" /></div>

			<div style="flex: 1;"></div>

			<div class="button"><Icon type="ios-arrow-back" size="30" @click="goto(37)" /></div>
			<div class="button"><Icon type="ios-arrow-forward" size="30" @click="goto(39)" /></div>
		</div>

		<div v-if="row > -1 && isTest == false" 
			style="margin-top: 10px; display: flex; flex-direction: row; padding: 10px; align-items: center; justify-content: center;""
			:style="{width: size + 'px'}"
		>
			<span style="font-size: 20px; color: #2d8cf0;">{{(row + 1) + '列 / ' + (col+1) + '行'}}</span>
			<div style="flex: 1" />
			<span style="font-size: 26px; color: #2d8cf0;">{{row > -1 ? datas[index][row][col]['mp3'] : "" }}</span>
		</div>

		<div v-if="row == -1 || isTest == true " style="margin-top: 10px; display: flex; flex-direction: row; justify-content: space-between; align-items: center;" :style="{width: size + 'px'}">
			<div class="button">
				<Icon :type=" isTest == true ? 'md-square' : 'md-play' " size="20" @click="test()" />
			</div>

			<Slider v-if="isTest == false" v-model="seconds" :min="1" :max="30" :step="1" :marks="marks" @on-change="onSliderChange"
				style="width: 100%; z-index: 20; padding: 0 10px; s"></Slider>

			<div v-if="isTest == true" style="color: #2d8cf0; font-size: 26px">{{row > -1 ? datas[index][row][col]['mp3'] : ""}}</div>
			<div v-if="isTest == true" style="color: #2d8cf0; font-size: 26px">{{question}}</div>
		</div>

		<div v-if="row == -1 || isTest == true " style="margin-top: 20px; min-height: 20px;" :style="{width: size + 'px'}">
			<div style="display: flex; flex-direction: row; justify-content: flex-start;">
				<span v-for="(item1, index1) in ['a','i','u','e','o']" :key="index1"
					class="button" :class="{active: options.col.indexOf(index1) > -1}"
					style="cursor: pointer; font-size: 22px; margin: 0px;"
					@click="onClickOptions('col', index1)"
				>
					{{item1}}
				</span>
			</div>
			<div style="display: flex; flex-direction: row; justify-content: flex-start; flex-wrap: wrap; height: 85px; margin-top: 5px;">
				<span v-for="(item1, index1) in datas[index]" :key="index1"
					class="button" :class="{active: options.row.indexOf(item1[0][word]) > -1}"
					style="font-size: 20px; margin: 0px;" @click="onClickOptions('row', item1[0][word])"
				>
					{{item1[0][word]}}
				</span>
			</div>
		</div>
  </div>`,
	props: {
	},
	data() {
		return {
			size: 0,
			index: "0",
			word: "平",
			row: 0,
			col: 0,
			question: 0,
			seconds: 10,
			marks: {
				5: '5',
				10: '10',
				15: '15',
				20: '30',
				25: '25',
				30: '30',
			},
			datas: this.$japanese(),
			isTest: false,
			options: {
				col: "",
				row: ""
			}
		};
	},
	created(){
	},
	async mounted () {
		this.size = 300;
		let pos = window.localStorage["japanese-letter-position"];
		if(typeof pos == "string" && pos.length > 0) {
			pos = pos.split(",");
			if(pos.length == 3) {
				this.index = pos[0];
				this.row = parseInt(pos[1], 10);
				this.col = parseInt(pos[2], 10);
			}
			// console.log(pos)
		}
		
		let options = window.localStorage["japanese-letter-options"] //  = JSON.stringify(this.options)
		if(typeof options == "string" && options.length > 0){
			this.options = JSON.parse(options)
		}

		let seconds = window.localStorage["japanese-letter-seconds"] 
		if(typeof seconds == "string" && seconds.length > 0){
			this.seconds = parseInt(seconds)
		}

		window.addEventListener('keydown', this.onKeydown, false);
	},
	destroyed() {
		window.removeEventListener('keydown', this.onKeydown, false);
  },
	methods: {
		onSliderChange(e) {
			window.localStorage["japanese-letter-seconds"] = e;
		},
		onClickOptions(tag, data) {
			data = "" + data;
			if(this.options[tag].indexOf(data) > -1) {
				data = this.options[tag].replace(data, "")
			} else {
				data = this.options[tag] + (data + "");
			}
			this.$set(this.options, tag, data);
			if(this.isTest == true) {
				this.row = -1;
				this.test();				
			}
			window.localStorage["japanese-letter-options"] = JSON.stringify(this.options)
		},
		onChangeIndex() {
			let o = document.activeElement;
			o.blur();
			if(this.index != "0") {
				this.word = "平"
			}
			this.row = 0;
			this.col = 0;
			this.play()
		},
		onChangeWord() {
			let o = document.activeElement;
			o.blur();
		},
		onKeydown(event){
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			// let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			// let sk = event.shiftKey, code = event.keyCode;
			// let char = (event.keyCode >=48 && event.keyCode <=122) ? String.fromCharCode(event.keyCode).toUpperCase() : "";
			// console.log(event.keyCode + ", " + this.active)
			if(o.tagName == "INPUT") return;
			this.goto(event.keyCode, pk)
			// if(b == true) {
				event.preventDefault();
				event.stopImmediatePropagation();
				event.stopPropagation();				
			// }
		},
		async play() {
			if(Player.mode != "") await Player.wait(1);
			let data = this.datas[this.index];
			if(data[this.row][this.col] != null) {
				if(this.isTest == false)
					window.localStorage["japanese-letter-position"] = this.index + "," + this.row + "," + this.col;
				await Player.play(data[this.row][this.col].mp3);
			}
			window.focus();
		},
		goto(keyCode, pk) {
			let rowX = this.row, colX = this.col;
			let datas = this.datas[this.index];
			if(pk == true) {
				if(keyCode == 37)
					colX = 0;
				else if(keyCode == 39) {
					colX = datas[rowX].length - 1;
					do {
						if(datas[rowX][colX] != null) {
							break;
						}
						colX--;
					} while(colX > 0)
				} else if(keyCode == 38){
					rowX = 0;
				} else if(keyCode == 40){
					rowX = datas.length - 1;
					do {
						if(datas[rowX][colX] != null) {
							break;
						}
						rowX--;
					} while(rowX > 0)
				} else {
					return;
				}
			} else if(keyCode == 37) { // left
				do {
					colX--;
					if(colX == -1) {
						if(rowX > 0){
							rowX--;
							colX = datas[rowX].length -1;
						} else 
							return;
					}
					if(datas[rowX][colX] != null) {
						break;
					}
				} while(colX > -1)
			} else if(keyCode == 38) { // up
				do {
					rowX--;
					if(rowX == -1) {
						return;
					}
					if(datas[rowX][colX] != null) {
						break;
					}
				} while(rowX > -1)				
			} else if(keyCode == 39) { // right
				do {
					colX++;
					if(colX >= datas[rowX].length) {
						rowX++;
						if(rowX >= datas.length) {
							rowX = 0;
						}
						colX = 0;
						// return;
					}
					if(datas[rowX][colX] != null) {
						break;
					}
				} while(colX < datas[rowX].length)
			} else if(keyCode == 40) { // down
				do {
					rowX++;
					if(rowX >= datas.length) {
						return;
					}
					if(datas[rowX][colX] != null) {
						break;
					}
				} while(rowX < datas.length)					
			} else {
				return;
			}
			this.row = rowX; this.col = colX;
			this.play();
		},
		reset() {
			let canvas = this.$refs["canvas"];
			canvas.clear();
			this.play();
		}, 
		showOption() {
			this.row = -1;
		},
		test() {
			this.isTest = !this.isTest;
			if(this.isTest == false) {
				clearTimeout(idTime);
				return;
			}

			let sample = [], sec = this.seconds * 1000;
			let datas = this.datas[this.index];
			datas.forEach((el1, row) => {
				if(this.options["row"].length == 0 || this.options["row"].indexOf(el1[0][this.word]) > -1){
					el1.forEach((el2, col) => {
						if(el2 != null && (this.options["col"].length == 0 || this.options["col"].indexOf(col) > -1)){
							sample.push({row, col});
						}
					});
				}
			});

			let max = sample.length;
			let cycle = async () => {
				let index = getRandom(0, sample.length);
				let answer = sample.splice(index, 1);
				this.row = answer[0].row; this.col = answer[0].col;
				this.question = (max - sample.length) + " / " + max;
				await this.play();
				if(sample.length == 0) {
					setTimeout(() => {
						alert("Game Over!!");
						this.isTest = false;					
					}, sec);
				} else {
					idTime = setTimeout(() => {
						if(this.isTest == true)
							cycle();
					}, sec);
				}
			}

			let getRandom = (min,max) => {
					return Math.floor(Math.random()*max)+min;
			};

			cycle();
		}
	},
	watch: {
	},
});