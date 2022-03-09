//; 
Vue.component('yt-exam', { 
	template:  `
    <div id="exam" 
			style="height: 0px; overflow-y: auto; background-color: white; position: relative;"  >
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
					<span style="font-size: 22px; ">{{(i + 1) + "). "}}</span>

					<input type="radio" style="margin: 0px 5px;" :name="'radio' + index"
						:checked="item.answer == i"
						@click="onClickRadio(index, i)"
						v-if="$isDebug() || isExam"
					/>
					<span :style="{color: i == item.answer && !isExam ? 'orange' : '', fontSize: '22px'}" 
						style="user-select: text !important;"
					>
						{{el}}
					</span>
				</div>
      </div>

			<div style="position: fixed; right: 20px; bottom: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
				<a id="linkExamYouTube" href="" target="_blank" 
					style="margin-bottom: 10px; justify-content: center; align-items: center;">
					<Icon type="logo-youtube" size="30" />
				</a>
				<i-button type="success" icon="md-cloud-done" shape="circle" @click.native="update()"  
					v-if="isDirty && !isExam"
				/>
			</div>
    </div>
  `,
	props: {
	},
	data() {
		return {
      topic: [],
			active: -1,
			isExam: false, // 還沒確定，是否要寫測試模式
			isDirty: false,
			origin: []
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
    set(id, item) {
			this.origin = item;
			let el = document.getElementById("exam");
      if(el != null) el.style.padding = "10px 10px";
			el.scrollTop = 0;
			el.style.scrollBehavior = "smooth";
      this.topic = [];
			item.forEach(el => {
				// el.question = el.question.replace('<br/>&nbsp;&nbsp;&nbsp;', "\n");
				let json = Object.assign({}, el)
				json.question = json.question.replace(/(?:\r\n|\r|\n)/g, '<br/>&nbsp;&nbsp;&nbsp;');
				this.topic.push(json);
			});
			setTimeout(() => {
				let m = window.localStorage["yt-" + id];
				if(typeof m != "undefined") {
					this.exam(parseInt(m, 10))
				}				
			}, 600);
			let link = document.getElementById("linkExamYouTube");
			link.href = `https://www.youtube.com/watch?v=${id}`;
    },
		onClickRadio(index, i) {
			let data = this.topic[index];
			data.answer = i
			this.$set(this.topic, index, data);
			this.isDirty = true;
		},
		update() {
			this.topic.forEach((el, index) => {
				this.origin[index].answer = el.answer;
			})
			this.$emit("update", this.origin);
			this.isDirty = false;
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