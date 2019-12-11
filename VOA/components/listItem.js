Vue.component('list-item', { 
	template:  `<div id="listItem" 
				style="display: flex; flex-direction: column; padding: 6px; background-color: white; overflow-y: auto; height: 100%;">
			<row :gutter="gutter">
				<i-col :span="span" v-for="(item, index) in datas" :key="index" >
					<div style="padding: 2px;" :id="item.key">
						<div class="list-item" 
							:class="{'list-active': item.key == dataKey}"
							@click.stop='onClickItem(index)'>
							<div style="font-size: 20px; " class="text-overflow">{{item.title}}</div>
							<div style="display: flex; flex-direction: row;">
								<div style="width: 30px;">{{index + 1}}</div>
								<div style="flex: 1;" />
								<div style="padding-left: 5px;">{{item.date}}</div>
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
		};
	},
	created(){
	},
	async mounted () {
		let self = this;
		this.broadcast.$on('onResize', this.onResize);
	},
	destroyed() {
  },
	methods: {
		onClickItem(index) {
			this.$emit("onClick", index)
		},
		onResize(){
			if(document.body.clientWidth < 420){
				this.gutter = 0;
				this.span = 24;
			} else {
				let x = Math.floor(document.body.clientWidth / 320);
				this.span = Math.floor(24 / x);
				this.gutter = 5;
			}
		},
		scrollTo() {
			let el = document.getElementById(this.dataKey)
			if(el == null) return;
			el = el.parentElement;
			let offsetTop = el.offsetTop;
			let offsetBottom = offsetTop + el.clientHeight;

			let viewer = document.querySelector("#listItem");
			let scrollTop = viewer.scrollTop, clientHeight = viewer.clientHeight;
			if(offsetTop >= scrollTop && offsetBottom < scrollTop + clientHeight){
			} else {
				viewer.scrollTop = offsetTop - 65;
			}
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