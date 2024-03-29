Vue.component('letter-exam', { 
	template:  `<div id='letter-exam' style="height: 100%; padding: 5px 10px;">
		<div v-if="index > -1" id="frame-letter-exam" 
			style="height: 100%; overflow: hidden; display: flex;"
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
				<Button id="btnRestart" type="primary" size="large" @click="sample" style="">開始</Button>
				<Button size="large" @click="index = -1" style="margin-left: 20px;">設定</Button>
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
			<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 10px; z-index: 10;" :style="{width: '320px'}">
				<CheckboxGroup id="letter-alpha" v-model="alpha" size="large"  @on-change="onChangeAlpha">
					<Checkbox label="a"></Checkbox>
					<Checkbox label="i"></Checkbox>
					<Checkbox label="u"></Checkbox>
					<Checkbox label="e"></Checkbox>
					<Checkbox label="o"></Checkbox>
				</CheckboxGroup>
			</div>

			<div class="button" style="margin-top: 15px;">
				<Icon :type="volumeOn ? 'md-volume-up' : 'md-volume-off'" size="25" @click="changeVolume()" />
			</div>
			
			<Button :disabled="word.length == 0 || tone.length == 0 || alpha.length == 0" 
				type="primary" size="large"  @click="sample" style="width: 100px; margin-top: 30px;">開始</Button>
			<div style="flex: 1" />
			<div style="color: #2d8cf0; font-size: 20px;">2023-10-15 09:00</div>
		</div>
  </div>`,
	props: {
	},
	data() {
		return {
      size: 250,
			word: ["平假"],
			tone: ["清音"],
			alpha: ["a", "i", "u", "e", "o"],
      index: -1,
			datas: [],
      input1: "",
			isSmall: true,
			volumeOn: true
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
		let alpha = window.localStorage["japanese-letter-exam-alpha"]
		if(typeof alpha == "string" && alpha.length > 0){
			this.alpha = JSON.parse(alpha);
		}

		let volume = window.localStorage["japanese-letter-exam-volume"]
		this.volumeOn = volume == "N" ? false : true;

		window.addEventListener('keydown', this.onKeydown, false);
		this.broadcast.$on('onResize', this.onResize);
		this.onResize();

		let arr = document.querySelectorAll("#letter-alpha label span:last-child")
		arr.forEach(el => {
			// console.log(el)
			el.style.padding = "0 5px 0 2px";
			el.style.fontSize = "25px";
		})
	},
	destroyed() {
		window.removeEventListener('keydown', this.onKeydown, false);
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		changeVolume() {
			this.volumeOn = ! this.volumeOn;
			window.localStorage["japanese-letter-exam-volume"] = this.volumeOn ? "Y" : "N";
		},
		onResize() {
			this.isSmall = document.body.clientWidth  < 600 ? true : false;
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
					if(this.index <= this.datas.length - 1) {
						this.datas[this.index].answer = this.input1.trim().length == 0 ? "X" : this.input1.toLowerCase();
						this.$set(this.datas, this.index, this.datas[this.index]);
						this.input1 = "";
						this.execute();
					}
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
			this.datas = []; this.index = -1;
			function getRandom(min,max){
				return Math.floor(Math.random()*max)+min;
			};

			let tone = this.tone.join(",");
			let word = this.word.join(",");
			let alpha = "";
			this.alpha.forEach(el=> {
				if(el == "a")
					alpha += "0";
				else if(el == "i")
					alpha += "1";
				else if(el == "u")
					alpha += "2";
				else if(el == "e")
					alpha += "3";
				else if(el == "o")
					alpha += "4";
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
					for(let k = 0; k < datas3.length; k++) {
						if(alpha.indexOf(k) == -1) continue;
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

			let max = this.tone.length + this.word.length > 2 ? 50 : 30;
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
				if(this.index == 0) {
					let idTime = setInterval(() => {
						let input = document.querySelector("#input1");
						if(input != null) {
							clearInterval(idTime);
							input.setAttribute("autocapitalize","off");
							input.style.textTransform = "lowercase";
							input.style.fontSize = "20px";
							input.focus();
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
		onChangeTone() {
			window.localStorage["japanese-letter-exam-tone"]= JSON.stringify(this.tone);
		},
		onChangeWord() {
			window.localStorage["japanese-letter-exam-word"]= JSON.stringify(this.word);
		},
		onChangeAlpha() {
			window.localStorage["japanese-letter-exam-alpha"]= JSON.stringify(this.alpha);
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