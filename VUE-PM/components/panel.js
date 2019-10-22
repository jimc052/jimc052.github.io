Vue.component('panel', {
	template: `<div style=" display: flex; flex-direction: column; padding: 0px;" >
			<span style="font-size: 16px; padding: 0 10px;">{{title}}</span>
			<div style="overflow-y: auto; width: 300px;">
				<List border size="large" style="background-color: white;">
					<ListItem v-for="(item, index) in datas" :key="item.PK" style="display: block; width: 100%; cursor: pointer;" @click.native="onClick(item, index)">
						<div>{{item.PRJ_NAME}}</div>
						<div>{{item.TITLE}}</div>
					</ListItem>
				</List>
			</div>
		</div>`, //ivu-list-items ivu-list-item
	props: {
		type: String,
		title: String,
		datas: {
			type: Array,
			default: [],
			require: true
		},
	},
	data() {
		return {
		};
	},
	created(){
	},
	async mounted () {
	},
	destroyed() {
  },
	methods: {
		onClick(item, index){
			this.$emit("onClick", {item, index, type: this.type});
		}
	},
	watch:{
		title(value) {
			console.log(value)
		},
		datas(value) {
			console.log(value)
		}
	}

});