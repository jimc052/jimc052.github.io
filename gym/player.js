// 
Vue.component('gym-player', { 
	template:  `
		<div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
			<div id="btnPlays"
				style="padding: 0px 2px 15px 2px; flex: 1;"
				:style="{height: (rows.length == 0 && $isAdmin() ? '60px' : 'auto')}"
			>
				<i-button v-for="(item, index) in rows" :key="index"
					:type="active == index || prev == index ? 'warning' : 'default'"
					:ghost="prev == index"
					@click.native="onClickPlay(index)">
					{{item.title}}
				</i-button>
			</div>
			<i-button type="success" v-if="$isAdmin() && videoId.length > 0" 
				@click.native="onClickEdit()"  icon="md-create" shape="circle"
				style="margin: 0px 5px; 20px 5px" />
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
			videoId: ""
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
			// console.log(JSON.stringify(item))
			this.active = -1;
      this.rows = Array.isArray(item.children) ? item.children : [];
			this.videoId = item.id;
			let m = window.localStorage["gym-" + this.videoId];
			if(typeof m == "string") {
				let x = this.rows.findIndex((item)=>{
					return item.title == m;
				});
				if(x > -1) 
					this.prev = x;
				else 
					this.prev = 0;
			} else if(this.rows.length > 0) {
				this.prev = 0;
			}
			let el = document.getElementById("btnPlays");
			// el.innerHTML = "";
			el.style.visibility = "hidden";
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
			window.localStorage["gym-" + this.videoId] = this.rows[index].title;
    },
		onKeydown(event){
			// let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			// let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			// let sk = event.shiftKey, code = event.keyCode;
			// let char = (event.keyCode >=48 && event.keyCode <=122) ? String.fromCharCode(event.keyCode).toUpperCase() : "";

			if(event.keyCode == 32) {
				if(this.prev > -1)
					this.onClick(this.prev)
				if(this.active > -1)
					this.onClick(this.active)
			} else if(event.keyCode == 37) {
				if(this.active > 0) {
					this.onClick(this.active - 1)
				}
			} else if(event.keyCode == 39) {
				if(this.active < this.rows.length - 1) {
					this.onClick(this.active + 1)
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