Vue.component('gym-player', { 
	template:  `
    <div style="padding: 10px;">
      <i-button v-for="(item, index) in rows" :key="index"
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
      rows: []
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
      console.log(item)
      this.rows = Array.isArray(item.children) ? item.children : [];
    },
    onClick(index) {
      console.log(index)
      this.$emit('on-click', this.rows[index]);
    }
	},
	computed: {
	},
	watch: {
	}
});