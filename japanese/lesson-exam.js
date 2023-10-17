/* 大家的日本語-單字測驗 */
Vue.component('lesson-exam', { 
	template:  `<div style="padding: 10px; height: 100%; width: 100%; display: flex; flex-direction: column;"
		>
		<div v-if="index == -1" style="display: flex; flex-direction: row;">
			<Select v-model="option"  size="large" @on-change="onChangeLesson"
				style="margin-left: 20px; width:120px; margin-bottom: 5px;"
			>
				<Option v-for="item in options" :value="item" :key="item">{{ item }}</Option>
			</Select>

      <Button type="success" size="large"  @click="sample" 
        style="margin-left: 10px;">開始</Button>
		</div>

    <div v-else style="max-width: 600px; margin-bottom: 0px; display: flex; flex-direction: column; overflow: hidden;" 
				:style="{
					marginLeft: '0px',
					flex:  1,
					height: 'none',
					padding: '0px',
				}"
			>
      <div v-if="index < datas.length">
				<div
          style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
					<Input ref="input1" element-id="input1" v-model="input1"
						style="font-size: 20px; flex: 1; text-transform: lowercase;"
						size="large"
						placeholder="請輸入日文或羅馬拼音加空白"
						autocapitalize="none"
					/>
					
					<div class="button" style="margin-left: 10px;">
						<Icon type="md-play" size="25" @click="play()" />
					</div>
				</div>
				<div style="padding: 5px; min-height: 40px;">{{
					index > -1 && index < datas.length ? datas[index].中 : ""}}</div>
			</div>
      <div v-else style="display: flex; flex-direction: row;">
				<Button id="btnRestart" type="primary" size="large" @click="sample" style="">開始</Button>
				<Button size="large" @click="index = -1" style="margin-left: 20px;">設定</Button>
			</div>

      <div style="margin-bottom: 5px; display: flex; flex-direction: column; overflow: hidden; " 
				:style="{
					marginLeft: '0px',
					flex: 1,
					height:'none' ,
					padding: '5px',
				}"
			>
				<div style="overflow-y: auto; flex: 1; border: 1px white solid;" >
					<ul style="list-style-type: none; " class="ul-exam">
						<li v-for="(el, i) in reverseData" style="display: flex; flex-direction: row;">
              <div style="width: 30px; text-align: right;">{{(index - i) + '.'}}</div>
              <div style="flex: 1; margin-right: 5px; margin-top: 5px;">
								<div class="ruby" v-if="el.ruby != null" v-html="el.ruby  + ' ' + el.重" />
								<div v-else>                
									<div>{{el.語 + ' ' + el.重}}</div>
                	<div>{{el.漢}}</div>
								</div>

								<div v-html="el.rome" style="color: #2d8cf0;"></div>
                <div>{{el.中}}</div>
                <div>
                  <span v-if="el.correct != 'Y' " 
                    style="
                      font-size: inherit;
                      text-decoration-line: line-through; 
                      text-decoration-color: #f55f67;
                    "
                  >
                    {{el.answer}}
                  </span>
                  <span v-else style="color: #2d8cf0;">{{el.answer}}</span>
                </div>
              </div>
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
	</div>`,
	props: {
	},
	data() {
		return {
			options: [],
      option: "",
      index: -1,
      datas: [],
      // size: 250,
      input1: "",
			chinese: ""
		};
	},
	created(){
	},
	async mounted () {
    TTX.initial();

		window.addEventListener('keydown', this.onKeydown, false);
    // TTX.speak('${arr[i].日文}
		let s = window.localStorage["japanese-大家的日本語-exam-option"];
		if(typeof s == "string") {
			this.option = s;
		}
    await this.$appendScript("./datas/大家的日本語/單字.js");
    for(let key in 單字){
      if(this.option == "") this.option = key;
      this.options.push(key)
    }
	},
	destroyed() {
		window.removeEventListener('keydown', this.onKeydown, false);
		this.$removeScript("./datas/大家的日本語/單字.js");
		單字 = undefined;
  },
	methods: {
    onKeydown(event) {
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			let ck = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			let ok = navigator.userAgent.indexOf('Macintosh') > -1  ? event.altKey : false;
			let sk = event.shiftKey, code = event.keyCode;
			let id = event.target.id;

			// let char = (event.keyCode >=48 && event.keyCode <=122) ? String.fromCharCode(event.keyCode).toLocaleLowerCase() : "";
			// console.log(char)
			// console.log(code + ", " + char)
			if(o.tagName == "INPUT"){
				if(code == 13) {
					if(this.index <= this.datas.length - 1) {
						this.compare();
					}
				} else if(code == 27) {
					this.input1 = "";
				} else if(pk) {
					this.play();
				// } else if((code >=65 && code <=90)) { // 
				// 	this.input1 = this.input1.toLowerCase();
        }
			}
    },
    compare() { // 
      let data = this.datas[this.index];
      let correct = () => {
        if(data.answer == data.語)
          return "Y";
        else {
					if(correctWord(data.語) == "Y") 
						return "Y";
					else if(correctWord(data.漢) == "Y") 
						return "Y";
        }
        return "N";
      };
			let correctWord = (word) => {
				let arr = word.indexOf("・") > -1 ? word.split("・") : word.split("、");
				for(let i = 0; i < arr.length; i++) {
					if(arr[i].replace("〜", "~") == data.answer) 
						return "Y";
				}
        return "N";
      };

      let answer = "";
			this.input1 = this.input1.trim().toLowerCase();
			if(this.input1.length == 0) 
				answer = "X";
			else {
				let ascii = this.input1.charCodeAt(0);
				if(ascii >= 97 && ascii <= 122) {
					let datas = window.japanese();

					let findKana = (el)=> {
						for(let x = 0; x < datas.length; x++){
							for(let y = 0; y < datas[x].length; y++){
								for(let z = 0; z < datas[x][y].length; z++){
									if(datas[x][y][z] == null) continue;

									if(datas[x][y][z]["mp3"] === el ) {
										return datas[x][y][z][kana];
									} else if(datas[x][y][z]["mp3"].indexOf(",") > -1){
										let arr = datas[x][y][z]["mp3"].split(",");
										let b = arr.some(el2 => {
											return el2 == el;
										});
										if(b == true) return datas[x][y][z][kana];
									}
								}
							}
						}
						return null;
					}

					let code = data.語.charCodeAt(0);
					let kana = "平";
					if(code >= 12449 && code <= 12531){
						kana = "片";
					}

					let arr = this.input1.split(" ");
					arr.forEach(el => {
						if(el == "~")
							answer += el;
						else {
							let char = findKana(el)
							answer += char == null ? el : char;
						}
					});
				} else {

				}
			} 

			data.answer = answer;
      data.correct = correct();
      
      this.$set(this.datas, this.index, data);
      this.input1 = "";
      this.execute();
    },
		onChangeLesson(event) {
			window.localStorage["japanese-大家的日本語-exam-option"] = this.option;
    },
    play() {
      TTX.speak(this.datas[this.index].語);
      let idTime = setInterval(() => {
        let input = document.querySelector("#input1");
        if(input != null) {
          clearInterval(idTime);
          input.focus();
        }
      }, 300);
    },
    execute() {
      this.index++;
			
			if(this.index == this.datas.length) {
				setTimeout(() => {
					document.querySelector("#btnRestart").focus();
				}, 600);
			} else {
				setTimeout(() => {
					this.play();	
				}, 300);
			}
    },
    sample() {
      this.datas = []; this.index = -1;
			function getRandom(min,max){
				return Math.floor(Math.random()*max)+min;
			};

      let arr = 單字[this.option];
      for(let i = 0; i < arr.length; i++) {
        let cells = arr[i].split("\t");
        arr[i] = {
          語: cells[0],
          漢: cells[1],
          中: cells[2],
          重: cells[3],
					rome: window.rome(cells[0]),
					// ruby: cells[0].ruby(cells[1])
        }
      }

			let cycle = 500;
      while (arr.length > 0 && cycle >= 0) {
				let index = 0;
				if(arr.length > 1) {
					index = getRandom(0, arr.length)
				}
				if(index < arr.length) {
					let data = arr.splice(index, 1);
					this.datas.push(data[0])
					if(this.datas.length == 30) break;
				}
				cycle--;
			}
      this.execute();
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
				return el.correct == "Y";
			});
			return arr.length;
		},
		rate() {
			let correct = 0, total = 0;
			for(let i = 0; i < this.datas.length; i++) {
				if(typeof this.datas[i].correct == "undefined") break;
				total++;
				if(this.datas[i].correct == "Y") {
					correct++;
				}
			}
			return total == 0 ? 0 : Math.floor((correct / total) * 100);
		}
  },
	watch: {
	},
});