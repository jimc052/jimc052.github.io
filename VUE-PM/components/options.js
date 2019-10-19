Vue.component('options', { 
	template: 
		`<i-select v-model="keyword" style="width:120px; margin-right: 5px;">
			<i-option v-for="item in options" :value="item.value" :key="item.value">
				{{ item.label }}
			</i-option>
		</i-select>`
	,
	props: {
		value: {
			type: String,
			default: '',
			require: false
		},
		datas: {
			type: Array,
			default: [],
			require: true
		},
		empty: {
			type: Boolean,
			default: true,
			require: false
		},
	},
	data(){
		return {
			options: [],
			keyword: ""
		};
	},
	created(){
	},
	mounted(){
		this.keyword = this.value;
		if(this.empty == true) {
			this.options.push({label: "...", value: ""});
		}
		
		for(let i = 0; i < this.datas.length; i++) {
			if(typeof this.datas[i] == "string")
				this.options.push({label: this.datas[i], value: this.datas[i] })
			else if(typeof this.datas[i].title == "string")
				this.options.push({label: this.datas[i].title, value: this.datas[i].key })
			else
			this.options.push(this.datas[i])
		}
	},
	destroyed(){
  },
	methods: {
		
	}
});