/* 大家的日本語 */
Vue.component('lesson', { 
	template:  `<div style="height: 100%; width: 100%; display: flex; flex-direction: column;"
			:style="{
				padding: (print == 'N' ? '10' : '0') + 'px'}"
		>
		<div v-if="print == 'N' && scrollTop < 200" style="display: flex; flex-direction: row;">
			<RadioGroup v-model="mode" type="button" button-style="solid" 
				size="large"
				@on-change="onChangeMode"
				ref="radio-group"
			>
				<Radio label="課文">課文</Radio>
				<Radio label="單字">單字</Radio>
			</RadioGroup>

			<Select v-model="option" size="large" @on-change="onChangeLesson"
				style="margin-left: 20px; width:120px; margin-bottom: 5px;"
			>
				<Option v-for="item in options" :value="item" :key="item">{{ item }}</Option>
			</Select>

			<div style="flex: 1;" ></div>

			<Checkbox v-if="mode == '單字' && width > 600" v-model="isRuby" @on-change="onChangeRuby">假名標注</Checkbox>
			<div style="flex: 1;" ></div>
			<a class="button" v-if="mode == '單字' && width > 600" href="./index.html?mode=單字測驗" target="_blank" style="width: 80px;">
				單字測驗
			</a>
			<a v-if="$isLogin() && width > 600" class="button" href="./index.html?mode=字典" target="_blank" style="width: 60px;">
				字典
			</a>
		</div>
    <div ref="frame" class="lesson-frame" v-html="html" @scroll="onScroll"
			style="background: white; flex: 1;"
			:style="{
				padding: (print == 'N' ? '10' : '5') + 'px', 
				border: print == 'N' ? '1px solid rgb(220, 222, 226)' : 'none'
			}"
		></div>
	</div>`,
	props: {
	},
	data() {
		return {
			options: [],
      option: "",
			html: "",
			mode: "課文",
			print: "N",
			isRuby: false,
			width: 0
		};
	},
	created(){
	},
	async mounted () {
		setTimeout(() => {
			this.onResize();
		}, 300);
		this.broadcast.$on('onResize', this.onResize);

		TTX.initial();

		window.addEventListener('keydown', this.onKeydown, false);

		let s = window.localStorage["japanese-大家的日本語-lesson"];
		if(typeof s == "string") {
			this.option = s;
		}
		s = window.localStorage["japanese-大家的日本語-mode"];
		if(this.$queryString("print") == "Y"){
			this.mode = "單字";
			this.print = "Y";
		}
		else if(typeof s == "string") {
			this.mode = s;
			this.$refs["frame"].style.overflow = "auto";
		}
		s = window.localStorage["japanese-大家的日本語-ruby"];
		this.isRuby = typeof s == "string" && s == "Y" ? true : false;

		this.$refs["radio-group"].$children[this.mode == "課文" ? 0 : 1].currentValue = true;
		this.onChangeMode();
	},
	destroyed() {
		// this.broadcast.$off('onResize', this.onResize);
		window.removeEventListener('keydown', this.onKeydown, false);
		this.$removeScript("./datas/大家的日本語/課文.js");
		this.$removeScript("./datas/大家的日本語/單字.js");
		課文 = undefined;
		單字 = undefined;
  },
	methods: {
		onResize(){
			let frame = this.$refs["frame"];
			if(typeof frame == "object") {
				this.width = frame.clientWidth;
				if((this.mode == "課文" && frame.clientWidth > 1000)) {
					frame.classList.add("big-screen");
					frame.classList.remove("small-screen");
				} else if((this.mode == "單字" && frame.clientWidth > 600)) {
					frame.classList.add("big-screen");
					frame.classList.remove("small-screen");
				} else {
					frame.classList.add("small-screen");
					frame.classList.remove("big-screen")
				}
			}
			this.changeWidth();
		},
		onScroll(e) {
			if(document.body.clientWidth < 600 && this.print == "N"){
				window.localStorage[`japanese-大家的日本語-${this.mode}-scroll`] = e.srcElement.scrollTop;
			}
		},
		onKeydown() {
		},
		onChangeLesson(event) {
			this.scrollTop = 0;
			window.localStorage["japanese-大家的日本語-lesson"] = this.option;
			this.html = "";
			this.$refs["frame"].style.visibility = "hidden";
			if(document.body.clientWidth < 600 && this.print == "N" && typeof event != "undefined") {
				window.localStorage["japanese-大家的日本語-課文-scroll"] = 0;
				window.localStorage["japanese-大家的日本語-單字-scroll"] = 0;				
			}
			setTimeout(() => {
				if(this.mode == "課文") 
					this.parseLesson();
				else {
					this.parseWord();
				}
				setTimeout(() => {
					this.changeWidth();
				}, (this.mode == "課文") ? 600 : 1000);
			}, 600);
    },
		onChangeRuby() {
			window.localStorage["japanese-大家的日本語-ruby"] = this.isRuby == true ? "Y" : "N";
			this.html = "";
			this.$refs["frame"].style.visibility = "hidden";
			this.$refs["frame"].scrollTop = 0;

			this.parseWord();
			setTimeout(() => {
				this.changeWidth();
			}, 1000);
		},
		changeWidth() {
			let frame = this.$refs["frame"];
			let arr = frame.querySelectorAll("div" + 
				(this.mode == "課文" ? "" : ".card"));
			let width = "auto", marginLeft = "0px";
			if(this.mode == "課文") {
				if(frame.clientWidth > 1000) {
					let w = Math.floor((frame.clientWidth - 60) / (arr.length >= 3 ? 3 : arr.length));
					width = w + "px";
					marginLeft = "20px";
				}
				for(let i = 0; i < arr.length; i++) {
					arr[i].style.width = width;
					arr[i].style.marginLeft = i == 0 ? "0px" : marginLeft;
				}
			} else {
				let w1 = frame.clientWidth - (this.print == "Y" ? 0 : 20);
				if(this.print == "Y") {
					width = "390px";
				}
				else if(this.$refs["frame"].classList.contains("big-screen")) {
					let colNum = 0, margin = 0;
					for(let i = 8; i >= 1; i--) {
						let w = Math.floor((w1 - ((i -1) * margin)) / i);
						if(w > 320) {
							width = w + "px";
							colNum = i;
							break;
						}
					}
				} else {
				}

				for(let i = 0; i < arr.length; i++) {
					arr[i].style.width = width;
					// arr[i].style.marginLeft = colNum == 0 ? "0px" : `${10}px`;
				}
			}

			if(arr.length > 0) {
				frame.style.visibility = "visible";
				let y = window.localStorage[`japanese-大家的日本語-${this.mode}-scroll`];
				if(document.body.clientWidth < 600 && this.print == "N" && !isNaN(y)){
					frame.style.overflow = "auto";
					setTimeout(() => {
						this.$refs["frame"].scrollTop = y;
					}, 600);
				} 
			}
		},
		async onChangeMode() {
			window.localStorage["japanese-大家的日本語-mode"] = this.mode;
			this.options = [];
			if(this.mode == "課文") {
				await this.$appendScript("./datas/大家的日本語/課文.js");
				for(let key in 課文){
					this.options.push(key)
				}
				單字 = undefined;
			} else {
				await this.$appendScript("./datas/大家的日本語/單字.js");
				for(let key in 單字){
					this.options.push(key)
				}
				課文 = undefined;
			}
			if(typeof this.option == "undefined") this.option = "";

			if(this.options.length == 0)
				this.option = "";
			else if(this.option.length == 0 && this.options.length > 0)
				this.option = this.options[0];
			
			if(this.option.length > 0)
				this.onChangeLesson();
		},
		async parseLesson(){ // 課文
			if(typeof 課文[this.option] == "object") {
				//  style="margin-top: ${this.html.length > 0 ? 10 : 0}px;"
				for(let key in 課文[this.option]) {
					let header = `<h3>${key}</h3>`;
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
					this.html += `
						<div class="section">
							${header}
							<ol style="margin: 0px 0px 0px 30px; ">${detail}</ol>
						</div>`
				}
				setTimeout(() => {
					this.changeWidth();
				}, 600);
			}
		},
		parseWord(){ // 單字
			let execute = (option) => {
				if(typeof 單字[option] == "object") {
					let arr = 單字[option], result = "";
					for(let i = 0; i < arr.length; i++) {
						let td = arr[i].split("\t");
						// if(i == 0) console.log(td)
						let accent = window.renderAccent(td[0], td[3]);
						let ruby = this.print == 'Y' ? null : td[0].ruby(td[1]);
						let s = "";
						if(this.isRuby == true && typeof ruby == "string" && ruby.length > 0) {
							s = `<div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
								<div style="min-height: 0px;">${ruby}</div>
								<div style="color: #2d8cf0; margin-left: 10px;">${td[3]}</div>
							</div>`;
						} else {
							s = `<div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
								<div style="font-size: 20px;">${accent}</div>
								<div style="color: #2d8cf0; margin-left: 10px;">${td[3]}</div>
							</div>
							<div style="flex: 1;">${td[1].trimChinese()}</div>`;
						}

						result += `<div class="card ${this.print == 'N' ? '' : 'print'}" style="font-size: 20px;">
								<div style="min-width: 25px; font-size: 20px;">${i + 1}.</div>
								<div style="flex: 1; font-size: 20px; display: flex; flex-direction: column;">
									${s}
									<a href="javascript: TTX.speak('${td[0]}');" style="font-size: 20px;">
										${window.rome(td[0])}
									</a>
									<div>${td[2]}</div>
								</div>
							</div>`;
						
						if(this.print == "Y" && i % 18 == 17) {
							result += `<span  style='width: 100%; page-break-after: always;'></span>`
						}
					}

					this.html += (this.print == "N" ? "" : 
						(this.html.length == 0 ? "" : `<span style='page-break-after: always;'></span>`) // 
						+ (`<h3 style="width: 100%; font-size: 30px; text-align: center;">${option}</h3>`)
					
					) + result;
					
				}
			}

			if(this.print == "N") {
				execute(this.option)
			} else {
				let lesson = this.$queryString("lesson");
				for(let key in 單字) {
					if(typeof lesson == "string" && lesson.length > 0) {
						if(lesson.indexOf(key) > -1)
							execute(key)
					} else
						execute(key)
				}
			}
			setTimeout(() => {
				this.changeWidth();
			}, 600);
		}
	},
	watch: {
	},
});