Vue.component('list', { 
	template:  `<div id="list">
		<div id="header">BMI
		</div>
		<div id="section">
			<div class="row" v-for="(item, index) in datas"  @click="onClickRow(item, index);">
			</div>
		</div>

		<i-button v-if="height > 0 && today == ''" type="primary" shape="circle" circle icon="md-add" 
			style="position: absolute; bottom: 10px; right: 10px;"
			@click.native="onAdd()" size="large"
		/>
		<height :visible="modalH" @onClose="modalH = false" />
	</div>`,
	props: {
	},
	data() {
		return {
			height: 0,
			datas: [],
			today: "",
			modalH: false
		};
	},
	created(){
	},
	async mounted () {
		this.datas = this.$storage("BMI");
		console.log(this.datas)
		setTimeout(() => {
			this.modalH = true;
		}, 600);
	},	
	destroyed() {
  },
	methods: {
		onAdd() {

		},
		onClickRow(item, index) {

		}
	},
	watch: {
	}
});