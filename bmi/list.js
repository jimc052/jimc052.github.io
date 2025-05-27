Vue.component('list', { 
	template:  `<div id="list">
		<div id="header">BMI
		</div>
		<div id="section">
			<div class="row" v-for="(item, index) in datas"  @click="onClickRow(item, index);">
				<div>{{item.date}}</div>
				<div style="display: flex; flex-direction: row; align-items: center;  justify-content: center;">
					<span style="margin-right: 5px">{{item.weight}}</span>

					<div style="width: 50px; font-size: 16px;">
						<Icon v-if="item.compare > 0" type="md-arrow-up" size="14" style="color: red" />
						<Icon v-if="item.compare < 0" type="md-arrow-down" size="14" style="color: blue" />
					{{typeof item.compare == 'undefined' || item.compare == 0 ? '' : Math.abs(item.compare)}}</div>

					</div>
				<div :style="{color: item.bmi >= '18.00' && item.bmi <= '24.00' ? 'blue' : 'red' }">BMI：{{item.bmi}}</div>
			</div>
		</div>

		<i-button v-if="height.length > 0 && today == '' && activeItem == null" shape="circle" circle icon="md-add" 
			style="position: absolute; bottom: 15px; right: 15px;"
			@click.native="onAdd()" size="large"
		/>
		<dlg-height :visible="modalH" :height="height" @onClose="modalH = false" @onSave="onSaveHeight" />
		<dlg-weight ref="weight" :visible="modalW" :height="height" 
			@onClose="modalW = false; activeItem = null;" 
			@onSave="onSaveWeight" />
		<div id="footer">2025-05-27</div>
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
			modalW: false,
			activeItem: null,
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
			this.datas.forEach((el, index) => {
				if(index < this.datas.length - 1)
					this.compare(index);
			});
		}
		// console.log(JSON.stringify(this.datas, null, 2));

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
			// console.log("onClickRow", item, index);
			this.activeItem = item;
			this.modalW = true;
			setTimeout(() => {
				this.$refs["weight"].weight = item.weight;
				this.$refs["weight"].calculate();
			}, 600);
		},
		onSaveHeight(h) {
			this.height = h;
			this.$storage("BMI-H", h);
			this.modalH = false;
		},
		onSaveWeight(w) {
			this.modalW = false;
			let arr = this.$storage("BMI");			
			if(this.activeItem == null) {
				this.today = (new Date()).toString("yyyy-mm-dd");
				let json = Object.assign({
					date: this.today, 
				}, w);

				arr.unshift(json);
				this.$storage("BMI", arr);
				this.datas.unshift(json);
			} else {
				arr.forEach((el, index) => {
					if(el.date == this.activeItem.date) {
						el.weight = w.weight;
						el.bmi = w.bmi;					
					}
				});
				this.$storage("BMI", arr);

				this.datas.forEach((el, index) => {
					if(el.date == this.activeItem.date) {
						el.weight = w.weight;
						el.bmi = w.bmi;					
					}
				});
				this.activeItem = null;
			}
			// console.log(JSON.stringify(arr, null, 2));
			
			if(this.datas.length >= 2)
				this.compare(0);
		},
		compare(index) {
			let w1 = parseFloat(this.datas[index].weight);
			let w2 = parseFloat(this.datas[index + 1].weight);
			this.datas[index].compare = (w1 - w2).toFixed(1);
		}
	},
	watch: {
	}
});