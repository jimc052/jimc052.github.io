Vue.component('letter-exam', { 
	template:  `<div id="frame-letter-1" style="height: 100%; width: 100%; overflow: auto; 
      display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
		<vm-canvas ref="canvas" style="margin-top: 5px;" :size="size" 
			:char="index > -1 && row > -1 ? datas[index][row][col][word] : '' " 
		>
		</vm-canvas>
    <div  :style="{width: size + 'px'}" style="padding: 5px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
      <Input ref="input1" element-id="input1" v-model="data1"
        style="font-size: 20px; flex: 1; margin-right: 10px; "
        size="large"
      />
      <div class="button"><Icon type="md-volume-up" size="25" @click="play()" /></div>
    </div>
    <div style="flex: 1; margin-bottom: 5px; padding: 5px; border: 1px solid red;" 
      :style="{width: (size + 80) + 'px'}"
    >
      <ul>
        <li v-for="(el, i) in answers" >
        {{el}}
        </li>
      </ul>
    </div>
  </div>`,
	props: {
	},
	data() {
		return {
      size: 150,
			word: "平",
			row: -1,
			col: -1,
      index: -1,
			datas: Object.assign(this.$japanese()),
      answers: [],
      data1: ""
		};
	},
	created(){
	},
	async mounted () {
		window.addEventListener('keydown', this.onKeydown, false);
    setTimeout(() => {
      document.querySelector("#input1").focus();  
    }, 600);
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
			console.log("key: " + code + ", pk: " + pk + ", cntrl: " + ck + ", option: " + ok + ", " + this.data1)

			if(o.tagName == "INPUT"){
				if(code == 13) {
					this.data1 = "";
				} else if(code == 27) {

				} else {

        }
			}
    },
    play() {
      document.querySelector("#input1").focus(); 
    }
	},
	watch: {
	},
});