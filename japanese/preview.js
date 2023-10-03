Vue.component('preview', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
		id="preview" :fullscreen="true" :closable="false" style="overflow: hidden;"
	>

		<div slot="footer" style="display: flex; padding: 0px; height: 0px;">
			
		</div>
	</modal>`,
	/*
		<div style="flex: 1;" />
			<Button type="default" size="large"  @click="cancel" style="width: 100px;">取消</Button>
			<Button  type="primary" size="large"  @click="print" style="width: 100px; margin-left: 10px;">列印</Button>
	*/
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
		let footer = document.querySelector("#preview .ivu-modal-footer");
		footer.style.display = "none";

		let body = document.querySelector("#preview .ivu-modal-body");
		body.style.bottom = 0;
		body.style.overflow = "none";
	},
	destroyed() {
  },
	methods: {
    cancel() {
			this.$emit("onClose");
		},
    print() {
      // this.$emit("onClose", this.target);
    },
    render() {
      let body = document.querySelector("#preview .ivu-modal-body");
			
			let createPage = () => {
				let page = document.createElement("div");
				page.style.display = "flex";
				page.style.flexWrap = "wrap";
				page.classList.add("page");
				// page.style.width = "1100px";
				body.appendChild(page);
				return page;
			}
      // body.style.overflow = "auto";
      console.log(body)
      if(this.visible == true){
				let page = createPage();
				
				// page.style.height = "20cm";
				for(let i = 0; i < this.datastore.length; i++) {
					let html = this.renderWord(this.datastore[i], i);
					let div = document.createElement("div");
					div.classList.add("card");
					div.style.width = "370px";
					div.style.fontSize = "20px";
					div.innerHTML = html;
					page.appendChild(div)
					if(page.clientHeight > 400) {
						page = createPage();
					}
				}
      } else {
				body.innerHTML = "";
      }
    },
		renderWord(item, index) {
			let accent = window.renderAccent(item.語, item.重);
			let 漢 = typeof item.漢 == "string" && item.漢.length > 0
				? (`<div style="min-height: 0px;"> ${item.漢.trimChinese()}</div>`)
				: "";
 // <div class="card " style="font-size: 20px; width: auto; background: white; ">
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
		}
	},
});