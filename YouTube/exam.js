Vue.component('yt-exam', { 
	template:  `
    <div style="height: 0px; border: 1px red solid; " id="exam" >
      <div v-for="(item, index) in topic" :id="'topic' + index" :name="index + ''" :key="index">
        <div>{{item.question}}</div>
      </div>
    </div>
  `,
	props: {
	},
	data() {
		return {
      topic: []
		};
	},
	created(){
	},
	mounted () {
	},
	destroyed() {	
    this.broadcast.$off('exam', this.exam);
  },
	methods: {
    exam() {
		},
    set(item) {
      console.log(item)
      this.topic = item;
    }
	},
	computed: {
	},
	watch: {
		topic(value) {
			console.log(value)
		}
	}
});