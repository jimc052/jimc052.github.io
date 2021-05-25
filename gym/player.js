Vue.component('gym-player', { 
	template:  `
    <div style="padding: 0px 10px 15px 10px;" id="btnPlays">
      <i-button v-for="(item, index) in rows" :key="index"
				:type="active == index ? 'warning' : 'default'"
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
			active: -1
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
    },
    onClick(index) {
      this.$emit('on-click', this.rows[index]);
			this.active = index;
    }
	},
	computed: {
	},
	watch: {
	}
});