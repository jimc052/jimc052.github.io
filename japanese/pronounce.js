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
			<RadioGroup v-model="word" type="button" style="margin-left: 10px;">
				<Radio label="平">平假</Radio>
				<Radio label="片"  v-if="index == 0">片假</Radio>
			</RadioGroup>
		</div>

		<table  id="tbl50" style="border-collapse:collapse; width: 100%;">
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
					@click="play(index1, index2)">
					{{item2 == null ? "" : item2[word]}}
					<div>{{item2 == null ? "" : item2["mp3"]}}</div>
				</td>
			</tr>
		</table>
	</div>`,
	props: {
		// datas: {
		// 	type: Array,
		// 	// require: true, 
		// 	default: [] // 
		// },
	},
	data() {
		return {
			index: "0",
			word: "平",
			active: "",
			mode: "",
			width: 0,
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
			this.active = "";
			if(this.index != "0") {
				this.word = "平"
			}
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