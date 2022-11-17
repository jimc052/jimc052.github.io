Vue.component('letter', { 
	template:  `<div id="frame" style="height: 100%; width: 100%; overflow: auto; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
		<div id="header" style="display: flex; flex-direction: row; margin: 5px; z-index: 10;" :style="{width: size + 'px'}">
			<RadioGroup v-model="index" type="button" style="" @on-change="onChangeIndex">
				<Radio label="0">清音</Radio>
				<Radio label="1">濁音</Radio>
			</RadioGroup>
			<div style="flex: 1"></div>
			<RadioGroup v-model="word" type="button" @on-change="onChangeWord">
				<Radio label="平">平假</Radio>
				<Radio label="片"  v-if="index == 0">片假</Radio>
			</RadioGroup>
		</div>

		<vm-canvas ref="canvas" v-if="size > 0" style="margin-top: 20px;" :size="size" :char="datas[index][row][col][word]" 
			:style="{width: size + 'px'}"
		>
		</vm-canvas>

		<div style="margin-top: 10px; display: flex; flex-direction: row; justify-content: space-between;" :style="{width: size + 'px'}">
			<Icon type="ios-arrow-back" size="40" style="z-index: 10;cursor: pointer; color: #2d8cf0;" @click="goto(37)"></Icon>
			<Icon type="md-volume-up" size="40" style="z-index: 10;cursor: pointer; color: #2d8cf0;" @click="reset()" />
			<Icon type="ios-arrow-forward" size="40" style="z-index: 10; cursor: pointer; color: #2d8cf0;"  @click="goto(39)"></Icon>
		</div>

		<div style="margin-top: 10px; display: flex; flex-direction: row; padding: 10px; align-items: center; justify-content: center;""
			:style="{width: size + 'px'}"
		>
			<span style="font-size: 18px; color: #2d8cf0;">{{(row + 1) + '列 / ' + (col+1) + '行'}}</span>
			<div style="flex: 1" />
			<span style="font-size: 26px; color: #2d8cf0; margin-left: 10px;">{{datas[index][row][col]['mp3']}}</span>
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
			datas: [
				[[{"平":"あ","mp3":"a","片":"ア"},{"平":"い","mp3":"i","片":"イ"},{"平":"う","mp3":"u","片":"ウ"},{"平":"え","mp3":"e","片":"エ"},{"平":"お","mp3":"o","片":"オ"}],[{"平":"か","mp3":"ka","片":"カ"},{"平":"き","mp3":"ki","片":"キ"},{"平":"く","mp3":"ku","片":"ク"},{"平":"け","mp3":"ke","片":"ケ"},{"平":"こ","mp3":"ko","片":"コ"}],[{"平":"さ","mp3":"sa","片":"サ"},{"平":"し","mp3":"si","片":"シ"},{"平":"す","mp3":"su","片":"ス"},{"平":"せ","mp3":"se","片":"セ"},{"平":"そ","mp3":"so","片":"ソ"}],[{"平":"た","mp3":"ta","片":"タ"},{"平":"ち","mp3":"ci","片":"チ"},{"平":"つ","mp3":"cu","片":"ツ"},{"平":"て","mp3":"te","片":"テ"},{"平":"と","mp3":"to","片":"ト"}],[{"平":"な","mp3":"na","片":"ナ"},{"平":"に","mp3":"ni","片":"ニ"},{"平":"ぬ","mp3":"nu","片":"ヌ"},{"平":"ね","mp3":"ne","片":"ネ"},{"平":"の","mp3":"no","片":"ノ"}],[{"平":"は","mp3":"ha","片":"ハ"},{"平":"ひ","mp3":"hi","片":"ヒ"},{"平":"ふ","mp3":"hu","片":"フ"},{"平":"へ","mp3":"he","片":"ヘ"},{"平":"ほ","mp3":"ho","片":"ホ"}],[{"平":"ま","mp3":"ma","片":"マ"},{"平":"み","mp3":"mi","片":"ミ"},{"平":"む","mp3":"mu","片":"ム"},{"平":"め","mp3":"me","片":"メ"},{"平":"も","mp3":"mo","片":"モ"}],[{"平":"や","mp3":"ya","片":"ヤ"},null,{"平":"ゆ","mp3":"yu","片":"ユ"},null,{"平":"よ","mp3":"yo","片":"ヨ"}],[{"平":"ら","mp3":"ra","片":"ラ"},{"平":"り","mp3":"ri","片":"リ"},{"平":"る","mp3":"ru","片":"ル"},{"平":"れ","mp3":"re","片":"レ"},{"平":"ろ","mp3":"ro","片":"ロ"}],[{"平":"わ","mp3":"wa","片":"ワ"},null,null,null,{"平":"を","mp3":"o","片":"ヲ"}],[{"平":"ん","mp3":"n","片":"ン"},null,null,null,null]],
				[[{"平":"が","mp3":"ga"},{"平":"ぎ","mp3":"gi"},{"平":"ぐ","mp3":"gu"},{"平":"げ","mp3":"ge"},{"平":"ご","mp3":"go"}],[{"平":"ざ","mp3":"za"},{"平":"じ","mp3":"zi"},{"平":"ず","mp3":"zu"},{"平":"ぜ","mp3":"ze"},{"平":"ぞ","mp3":"zo"}],[{"平":"だ","mp3":"da"},{"平":"ぢ","mp3":"di"},{"平":"づ","mp3":"du"},{"平":"で","mp3":"de"},{"平":"ど","mp3":"do"}],[{"平":"ば","mp3":"ba"},{"平":"び","mp3":"bi"},{"平":"ぶ","mp3":"bu"},{"平":"べ","mp3":"be"},{"平":"ぼ","mp3":"bo"}],[{"平":"ぱ","mp3":"pa"},{"平":"ぴ","mp3":"pi"},{"平":"ぷ","mp3":"pu"},{"平":"ぺ","mp3":"pe"},{"平":"ぽ","mp3":"po"}]],
				[[{"平":"きゃ","mp3":"kya"},null,{"平":"きゅ","mp3":"kyu"},null,{"平":"きょ","mp3":"kyo"}],[{"平":"しゃ","mp3":"sya"},null,{"平":"しゅ","mp3":"syu"},null,{"平":"しょ","mp3":"syo"}],[{"平":"ちゃ","mp3":"cya"},null,{"平":"ちゅ","mp3":"cyu"},null,{"平":"ちょ","mp3":"cyo"}],[{"平":"にゃ","mp3":"nya"},null,{"平":"にゅ","mp3":"nyu"},null,{"平":"にょ","mp3":"nyo"}],[{"平":"ひゃ","mp3":"hya"},null,{"平":"ひゅ","mp3":"hyu"},null,{"平":"ひょ","mp3":"hyo"}],[{"平":"みゃ","mp3":"mya"},null,{"平":"みゅ","mp3":"myu"},null,{"平":"みょ","mp3":"myo"}],[{"平":"りゃ","mp3":"rya"},null,{"平":"りゅ","mp3":"ryu"},null,{"平":"りょ","mp3":"ryo"}],[{"平":"ぎゃ","mp3":"gya"},null,{"平":"ぎゅ","mp3":"gyu"},null,{"平":"ぎょ","mp3":"gyo"}],[{"平":"じゃ","mp3":"zya"},null,{"平":"じゅ","mp3":"zyu"},null,{"平":"じょ","mp3":"zyo"}],[{"平":"びゃ","mp3":"bya"},null,{"平":"びゅ","mp3":"byu"},null,{"平":"びょ","mp3":"byo"}],[{"平":"ぴゃ","mp3":"pya"},null,{"平":"ぴゅ","mp3":"pyu"},null,{"平":"ぴょ","mp3":"pyo"}]]
			]
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
				this.row = pos[1];
				this.col = pos[2];
			}
			// console.log(pos)
		}
		
		window.addEventListener('keydown', this.onKeydown, false);
	},
	destroyed() {
		window.removeEventListener('keydown', this.onKeydown, false);
  },
	methods: {
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
		}
	},
	watch: {
	},
});
