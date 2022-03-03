Vue.component('yt-exam', { 
	template:  `
    <div style="height: 0px; overflow-y: auto; background-color: white;" id="exam" >
      <div v-for="(item, index) in topic" :id="'topic' + index" :name="index + ''" 
				:key="index"
				style="margin-bottom: 10px; user-select: auto !important;"
			>
        <div :style="{color: active == index ? '#2d8cf0' : '', fontSize: '24px'}"
					v-html="item.question"
					style="user-select: auto !important;"
				>
				</div>

				<div v-for="(el, i) in item.option" :id="'option' + index + '-' + i " 
					:name="index + '-' + i" :key="index + '-' + i"
					style="margin-left: 20px; "
				>
					<span style="font-size: 20px;">{{(i + 1) + "). "}}</span>
					<span :style="{color: i == item.answer ? 'orange' : '', fontSize: '20px'}" 
						style="user-select: auto !important;">
						{{el}}
					</span>
				</div>
      </div>
    </div>
  `,
	props: {
	},
	data() {
		return {
      topic: [],
			active: -1
		};
	},
	created(){
	},
	mounted () {
		this.broadcast.$on('exam', this.exam);
	},
	destroyed() {	
    this.broadcast.$off('exam', this.exam);
  },
	methods: {
    exam(index) {
			this.active = index;
			let el = document.getElementById("topic" + this.active);
			if(el == null) return;
			let offsetTop = el.offsetTop;
			let offsetBottom = offsetTop + el.clientHeight;

			let viewer = document.querySelector("#exam");
			let scrollTop = viewer.scrollTop, clientHeight = viewer.clientHeight;

			if(offsetTop >= scrollTop && offsetBottom < scrollTop + clientHeight){
			} else {
				viewer.scrollTop = offsetTop - 60;
			}
		},
    set(item) {
			let el = document.getElementById("exam");
      if(el != null) el.style.padding = "10px 30px";
      this.topic = [];
			item.forEach(el => {
				let json = Object.assign({}, el)
				json.question = json.question.replace(/(?:\r\n|\r|\n)/g, '<br/>&nbsp;&nbsp;&nbsp;')
				this.topic.push(json);
			});
    }
	},
	computed: {
	},
	watch: {
		topic(value) {
			// console.log(value)
		}
	}
});