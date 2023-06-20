Vue.component('lesson', { 
	template:  `<div style="height: 100%; width: 100%; overflow: auto; display: flex; flex-direction: column; padding: 10px;">
    <Select v-model="option" style="width:150px; margin-bottom: 5px;" size="large" @on-change="onChangeOption">
      <Option v-for="item in options" :value="item" :key="item">{{ item }}</Option>
    </Select>
    <div style="flex: 1; border: 1px red #red;" v-html="html"></div>
	</div>`,
	props: {
	},
	data() {
		return {
			options: [],
      option: "",
			html: ""
		};
	},
	created(){
	},
	async mounted () {
		TTX.initial();
		// this.onResize();
		// this.broadcast.$on('onResize', this.onResize);
		window.addEventListener('keydown', this.onKeydown, false);
		await this.$appendScript("./datas/大家的日本語-課文.js");

		for(let key in datas){
			this.options.push(key)
		}

		let s = window.localStorage["japanese-大家的日本語-課文-lesson"];
		if(typeof s == "string") {
			this.option = s;
		} else {
			this.option = this.options[0];
		}
		if(this.option.length > 0)
			this.onChangeOption();

	},
	destroyed() {
		// this.broadcast.$off('onResize', this.onResize);
		window.removeEventListener('keydown', this.onKeydown, false);
		this.$removeScript("./datas/大家的日本語-課文.js");
  },
	methods: {
		onKeydown() {

		},
		onChangeOption() {
			window.localStorage["japanese-大家的日本語-課文-lesson"] = this.option;
			this.html = "";
			setTimeout(() => {
				if(typeof datas[this.option] == "object") {
					for(let key in datas[this.option]) {
						this.html += `<h3 style="margin-top: ${this.html.length > 0 ? 10 : 0}px;">${key}</h3>`;
						let arr = datas[this.option][key], detail = "";
						for(let i = 0; i < arr.length; i++) {
							// console.log(arr[i])
							detail += `
								<li>
									<a href="javascript: TTX.speak('${arr[i].日文}');">
										${arr[i].日文}
									</a>
									<br>
									${arr[i].中文}
								</li>`
						}
						this.html += `<ol style="margin: 0px 0px 0px 30px; ">${detail}</ol>`
					}
				}				
			}, 600);
    }
	},
	watch: {
	},
});