Vue.component('list', { 
	template:  `<div id="list" style="display: flex; flex-direction: column;">
		<header-bar :title="title">
			<Icon slot="right" v-if="$isSmallScreen()" @click.native="onReload" type="md-refresh" size="28" color="white" 
				style="cursor: pointer; margin-right: 10px;"></Icon>
		</header-bar>
		<list-item :datas="datas" @onClick="onClick" :dataKey="dataKey" style="felx: 1;">
		</list-item>
		<i-button v-if="$isLocal()" type="primary" shape="circle" icon="md-add" 
			circle @click.native="onAdd" size="large"
			style="position: absolute; bottom: 10px; right: 10px;"
		></i-button>
		<new-item :json="json" @onClose="onCloseNewItem"></new-item>
		<reader v-if="source != null" :source="source" 
			@onClose="onCloseReader" 
			@onUpdate="onUpdate"
		></reader>
	</div>`,
	props: {
		title: String,
	},
	data() {
		return {
			datas: [],
			source: null,
			json: null,
			dataKey: ""
		};
	},
	created(){
	},
	async mounted () {
	},
	destroyed() {
  },
	methods: {
		onReload(){
			location.reload()
		},
		onAdd() {
			let self = this;
			navigator.clipboard.readText()
			.then(text => {
				if(text.indexOf('{"key":"') == 0 && text.indexOf('') > -1){
					self.json = JSON.parse(text);			
				} else {
					vm.showMessage("clipboard 的資料不符合");
				}
			})
			.catch(err => {
				// console.error('Failed to read clipboard contents: ', err);
			});
		},
		onCloseNewItem(obj) {
			if(typeof obj == "object") {
				for(let i = 0; i < this.datas.length; i++){
					if(this.datas[i].report == obj.report && this.datas[i].key == obj.key){
						this.datas[i].html = obj.html;
						obj = undefined;
						break;
					}
				}
				if(typeof obj == "object") {
					this.datas.push(obj);
				}
			}
			this.json = null;
		},
		async retrieve() {
			vm.loading();
			let self = this;
			try {
				let snapshot1 = await FireStore.db.collection('VOA')
					.where("report", "==", this.title)
					// .orderBy("date", "desc")
					.get();
				snapshot1.forEach(doc => {
					self.datas.push(Object.assign({key: doc.id}, doc.data()));
					// let row = self.datas[self.datas.length - 1];
					// console.log(row.report + ": " + row.key)
				});
			} catch(e) {
				console.log(e)
				vm.showMessage(typeof e == "object" ? JSON.stringify(e) : e);
			}
			setTimeout(()=>{
				vm.loading(false);
			}, self.datas.length * 5);
		},
		onClick(index){
			this.dataKey = this.datas[index].key;
			var state = {
				id: 2,
				name: "reader",
				title: this.datas[index].title
			};
			history.pushState(state, "reader", "?reader=" + this.datas[index].title);
			this.source = this.datas[index];
			if(FireStore.login == true){
				FireStore.setSetting(this.title, {active: this.datas[index].key});
			} else {
				window.localStorage["VOA-" + this.title] = this.datas[index].key;
			}
		},
		onCloseReader(){
			this.source = null;
		}, 
		async onUpdate(html) {
			this.source.html = html;
			try {
				await FireStore.update(this.source)
				this.$Notice.success({
					title: "已上傳",
				});
			} catch(e) {
				console.log(e)
			}
		}
	},
	watch: {
		async title(value) {
			this.datas = [];
			if(typeof value == "string" && value.length > 0) {
				if(FireStore.login == true){
					let json = await FireStore.getSetting(this.title);
					if(typeof json != "undefined"){
						this.dataKey = json.active;
					}
				} else {
					let s = window.localStorage["VOA-" + this.title];
					if(typeof s == "string" && s.length > 0) {
						this.dataKey = s;
					}					
				}
				this.retrieve();
			}
		}
	}
});