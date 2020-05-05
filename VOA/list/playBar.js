Vue.component('play-bar', { 
	template:  `<div style="display: flex; flex-direction: row; align-items: center; padding: 5px; border-top: 1px solid #c5c5c5; background: white;">
		<div style="display: flex; flex-direction: row; align-items: center; ">
			<Icon v-if="state == 'pause' || state == 'stop'"  type="md-play" size="20" color="white" class="button" 
				@click.native="play(); state = 'play' " 
			/>
			<Icon v-else type="md-pause" size="20" color="white" class="button" 
				@click.native="pause()"
			/>
			<Icon type="md-square" size="20" color="white" class="button"
				:color="state == 'stop' ? 'white' : 'red'"
				@click.native="stop()"
			/>
			<!--
				<Icon type="md-skip-backward" size="20" color="white" class="button" />
				<Icon type="md-skip-forward" size="20" color="white" class="button" />
			-->
		</div>
		<!--  -->
		<div style="margin: 0px 10px 0px 5px; font-size: 18px;" v-if="state != 'stop'">
			<div style="font-weight: 500; font-size: 14px;">{{convertTime(currentTime)}}</div>
			<div style="font-weight: 500; font-size: 14px;">{{convertTime(duration)}}</div>
		</div>

		<div style="flex: 1;" >
			<Slider v-if="!$isSmallScreen() && state != 'stop'" v-model="currentTime" :tip-format="format" 
				:max=duration @on-change="onSlideChange" style="flex: 1; margin-right: 10px;"
			 />
		</div>
		<Dropdown :trigger="$isSmallScreen() ? 'click' : 'hover'">
			<a href="javascript:void(0)"
				style="padding: 10px 10px; display: inline-block; width: 85px; text-align: right;">
				{{convertTime((sleep * 60) - passTime)}}
				<Icon type="ios-arrow-down"></Icon>
			</a>
			<dropdown-menu slot="list" placement="left-start">
				<dropdown-item v-for="(item, index) in limits" :key="index"
					:selected="item == sleep"
					@click.native="onClickSleep(item)"
				>
				{{item + " 分"}}
				</dropdown-item>
			</dropdown-menu>
		</Dropdown>
		<div v-if="repeat > 1 && state != 'stop' " style="position: fixed; right: 5px; bottom: 58px; background-color: #00bfb6; color: white; padding: 2px 5px; border: 1px solid #00bfb6; border-radius: 2px;">
			{{(times + 1) + " / " + repeat }}
		</div>
	</div>
	`,
	props: {
		datas: Array,
		dataKey: String,
		rate: Number,
		repeat: Number
	},
	data() {
		return {
			state: "stop",
			audio: new Audio(), //[], 
			players:[],
			index: 0,
			limits: [10, 15, 20, 30, 45, 60], // 睡眠
			sleep: 30,
			passTime: 0,
			currentTime: 0,
			duration: 0,
			times: 0,
			ended: false
		};
	},
	created(){
	},
	async mounted () {
		if(this.$isAdmin()){
			this.limits = [1, 3, 5].concat(this.limits);
		}
		this.beep = new Audio("./mp3/beep.mp3");

		let self = this;
		
		if(typeof window.localStorage["VOA-PlayListTime"] != "undefined")
			this.sleep = window.localStorage["VOA-PlayListTime"];
	
		if(this.$isFlutter()) {
			this.broadcast.$on('onFlutter', this.onFlutter);
		}

		// console.log("initial players start: " + (new Date()))
		vm.loading("MP3 loading......");
		this.index = 0;
		for(let i = 0; i < this.datas.length; i++) {
			if(this.datas[i].key == this.dataKey) {
				this.index = i;
			}
			let player = new MedialPlayer({
				report: this.datas[i].report,
				key: this.datas[i].key,
				rate: this.rate,
				loadstart: () => {
					// self.ended = false;
				},
				loadeddata: () => {
					// setTimeout(() => {
					// 	self.audio[i].play();
					// 	let obj = self.datas[self.index];
					// 	FireStore.setSetting(obj.report, {playList: obj.key});
					// 	if(self.passTime == 0) {
					// 		self.finalCount("play");
					// 	} else {
					// 		self.$emit("onChangePlayList", obj.key)
					// 	}
					// }, 300);
				},
				ended: () => {
					setTimeout(() => { 
						self.beep.play();
						if((self.sleep * 60) - self.passTime <= 0) {
							self.stop(true);
						} else {
							setTimeout(() => {
								if(self.times < self.repeat - 1) {
									self.players[self.index].currentTime = 0;
									self.players[self.index].play();
									self.times++;
								} else
									next(); 
							}, 5000);					
						}
					}, 1000);
		
					function next() {
						self.ended = true;
						if(self.index >= self.datas.length - 1)
							self.index = 0;
						else 
							self.index++;
						self.play();
					}
				}
			})
			// console.log("index: " + i + ".........................")
			await player.init()
			this.players.push(player);
		}
		vm.loading(false);
	},
	destroyed() {
		this.finalCount("stop");
		for(let i = 0; i < this.players.length; i++) {
			this.players[i].close();
		}

		if(this.$isFlutter())
			this.broadcast.$off('onFlutter', this.onFlutter);
  },
	methods: {
		onFlutter(arg){
			// console.log("onFlutter: " + arg)
			if(arg == "unplugged") { // 耳機，已拔
				this.pause();
			} else if(arg == "action.TOGGLE") { //
				if(this.state == "play")
					this.pause();
				else 
					this.play();
			} else if(arg == "action.STOP") { //
				this.stop();
			} else if(arg == "action.NEXT" || arg == "action.PREV") { //
				if(
					(arg == "action.NEXT" && this.index >= this.datas.length - 1) || 
					(arg == "action.PREV" && this.index == 0)
				) {
					this.beep.play()
				} else {
					this.halt();
					if(arg == "action.NEXT") 
						this.index++;
					else 
						this.index--;
					this.play();
				}
			}
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
		onSlideChange(e){
			if(this.players.length > 0)
				this.players[this.index].currentTime = e;
		},
		toFlutter(e){
			if(this.$isFlutter()) {
				let obj = {state: this.state, title: this.datas[this.index].title, 
					report: this.datas[this.index].report,
					index: this.index, total: this.datas.length};
				Flutter.postMessage(JSON.stringify(obj));
			}
		},
		async play() {
			if(this.players.length == 0) return;
			if(this.state == "pause") {
				this.players[this.index].play();
			} else {
				this.times = 0;
				this.currentTime = 0;
				console.log("play.index: " + this.index + ", time: " + 
					(new Date()).toString("hh:MM:ss.ms") + "; passTime: " + this.passTime)
				// self.$Notice.info({title: '播' + (this.index + 1)});
				try{
					this.duration = this.players[this.index].duration;
					this.players[this.index].rate = this.rate;
					this.players[this.index].play();

					let obj = this.datas[this.index];
					FireStore.setSetting(obj.report, {playList: obj.key});
					if(this.passTime == 0) {
						this.finalCount("play");
					} else {
						this.$emit("onChangePlayList", obj.key)
					}
				} catch(error) {
					vm.showMessage("MP3\n" + error);
					return;
				}
			}
			this.state = "play"
			this.toFlutter()
		},
		pause(){
			if(this.players.length == 0) return;
			this.players[this.index].pause();
			this.state = "pause";
			this.toFlutter();
		},
		halt(){
			if(this.players.length == 0) return;
			this.players[this.index].pause();
			this.players[this.index].currentTime = 0;
		},
		stop(){
			if(this.players.length == 0) return;
			this.times = 0;
			this.passTime = 0;
			this.currentTime = 0;
			this.players[this.index].pause();
			this.state = "stop";
			clearInterval(this.finalCountID);
			for(let i = 0; i < this.players.length; i++) {
				this.players[i].currentTime = 0;
			}
			this.toFlutter();
		},
		finalCount(state){
			this.passTime = 0;
			if(typeof this.finalCountID != "undefined") {
				clearInterval(this.finalCountID);
				delete this.finalCountID;
			} 
			let start = (new Date()).getTime();
			if(state != "stop") {
				this.finalCountID = setInterval(() => {
					this.currentTime = this.players[this.index].currentTime;
					let now = (new Date()).getTime() - start;
					this.passTime = Math.ceil(now / (1000));

					if(this.ended == true && ((this.sleep * 60) - this.passTime <= 0)) {
						this.stop(true);
						this.beep.play()
					}
				}, 500);
			}
		},
		onClickSleep(e){
			this.sleep = e;
			window.localStorage["VOA-PlayListTime"] = e;
			this.finalCount(this.state)
		},
		convertTime(start){
			if(start == 0 || isNaN(start))
				return "00:00";
			else {
				let min = start < 0 ? "-" : "";
				start = Math.abs(start);
				let s = Math.floor(start / 60);
				let m = Math.floor(start - (s * 60));
				if(m == 60){
					m = 0;
					s++;
				}
				return min + s.leftPadding(2, '0') + ":" + m.leftPadding(2, '0').substr(0,2);
			}
		},
	},
	computed: {
	},
	watch: {
		dataKey(value) {
			this.index = 0;
			for(let i = 0; i < this.datas.length; i++) {
				if(this.datas[i].key == value) {
					this.index = i;
					break;
				}
			}
		},
		rate(value)  {
			if(this.players.length > 0 && this.index < this.players.length)
				this.players[this.index].rate = value;
		},
		repeat(value) {
		}
	}
});
