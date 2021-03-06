Vue.component('list-item', { 
	template:  `<div id="listItem" 
				style="display: flex; flex-direction: column; padding: 6px; background-color: white; overflow-y: auto; height: 100%;">
			<row :gutter="gutter">
				<i-col :span="span" v-for="(item, index) in datas" :key="index" >
					<div style="padding: 2px;" :id="item.key">
						<div class="list-item" 
							:class="{'list-active': item.key == dataKey}"
							@click.stop='onClickItem(index)'>
							<div style="font-size: 20px;" class="text-overflow">{{item.title}}</div>
							<div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
								<div style="width: 32px;">{{index + 1}}</div>
								<div v-if="item.html.indexOf(\`<div class='chinese'>\`) > -1" style="font-size: 8px; color: #c01921;">
								譯
								</div>
								<div style="flex: 1;"></div>
								<div style="width: 80px; text-align: right; margin-right: 10px;"
									v-if="typeof item.extend == 'object' && typeof item.extend.listenDate == 'number'"
									:style="{color: today.between(new Date(item.extend.listenDate)) <= 7 ? '#c01921' : '#C0C0C0'}"
								>
									{{showListenDate(item.extend.listenDate)}}
								</div>
								<Icon 
									v-if="typeof item.extend == 'object' && typeof item.extend.vocabulary == 'string' && item.extend.vocabulary.length > 0" 
									type="md-albums" size="20" color="#c01921" 
									style="cursor: pointer; margin-right: 10px;"									
								/>
								<Icon v-if="$isLogin()"
								  type="md-heart" size="20" style="margin-right: 10px;"				
									:color="changeFavorite(item.extend)" 
								/>
								<Icon v-if="$isFlutter()" type="md-download" size="20" 
									:style="{color: typeof item.mp3Path == 'string' ? '#c01921' : '#e8eaec', 'margin-right': '10px'} "
								/>
								<div style="">{{item.date}}</div>
							</div>
						</div>
					</div>
				</i-col>
			</row>
		</div>`,
	props: {
		datas: Array,
		dataKey: String
	},
	data() {
		return {
			span: 12, // default 24
			gutter: 10,
			today: new Date(),
		};
	},
	created(){
	},
	async mounted () {
		let self = this;
		this.broadcast.$on('onResize', this.onResize);
	},
	destroyed() {
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		onClickIcon(index) {
			console.log("onClickIcon: " + index)
		},
		onClickItem(index) {
			this.$emit("onClick", index)
		},
		onResize(){
			if(document.body.clientWidth < 420){
				this.gutter = 0;
				this.span = 24;
			} else {
				let x = Math.floor(document.body.clientWidth / 350);
				this.span = Math.floor(24 / x);
				this.gutter = 5;
			}
		},
		scrollTo() {
			let el = document.getElementById(this.dataKey)
			if(el == null) return;
			el = el.parentElement;
			let offsetTop = el.offsetTop;
			let offsetBottom = offsetTop + el.clientHeight + 4;

			let viewer = document.querySelector("#listItem");
			let scrollTop = viewer.scrollTop, clientHeight = viewer.clientHeight;
			if(offsetTop >= scrollTop && offsetBottom < scrollTop + clientHeight){
			} else {
				viewer.scrollTop = offsetTop - 65;
			}
		},
		showListenDate(d){
			let d1 = new Date(d);
			let s = "";
			let days = this.today.between(d1);
			// if(days <= 30){
				s = d1.toString(d1.toString("yy-mm-dd") == this.today.toString("yy-mm-dd") ? "hh:MM" : "yy-mm-dd")
			// }
			return s;
		},
		changeFavorite(val){
			let b = typeof val == 'object' && val.favorite == true ? true : false;
			return b ? '#c01921' : '#e8eaec';
		}
	},
	watch: {
		datas(value) {
			if(value.length > 0) {
				setTimeout(() => { 
					this.onResize();
					setTimeout(() => {
						this.scrollTo();
					}, 600);
				}, 300); 
			} 
		},
		dataKey(value) {
		}
	}
});