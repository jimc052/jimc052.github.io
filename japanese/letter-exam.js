Vue.component('letter-exam', { 
	template:  `<div id="frame-letter-1" style="height: 100%; width: 100%; overflow: auto; 
      display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
		<vm-canvas ref="canvas" style="margin-top: 5px;" :size="size" 
			v-if="index > -1"
			:char="index > -1 ? datas[index]['char'] : '' " 
		>
		</vm-canvas>
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
					<div v-if="el.mp3 != el.answer" style="width: 40px;">{{el.mp3}}</div>
					<div style="width: 40px;" :style="{color: el.mp3 != el.answer ? '#c01921' : '#2d8cf0'}">{{el.answer}}</div>
        </li>
      </ul>
    </div>
  </div>`,
	props: {
	},
	data() {
		return {
      size: 200,
			word: "平",
      index: -1,
			datas: [],
      input1: ""
		};
	},
	created(){
	},
	async mounted () {
		window.addEventListener('keydown', this.onKeydown, false);
    setTimeout(() => {
      document.querySelector("#input1").focus();
    }, 600);

		this.sample();
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
			// if(Player.mode != "") await Player.wait(1);
			// await Player.play(this.datas[this.index].mp3);
    },
		sample() {
			this.datas = []; this.index = -1;
			function getRandom(min,max){
				return Math.floor(Math.random()*max)+min;
			};

			let datas1 = this.$japanese(), arr = [];
			for(let i = 0; i < datas1.length; i++) {
				let datas2 = datas1[i];
				for(let j = 0; j < datas2.length; j++) {
					let datas3 = datas2[j];
					for(let k = 0; k < datas3.length; k++) {
						let data = datas3[k];
						if(data != null) {
							arr.push({char: data["平"], mp3: data["mp3"]});
							arr.push({char: data["片"], mp3: data["mp3"]});							
						}
					}
				}
				break;
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
			this.play();
			// console.log(JSON.stringify(this.datas[this.index]), this.index)
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