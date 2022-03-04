//; 
Vue.component('yt-exam', { 
	template:  `
    <div style="height: 0px; overflow-y: auto; background-color: white;" id="exam" >
      <div v-for="(item, index) in topic" :id="'topic' + index" :name="index + ''" 
				:key="index"
				:style="{backgroundColor: active == index ? '#f5f5f5' : '', borderRadius: '8px',
					border: active == index ? '1px solid #ddd' : '', 
					padding: '5px 10px', marginBottom: '5px', userSelect: 'text !important'}"
			>
        <div v-if="isExam == false" :style="{color: active == index ? '#2d8cf0' : '', fontSize: '24px'}"
					v-html="item.question"
					style="user-select: text !important;"
				/>

				<div v-else :style="{color: active == index ? '#2d8cf0' : '', fontSize: '24px'}">
					{{(index + 1) + "."}}
				</div>
				

				<div v-for="(el, i) in item.option" :id="'option' + index + '-' + i " 
					:name="index + '-' + i" :key="index + '-' + i"
					style="margin-left: 30px; "
				>
					<span style="font-size: 22px;">{{(i + 1) + "). "}}</span>
					<span :style="{color: i == item.answer && !isExam ? 'orange' : '', fontSize: '22px'}" 
						style="user-select: text !important;">
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
			active: -1,
			isExam: false
		};
	},
	created(){
	},
	mounted () {
		this.broadcast.$on('exam', this.exam);
		// this.broadcast.$on('exam', this.exam);
		// if(location.href.indexOf("exam=N") > -1) {
		// 	this.isExam = false;
		// }
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
      if(el != null) el.style.padding = "10px 10px";
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