Vue.component('list', { 
	template:  `<div id="list">
		<div id="header">BMI
		</div>
		<div id="section">
			<div class="row" v-for="(item, index) in datas"  @click="onClickRow(item, index);">
				<div>{{item.date}}</div>
				<div>{{item.weight}}</div>
				<div :style="{color: item.bmi >= '18.00' && item.bmi <= '24.00' ? 'blue' : 'red' }">BMI：{{item.bmi}}</div>
			</div>
		</div>

		<i-button v-if="height.length > 0 && today == ''" shape="circle" circle icon="md-add" 
			style="position: absolute; bottom: 15px; right: 15px;"
			@click.native="onAdd()" size="large"
		/>
		<dlg-height :visible="modalH" :height="height" @onClose="modalH = false" @onSave="onSaveHeight" />
		<dlg-weight ref="weight" :visible="modalW" :height="height" @onClose="modalW = false" @onSave="onSaveWeight" />
		<div id="footer">2024-07-05</div>
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
		// console.log(s)
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
			if(this.datas.length > 0) {
				setTimeout(() => {
					this.$refs["weight"].weight = this.datas[0].weight;
					this.$refs["weight"].calculate();
				}, 600);				
			}
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
			// console.log(JSON.stringify(this.datas));
			this.$storage("BMI", this.datas)
		}
	},
	watch: {
	}
});