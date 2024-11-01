/* 大家的日本語-單字測驗 */
Vue.component('lesson-exam', { 
	template:  `<div style="padding: 10px; height: 100%; width: 100%; display: flex; flex-direction: column;"
		>
		<div v-if="index == -1" style="height: 100%; padding: 10px; display: flex; flex-direction: column;">
			<div style="display: flex; flex-direction: row;">
				<Select v-model="option"  size="large" @on-change="onChangeLesson"
					style="width:120px; margin-bottom: 5px;"
				>
					<Option v-for="item in options" :value="item" :key="item">{{ item }}</Option>
				</Select>

				<Button type="success" size="large"  @click="sample" :disabled="this.slider[1] == 0"
					style="margin-left: 10px;">開始</Button>
			</div>
			<Slider v-model="slider" :max="max" range :marks="marks" style="max-width: 400px;"></Slider>
			<div style="flex: 1" />
			<div style="text-align: center; font-size: 20px;">2024-09-12</div>
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
					/>
					
					<div class="button" style="margin-left: 10px;">
						<Icon type="md-play" size="25" @click="play()" />
					</div>
				</div>
				<div style="padding: 5px; min-height: 40px; font-size: 20px;">{{
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
                      text-decoration-line: line-through; 
                      text-decoration-color: #f55f67;
											font-size: 20px;
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
			chinese: "",
			slider: [0,0],
			max: 42,
			marks: {
				0: "0",
				10: "10",
				20: "20",
				30: "30",
				40: "40",
				50: "50",
			}
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
		this.renderRange();
	},
	destroyed() {
		window.removeEventListener('keydown', this.onKeydown, false);
		this.$removeScript("./datas/大家的日本語/單字.js");
		單字 = undefined;
  },
	methods: {
		renderRange(){
			let arr = 單字[this.option];
			this.max = arr.length;
			this.marks = {};
			let step = 0;
			while (step <= arr.length) {
				if(step + 5 > arr.length) {
					this.marks[arr.length] = arr.length + "";
					break;
				}
				else {
					this.marks[step] = step + "";
					step += 5;
				}
			}
			// console.log(JSON.stringify(this.marks, null, 2))
			let slider = window.localStorage["japanese-大家的日本語-exam-slider"];
			if(typeof slider == "string" && slider.length > 0)
				this.slider = JSON.parse(slider);
			else 
			this.slider = [0, 0];			
		},
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
					let s = arr[i].replace("〜", "").replace("~", "").replace("(", "").replace(")", "")
						.replaceAll("-", "").replaceAll(" ", "");
					if(s == data.answer) 
						return "Y";
				}
        return "N";
      };

      let answer = "";
			this.input1 = this.input1.trim().toLowerCase();
			if(this.input1.length == 0) 
				answer = "XXXXXXX";
			else {
				let ascii = this.input1.charCodeAt(0);
				if(ascii >= 97 && ascii <= 122) {
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
							let char = el.transferToKana(kana);
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
			this.renderRange();
    },
    play() {
      let idTime = setInterval(() => {
        let input = document.querySelector("#input1");
        if(input != null) {
          clearInterval(idTime);
          input.focus();
        }
      }, 300);
      TTX.speak(this.datas[this.index].語);
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
			window.localStorage["japanese-大家的日本語-exam-slider"] = JSON.stringify(this.slider);
			function getRandom(min,max){
				return Math.floor(Math.random()*max)+min;
			};

      let arr1 = 單字[this.option];
			let arr2 = [];
      for(let i = 0; i < arr1.length; i++) {
        let cells = arr1[i].split("\t");
        arr2.push({
					index: i,
          語: cells[0],
          漢: cells[1],
          中: cells[2],
          重: cells[3],
					rome: window.rome(cells[0]),
					// ruby: cells[0].ruby(cells[1])
        })
      }
			let arr3 = [];
			let start = (this.slider[0] == 0 ? 1 : this.slider[0]) - 1;

			for(let i = start; i < this.slider[1]; i++) {
				arr3.push(arr2[i]);
				// console.log(i, JSON.stringify(arr2[i]))
			}

			arr2 = arr3;
			// console.log(JSON.stringify(arr2, null, 2))

			let cycle = 500;
      while (arr2.length > 0 && cycle >= 0) {
				let index = 0;
				if(arr2.length > 1) {
					index = getRandom(0, arr2.length)
				}
				if(index < arr2.length) {
					let data = arr2.splice(index, 1);
					this.datas.push(data[0])
					if(this.datas.length == 30) break;
				}
				cycle--;
			}

			let idTime = setInterval(() => {
        let input = document.querySelector("#input1");
        if(input != null) {
          clearInterval(idTime);
					input.setAttribute("autocapitalize","off");
					input.style.textTransform = "lowercase";
					input.style.fontSize = "20px";
        }
      }, 100);
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