/*
<RadioGroup v-model="tone" type="button" style="" @on-change="onChangeTone">
					<Radio label="0">清音</Radio>
					<Radio label="1">濁音</Radio>
					<Radio label="2">全部</Radio>
				</RadioGroup>

				<div style="flex: 1"></div>

				<RadioGroup v-model="word" type="button" @on-change="onChangeWord">
					<Radio label="平">平假</Radio>
					<Radio label="片">片假</Radio>
					<Radio label="全">全部</Radio>
				</RadioGroup>
*/
Vue.component('letter-exam', { 
	template:  `<div style="height: 100%; padding: 5px;">
		<div v-if="index > -1" id="frame-letter-exam" style="height: 100%; width: 100%; overflow: auto; 
      display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
			<vm-canvas ref="canvas" :size="size" :char="datas[index]['char']" />
			<div  :style="{width: size + 'px'}" style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
				<Input ref="input1" element-id="input1" v-model="input1"
					style="font-size: 20px; flex: 1; margin-right: 10px; "
					size="large"
				/>
				<div class="button"><Icon type="md-volume-up" size="25" @click="play()" /></div>
			</div>
			<div style="flex: 1; margin-bottom: 5px; padding: 5px; overflow: auto;" 
				:style="{width: (size + 80) + 'px'}"
			>
				<ul style="list-style-type: none;" class="ul-exam">
					<li v-for="(el, i) in reverseData" style="display: flex; flex-direction: row;">
						<div style="width: 40px; text-align: right;">{{(index - i) + '.'}}</div>
						<div style="flex: 1;">{{el.char}}</div>
						<div v-if="el.mp3 != el.answer" style="width: 40px; color: #c01921; ">{{el.answer}}</div>
						<div style="width: 40px;" :style="{color: '#2d8cf0'}">{{el.mp3}}</div>
					</li>
				</ul>
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
			<Button :disabled="word.length == 0 || tone.length == 0" 
				type="primary" size="large"  @click="sample" style="width: 100px; margin-top: 30px;">開始</Button>
		</div>
  </div>`,
	props: {
	},
	data() {
		return {
      size: 250,
			word: ["平假"],
			tone: ["清音"],
      index: -1,
			datas: [],
      input1: ""
		};
	},
	created(){
	},
	async mounted () {
		window.addEventListener('keydown', this.onKeydown, false);
		let tone = window.localStorage["japanese-letter-exam-tone"] //  = JSON.stringify(this.options)
		if(typeof tone == "string" && tone.length > 0){
			this.tone = JSON.parse(tone);
		}
		let word = window.localStorage["japanese-letter-exam-word"] //  = JSON.stringify(this.options)
		if(typeof word == "string" && word.length > 0){
			this.word = JSON.parse(word);
		}

    setTimeout(() => {
			// this.sample();
    }, 300);
	},
	destroyed() {
		window.removeEventListener('keydown', this.onKeydown, false);
  },
	methods: {
    onKeydown(event) {
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			let ck = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			let ok = navigator.userAgent.indexOf('Macintosh') > -1  ? event.altKey : false;
			let sk = event.shiftKey, code = event.keyCode;
			let id = event.target.id;

			if(o.tagName == "INPUT"){
				if(code == 13) {
					this.datas[this.index].answer = this.input1.toLowerCase();
					this.$set(this.datas, this.index, this.datas[this.index]);
					this.input1 = "";
					this.execute();
				} else if(code == 27) {

				} else {

        }
			}
    },
    async play() {
      document.querySelector("#input1").focus();
			if(Player.mode != "") await Player.wait(1);
			await Player.play(this.datas[this.index].mp3);
    },
		sample() {
			this.datas = []; this.index = -1;
			function getRandom(min,max){
				return Math.floor(Math.random()*max)+min;
			};

			let tone = this.tone.join(",");
			let word = this.word.join(",");

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
						let data = datas3[k];
						if(data != null) {
							if(word.indexOf("平") > -1)
								arr.push({char: data["平"], mp3: data["mp3"]});
							if(word.indexOf("片") > -1)
								arr.push({char: data["片"], mp3: data["mp3"]});							
						}
					}
				}
				
			}

			while (arr.length > 0) {
				let index = 0;
				if(arr.length > 1) {
					index = getRandom(0, arr.length)
				}
				if(index < arr.length) {
					let data = arr.splice(index, 1);
					this.datas.push(data[0])
				}
			}
			this.execute();
		},
		execute() {
			this.index++;
			setTimeout(() => {
				this.play();	
			}, 300);
		},
		onChangeTone() {
			window.localStorage["japanese-letter-exam-tone"]= JSON.stringify(this.tone);
		},
		onChangeWord() {
			window.localStorage["japanese-letter-exam-word"]= JSON.stringify(this.word);
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
		}
	},
	watch: {
	},
});