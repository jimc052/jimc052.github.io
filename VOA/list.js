// Dropdown 會太右邊；  https://segmentfault.com/a/1190000019078842

Vue.component('list', { 
	template:  `<div id="list" style="display: flex; flex-direction: column; position: relative; overflow: hidden;">
		<header-bar :title="title">
			<div slot="right" v-if="$isLogin()">
				<Icon :type="playList == true ? 'md-heart' : 'md-heart-outline'"
					size="22" @click.native="onChangeList" 
					:style="{cursor: 'pointer', 'margin-right': '0px', 
					color: playList == true ? '#c01921' : '#e5e5e5'}" />
			</div>
			<Dropdown slot="right" 
				@on-click="onClickMore($event)" 
				style="margin-right: 10px;"
				:trigger="$isSmallScreen() ? 'click' : 'hover'"
				v-if="$isLogin()"
			>
				<Icon type="md-more" size="28" color="white" style="cursor: pointer; margin-left: 10px;"></Icon>
				<DropdownMenu slot="list">
					<DropdownItem name="生字清單" v-if="playList == false && datas.length > 0">生字清單</DropdownItem>

					<dropdown v-if="playList == true && datasPlayList.length > 0" placement="right-start" :divide="$isSmallScreen()">
						<dropdown-item>速率<icon type="ios-arrow-forward"></icon></dropdown-item>
						<dropdown-menu slot="list">
								<dropdown-item name="速0.94" :selected="rate == 0.94">慢</dropdown-item>
								<dropdown-item name="速1" :selected="rate == 1">正常</dropdown-item>
								<dropdown-item name="速1.2" :selected="rate == 1.2">快</dropdown-item>
						</dropdown-menu>
					</dropdown>
					<dropdown v-if="playList == true && datasPlayList.length > 0" placement="right-start">
						<dropdown-item>重複播放<icon type="ios-arrow-forward"></icon></dropdown-item>
						<dropdown-menu slot="list" v-for="(item, index) in repeatOption" :key="index">
								<dropdown-item :name="'重複' + item" :selected="repeat == item">
								{{item + " 次"}}
								</dropdown-item>
						</dropdown-menu>
					</dropdown>
					<DropdownItem name="google doc" v-if="doc.length > 0" divided> google doc</DropdownItem>
					<DropdownItem name="重新下載" v-if="$isSmallScreen()" divided>重新下載</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		
		</header-bar>
		<list-item ref="listItem" :datas="datas.length > 0 ? datas : datasPlayList" @onClick="onClick" :dataKey="dataKey" style="felx: 1;">
		</list-item>
		<play-bar v-if="playList == true && datasPlayList.length > 0" 
			:datas="datasPlayList" :dataKey="dataKey" ref="playbar"
			:rate="rate" :repeat="repeat"
			@onChangePlayList="onChangePlayList"
		>
		</play-bar>
		<i-button v-if="playList == false && $isAdmin() && ! $isFlutter()" type="primary" shape="circle" icon="md-add" 
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
			datasPlayList: [],
			source: null,
			json: null,
			dataKey: "",
			playList: window.localStorage["VOA-PlayList"] == "Y" ? true : false,
			rate: 1,
			repeat: 1,
			repeatOption: [1, 2, 3, 5, 10],
			doc: ""
		};
	},
	created(){
	},
	async mounted () {
		if(typeof window.localStorage["VOA-PlayList-rate"] != "undefined")
			this.rate = parseFloat(window.localStorage["VOA-PlayList-rate"]);
		if(typeof window.localStorage["VOA-PlayList-repeat"] != "undefined")
			this.repeat = parseInt(window.localStorage["VOA-PlayList-repeat"], 10);
	},
	destroyed() {
  },
	methods: {
		onChangePlayList(key){
			this.dataKey = key;
			this.$refs["listItem"].scrollTo();
			// console.log("onChangePlayList: " + key + ".............")
		},
		onChangeList(){
			this.playList = !this.playList;
			window.localStorage["VOA-PlayList"] = this.playList == true ? "Y" : "N";
			this.retrieve();
		},
		onGoto(key) {
			for(let i = 0; i < this.datas.length; i++) {
				if(this.datas[i].key == key){
					this.onClick(i)
					break;
				}
			}
		},
		async onClickMore(item) {
			// console.log(item)
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
			} else if(item.indexOf("速") == 0) {
				this.rate = parseFloat(item.replace("速", ""))
				window.localStorage["VOA-PlayList-rate"] = this.rate;
			} else if(item.indexOf("重複") == 0){
				this.repeat = parseFloat(item.replace("重複", ""))
				window.localStorage["VOA-PlayList-repeat"] = this.repeat;
				// VOA-PlayList
			} else if(item == "google doc"){
				this.$open(this.doc, this.title);
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
			this.doc = "";
			this.datas = []; this.datasPlayList = [];
			if(FireStore.login == true){
				let json = await FireStore.getSetting(this.title);
				if(typeof json != "undefined"){
					this.dataKey = this.playList == true ? json.playList : json.active;
					if(typeof json.doc == "string" && json.doc.length > 0) {
						this.doc = json.doc;
					}
				}
			} else {
				let s = window.localStorage["VOA-" + this.title];
				if(typeof s == "string" && s.length > 0) {
					this.dataKey = s;
				}					
			}
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
						let vocabulary = (typeof doc.data().vocabulary == "string" && doc.data().vocabulary.length > 0) ? doc.data().vocabulary : "";

						if(vocabulary.length > 0 || typeof doc.data().listenDate == "number" || typeof doc.data().favorite == "boolean") {
							for(let i = x; i < arr.length; i++) {
								x = i;
								if(arr[i].key == doc.id) {
									arr[i].extend = {
										vocabulary: vocabulary.length > 0 ? vocabulary : undefined,
										listenDate: typeof doc.data().listenDate == "number" ? doc.data().listenDate : undefined,
										favorite: doc.data().favorite == true ? true : false
									}
									x++;
									break;
								}
							}
						}
					});
				}

				if(this.playList == true) {
					arr = arr.filter(item=>{
						return typeof item.extend == "object" && item.extend.favorite == true
					})
				}
				if(this.playList == false)
					self.datas = arr;
				else
					this.datasPlayList = arr;
			} catch(e) {
				console.log(e)
				vm.showMessage(typeof e == "object" ? JSON.stringify(e) : e);
			}

			if(this.playList == true && this.$isFlutter() && this.datasPlayList.length > 0){
				// 還沒想好，notifiction 如何溝通 2020-06-05
				/*
				arr = [];
				let index = 0;
				this.datasPlayList.forEach((item) =>{
					if(item.key == this.dataKey) index = arr.length;
					// console.log(index + " = " + item.key + " = " + this.dataKey + " => " + index)

					arr.push({key: item.key, title: item.title})
				})
				let obj = {
					playList: arr,
					index: index,
					report: this.datasPlayList[0].report, 
					repeat: this.repeat, 
					// sleep: this.sleep,
					rate: this.rate
				}
				Flutter.postMessage(JSON.stringify(obj));
				// console.log(JSON.stringify(obj))
				*/
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
			this.dataKey = this.playList == false ?  this.datas[index].key : this.datasPlayList[index].key;
			if(this.playList == false) {
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
			} else if(FireStore.login == true){
				if(this.$refs["playbar"].index == index && this.$refs["playbar"].state == "play") {
				} else {
					this.$refs["playbar"].halt();
					this.$refs["playbar"].index = index;
					this.$refs["playbar"].play();
					this.$refs["playbar"].state = "play";					
				}
			}
		},
		onCloseReader(){
			this.source = null;
		}, 
		async onUpdate(type, data) {
			if(this.$isFlutter() && this.$isConnected == false) {
				return;
			}
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
			} else if(type == "vocabulary" || type == "json") {
				if(typeof this.source.extend == "undefined") this.source.extend = {};
				if(type == "vocabulary")
					this.source.extend.vocabulary = data; 
				else 
					this.source.extend = Object.assign(this.source.extend, data)
				for(let i = 0; i < this.datas.length; i++) {
					if(this.datas[i].key == this.source.key) {
						this.$set(this.datas, i, this.source)
						break;
					}
				}
			}
		}
	},
	watch: {
		async title(value) {
			this.datas = [];
			if(typeof value == "string" && value.length > 0) {		
				this.retrieve();
			}
		}
	}
});