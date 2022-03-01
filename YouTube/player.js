// 
Vue.component('yt-player', { 
	template:  `
		<div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
			<div id="btnPlays"
				style="padding: 0px 2px 15px 2px; flex: 1;"
				:style="{height: (rows.length == 0 && $isDebug() && $isLogin() ? '60px' : 'auto')}"
			>
				<i-button v-for="(item, index) in rows" :key="index" class="btn"
					:type="active == index || prev == index ? 'warning' : 'default'"
					:ghost="prev == index"
					@click.native="onClickPlay(index)">
					<span v-if="typeof item.title == 'string' ">{{item.title}}</span>
					<span v-else>{{(index + 1)}}</span>
				</i-button>
			</div>
			<i-button type="success" v-if="$isDebug() && $isLogin() && videoId.length > 0" 
				@click.native="onClickEdit()"  icon="md-create" shape="circle"
				style="margin: 0px 5px; 20px 5px" />
			<modal v-model="visible" class-name="vertical-center-modal" 
				title="編輯"  fullscreen style="overflow: hidden;" id="dlgEdit">
				<textarea style="width: 100%; height: 100%; font-size: 18px;">{{content}}
				</textarea>
			</modal>
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
			visible: false,
			content: ""
		};
	},
	created(){
	},
	mounted () {
    this.broadcast.$on('onPlayerReady', this.onPlayerReady);
		window.addEventListener('keydown', this.onKeydown, false);
	},
	destroyed() {
		window.removeEventListener('keydown', this.onKeydown, false);
    this.broadcast.$off('onPlayerReady', this.onPlayerReady);
  },
	destroyed() {		
  },
	methods: {
    async play(item){
			this.content = JSON.stringify(item) // 還沒寫
			this.prev = -1;
			this.active = -1;
      this.rows = Array.isArray(item.children) ? item.children : [];
			this.videoId = item.id;
			let m = window.localStorage["yt-" + this.videoId];

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
		onPlayerReady(){
			setTimeout(() => {
				let el = document.getElementById("btnPlays");
				el.style.visibility = "visible";
				// if(this.rows.length > 0) {
				// 	player.seekTo(this.rows[this.prev].start);
				// }
			}, 300);
		},
    onClickPlay(index) {
      this.$emit('on-click-play', this.rows[index]);
			this.active = index;
			this.prev = -1;
			window.localStorage["yt-" + this.videoId] = typeof this.rows[index].title == 'string' ? this.rows[index].title : index;
			if(index > -1 && index < this.rows.length) {
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
			if(this.rows.length == 0) return;
			if(o.tagName == "INPUT") return;
			if(event.keyCode == 32) {
				if(this.prev > -1)
					this.onClickPlay(this.prev)
				else if(this.active > -1)
					this.onClickPlay(this.active);
			} else if(event.keyCode == 37) { // left
				if(this.active > 0) {
					this.onClickPlay(this.active - 1)
				}
			} else if(event.keyCode == 39) { // right
				if(this.active < this.rows.length - 1) {
					this.onClickPlay(this.active + 1)
				}
			}
		},
		onClickEdit(){
			this.$emit('on-click-edit');
		}
	},
	computed: {
	},
	watch: {
	}
});