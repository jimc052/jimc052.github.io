Vue.component('preview', { 
	template:  ` <div id="preview" style="background: white; overflow: auto; top: 0px; left: 0px;">
	</div>`,
	props: {
		datastore: {
			type: Array,
			require: true, 
			default: undefined
		},
	},
	data() {
		return {
			visible: false,
		};
	},
	created(){
	},
	mounted () {

	},
	destroyed() {
		
  },
	methods: {
		onBeforePrint() {
			let body = document.querySelector("#preview");
			body.style.overflow = "none";
			body.style.position = "absolute";

			let cards = document.querySelectorAll("#preview .card");
			for(let i = 0; i < cards.length; i++) {
				// cards[i].style.border = "0px";
			}

			let pages = document.querySelectorAll("#preview .page");
			for(let i = 0; i < pages.length; i++) {
				// pages[i].style.border = "0px";
				// pages[i].style.marginTop = "0px";
			}
		},
		onAfterPrint() {
			let body = document.querySelector("#preview");
			body.style.overflow = "auto";
			body.style.position = ""; 

			let cards = document.querySelectorAll("#preview .card");
			for(let i = 0; i < cards.length; i++) {
				// cards[i].style.border = "2px #eee solid";
			}

			let pages = document.querySelectorAll("#preview .page");
			for(let i = 0; i < pages.length; i++) {
				// pages[i].style.border = "1px solid rgb(45, 140, 240)";
				// if(i > 0)  pages[i].style.marginTop = "10px";
			}
		},
    cancel() {
			this.$emit("onClose");
		},
    render() {
      let body = document.querySelector("#preview");
			
			let createPage = (index) => {
				let page = document.createElement("div");
				page.style.display = "flex";
				page.style.flexWrap = "wrap";
				page.classList.add("page");
				page.style.backgroundColor = "white";
				if(index > 0) {
					page.style.pageBreakBefore = "always";
				}
				page.style.width = "780px";
				body.appendChild(page);
				return page;
			}
      if(this.visible == true){
				let page = createPage();
				// page.style.height = "20cm";
				for(let i = 0; i < this.datastore.length; i++) {
					let html = this.renderWord(this.datastore[i], i);
					let div = document.createElement("div");
					div.classList.add("card");
					div.style.minWidth = "385px";
					div.style.fontSize = "20px";
					div.style.border = "none"; // 為了算列印時的高度
					
					div.innerHTML = html;
					page.appendChild(div);
					if(page.clientHeight > 1090) {
						page.removeChild(div)
						page = createPage(i);
						page.appendChild(div);
					}
				}
				setTimeout(() => {
					this.onAfterPrint();
				}, 1000);
      } else {
				body.innerHTML = "";
      }
    },
		renderWord(item, index) {
			let accent = window.renderAccent(item.語, item.重);
			let 漢 = typeof item.漢 == "string" && item.漢.length > 0
				? (`<div style="min-height: 0px;"> ${item.漢.trimChinese()}</div>`)
				: "";
			return (
				`
					<div style="min-width: 25px; font-size: 20px; margin-right: 5px;">${(index + 1) + "."}</div>
					
					<div style="flex: 1; font-size: 20px; display: flex; flex-direction: column;">
						<div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
							<div style="min-height: 0px;">
							${accent}
							</div>
							<div style="color: #2d8cf0; margin-left: 20px;">
								${typeof item.重 == "string" ? item.重 : ""}
							</div>
						</div>
						${漢}
						<a styl href="javascript: TTX.speak('${item.語}');" 
							style="font-size: 20px;"
						>
							${window.rome(item.語)}
						</a>
						<div>${item.中}</div>
					</div>
				`);
		}
	},
	watch: {
		datastore(value) {
			this.visible = value == null || typeof value == "undefined" ? false : true;
      this.render();
			if(this.visible == true) {
				window.addEventListener("beforeprint", this.onBeforePrint);
				window.addEventListener("afterprint", this.onAfterPrint);
			} else {
				window.removeEventListener("beforeprint", this.onBeforePrint);
				window.removeEventListener("afterprint", this.onAfterPrint);
			}
		}
	},
});