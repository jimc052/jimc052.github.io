Vue.component('voc-list', { 
	template:  `<modal v-model="modal" class-name="vertical-center-modal" 
			id="vocList" class="page"
		  :fullscreen="true" :closable="false" :footer-hide="true"
			style="overflow: hidden;">
		<header-bar :title="'生字清單 [' + title + ']'" slot="header" 
			icon="md-arrow-back" 
			@goBack="onPopState"
		>
		</header-bar>
		<div style="height: 100%; font-size: 18px; overflow-y: auto; padding: 0 5px 10px 5px;">
			<div v-for="(item1, index1) in datas" :key="index1" style="padding-top: 10px; overflow: hidden;">
				<div class="text-overflow" 
					:style="{'font-size': '22px', 'margin-left': '0 5px', 
						'margin-top': index1 > 0 ? '20px' : '0px',
						color: 'rgb(45, 140, 240)',
						cursor: 'pointer',
					}"
					@click="goto(item1)"
				>
					{{item1.title}}
				</div>
				<row :gutter="5" >	
					<i-col :span="span" v-for="(item2, index2) in item1.vocabulary" :key="index2">
						<div 
							style="font-size: 20px; border-radius: 5px; border: 1px solid #e5e5e5; 
								margin-top: 5px; padding: 5px; cursor: pointer; "
							class="text-overflow"
							@click="yahoo(item2)"
						>
							{{item2}}
						</div>
					</i-col>				
				</row>
			</div>
		</div>
	</modal>`,
	props: {
		title: String
	},
	data() {
		return {
			modal: false,
			datas: [],
			span: 24
		};
	},
	created(){
	},
	async mounted () {
		this.broadcast.$on('onResize', this.onResize);
		window.addEventListener("popstate", this.onPopState);
		this.onResize();
	},
	destroyed() {		
		this.$Notice.destroy();
		window.removeEventListener("popstate", this.onPopState);
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		goto(item) {
			this.onPopState();
			this.$emit("onGoto", item.key);
		},
		yahoo(word){
			window.open('https://tw.dictionary.search.yahoo.com/search?p=' + word, '_blank');
		},
		onResize(){
			clearTimeout(this.resizeId);
			this.resizeId = setTimeout(()=>{
				let l = document.body.clientWidth > 600 ? 200 : 140;
				let x = Math.floor(document.body.clientWidth / l);
				this.span = Math.floor(24 / x);
			}, 100);
		},
		onPopState(e){
			if(typeof e == "undefined") {
				history.back();
			}
			this.modal = false;
		},
		initital(callback){
			let self = this;
			self.datas = [];
			return new Promise(async (success, error)  => {
				try {
					let snapshot1 = await FireStore.db.collection("users").doc(FireStore.uid())
						.collection("history")
						.where("report", "==", this.title)
						.get();
					snapshot1.forEach(doc => {
						if(typeof doc.data().vocabulary == "string" && doc.data().vocabulary.length > 0) {
							let obj = {key: doc.id, vocabulary: doc.data().vocabulary.split("\n")};
							callback(obj);
							self.datas.push(obj);
							self.$set(self.datas, self.datas.length - 1, obj)
						}
						// if(this.$isLocal()) this.checkHTML(self.datas[self.datas.length - 1], self.datas.length - 1)
					});
					if(self.datas.length > 0) self.modal = true;
					success(self.datas);
				} catch(e) {
					error(e)
					vm.showMessage(typeof e == "object" ? JSON.stringify(e) : e);
				}
			});
		}
	},
	computed: {
	},
	watch: {
		report(value) {

		}
	}
});