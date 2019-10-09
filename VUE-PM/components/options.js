Vue.component('options', { 
	template: 
		'<i-select v-model="keyword" style="width:120px; margin-right: 5px;">' +
			'<i-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</i-option>' +
		'</i-select>'
	,
	props: {
		columns: {
			type: Array,
			default: [],
			require: true
		},
	},
	data(){
		return {
			keyword: "",
			options: [{label: "空白....", value: ""}]
		};
	},
	created(){
		for(let i = 0; i < this.columns.length; i++) {
			if(typeof this.columns[i].title == "string")
				this.options.push({label: this.columns[i].title, value: this.columns[i].key })
		}
	},
	mounted(){
		// for(let i = 0; i < this.columns.length; i++) {
		// 	this.options.push({label: this.columns[i].title, value: this.columns[i].key })
		// }
	},
	destroyed(){
  },
	methods: {
		
	}
});