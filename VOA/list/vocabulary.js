Vue.component('dlg-vocabulary', { 
	template:  `<modal v-model="visible" id="vocabulary" :footer-hide="true" :width="250" :closable="false"" 
		:draggable="true" :mask-closable="false" >
		<div slot="header" style="display: flex; flex-direction: row; padding: 10px 12px; background-color: rgb(70, 160, 240)">
			<div style="flex: 1; color: white;">生字</div>
			<Icon type="md-close" size="20" @click.native="close" style="cursor: pointer; color: white;" />
		</div>
		<div style="height:250px; overflow: hidden; ">
			<div style="height: 100%; overflow-y: auto; " id="vocabularyFrame">
				<div v-for="(item, index) in rows" :key="index" 
					style="display: flex; flex-direction: row; justify-content: center; align-items: center;
						padding: 0px 5px; height: 40px;	
					"
					class="vocabulary"
				>
					<i-input v-if="cursor == index" size="large" element-id="editVocabulary"
						v-model="model" style="flex: 1; " />
					<div v-else style="cursor: pointer; flex: 1; font-size: 18px;"
						@click="yahoo(item)"
					>
						{{item}}
					</div>
					<Icon v-if="cursor == index" type="md-cloud-upload" size="18" 
						@click.native="upload()" 
						style="cursor: pointer; margin-left: 6px;" />
					<Icon v-else type="md-create" size="18" 
						@click.native="cursor = index; model = item;" 
						style="cursor: pointer; margin-left: 6px;" />
					<Icon :type="cursor == index ? 'md-close' : 'md-trash'" size="18"
						@click.native="del(index)" 
						style="cursor: pointer; margin-left: 6px;" />
				</div>
			</div>
		</div>
	</modal>`,
	props: {
		visible: Boolean,
		data: String
	},
	data() {
		return {
			rows: [],
			cursor: -1,
			model: "",
		};
	},
	created(){
	},
	async mounted () {
		let el = document.querySelector("#vocabulary .ivu-modal");
		el.style.margin = "0px";
		setTimeout(()=>{
			el = document.querySelector("#vocabulary .ivu-modal-content-drag");
			el.style.left = (document.body.clientWidth - 270 + (this.$isSmallScreen() ? 15 : 0)) + "px";
			el.style.top = (document.body.clientHeight - 400) + "px";
		}, 600)
		this.broadcast.$on('onResize', this.onResize);
	},
	destroyed() {
		
  },
	methods: {
		onKeydown(event) {
			let self = this;
			let o = document.activeElement;
			// let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			// let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			let sk = event.shiftKey, code = event.keyCode;
			// console.log("key: " + code + "/" + pk)
			if(o.tagName == "INPUT" && event.target.id == "editVocabulary" && this.visible == true){
				if(code == 13) {
					this.upload();
				} else if(code == 27) {
					this.cursor = -1; this.model = "";
				}
				event.preventDefault();
				event.stopImmediatePropagation();
				event.stopPropagation();
			}
		},
		yahoo(word){
			window.open('https://tw.dictionary.search.yahoo.com/search?p=' + word, '_blank');
		},
		close(){
			this.cursor = -1; this.model = "";
			this.$emit("close");
		},
		del(index){
			if(this.cursor == -1) {
				this.rows.splice(index, 1);
				this.$emit("update", this.rows)
			}
			this.cursor = -1;
			this.model = "";
		},
		upload(){
			if(this.rows[this.cursor] != this.model) {
				this.rows[this.cursor] = this.model;
				this.$emit("update", this.rows);				
			}
			this.cursor = -1; this.model = "";
		},
		onResize(){
			clearTimeout(this.resizeId);
			this.resizeId = setTimeout(()=>{
				let el = document.querySelector("#vocabulary .ivu-modal-content-drag");
				if(el == null) 
					return;
				let left = el.style.left.replace("px", "");
				if(left > document.body.clientWidth - 270)
					el.style.left = (document.body.clientWidth - 270) + "px";
					let top = el.style.top.replace("px", "");
				if(top > document.body.clientHeight - 400)
					el.style.top = (document.body.clientHeight - 400) + "px";
			}, 300);
		}
	},
	computed: {	
	},
	watch: {
		data(value) {
			let arr = typeof value == "string" ? value.split("\n") : []
			arr.sort((a, b) => {
				a = a.toUpperCase();
				b = b.toUpperCase();
				if(a > b)
					return 1;
				else if(a < b)
					return -1;
				else
					return 0;
			});
			this.rows = arr;
		},
		cursor(value) {
			let self = this;
			if(value > -1) {
				setTimeout(() => {
					let el = document.getElementById("editVocabulary");
					el.focus();
					el.addEventListener('keydown', this.onKeydown, false);
					el.addEventListener('blur', function(e) {
						self.cursor = -1; self.model = "";
					}, false);
				}, 300);
			} else {
				let el = document.getElementById("editVocabulary");
				el.removeEventListener('keydown', this.onKeydown, false);
			}
		}
	}
});