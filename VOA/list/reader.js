Vue.component('reader', { 
	template:  `<modal v-model="modal" class-name="vertical-center-modal" id="reader" :fullscreen="true"
	   :closable="false">
		<header-bar :title="title" slot="header" icon="md-arrow-back" @goBack="onPopState"></header-bar>
		<div id="readerFrame" style="height: 100%; overflow-y: auto; display: flex; flex-direction: row;">
			<div v-if="repeat > 0" style="width: 20px; padding: 8px 0px; overflow-y: hidden; overflow-x: visible;" id="readerScale">
				<div v-for="(item, index) in bubbles" :key="index"
					:style="{height: item.height + 'px', marginTop: item.marginTop + 'px'}"
				>
					<div class='speech-bubble' @click="onClickBubble(index)">
						{{index + 1}}
					</div>
				</div>
			</div>
			<div id="context" v-html="html" @contextmenu="$easycm($event,$root,1)"
				:style="{flex: 1, height: '100%', overflowY: 'auto', 
					padding: repeat == 0 ? '8px' : '8px 4px 8px 2px'}"
				@scroll.natvie="onScroll"
			>
		</div>
		</div>
		<easy-cm :list="cmList" :tag="1" @ecmcb="onMenuClick" :underline="true" :arrow="true" :itemHeight="34" :itemWidth="180"></easy-cm>
		<div v-show="duration > 0" slot="footer" style="display: flex; flex-direction: row; align-items: center; ">
			<div style="display: flex; flex-direction: row; align-items: center; ">
				<Icon v-if="state == 'pause' || state == 'stop'" type="md-play" size="20" color="white" class="button" @click.native="audio.play()" />
				<Icon v-else type="md-pause" size="20" color="white" class="button" @click.native="audio.pause()" />
				<Icon type="md-square" size="20" color="red" class="button" @click.native="audio.stop()" />
			</div>

			<div style="margin: 0px 10px 0px 5px; font-size: 20px;">
				<div style="font-weight: 500;">{{convertTime(currentTime)}}</div>
				<div style="font-weight: 500;">{{convertTime(duration)}}</div>
			</div>
			
			<Slider v-model="currentTime" :tip-format="format" 
				v-if="repeat == 0"
				:max=duration @on-change="onSlideChange" style="flex: 1; margin-right: 10px;"
				:marks="marks" />
			
			<div v-else style="flex: 1; text-align: center;">{{msg}}</div>
			
			<Dropdown v-if="state != 'stop'">
				<a href="javascript:void(0)"  style="padding: 10px 10px; display: inline-block;">
					{{convertTime((audio.setting.sleep * 60) - passTime)}}
					<Icon type="ios-arrow-down"></Icon>
				</a>
				<dropdown-menu slot="list" placement="left-start">
					<dropdown-item v-for="(item, index) in limits" :key="index"
						:selected="item == audio.setting.sleep"
						@click.native="onClickSleep(item)"
					>
					{{item + " 分"}}
					</dropdown-item>
        </dropdown-menu>
  		</Dropdown>
		</div>
	</modal>`,
	props: {
		source: Object
	},
	data() {
		return {
			modal: true,
			title: "",
			audio: null,
			state: "stop",
			duration: 0,
			currentTime: 0,
			passTime: 0,
			cmList: [],
			limits: [15, 20, 30, 45, 60, 90],
			html: "",
			msg: "",
			marks: {},
			repeat: 0,
			bubbles: []
		};
	},
	created(){
	},
	async mounted () {
		this.title = this.source.title;
		this.initial();
		this.html = this.source.html + "<div style='display: none;'>" + (new Date()) + "</div>";
		this.audio.state = "stop";
		this.url = await FireStore.downloadFileURL("VOA/" + this.source.report + "/" + this.source.key + ".mp3");
		this.audio.src = this.url;
		document.getElementById("readerFrame").style.zoom = this.audio.setting.zoom;
		window.addEventListener('keydown', this.onKeydown, false);
		window.addEventListener('resize', this.onResize, false);
	},
	destroyed() {
		this.audio.src = "";
		this.audio.canPlay = false;
		this.audio.stop();
		this.audio = null;
		clearInterval(this.finalCountID);
		this.$Notice.destroy();
		window.removeEventListener('keydown', this.onKeydown, false);
		window.removeEventListener("popstate", this.onPopState);
		this.broadcast.$on('onResize', this.onResize);
  },
	methods: {
		onClickBubble(index){
			console.log("onClickBubble: " + index)
			this.audio.assignBlock(index);
		},
		onResize(){
			clearTimeout(this.resizeId);
			this.resizeId = setTimeout(()=>{
				this.renderBubble();
				
			}, 300);
		},
		initial(){
			let self = this;
			let setting = {
				autoPlay: false,
				mode: "all",
				zoom: 1.2,
				rate: 1,
				repeat: 0,
				interval: 5,
				interrupt: false,
				sleep: 30
			}
	
			let s = window.localStorage["VOA-Reader"];
			if(typeof s == "string" && s.length > 0) 
				setting = Object.assign(setting, JSON.parse(s));
			this.repeat = setting.repeat;
			this.audio = new Player();
			this.audio.setting = setting;
			window.addEventListener("popstate", this.onPopState);
	
			self.audio.onStateChange = (e, v1, v2) => {
				// console.log(e)
				if(this.modal == false) return;
				if(e == "durationChange") {
					this.duration = v1;
					this.retrieve();
				} else if(e == "canPlay") {

				} else if(e == "timeUpdate") {
					this.currentTime = v1;
					// console.log(this.currentTime)
				} else if(e == "sectionChange") {
					let arr = document.querySelectorAll(".english span.active");
					arr.forEach(item=>{
						item.classList.remove("active");
					})
					if(typeof v2 == "undefined") { // 通知要從頭開始
						this.currentTime = this.audio.currentTime ;
						v2 = 0;
						this.$Notice.info({
							title: '請稍候!!',
						});
					}

					let el = document.querySelector("#l" + v1 + "_" + v2);
					if(el != null)
						el.classList.add("active");						
					scrollTo(document.querySelector("#p" + v1));				
				} else if(e == "play" || e == "stop" || e == "pause" || e == "interrupt") {
					// console.log(e)
					let state = this.state;
					this.state = e;
						
					if(state == "interrupt") {
						this.$Notice.close("interrupt");
					} else if(e == "interrupt") {
						this.$Notice.info({
							title: '請按空白鍵再聽一次，或按方向鍵',
							duration: 0,
							name: "interrupt"
						});
					} else if(e == "play") {
						this.finalCount();
					} else if(e == "stop") {
						this.finalCount();
						this.currentTime = this.audio.currentTime;
						let context = document.querySelector("#context");
						if(context == null) return;
						context.scrollTop = 0;
						let el = document.querySelector(".english span.active");
						if(el != null) {
							el.classList.remove("active");
						}
					}
				}
			}
	
			function scrollTo(el) {
				if(el == null) return;
				let offsetTop = el.offsetTop;
				let offsetBottom = offsetTop + el.clientHeight;
	
				let viewer = document.querySelector("#context");
				let scrollTop = viewer.scrollTop, clientHeight = viewer.clientHeight;
	
				if(offsetTop >= scrollTop && offsetBottom < scrollTop + clientHeight){
				} else {
					viewer.scrollTop = offsetTop - 60;
				}
			}
			this.buildMenu();
		},
		onClickSleep(e) {
			this.audio.setting.sleep = e;
			window.localStorage["VOA-Reader"] = JSON.stringify(this.audio.setting);
			this.finalCount()
		},
		finalCount(){
			this.passTime = 0;
			if(typeof this.finalCountID != "undefined") {
				clearInterval(this.finalCountID);
				delete this.finalCountID;
			} 
			let start = (new Date()).getTime();
			if(this.state != "stop") {
				this.finalCountID = setInterval(() => {
					let now = (new Date()).getTime() - start;
					this.passTime = Math.ceil(now / (1000));

					if((this.audio.setting.sleep * 60) - this.passTime <= 0) {
						this.audio.stop(true);
					}
					// console.log("finalCount: " + now)
				}, 500);
			}
		},
		onKeydown(event){
			if(this.audio.canPlay == false) return;
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			let sk = event.shiftKey, code = event.keyCode;
			// console.log("key: " + code + "/" + pk)
			if(code == 32){ //空格鍵，interrupt
				if(this.state == "interrupt") this.audio.continue();
			} else if(code == 37 || code == 39 || code == 38 || code == 40) { // l, r, u, d
				if(code == 37 || code == 39) {
					if(pk == true)
						this.audio.gotoLRC(code == 37 ? "first" : "end")
					else
						this.audio.gotoLRC(code == 37 ? -1 : 1)
				}	else 
					if(pk == true)
						this.audio.gotoBlock(code == 38 ? "first" : "end")
					else
						this.audio.gotoBlock(code == 38 ? -1 : 1)
			} else {
				return;
			}

			event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
		},
		buildMenu(){
			let arr = [], children = [];

			arr.push({
				text: '自動播放',
				icon: "" + (this.audio.setting.autoPlay == true ? "ivu-icon-md-checkmark ivu-icon" : "")
			});

			children = [{text: "大", value: 1.6}, {text: "正常", value: 1.2}]; //, {text: "小", value: 1}
			children.forEach(item=>{
				if(this.audio.setting.zoom == item.value)
					item.icon = "ivu-icon-md-checkmark ivu-icon";
			})
			arr.push({text: '字體',children: children});

			children = [{text: "慢", value: 0.9}, {text: "正常", value: 1}, {text: "快", value: 1.4}];
			let label = "";
			children.forEach(item=>{
				if(this.audio.setting.rate == item.value) {
					label = " - " + item.text;
					item.icon = "ivu-icon-md-checkmark ivu-icon";
				}
			})
			arr.push({text: '速率' + label, children: children});

			children = [];
			[0, 3, 5, 10, 50].forEach(item =>{
				children.push({
					text: item == 0 ? "關閉" : item + " 次", 
					value: item,
					icon: this.audio.setting.repeat == item ? "ivu-icon-md-checkmark ivu-icon" : ""
				});
			}) 
			arr.push({text: '重複播放 - ' + (this.audio.setting.repeat > 0 ? this.audio.setting.repeat + "次" : "關閉"), children: children});

			if(this.audio.setting.repeat > 0) {
				arr.push({text: '重複中斷', icon: this.audio.setting.interrupt == true ? "ivu-icon-md-checkmark ivu-icon" : ""});
				children = [];
				[3, 5, 10, 15].forEach(item =>{
					children.push({
						text: item + " 秒", 
						value: item,
						icon: this.audio.setting.interval == item ? "ivu-icon-md-checkmark ivu-icon" : ""
					});
				}) 
				arr.push({text: '重複間距 - ' + this.audio.setting.interval + "秒", children: children});					
			}

			this.cmList = arr;
		},
		onMenuClick(e){
			// https://vuejsexamples.com/a-simple-and-easy-to-use-context-menu-with-vue/
			if(this.cmList[e[0]].text == "自動播放") {
				this.audio.setting.autoPlay = !this.audio.setting.autoPlay;
			} else if(this.cmList[e[0]].text == "字體") {
				this.audio.setting.zoom = this.cmList[e[0]].children[e[1]].value;
				document.getElementById("readerFrame").style.zoom = this.audio.setting.zoom;
				this.renderBubble();
			} else if(this.cmList[e[0]].text.indexOf("速率") > -1) {
				this.audio.setting = Object.assign(this.audio.setting, {rate: this.cmList[e[0]].children[e[1]].value});
			} else  if(this.cmList[e[0]].text.indexOf("重複播放") > -1) {
				let update = this.audio.setting.repeat == 0 || this.cmList[e[0]].children[e[1]].value == 0 ? true : false;
				this.audio.setting = Object.assign(this.audio.setting, {repeat: this.cmList[e[0]].children[e[1]].value});
				if(this.cmList[e[0]].children[e[1]].value == 0) {
					this.audio.setting.interrupt = false;
				}

				if(update == true) {
					this.html = this.source.html + "<div style='display: none;'>" + (new Date()) + "</div>";
					this.audio.audio.pause();
					clearInterval(this.audio.timeID);
					this.audio.repeat = 0;
					setTimeout(() => {
						this.retrieve(true);
					}, 600);
				}
				this.repeat = this.audio.setting.repeat;
			} else if(this.cmList[e[0]].text == "重複中斷") {
				this.audio.setting = Object.assign(this.audio.setting, {interrupt: ! this.audio.setting.interrupt});
			} else if(this.cmList[e[0]].text.indexOf("重複間距") > -1) {
				this.audio.setting = Object.assign(this.audio.setting, {interval: this.cmList[e[0]].children[e[1]].value});
			}

			window.localStorage["VOA-Reader"] = JSON.stringify(this.audio.setting);
			this.buildMenu();
		},
		onSlideChange(e){
			this.audio.currentTime = e;
		},
		format(start) {
			if(start == 0 || isNaN(start))
					return "00:00";
				else {
					let s = Math.floor(start / 60);
					let m = Math.floor(start - (s * 60));
					if(m == 60){
						m = 0;
						s++;
					}
					return s.leftPadding(2, '0') + ":" + m.leftPadding(2, '0').substr(0,2);
				}
		},
		onPopState(e){
			this.$emit("onClose");
			
			if(typeof e == "undefined") {
				history.back();
			}
			this.$destroy();
		},
		convertTime(start){
			if(start == 0 || isNaN(start))
				return "00:00";
			else {
				let s = Math.floor(start / 60);
				let m = Math.floor(start - (s * 60));
				if(m == 60){
					m = 0;
					s++;
				}
				return s.leftPadding(2, '0') + ":" + m.leftPadding(2, '0').substr(0,2);
			}
		},
		retrieve(again){
			let lrcs = []; this.marks = {};
			let arr1 = document.querySelectorAll(".chinese");
			if(arr1.length > 0) {
				let i = arr1.length - 1;
				while(i >= 0) {
					arr1[i].parentNode.removeChild(arr1[i]);
					i--;
				}				
			}

			arr1 = document.querySelectorAll(".english");
			if(this.audio.setting.repeat > 0 && arr1.length > 0) {
				let i = arr1.length - 1;
				while(i >= 0) {
					if(arr1[i].parentNode.getAttribute("ignore") != null) {
						arr1[i].parentNode.parentNode.removeChild(arr1[i].parentNode);
					} else if(arr1[i].getAttribute("ignore") != null) {
						arr1[i].parentNode.parentNode.removeChild(arr1[i].parentNode);
					}
					i--;
				}
				arr1 = document.querySelectorAll(".english");
			}

			let arr = document.querySelectorAll(".english span");
			for(let i = 0; i < arr.length; i++) {
				let start = arr[i].getAttribute("start");
				let end = arr[i].getAttribute("end");
				if(start != 0 && i > 0) {
					if(arr[i - 1].getAttribute("end") == null)
						arr[i - 1].setAttribute("end", start - 0.3);
				}
				// console.log(i + ":" + start + "/" + end)
				if(i == 0 && start == null){
					arr[i].setAttribute("start", 0);
				} else if(i == arr.length - 1 && end == null){
					arr[i].setAttribute("end", this.duration - 0.3);
				}
			}

			arr1.forEach((item1, index1)=>{
				let arr2 = item1.querySelectorAll("span");
				let arr3 = [];
				arr2.forEach((item2, index2)=>{
					let start = item2.getAttribute("start");
					let end = item2.getAttribute("end");
					if(isNaN(start) || start == null || isNaN(end) || end == null) {
						if(item2.innerHTML.lastIndexOf("<strong") == -1)
							vm.showMessage("下列位置沒有 lrc ", "block: " + index1 + ", lrc: " + index2 )
					} else {
						item2.id = "l" + lrcs.length + "_" + arr3.length;
						arr3.push({start: parseFloat(start),  end: parseFloat(end)})
					}
				});
	
				if(arr3.length > 0) {
					item1.id = "p" + lrcs.length;
					lrcs.push(arr3);
					let start = arr3[0].start;
					let rate = Math.floor(start);
					if(lrcs.length > 1)
						this.marks[rate] = lrcs.length + "";
				}
			});
			this.audio.LRCs = lrcs;
			if((this.audio.setting.autoPlay == true || typeof again == "boolean") && lrcs.length > 0 && lrcs[0].length > 0) {
				if(!isNaN(lrcs[0][0].start)) {
					this.audio.currentRange = this.audio.LRCs[0][0];
					this.audio.currentTime = this.audio.LRCs[0][0].start;
					this.currentTime = this.audio.currentTime;
					this.audio.block = 0; this.audio.lrc = 0;
					this.audio.onStateChange("sectionChange", this.audio.block, this.audio.lrc);
					if(typeof again == "boolean" && this.state == "play") {
						this.audio.audio.play();
						this.audio.timing();
					}
				}
			}
			setTimeout(()=>{
				this.renderBubble();
			}, 300);
		}, 
		onScroll(e){
			if(this.repeat == 0) return;

			let context = document.getElementById("context");
			let readerScale = document.getElementById("readerScale");
			readerScale.scrollTop = context.scrollTop;
		},
		renderBubble(){
			if(this.repeat == 0) return;
			this.bubbles = [];

			let arr = document.querySelectorAll(".p");
			arr.forEach((item, index)=>{
				this.bubbles.push({
					height: item.getBoundingClientRect().height,
					marginTop: (index > 0) ? 6 : 0
				});
			});

			this.onScroll();
		}
	},
	computed: {
		position: {
			get: function () {
				let i = typeof this.audio == "object" ? (this.currentTime / this.duration) * 100 : 0;
				// console.log(i + ": " + this.currentTime + "/" + this.duration)
				return i;
			},
			set: function(index) {
				console.log("position: " + index)
			}
		}
	},
	watch: {
		async source(value) {
			// this.modal = value == null ? false : true;
			// this.title = value == null ? "" : value.title;
			// this.currentTime = 0; this.duration = 0;
			// this.passTime = 0;
			// clearInterval(this.finalCountID);
			// try {
			// 	if(this.audio == null) {
			// 		this.initial();
			// 	}
			// 	this.audio.canPlay = false;
			// 	if(value != null) {
			// 		this.html = value.html + "<div style='display: none;'>" + (new Date()) + "</div>";
			// 		this.audio.state = "stop";
			// 		this.url = await FireStore.downloadFileURL("VOA/" + value.report + "/" + value.key + ".mp3");
			// 		this.audio.src = this.url;
			// 		document.getElementById("context").style.zoom = this.audio.setting.zoom;
			// 		window.addEventListener('keydown', this.onKeydown, false);
			// 	} else {
			// 		this.audio.src = "";
			// 		this.audio.stop();
			// 		window.removeEventListener('keydown', this.onKeydown, false);
			// 	}
			// } catch(e) {
			// 	console.log(e)
			// }
		}
	}
});