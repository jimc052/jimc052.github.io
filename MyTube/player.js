Vue.component('my-player', { 
	template:  `
    <div style="padding: 2px 2px 15px 2px;" id="btnPlays">
      <i-button v-for="(item, index) in rows" :key="index"
				:type="active == index || prev == index ? 'warning' : 'default'"
				:ghost="prev == index"
        @click.native="onClick(index)">
        {{item.title}}
      </i-button>
			<a id="link" href="" target="_blank">下載 MP3</a>
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
			console.log(item.key)
			let link = document.getElementById("link");
			link.href = `https://www.yout.com/watch?v=${item.key}`;
			console.log(`https://www.youtube.com/watch?v=${item.key}`)

			this.active = -1;
      this.rows = Array.isArray(item.children) ? item.children : [];
			// this.rows = [{title: 1, start: 20, end: 25}];
			this.videoId = item.id;
			let m = window.localStorage["mytube-" + item.key];
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
      this.$emit('on-click', this.rows[index]);
			this.active = index;
			this.prev = -1;
			window.localStorage["mytube-" + this.videoId] = this.rows[index].title;
			console.log(index)
    }
	},
	computed: {
	},
	watch: {
	}
});