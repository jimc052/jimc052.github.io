let idResize;
Vue.component('yt-exam', { 
	template:  `
    <div id="exam" 
			style="height: 0px; overflow-y: auto; background-color: white; position: relative;"  >
			<!-- -->
			<table id="tblExam" style="width: 100%;" border="0">
				<tr class="row-exam" v-for="(item, index) in topic" :id="'topic' + index" :name="index + ''" 
					:key="index" :class="{active: active == index}"
					:style="{userSelect: 'text !important'}"
				>
					<td>
						<span :style="{color: item.answer == -1 ? 'red' : (active == index ? '#2d8cf0': ''), 
							fontSize: $smallScreen() ? '20px' :'24px',
							fontWeight: active == index ? '700' : '400',
							paddingRight: '10px'}"
							style="cursor: pointer;"
							v-on:click.stop="onClickSerial(index)"
						>
							{{(index + 1) + '.'}}
						</span>
					</td>
					<td :style="{fontSize: $smallScreen() ? '20px' :'24px'}">
						<div v-if="isExam == false" v-html="item.question"
							:style="{color: item.answer == -1 ? 'red' : (active == index ? '#2d8cf0': ''), 
								fontSize: $smallScreen() ? '20px' :'24px',
								fontWeight: active == index ? '700' : '400'
							}"
							style="user-select: text !important;"
						/>
						<table style="padding-left: 15px; width: 100%;" border="0" cellpadding='0' cellspacing='0'>
							<tr v-for="(el, i) in item.option" :id="'option' + index + '-' + i " 
								:name="index + '-' + i" :key="index + '-' + i"
							>
								<td style="width: 25px;">
									<span :style="{fontSize: $smallScreen() ? '18px' : '22px'}">
										{{String.fromCharCode(i + 97) + ". "}}
									</span>
								</td>
								<td style="width: 25px;" v-if="$isDebug() || isExam">
									<input type="radio" 
										:id="'radio_' + index + '_' + i"
										style="cursor: pointer;"
										:style="{marginTop: $smallScreen() ? '8px' : '12px' }" 
										:name="'radio' + index"
										:checked="item.answer == i"
										@click="onClickRadio(index, i)"
									/>
								</td>
								<td>
									<span :style="{color: i == item.answer && !isExam ? '#f90' : '', 
											fontSize:  $smallScreen() ? '18px' : '22px',
											fontWeight: active == index && i == item.answer && !isExam ? '700' : '400'
										}" 
										style="user-select: text !important;"
									>
										{{el}}
									</span>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table
			<!-- -->

			<div style="position: fixed; right: 20px; bottom: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
				<a id="linkExamYouTube" href="" target="_blank" v-if="!$smallScreen()"
					style="margin-bottom: 10px; justify-content: center; align-items: center;">
					<Icon type="logo-youtube" size="30" />
				</a>
				<i-button type="success" icon="md-cloud-done" shape="circle" @click.native="update()"  
					v-if="dirty > 0 && !isExam"
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
			dirty: 0,
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
		this.broadcast.$on('onResize', this.onResize);
		this.onResize();
	},
	destroyed() {	
    this.broadcast.$off('exam', this.exam);
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		onResize(){
			clearTimeout(idResize);
			idResize = setTimeout(() => {
				
			}, 600);
		},
    exam(index) {
			this.active = index;
			let el = document.getElementById("topic" + this.active);
			if(el == null) return;
			let offsetTop = el.offsetTop;
			let offsetBottom = offsetTop + el.clientHeight;

			let viewer = document.querySelector("#exam");
			let scrollTop = viewer.scrollTop, clientHeight = viewer.clientHeight;
			// console.log(`offsetTop: ${offsetTop}, offsetBottom: ${offsetBottom}, scrollTop: ${scrollTop}, clientHeight: ${clientHeight}`)
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
			item.forEach((el, index) => {
				let json = Object.assign({}, el);
				let question = json.question;

				let _index = question.indexOf(". ");
				if(_index > -1 && _index < 4)
					question = question.substr(_index + 2)

				json.question = question.replace(/(?:\r\n|\r|\n)/g, '<br/>');
				this.topic.push(json);
			});
			setTimeout(() => {
				let m = window.localStorage["yt-" + id];
				if(typeof m != "undefined") {
					this.exam(parseInt(m, 10))
				}				
			}, 600);
			let link = document.getElementById("linkExamYouTube");
			if(link != null)
				link.href = `https://www.youtube.com/watch?v=${id}`;
    },
		onClickRadio(index, i) {
			let data = this.topic[index];
			data.answer = i
			this.$set(this.topic, index, data);
			this.dirty++;
			if(this.dirty >= 5 || index == this.topic.length - 1) {
				this.update();
			}
		},
		onClickSerial(index) {
			this.broadcast.$emit('onPlayerClick', index);
		},
		update() {
			this.topic.forEach((el, index) => {
				this.origin[index].answer = el.answer;
			})
			this.$emit("update", this.origin);
			this.dirty = 0;
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