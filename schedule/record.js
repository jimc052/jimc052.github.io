Vue.component('record', {
	template:  `<div style="flex: 1; display: flex; flex-direction: column;">
		<div v-for="item in rows">
			{{item[0] + "：" + item[1]}}
		</div>
		<div v-if="date == alarm.substr(0, 10)" 
			style="cursor: pointer; display: flex; flex-direction: row; align-items: center; color: red;"
			@click.stop="onClickIcon()">
			<Icon type="ios-alarm" size="20" 
				style="margin-right: 5px; color: red;"/>
			{{alarm.substr(11)}}
		</div>
	</div>`,
	props: {
		datas: {
			type: Object,
			require: true
		},
		date: {
			type: String,
			require: true
		},
		alarm: {
			type: String,
			require: false, 
			default: ''
		},
	},
	data() {
		return {
			rows: []
		};
	},
	created(){	
	},
	async mounted () {
		this.retrieve()
	},
	destroyed() {
  },
	methods: {
		onClickIcon(){
			this.$emit('onAlarmSet');
		},
		retrieve() {
			this.rows = [];
			if(this.datas != null && typeof this.datas[this.date.substr(8)] == "object") {
				let json = this.datas[this.date.substr(8)];
				for(let key in json){
					this.rows.push([key, json[key]])
				}			
			};			
		}
	},
	watch: {
		datas(value) {
			this.retrieve()
		}
	}
});
