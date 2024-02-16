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
		this.addPage();
		this.addPage();
	},
	destroyed() {
  },
	methods: {
		onVisibleChange(v){
			if(v == false) {
			}
		},
		addPage() {
			const el = document.querySelector("#dlg-writing .ivu-modal-content");
			const div = document.createElement("div");
			el.appendChild(div);
			if(el.children.length > 0)
				div.style.pageBreakBefore = "always";

			const table = document.createElement("table");
			table.classList.add("table-writing")
			table.style.width = Math.ceil(37.795 * 20) + "px"; // (Math.ceil(Math.round(203/2.54)) * 20.3) + "px";
			div.appendChild(table);
		
			console.log(table.clientHeight)
			let xx = 0; // table.clientHeight < Math.ceil(37.795 * 29) || 
			while(xx < 10) {
				let row = table.insertRow(0);
				for(let j = 0; j < 10; j++) {
					let cell = row.insertCell(0);
					cell.innerHTML = j;
					cell.style.height = "50px";
				}
				xx++;
				// console.log(table.style.offsetHeight)
			}
			setTimeout(() => {
				console.log(div.clientHeight)	
			}, 0);
			
			// for(let i = 0; i < 10; i++) {
			// 	let row = table.insertRow(0);
			// 	for(let j = 0; j < 10; j++) {
			// 		let cell = row.insertCell(0);
			// 		cell.innerHTML = j;
			// 	}
			// }
			return table;
		}
	},
	watch: {
	}
});