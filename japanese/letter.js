Vue.component('letter', { 
	template:  `<div id="frame-letter" style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
		<letter-1 v-if="page == 1"></letter-1>
		<letter-all v-if="page == 2"></letter-all>
  </div>`,
	props: {
	},
	data() {
		return {
			page: 0
		};
	},
	created(){
	},
	async mounted () {
		if(document.body.clientWidth < 400) {
			this.page = 1;
		} else {
			let page = window.localStorage["japanese-letter"];
			this.page = (page == "1") ? 1 : 2;
		}
	},
	destroyed() {
  },
	methods: {
		onChangeIndex() {
		
		},
	},
	watch: {
	},
});