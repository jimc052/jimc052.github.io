
let idAuto, idWait;

Vue.component('yt-player', { 
	template:  `
		<div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; ">
			<div id="btnPlays"
				style="padding: 2px; flex: 1;"
				:style="{height: (rows.length == 0 && $isDebug() && $isLogin() ? '60px' : 
				smallScreen ? '120px' : 'auto')}"
			>
				<i-button v-for="(item, index) in rows" :key="index" class="btn"
					:type="active == index || prev == index ? 'warning' : 'default'"
					:ghost="prev == index"
					@click.native="onClickPlay(index)">
					<span v-if="typeof item.title == 'string' ">{{item.title}}</span>
					<span v-else>{{(index + 1)}}</span>
				</i-button>
			</div>
			<div style="margin: 3px 10px 3px 0px;">
				<div v-if="$isDebug() && $isLogin() && videoId.length > 0"
					style="flex-direction: row; margin-bottom: 5px;"
				>
					<i-button type="success"  
						@click.native="onClickList()" icon="md-create" shape="circle" />

					<i-button type="success"
						@click.native="onClickEdit()" icon="md-document" shape="circle"
					/>
				</div>
				<i-button :type="isAuto ? 'default' : 'primary'" 
					:icon="isAuto ? 'md-pause' : 'md-walk'"
					v-if="rows.length > 30 && $isLogin() && videoId.length > 0"
					@click.native="autoExam()"  shape="circle"
				/>
			</div>
		</div>
  `,
	props: {
		// title: String
	},
	data() {
		return {
      rows: [],
			active: -1,
			prev: -1,
			videoId: "",
			content: undefined,
			height: 0,
			isAuto: false,
			smallScreen: true, 
			isTTX: false,
		};
	},
	created(){
	},
	async mounted () {
		await TTX.initial();
    this.broadcast.$on('onPlayerReady', this.onPlayerReady);
		window.addEventListener('keydown', this.onKeydown, false);
		this.broadcast.$on('onResize', this.onResize);
		Youtube.stop();
	},
	destroyed() {
		window.removeEventListener('keydown', this.onKeydown, false);
    this.broadcast.$off('onPlayerReady', this.onPlayerReady);
		this.broadcast.$off('onResize', this.onResize);
		this.stop();
  },
	methods: {
		onResize(small){
			this.smallScreen = small;
		},
		async set(item){
			this.content = item;
			this.prev = -1;
			this.active = -1;
      this.rows = Array.isArray(item.children) ? item.children : [];
			this.videoId = item.id;
			let m = window.localStorage["yt-" + this.videoId];
			this.stop();

			let x = -1;
			if(typeof m != "undefined") {
				if(isNaN(m)) {
					x = this.rows.findIndex((item)=>{
						return item.title == m;
					});
				} else {
					x = parseInt(m);
				}
				if(x > -1) 
					this.prev = x;
				else 
					this.prev = 0;
			} else if(this.rows.length > 0) {
				this.prev = 0;
			}
			let el = document.getElementById("btnPlays");
			el.style.visibility = "hidden";
			if(this.prev > -1) {
				setTimeout(() => {
					let arr = document.querySelectorAll(".btn")
					arr[this.prev].focus();
				}, 600);				
			}
    },
		stop(){
			Youtube.stop();
			this.isAuto = false;
			clearTimeout(idAuto)
			clearTimeout(idWait)
			this.broadcast.$off('playend', this.playend);
		},
		onPlayerReady(){
			setTimeout(() => {
				let el = document.getElementById("btnPlays");
				el.style.visibility = "visible";
			}, 300);
		},
    async onClickPlay(index) {
			let self = this;
			clearTimeout(idAuto)
			clearTimeout(idWait)
			if(index > -1 && index < this.rows.length) {
				this.broadcast.$emit('exam', index);
				// setTimeout(() => {
					if(this.isAuto == true){
						let arr = document.querySelectorAll(".btn")
						arr[index].focus();
					}
				// }, 600);				
			}
			this.active = index;
			this.prev = -1;
			if(this.isAuto == false)
				window.localStorage["yt-" + this.videoId] = typeof this.rows[index].title == 'string' ? this.rows[index].title : index;
			TTX.stop();
			if(this.isTTX == false) {
				await Youtube.play(this.rows[index]);
			} else {
				await TTX.speak(this.content.topic[index].question);
			}

			if(Array.isArray(this.content.topic) && this.content.topic.length > 0 && this.content.topic[index].answer > -1) {
				await this.waiting(5, async ()=>{
					let answer = this.content.topic[index].answer;
					await TTX.speak( String.fromCharCode(answer + 97) + ". " +
						this.content.topic[index].option[answer]);
					next();
				})
			} else {
				next()
			}
			function next() {
				if(self.isAuto == true)  {
					idAuto = setTimeout(() => {
						self.autoPlay(index + 1)	
					}, 10 * 1000);
				}
			}
    },
		onKeydown(event){
			let o = document.activeElement;
			// let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			// let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			// let sk = event.shiftKey, code = event.keyCode;
			// let char = (event.keyCode >=48 && event.keyCode <=122) ? String.fromCharCode(event.keyCode).toUpperCase() : "";
			// console.log(event.keyCode + ", " + this.active)
			// console.log(o.id)
			if(this.rows.length == 0 || this.$isDialog() == true) return;
			if(o.tagName == "INPUT") return;
			if(event.keyCode == 32) {
				if(this.prev > -1)
					this.onClickPlay(this.prev)
				else if(this.active > -1)
					this.onClickPlay(this.active);
			} else if(event.keyCode == 37 || event.keyCode == 38) { // left, up
				if(this.active > 0) {
					this.onClickPlay(this.active - 1)
				}
			} else if(event.keyCode == 39 || event.keyCode == 40) { // right, right
				if(this.active < this.rows.length - 1) {
					this.onClickPlay(this.active + 1)
				}
			}
		},
		onClickList(){
			if(this.isAuto) this.stop();
			this.$emit('on-click-list');
		},
		onClickEdit(){
			if(this.isAuto) this.stop();
			this.$emit('on-click-edit');
		},
		async autoExam(){
			if(this.isAuto == true) {
				this.isAuto = false;
				this.stop();
			} else {
				clearTimeout(idAuto)
				this.isAuto = true;
				this.autoPlay(0);
			}
		},
		async autoPlay(index) {
			if(index < this.rows.length - 1 && this.isAuto == true) {
				await this.onClickPlay(index);
			}	else {
				this.stop();
			}
		},
		waiting(sec, callback) {
			return new Promise((resolve, reject) => {
				idWait = setTimeout(()=>{
					if(callback) callback();
					resolve();
				}, sec * 1000);
			});
		}
	},
	computed: {
	},
	watch: {
	}
});

class TTX {
	static initial(){
		return new Promise(async (resolve, reject) => {
			TTX.msg = new SpeechSynthesisUtterance();
			TTX.msg.rate = 0.9;
			// TTX.msg.lang = "ja-JP"; 
			TTX.msg.lang = "en-US";
			TTX.voices = (await TTX.getVoices()).filter(el =>{
				// if(el.lang == TTX.msg.lang){
				// 	console.log(el.name)
				// }
				return el.lang == TTX.msg.lang;
			});

			resolve();
		});
	}

	static getVoices() {
		return new Promise((resolve, reject) => {
			let timer = setInterval(() => {
				if(window.speechSynthesis.getVoices().length !== 0) {
					resolve(window.speechSynthesis.getVoices());
					clearInterval(timer);
				}
			}, 10);
		})
	}

	static speak(text, index){
		// 0 Alex, 1 Fred, 2 Samantha, 女生, 3, 女生
		return new Promise((resolve, reject) => {
			TTX.stop();
			TTX.msg.onstart = function (e) {
				// console.log("onstart")
			}

			TTX.msg.onend = function (e) {
				// console.log("onend")
				resolve();
			}
			TTX.msg.voice = TTX.voices[typeof index == "undefined" ? 0 : index];
			TTX.msg.text = text;
			
			window.speechSynthesis.speak(TTX.msg); 
		});
	}
	static stop() {
		window.speechSynthesis.cancel();
	}
}