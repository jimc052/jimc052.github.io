Vue.component('list', { 
	template:  `<div id="list" style="display: flex; flex-direction: column;">
		<header-bar :title="title">
			<Dropdown slot="right" @on-click="onClickMore($event)" style="margin-right: 10px"
				:trigger="$isSmallScreen() ? 'click' : 'hover'"
				v-if="$isLogin()"
			>
				<Icon type="md-more" size="28" color="white" style="cursor: pointer; margin-left: 10px;"></Icon>
				<DropdownMenu slot="list">
					<DropdownItem name="生字清單">生字清單</DropdownItem>
					<DropdownItem name="重新下載" v-if="$isSmallScreen()" divided>重新下載</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		
		</header-bar>
		<list-item :datas="datas" @onClick="onClick" :dataKey="dataKey" style="felx: 1;">
		</list-item>
		<i-button v-if="$isAdmin() && ! $isFlutter()" type="primary" shape="circle" icon="md-add" 
			circle @click.native="onAdd" size="large"
			style="position: absolute; bottom: 10px; right: 10px;"
		></i-button>
		<new-item :json="json" @onClose="onCloseNewItem"></new-item>
		<reader v-if="source != null" :source="source" 
			@onClose="onCloseReader" 
			@onUpdate="onUpdate"
		>
		</reader>
		<voc-list :title="title" ref="vocList" @onGoto="onGoto">
		</voc-list>
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
		onGoto(key) {
			for(let i = 0; i < this.datas.length; i++) {
				if(this.datas[i].key == key){
					this.onClick(i)
					break;
				}
			}
		},
		async onClickMore(item) {
			console.log(item)
			if(item == "生字清單") {
				vm.loading();
				let ds = await this.$refs["vocList"].initital((data)=>{
						this.datas.forEach(item1=>{
							if(item1.key == data.key)
								data.title = item1.title;
						});					
				});
				if(ds.length > 0) {
					var state = {
						id: 2,
						name: "voc-list",
						title: this.title
					};
					history.pushState(state, "voc-list", "?voc-list=" + this.title);
				} else {
					vm.showMessage("沒有生字!!")
				}
				// console.log(ds);
				vm.loading(false);
			} else if(item == "重新下載") {
				location.reload()
			}
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
						this.checkHTML(obj, i)
						break;
					}
				}
				if(typeof obj == "object") {
					this.datas.push(obj);
					this.checkHTML(obj, this.datas.length - 1)
				}
			}
			this.json = null;
		},
		async retrieve() {
			vm.loading();
			let self = this;
			let arr = [];
			try {
				let snapshot1 = await FireStore.db.collection('VOA')
					.where("report", "==", this.title)
					// .orderBy("date", "desc")
					.get();
				snapshot1.forEach(doc => {
					arr.push(Object.assign({key: doc.id}, doc.data()));
					// if(this.$isLocal()) this.checkHTML(self.datas[self.datas.length - 1], self.datas.length - 1)
				});

				if(this.$isLogin()) {
					let x = 0; 
					snapshot1 = await FireStore.db.collection("users").doc(FireStore.uid())
						.collection("history")
						.where("report", "==", this.title)
						.get();
					snapshot1.forEach(doc => {
						if(typeof doc.data().vocabulary == "string" && doc.data().vocabulary.length > 0) {
							for(let i = x; i < arr.length; i++) {
								x = i;
								if(arr[i].key == doc.id) {
									arr[i].extend = {
										vocabulary: doc.data().vocabulary,
										listenDate: doc.data().listenDate
									}
									x++;
									break;
								}
							}
						}
					});
				}
				self.datas = arr;
			} catch(e) {
				console.log(e)
				vm.showMessage(typeof e == "object" ? JSON.stringify(e) : e);
			}
			setTimeout(()=>{
				vm.loading(false);
			}, self.datas.length * 5);
		},
		checkHTML(row, index){ // 檢查是否有問題
			// console.log(index)
			// console.log(row.html)
			// if(row.html.indexOf("scion") > -1) {
			// 	console.log("scion: " + row.key + "/" + (index + 1))
			// }
			// return;
			let div = document.createElement("DIV");
			div.innerHTML = row.html;
			let arr = div.querySelectorAll(".english span");
			for(let i = 0; i < arr.length; i++) {
				let start = arr[i].getAttribute("start");
				let end = arr[i].getAttribute("end");
				if(start == null || end == null) {
					if(arr[i].innerHTML.trim().indexOf("<strong>") == 0)
						continue;
					console.log("第" + (index + 1) + "筆;" + row.key + ": " + row.title)
					console.log(arr[i].innerHTML)
					// console.log(arr[i].innerHTML.trim().indexOf("<span><strong>") + "\n--------------")
					vm.showMessage("第" + (index + 1) + "筆，HTML 有問題", "請看 console")
					return;
				}
			}
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
				// Object.assign({total: this.datas.length, index}, this.datas[index]);
			if(FireStore.login == true){
				FireStore.setSetting(this.title, {active: this.datas[index].key});
			} else {
				window.localStorage["VOA-" + this.title] = this.datas[index].key;
			}
		},
		onCloseReader(){
			this.source = null;
		}, 
		async onUpdate(type, data) {
			if(type == "html") {
				this.source.html = data;
				let obj = Object.assign({}, this.source)
				delete obj.extend; 
				try {
					await FireStore.update(obj)
					this.$Notice.success({
						title: "已上傳",
					});
				} catch(e) {
					console.log(e)
				}				
			} else if(type == "vocabulary") {
				if(typeof this.source.extend == "undefined") this.source.extend = {};
				this.source.extend.vocabulary = data; 
				for(let i = 0; i < this.datas.length; i++) {
					if(this.datas[i].key == this.source.key) {
						this.$set(this.datas, i, this.source)
						break;
					}
				}

				// self.datas
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