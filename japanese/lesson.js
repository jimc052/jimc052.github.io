Vue.component('lesson', { 
	template:  `<div style="height: 100%; width: 100%; overflow: auto; display: flex; flex-direction: column; padding: 10px;">
		<div v-if="scrollTop <= 60" style="display: flex; flex-direction: row;">
			<Select v-model="option"  size="large" @on-change="onChangeLesson"
				style="width:150px; margin-bottom: 5px;"
			>
				<Option v-for="item in options" :value="item" :key="item">{{ item }}</Option>
			</Select>
			<div style="flex: 1;" ></div>
			<RadioGroup v-model="mode" type="button" button-style="solid" 
				size="large"
				@on-change="onChangeMode"
				ref="radio-group"
			>
				<Radio label="課文">課文</Radio>
				<Radio label="單字">單字</Radio>
			</RadioGroup>
		</div>

    <div style="flex: 1; padding: 10px; border: 1px solid rgb(220, 222, 226); overflow: auto;" v-html="html"
			@scroll="onScroll"
		></div>
	</div>`,
	props: {
	},
	data() {
		return {
			options: [],
      option: "",
			html: "",
			scrollTop: 0,
			mode: "課文"
		};
	},
	created(){
	},
	async mounted () {
		TTX.initial();
		// this.onResize();
		// this.broadcast.$on('onResize', this.onResize);
		window.addEventListener('keydown', this.onKeydown, false);
		await this.$appendScript("./datas/大家的日本語/課文.js");

		for(let key in 課文){
			this.options.push(key)
		}

		let s = window.localStorage["japanese-大家的日本語-lesson"];
		if(typeof s == "string") {
			this.option = s;
		} else {
			this.option = this.options[0];
		}
		if(this.option.length > 0)
			this.onChangeLesson();

		this.$refs["radio-group"].$children[0].currentValue = true;
	},
	destroyed() {
		// this.broadcast.$off('onResize', this.onResize);
		window.removeEventListener('keydown', this.onKeydown, false);
		this.$removeScript("./datas/大家的日本語/課文.js");
		課文 = undefined;
  },
	methods: {
		onScroll(e) {
			this.scrollTop = e.srcElement.scrollTop;
		},
		onKeydown() {
		},
		onChangeLesson() {
			let parseLesson = async () => {
				if(typeof 課文[this.option] == "object") {
					for(let key in 課文[this.option]) {
						this.html += `<h3 style="margin-top: ${this.html.length > 0 ? 10 : 0}px;">${key}</h3>`;
						let arr = 課文[this.option][key], detail = "";
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
			}
			this.scrollTop = 0;
			window.localStorage["japanese-大家的日本語-lesson"] = this.option;
			this.html = "";
			setTimeout(() => {
				parseLesson();
			}, 600);
    },
		onChangeMode() {

		}
	},
	watch: {
	},
});