// @click.native="audio.stop()" 
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

		<div style="margin: 0px 10px 0px 5px; font-size: 20px;">
			<div style="font-weight: 500;">{{convertTime(currentTime)}}</div>
			<div style="font-weight: 500;">{{convertTime(duration)}}</div>
		</div>

		<div style="flex: 1;" >
			<Slider v-if="!$isSmallScreen()" v-model="currentTime" :tip-format="format" 
				:max=duration @on-change="onSlideChange" style="flex: 1; margin-right: 10px;"
			 />
		</div>
		<Dropdown :trigger="$isSmallScreen() ? 'click' : 'hover'">
				<a href="javascript:void(0)"  style="padding: 10px 10px; display: inline-block;">
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
	</div>
	`,
	props: {
		datas: Array,
		dataKey: String
	},
	data() {
		return {
			state: "stop",
			audio: new Audio(), 
			index: 0,
			limits: [10, 15, 20, 30, 45, 60], // 睡眠
			sleep: 30,
			passTime: 0,
			currentTime: 0,
			duration: 0
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
		this.audio.autoplay = false;
		this.audio.addEventListener("loadstart", function() { 
			// console.log("loadstart: " + self.datas[self.index].title + "; \n  " + (new Date()))
		}, true);
		this.audio.addEventListener("loadeddata", function() { 
			// console.log("loadeddata: " + self.datas[self.index].title + "; \n  " + (new Date()))
			// self.audio.currentTime = 120;
			setTimeout(() => {
				self.audio.play();
				let obj = self.datas[self.index];
				FireStore.setSetting(obj.report, {playList: obj.key});
				if(self.passTime == 0) {
					self.finalCount("play");
				} else {
					self.$emit("onChangePlayList", obj.key)
				}
			}, 300);
		}, true);

		this.audio.addEventListener("canplay", function() {
			// console.log("canplay: " +  (new Date()))		
		}, true);
		this.audio.addEventListener("durationchange", function() {
			// console.log("durationChange: " + self.audio.duration + "; index: " + )
			self.duration = self.audio.duration;
		}, true);
		this.audio.addEventListener("timeupdate", function() {
			// console.log("timeupdate: " + self.audio.currentTime)
		}, true);

		this.audio.addEventListener("ended", function() {
			self.beep.play();
			// console.log("ended: " + self.audio.currentTime)
			setTimeout(() => {
				if(self.index >= self.datas.length - 1)
					self.index = 0;
				else 
					self.index++;
				self.play();
			}, 5 * 1000);
		}, true);

		for(let i = 0; i < this.datas.length; i++) {
			if(this.datas[i].key == this.dataKey) {
				this.index = i;
				break;
			}
		}
		if(typeof window.localStorage["VOA-PlayListTime"] != "undefined")
			this.sleep = window.localStorage["VOA-PlayListTime"];
	},
	destroyed() {
		this.audio.pause();
		this.audio = null;
		this.finalCount();
  },
	methods: {
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
			this.audio.currentTime = e;
		},
		async play() {
			console.log("play.index: " + this.index + ", time: " + (new Date()).toString("hh:MM:ss.ms"))
			let url = await this.$MP3(this.datas[this.index].report, this.datas[this.index].key)
			// let url = await FireStore.downloadFileURL("VOA/" + this.datas[this.index].report + 
			// 	"/" + this.datas[this.index].key + ".mp3");
			// console.log(url)
			this.audio.src = url;
		},
		pause(){
			this.audio.pause();
			this.state = "pause";
		},
		stop(){
			passTime = 0;
			this.audio.pause();
			this.state = "stop";
			clearInterval(this.finalCountID);
			this.passTime = 0;
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
					if(typeof this.audio.currentTime == "number")
						this.currentTime = this.audio.currentTime;
					let now = (new Date()).getTime() - start;
					this.passTime = Math.ceil(now / (1000));

					if((this.sleep * 60) - this.passTime <= 0) {
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
				let s = Math.floor(start / 60);
				let m = Math.floor(start - (s * 60));
				if(m == 60){
					m = 0;
					s++;
				}
				return s.leftPadding(2, '0') + ":" + m.leftPadding(2, '0').substr(0,2);
			}
		},
	},
	computed: {
	},
	watch: {
	}
});