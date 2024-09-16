Vue.component('letter-exam', { 
	template:  `<div id='letter-exam' style="height: 100%; padding: 5px 5px; display: flex; flex-direction: column;">
		<div v-if="index > -1" id="frame-letter-exam" 
			style="flex: 1; overflow: hidden; display: flex;"
			:style="{
				width: isSmall ? '100%' : '700px', 
				flexDirection: isSmall ? 'column' : 'row',
				justifyContent: isSmall ? 'flex-start' : 'center',
				alignItems: isSmall ? 'center' : 'flex-start'
			}"
		>
			<div v-if="index < datas.length" style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
				<vm-canvas ref="canvas" :size="150" :char="datas[index]['char']" />

				<div :style="{width: (size + 80)+ 'px'}" style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
					<Input ref="input1" element-id="input1" v-model="input1"
						style="font-size: 20px; flex: 1; text-transform: lowercase;"
						size="large"
						placeholder="請輸入羅馬拼音後, 按 enter 確認"
						
					/>
					
					<div class="button" style="margin-left: 10px;">
						<Icon type="md-play" size="25" @click="play()" />
					</div>
				</div>
			</div>
			<div v-else style="display: flex; flex-direction: row;">
				<Button v-if="subject == 'sample'" id="btnRestart" type="primary" size="large" @click="sample" style="">開始</Button>
				<Button v-else id="btnSimlar" type="primary" size="large" @click="similar" style="margin-left: 20px;">相似字</Button>
				<Button size="large" @click="setup" style="margin-left: 20px;">設定</Button>
			</div>

			<div style="margin-bottom: 5px; display: flex; flex-direction: column; overflow: auto; " 
				:style="{
					width: isSmall ? (size + 80) + 'px' : (600 - size - 20) + 'px', 
					marginLeft: (isSmall ? '0' : '10') + 'px',
					flex: isSmall ? 1 : 'none',
					height: isSmall ? 'none' : '100%',
					padding: isSmall ? '5px' : '0px',
				}"
			>
				<div style="overflow: auto; flex: 1; border: 1px white solid;" >
					<ul style="list-style-type: none; " class="ul-exam">
						<li v-for="(el, i) in reverseData" style="display: flex; flex-direction: row;">
							<div style="width: 40px; text-align: right;">{{(index - i) + '.'}}</div>
							<div style="flex: 1;">{{el.char}}</div>
							<div  style="width: 40px;">
								<span v-if="el.rome != el.answer" 
									style="
									  font-size: inherit;
									  text-decoration-line: line-through; 
									  text-decoration-color: #f55f67;
									"
								>
									{{el.answer}}
								</span>
							</div>
							<div style="width: 40px;" :style="{color: '#2d8cf0'}">{{el.rome}}</div>
						</li>
					</ul>
				</div>

				<div style="margin-top: 5px; background: white; font-size: 20px; padding: 5px 10px; 
					display: flex; flex-direction: row;"
				>
					<div style="font-size: 20px;">{{"答對：" + answered}}</div>
					<div style="font-size: 20px; flex: 1; text-align: center;">{{"題數：" + datas.length}}</div>
					<div style="font-size: 20px;">{{"分數：" + rate}}</div>
				</div>
			</div>

			<div v-if="isSmall && index > -1" id="letter-exam-keyboard" style="align-self: stretch;">
				<div>
					<div v-for="(ch, index) in 'aeiou'" :key="ch" @click="keySend(ch)">{{ ch }}</div>

					<div @click="keySend('bs')">
						<Icon type="md-backspace" size="25" />
					</div>
				</div>

				<div>
					<div v-for="(ch, index) in keyRandom" :key="ch" @click="keySend(ch)">{{ ch }}</div>
					<div @click="keySend('enter')">
						<Icon type="md-arrow-round-forward" size="25" />
					</div>
				</div>
			</div>
		</div>

		<div v-else style="height: 100%; width: 100%; overflow: auto; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
			<div style="display: flex; flex-direction: row; margin: 5px; z-index: 10;" :style="{width: '320px'}">
				<CheckboxGroup v-model="tone" size="large"  @on-change="onChangeTone">
					<Checkbox label="清音"></Checkbox>
					<Checkbox label="濁音"></Checkbox>
				</CheckboxGroup>
				<div style="flex: 1"></div>
				<CheckboxGroup v-model="word" size="large"  @on-change="onChangeWord">
					<Checkbox label="平假"></Checkbox>
					<Checkbox label="片假"></Checkbox>
				</CheckboxGroup>
			</div>
			<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 10px; z-index: 10;">
				<fieldset style="padding: 0px 0px 5px 10px;" id="field-col">
					<legend>段</legend> 
					<CheckboxGroup id="kana-col" v-model="kanaCol" size="large"  @on-change="onChangeKanaCol">
						<Checkbox label="a"></Checkbox>
						<Checkbox label="i"></Checkbox>
						<Checkbox label="u"></Checkbox>
						<Checkbox label="e"></Checkbox>
						<Checkbox label="o"></Checkbox>
					</CheckboxGroup>
				</fieldset>
			</div>
	
			<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 10px; z-index: 10;">
				<fieldset style="padding: 0px 0px 5px 10px;" id="field-row">
					<legend>行</legend>
					<CheckboxGroup id="kana-row" v-model="kanaRow" size="large"  @on-change="onChangeKanaRow">
						<span v-for="(item, index) in patternRow" >
							<Checkbox v-if="item.trim().length > 0" :label="item"></Checkbox>
							<br  v-if="index > 0 && index % 5 == 4" />
						</span>
					</CheckboxGroup>
				</fieldset>
			</div>

			<div class="button" style="margin-top: 15px;">
				<Icon :type="volumeOn ? 'md-volume-up' : 'md-volume-off'" size="25" @click="changeVolume()" />
			</div>
			<div>
				<Button :disabled="word.length == 0 || tone.length == 0 || (kanaCol.length == 0 && kanaRow.length == 0)" 
					type="primary" size="large"  @click="sample" style="width: 100px; margin-top: 30px;">開始</Button>
				<Button :disabled="word.length == 0" 
					type="primary" size="large"  @click="similar" style="width: 100px; margin-top: 30px;">相似字</Button>
			</div>
			<div style="flex: 1" />
			<div style="color: #2d8cf0; font-size: 20px;">2024-09-16 10:00</div>
		</div>
  </div>`,
	props: {
	},
	data() {
		return {
      size: 250,
			word: ["平假"],
			tone: ["清音"],
			kanaCol: ["a", "i", "u", "e", "o"],
			kanaRow: [],
			patternRow: [], 
      index: -1,
			datas: [],
      input1: "",
			isSmall: true,
			volumeOn: true,
			subject: "",
			keyRandom: "kstnm"
		};
	},
	created(){

	},
	async mounted () {
		let tone = window.localStorage["japanese-letter-exam-tone"]
		if(typeof tone == "string" && tone.length > 0){
			this.tone = JSON.parse(tone);
		}
		let word = window.localStorage["japanese-letter-exam-word"]
		if(typeof word == "string" && word.length > 0){
			this.word = JSON.parse(word);
		}
		let kanaCol = window.localStorage["japanese-letter-exam-kanaCol"]
		if(typeof kanaCol == "string" && kanaCol.length > 0){
			this.kanaCol = JSON.parse(kanaCol);
		}

		let kanaRow = window.localStorage["japanese-letter-exam-kanaRow"]
		if(typeof kanaRow == "string" && kanaRow.length > 0){
			this.kanaRow = JSON.parse(kanaRow);
		}

		let volume = window.localStorage["japanese-letter-exam-volume"]
		this.volumeOn = volume == "N" ? false : true;

		window.addEventListener('keydown', this.onKeydown, false);
		this.broadcast.$on('onResize', this.onResize);
		this.onResize();

		this.renderKanaCol();
		this.renderKanaRow();

		let field_col = document.querySelector("#field-col");
		let field_row = document.querySelector("#field-row");
		field_row.style.width = (field_col.clientWidth + 6) + "px";
	},
	destroyed() {
		window.removeEventListener('keydown', this.onKeydown, false);
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		keySend(c) {
			if(c == "bs") {
				if(this.input1.length > 0) {
					this.input1 = this.input1.substr(0, this.input1.length - 1)
				}
			} else if(c == "enter") {
				if(this.input1.length > 0) {
					this.checkAnswer();
				}
			} else if(this.input1.length <= 2) {
				this.input1 += c;
			}
		},
		setup() {
			this.index = -1;
			setTimeout(() => {
				this.renderKanaCol();
				this.renderKanaRow();
			}, 100);
		},
		renderKanaCol() {
			let arr = document.querySelectorAll("#kana-col label");
			arr.forEach(el => {
				el.style.width = "50px";
			});
	
			arr = document.querySelectorAll("#kana-col label span:last-child");
			arr.forEach(el => {
				el.style.padding = "0 5px 0 2px";
				el.style.fontSize = "18px";
			});
		},
		renderKanaRow() {
			let field_row = document.querySelector("#field-row");
			// field_row.style.visibility = "hidden";

			let s = "";
			let tone = this.tone.join(",");
			if(tone.indexOf("清音") > -1 || this.tone.length == 0) {
				s = "akstnhmyrw撥";
				s += " ".repeat(4);
			}
			if(tone.indexOf("濁音") > -1 || this.tone.length == 0) {
				s += "gzdbp"
			}

			this.patternRow = [];
			for(let i = 0; i < s.length; i++) {
				this.patternRow.push(s.substr(i, 1))
			}
			setTimeout(() => {
				let arr = document.querySelectorAll("#kana-row label span:last-child")
				arr.forEach(el => {
					el.style.padding = "0 5px 0 2px";
					el.style.fontSize = el.innerText.indexOf("撥") > -1 ? "16px" : "18px";
				});

				arr = document.querySelectorAll("#kana-row label");
				arr.forEach(el => {
					el.style.width = "50px";
				});
				// field_row.style.visibility = "visible";
			}, 600);
		},
		changeVolume() {
			this.volumeOn = ! this.volumeOn;
			window.localStorage["japanese-letter-exam-volume"] = this.volumeOn ? "Y" : "N";
		},
		onResize() {
			this.isSmall = document.body.clientWidth  < 600 ? true : false;
		},
		checkAnswer() {
			if(this.index <= this.datas.length - 1) {
				this.datas[this.index].answer = this.input1.trim().length == 0 ? "X" : this.input1.toLowerCase();
				this.$set(this.datas, this.index, this.datas[this.index]);
				this.input1 = "";
				this.execute();
			}
		},
    onKeydown(event) {
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			let ck = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			let ok = navigator.userAgent.indexOf('Macintosh') > -1  ? event.altKey : false;
			let sk = event.shiftKey, code = event.keyCode;
			let id = event.target.id;

			if(o.tagName == "INPUT"){
				if(code == 13) {
					this.checkAnswer();
				} else if(code == 27) {
					this.input1 = "";
				} else if(pk == true) {
					this.play();
				} else if((code >=65 && code <=90) || (code >=97 && code <=122)) {
					let s = "aeioukstnhmyrwncf";
					if(this.tone.join(",").indexOf("濁") > -1)
						s += "gdzjbp";
					let char = String.fromCharCode(code).toLowerCase();
					if(s.indexOf(char) == -1){
						event.preventDefault();
						event.stopImmediatePropagation();
						event.stopPropagation();
					}
				} else if(code > 32) {
					event.preventDefault();
					event.stopImmediatePropagation();
					event.stopPropagation();
        }
			}
    },
    async play() {
			if(this.index < this.datas.length) {
				document.querySelector("#input1").focus();
				// if(! this.volumeOn) return;
				if(Player.mode != "") await Player.wait(1);
				try {
					await Player.play(this.datas[this.index].mp3);
				} catch (e) {

				}
			}
    },
		sample() {
			this.subject = "sample";
			this.datas = []; this.index = -1;
			function getRandom(min,max){
				return Math.floor(Math.random()*max)+min;
			};

			let tone = this.tone.join(",");
			let word = this.word.join(",");
			let kanaCol = "";
			this.kanaCol.forEach(el=> {
				if(el == "a")
					kanaCol += "0";
				else if(el == "i")
					kanaCol += "1";
				else if(el == "u")
					kanaCol += "2";
				else if(el == "e")
					kanaCol += "3";
				else if(el == "o")
					kanaCol += "4";
			});
			let datas1 = this.$japanese(), arr = [];
			for(let i = 0; i < datas1.length - 1; i++) {
				if(i == 0 && tone.indexOf("清") == -1)
					continue;
				else if(i > 0 && tone.indexOf("濁") == -1)
					continue;
	
				let datas2 = datas1[i];
				for(let j = 0; j < datas2.length; j++) {
					let datas3 = datas2[j];
					if(kanaCol.length > 0) { // 段
						for(let k = 0; k < datas3.length; k++) {
							if(kanaCol.indexOf(k) == -1) continue;
							let data = datas3[k];
							if(data != null) {
								let rome = (data["mp3"].indexOf(",") > -1) ? data["mp3"].split(",")[0] : data["mp3"];
								if(word.indexOf("平") > -1)
									arr.push({char: data["平"], mp3: data["mp3"], rome});
								if(word.indexOf("片") > -1)
									arr.push({char: data["片"], mp3: data["mp3"], rome});							
							}
						}
					} else {
						let mp3 = datas3[0].mp3;
						let key = mp3 == "n" ? "撥" : mp3.substr(0, 1);
						let index = this.kanaRow.findIndex(el => {
							return el == key;
						});
						if(index > -1) {
							for(let k = 0; k < datas3.length; k++) {
								let data = datas3[k];
								if(data != null) {
									let rome = (data["mp3"].indexOf(",") > -1) ? data["mp3"].split(",")[0] : data["mp3"];
									if(word.indexOf("平") > -1)
										arr.push({char: data["平"], mp3: data["mp3"], rome});
									if(word.indexOf("片") > -1)
										arr.push({char: data["片"], mp3: data["mp3"], rome});							
								}
							}
						}
					}
				}
			}

			let max = arr.length > 50 ? 50 : 30;
			let cycle = 500;
			while (arr.length > 0 && cycle >= 0) {
				let index = 0;
				if(arr.length > 1) {
					index = getRandom(0, arr.length)
				}
				if(index < arr.length) {
					let data = arr.splice(index, 1);
					this.datas.push(data[0])
					if(this.datas.length == max) break;
				}
				cycle--;
			}
			this.execute();
		},
		similar(){ // 相似字
			this.subject = "similar";
			let word = this.word.join(",");
			let s = (word.indexOf("平") > -1) ? `お,ね,れ,わ,け,は,ほ,す,む,う,つ,き,さ,ち,ぬ,め,ま,も,る,ろ` : "";
			if(word.indexOf("片") > -1) s += (s.length > 0 ? "," : "") + `ウ,ワ,ク,タ,シ,ツ,ン,ソ,セ,ヤ,コ,ユ,ヨ,ル,レ,ス,ヌ,フ,ヲ,ラ,ナ,チ`;

			this.datas = []; this.index = -1;
			function getRandom(min,max){
				return Math.floor(Math.random()*max)+min;
			};

			let datas1 = this.$japanese(), arr = [];
			let datas2 = datas1[0];
			for(let j = 0; j < datas2.length; j++) {
				let datas3 = datas2[j];
				for(let k = 0; k < datas3.length; k++) {
					let data = datas3[k];
					if(data != null) {
						let rome = (data["mp3"].indexOf(",") > -1) ? data["mp3"].split(",")[0] : data["mp3"];
						
						if(s.indexOf(data["平"]) > -1)
							arr.push({char: data["平"], mp3: data["mp3"], rome});
						if(s.indexOf(data["片"]) > -1)
							arr.push({char: data["片"], mp3: data["mp3"], rome});		
					}
				}
			}

			let max = 50;
			let cycle = 500;
			while (arr.length > 0 && cycle >= 0) {
				let index = 0;
				if(arr.length > 1) {
					index = getRandom(0, arr.length)
				}
				if(index < arr.length) {
					let data = arr.splice(index, 1);
					this.datas.push(data[0])
					if(this.datas.length == max) break;
				}
				cycle--;
			}
			this.execute();
		},
		execute() {
			this.index++;
			
			if(this.index == this.datas.length) {
				setTimeout(() => {
					document.querySelector("#btnRestart").focus();
				}, 600);
			} else {
				this.assembleKey();
				if(this.index == 0) {
					let idTime = setInterval(() => {
						let input = document.querySelector("#input1");
						if(input != null) {
							clearInterval(idTime);
							input.setAttribute("autocapitalize","off");
							input.style.textTransform = "lowercase";
							input.style.fontSize = "20px";
							input.focus();
							
							input.readonly = !this.$isDebug() && this.isSmall == true ? true : false;
						}
					}, 300);
				}
				if(this.volumeOn) {
					setTimeout(() => {
						this.play();	
					}, 300);					
				}
			}
		},
		assembleKey() {
			function getRandom(min,max){
				return Math.floor(Math.random()*max)+min;
			};

			let tone = this.tone.join(","), s = "", keyRandom = "";
			if(tone.indexOf("清音") > -1 || this.tone.length == 0) {
				s = "kstnhmyrwncf";
			}
			if(tone.indexOf("濁音") > -1 || this.tone.length == 0) {
				s += "gzdbp"
			}

			let rome = this.datas[this.index].rome;
			if(rome.length > 1)
				keyRandom = rome.substr(0, rome.length - 1);

			while (keyRandom.length < 5) {
				let x = getRandom(0, s.length);
				let s1 = s.substr(x, 1);
				s = s.replace(s1, "");
				if(keyRandom.indexOf(s1) == -1)
					keyRandom += s1;
			}
			// console.log("1. " + keyRandom)

			for(let i = 0; i < 3; i++) {
				let x = getRandom(0, keyRandom.length - 1);
				let s1 = keyRandom.substr(x, 1);
				keyRandom = keyRandom.replace(s1, "") + s1;
			}
			// console.log("2. " + keyRandom)
			this.keyRandom = keyRandom;
		},
		onChangeTone() {
			window.localStorage["japanese-letter-exam-tone"] = JSON.stringify(this.tone);
			this.renderKanaRow();
		},
		onChangeWord() {
			window.localStorage["japanese-letter-exam-word"] = JSON.stringify(this.word);
		},
		onChangeKanaCol() { // 段
			window.localStorage["japanese-letter-exam-kanaCol"] = JSON.stringify(this.kanaCol);

			this.kanaRow = [];
			window.localStorage["japanese-letter-exam-kanaRow"]= JSON.stringify(this.kanaRow);
		},
		onChangeKanaRow() { // 行
			window.localStorage["japanese-letter-exam-kanaRow"]= JSON.stringify(this.kanaRow);

			this.kanaCol = [];
			window.localStorage["japanese-letter-exam-kanaCol"] = JSON.stringify(this.kanaCol);
		}
	},
	computed: {
		reverseData() {
			if(this.index > -1) {
				let arr = this.datas.filter((el, index) => {
					return index < this.index;
				}).reverse();
				return arr;
			} else {
				return [];
			}
		}, 
		answered() {
			let arr = this.datas.filter((el, index) => {
				return el.rome == el.answer;
			});
			return arr.length;
		},
		rate() {
			let correct = 0, total = 0;
			for(let i = 0; i < this.datas.length; i++) {
				if(typeof this.datas[i].answer == "undefined") break;
				total++;
				if(this.datas[i].rome == this.datas[i].answer) {
					correct++;
				}
			}
			return total == 0 ? 0 : Math.floor((correct / total) * 100);
		}
	},
	watch: {
	},
});