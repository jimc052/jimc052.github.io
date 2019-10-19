new Vue({
	template: `<div id="frame" style="height: 100%; display: flex; flex-direction: column;">
			<header-bar title="首頁"></header-bar>
			<div style="flex: 1;">
			</div>
		</div>`,
	data() {
		return {
		};
	},
	created(){
	},
	async mounted () {
		// try {
		// 	let rows = await window.sqlite.execute("Select * from USER");
		// } catch(e) {
		// 	console.log(e)
		// }		
	},
	destroyed() {
  },
	methods: {
		
	}
}).$mount('#frame');