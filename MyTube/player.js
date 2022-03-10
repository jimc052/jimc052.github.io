
let idPlay;

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
				<i-button :type="isPlaying ? 'default' : 'primary'" 
					:icon="isPlaying ? 'md-pause' : 'md-walk'"
					v-if="rows.length > 30 && $isLogin() && videoId.length > 0"
					@click.native="startExam()"  shape="circle"
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
			isPlaying: false,
			smallScreen: true, 
			cycle: 0
		};
	},
	created(){
	},
	mounted () {
    this.broadcast.$on('onPlayerReady', this.onPlayerReady);
		window.addEventListener('keydown', this.onKeydown, false);
		this.broadcast.$on('onResize', this.onResize);
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
		async play(item){
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
			if(player) player.pauseVideo();
			this.isPlaying = false;
			clearTimeout(idPlay)
			this.broadcast.$off('playend', this.playend);
		},
		onPlayerReady(){
			setTimeout(() => {
				let el = document.getElementById("btnPlays");
				el.style.visibility = "visible";
			}, 300);
		},
    onClickPlay(index) {
      this.$emit('on-click-play', this.rows[index]);
			this.active = index;
			this.prev = -1;
			if(this.isPlaying == false)
				window.localStorage["yt-" + this.videoId] = typeof this.rows[index].title == 'string' ? this.rows[index].title : index;
			else {
				// console.log("onClickPlay: " + index + ", " + (new Date()))
				this.cycle = index;
			}
			if(index > -1 && index < this.rows.length) {
				this.broadcast.$emit('exam', index);
				setTimeout(() => {
					let arr = document.querySelectorAll(".btn")
					arr[index].focus();
				}, 600);				
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
			if(this.isPlaying) this.stop();
			this.$emit('on-click-list');
		},
		onClickEdit(){
			if(this.isPlaying) this.stop();
			this.$emit('on-click-edit');
		},
		startExam(index){
			if(this.isPlaying == true) {
				this.stop();
			} else {
				clearTimeout(idPlay)
				this.isPlaying = true;
				this.broadcast.$on('playend', this.playend);
				this.cycle = 0;
				this.onClickPlay(0)
			}
		},
		playend(){
			if(this.cycle < this.rows.length - 1 && this.isPlaying == true) {
				idPlay = setTimeout(() => {
					this.onClickPlay(this.cycle + 1);
				}, 1000 * 10);
			} else {
				this.stop();
			}
		}
	},
	computed: {
	},
	watch: {
	}
});