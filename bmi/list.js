Vue.component('list', { 
	template:  `<div id="list">
		<div id="header">BMI
		</div>
		<div id="section">
			<div class="row" v-for="(item, index) in datas"  @click="onClickRow(item, index);">
				<div>{{item.date}}</div>
				<div>{{item.weight}}</div>
				<div>BMI：{{item.bmi}}</div>
			</div>
		</div>

		<i-button v-if="height.length > 0 && today == ''" type="primary" shape="circle" circle icon="md-add" 
			style="position: absolute; bottom: 10px; right: 10px;"
			@click.native="onAdd()" size="large"
		/>
		<dlg-height :visible="modalH" :height="height" @onClose="modalH = false" @onSave="onSaveHeight" />
		<dlg-weight :visible="modalW" :height="height" @onClose="modalW = false" @onSave="onSaveWeight" />
	</div>`,
	props: {
	},
	data() {
		return {
			height: 0,
			datas: [],
			today: "",
			height: "",
			modalH: false,
			modalW: false
		};
	},
	created(){
	},
	async mounted () {
		let s = (new Date()).toString("yyyy-mm-dd");
		console.log(s)
		this.datas = this.$storage("BMI");
		if(this.datas.length > 0) {
			if(this.datas[0].date.indexOf(s) == 0) { // 已新增過
				this.today = s;
			}
		}
		// console.log(this.datas)

		this.height = this.$storage("BMI-H");
		if(this.height.length == 0) {
			setTimeout(() => {
				this.modalH = true;
			}, 600);			
		}
	},	
	destroyed() {
  },
	methods: {
		onAdd() {
			this.modalW = true;
		},
		onClickRow(item, index) {

		},
		onSaveHeight(h) {
			this.height = h;
			this.$storage("BMI-H", h);
			this.modalH = false;
		},
		onSaveWeight(w) {
			this.modalW = false;

			this.datas.unshift(Object.assign({
				date: (new Date()).toString("yyyy-mm-dd"), 
			}, w))
			console.log(this.datas)
			this.$storage("BMI", this.datas)
		}
	},
	watch: {
	}
});