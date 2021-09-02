Vue.component('my-player', { 
	template:  `
    <div style="padding: 0px 2px 15px 2px;" id="btnPlays">
      <i-button v-for="(item, index) in rows" :key="index"
				:type="active == index || prev == index ? 'warning' : 'default'"
				:ghost="prev == index"
        @click.native="onClick(index)">
        {{item.title}}
      </i-button>
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
		console.log("debug: " + this.$isDebug())
	},
	destroyed() {
    this.broadcast.$off('onPlayerReady', this.onPlayerReady);
  },
	destroyed() {		
  },
	methods: {
    async play(item){
			this.active = -1;
      this.rows = Array.isArray(item.children) ? item.children : [];
			this.videoId = item.id;
			let m = window.localStorage["youtube-" + this.videoId];
			if(typeof m == "string") {
				let x = this.rows.findIndex((item)=>{
					return item.title == m;
				});
				if(x > -1) this.prev = x;
			}
			let el = document.getElementById("btnPlays");
			el.style.visibility = "hidden";
    },
		onPlayerReady(){
			setTimeout(() => {
				let el = document.getElementById("btnPlays");
				el.style.visibility = "visible";				
			}, 1000);
		},
    onClick(index) {
      // this.$emit('on-click', this.rows[index]);
			// this.active = index;
			// this.prev = -1;
			// window.localStorage["youtube-" + this.videoId] = this.rows[index].title;
			console.log(index)
    }
	},
	computed: {
	},
	watch: {
	}
});