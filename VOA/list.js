Vue.component('list', { 
	template:  `<div id="list" style="display: flex; flex-direction: column;">
		<header-bar :title="title"></header-bar>
		<list-item :datas="datas" @onClick="onClick" :dataKey="dataKey" style="felx: 1;">
		</list-item>
		<i-button v-if="isDebug" type="primary" shape="circle" icon="md-add" 
			circle @click.native="onAdd" size="large"
			style="position: absolute; bottom: 10px; right: 10px;"
		></i-button>
		<new-item :json="json" @onClose="onCloseNewItem"></new-item>
		<reader :source="data" @onClose="onClosePlayer"></reader>
	</div>`,
	props: {
		title: String,
	},
	data() {
		return {
			datas: [],
			data: null,
			json: null,
			isDebug: location.href.indexOf("file:///") > -1 ? true : false,
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
			if(typeof obj == "object") this.datas.push(obj)
			this.json = null;
		},
		async retrieve() {
			vm.loading();
			let self = this;
			try {
				let snapshot1 = await FireStore.db.collection('VOA')
					.where("report", "==", this.title).get();
				snapshot1.forEach(doc => {
					// console.log(doc.id, doc.data());
					self.datas.push(Object.assign({key: doc.id}, doc.data()))
				});				
			} catch(e) {
				console.log(e)
				vm.showMessage(e);
			}
			setTimeout(()=>{
				vm.loading(false);
			}, self.datas * 100);
		},
		onClick(index){
			this.dataKey = this.datas[index].key;
			var state = {
				id: 2,
				name: "reader",
				title: this.datas[index].title
			};
			history.pushState(state, "reader", "?reader=" + this.datas[index].title);
			this.data = this.datas[index];
			window.localStorage["VOA-" + this.title] = this.datas[index].key;
		},
		onClosePlayer(){
			this.data = null;
		}
	},
	watch: {
		title(value) {
			this.datas = [];
			if(typeof value == "string" && value.length > 0) {
				let s = window.localStorage["VOA-" + this.title];
				if(typeof s == "string" && s.length > 0) {
					this.dataKey = s;
				}
				this.retrieve();
			}
		}
	}
});