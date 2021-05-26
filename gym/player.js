Vue.component('gym-player', { 
	template:  `
    <div style="padding: 0px 10px 15px 10px;" id="btnPlays">
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
	async mounted () {
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
				console.log("prev: " + this.prev)
			}
    },
    onClick(index) {
      this.$emit('on-click', this.rows[index]);
			this.active = index;
			this.prev = -1;
			window.localStorage["youtube-" + this.videoId] = this.rows[index].title;
    }
	},
	computed: {
	},
	watch: {
	}
});