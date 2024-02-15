Vue.component('dlg-writing', {
	template:  `<modal id="dlg-writing" v-model="visible" @on-visible-change="onVisibleChange" fullscreen style="overflow: hidden;">
		<div slot="footer" />
	</modal>`,
	props: {
		visible: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			// visible: true,
		};
	},
	created(){
	},
	mounted () {
		let els = document.querySelectorAll("#dlg-writing .ivu-modal-content > *");
		for(let i = els.length -1; i >= 0; i--) {
			els[i].parentNode.removeChild(els[i]);
		}
		const el = document.querySelector("#dlg-writing .ivu-modal-content");
		const table = document.createElement("table");
		table.id = "table-writing";
		table.style.width =  (Math.ceil(Math.round(203/2.54)) * 21) + "px";
		el.appendChild(table);
		for(let i = 0; i < 10; i++) {
			let row = table.insertRow(0);
			for(let j = 0; j < 10; j++) {
				let cell = row.insertCell(0);
				// x.innerHTML = "New cell";
			}
		}
		

		/*
			var row = document.getElementById("myRow");

		 */
	},
	destroyed() {
  },
	methods: {
		onVisibleChange(v){
			if(v == false) {
			}
		},
	},
	watch: {
	}
});