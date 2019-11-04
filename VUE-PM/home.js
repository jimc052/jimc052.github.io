new Vue({
	template: `<div id="frame" style="height: 100%; display: flex; flex-direction: column;">
			<header-bar title="首頁">
				<Icon type="md-refresh" @click="reload" slot='right' color="white" size="24" style="padding: 10px;" />
			</header-bar>
			<div style="padding: 5px 5px 0 5px ; ">
				<RadioGroup v-model="type" type="button" @on-change="onChangeType">
						<Radio label="STATUS">進度</Radio>
						<Radio label="PRJ_NAME">專案</Radio>
						<Radio label="RD" v-if="isBoss || isPM">RD</Radio>
				</RadioGroup>
				<span style="padding-left: 20px;" v-if="rd.length > 0 && type == 'STATUS' ">RD：</span>
				<i-select v-model="RD" style="width:120px; margin-right: 5px;" v-if="rd.length > 0 && type == 'STATUS' " @on-change="changeRD">
					<i-option value="">全部</i-option>
					<i-option v-for="item in rd" :value="item.USR_NAME" :key="item.USR_NAME">
						{{ item.USR_NAME }}
					</i-option>
				</i-select>
			</div>
			<div style="flex: 1; overflow: auto hidden; display: flex; flex-direction: row; padding: 10px 0;">
				<div v-if="msg.length > 0" style="flex: 1; color: red;" class="row">{{msg}}</div>
				<panel v-else v-for="(item, key, index) in datas" :key="key" :serial="index" :type="type"  :title="key" :datas="item"
					@onClick="onClick" @onDrop="onDrop" class="panel"
				/>
			</div>
			<i-button type="primary" shape="circle" class="absolute-bottom" icon="md-add" 
				circle @click.native="onNew" size="large"></i-button>
			<SheetEdit :visible="visible" :data="editData" @onClose="onClose" />
		</div>`,
	data() {
		return {
			type: "STATUS",
			datas: {},
			visible: false,
			editData: {},
			msg: "",
			status: [],
			rd: [],
			RD: "",
			isBoss: false,
			isPM: false,
			onSnapshot: null
		};
	},
	created(){
	},
	async mounted () {
		if(vm.isSQL == false) {
			let snapshot1 = await FireStore.db.collection('USER')
				.where("ACTIVE", "==", "Y").get();
			snapshot1.forEach(doc => {
				let mail = doc.data().MAIL;
				if(mail.indexOf("@") == -1) mail += "@bethel.com.tw";
				
				if(mail == FireStore.mail()) {
					FireStore.user = doc.data();
					if(FireStore.user.JOB == "主管") {
						this.isBoss = true;
					} else if(FireStore.user.DEP == "PM") {
						this.isPM = true;
					}
				}
				if(doc.data().DEP == "RD") {
					this.rd.push(doc.data())
				}
			});
			if(FireStore.user == null) {
				document.getElementById("frame").innerHTML = "USER 檔找不到你的資料";
				return;
			}

			if(this.isBoss == false){
				this.rd = [];
			}
			
			let snapshot2 = await FireStore.db.collection('CODE')
				.where("ACTIVE", "==", "Y")
				.where("CD_KIND", "==", "進度")
				.get();
			snapshot2.forEach(doc => {
				this.status.push({CD_KEY: doc.data().CD_KEY, CD_NAME: doc.data().CD_NAME});
			});
			this.status.sort(function (a, b) {
				return a.CD_KEY > b.CD_KEY ? 1 : -1;
			});
		} else {
			let rows = await window.sqlite.execute("Select * from USER where ACTIVE = 'Y'");
			rows.forEach(item=>{
				if(item.MAIL == window.localStorage["email"]) {
					Sqlite.user = item;
					if(item.JOB == "主管") {
						this.isBoss = true;
					} else if(item.DEP == "PM") {
						this.isPM = true;
					}
				}
				if(item.DEP == "RD") {
					this.rd.push(item);
				}
			});

			if(Sqlite.user == null) {
				document.getElementById("frame").innerHTML = "USER 檔找不到你的資料";
				return;
			}

			if(this.isBoss == false){
				this.rd = [];
			}

			this.status = await window.sqlite.execute("Select * from CODE where ACTIVE = 'Y' and CD_KIND == '進度' order by CD_KEY ");
		}
		this.onChangeType(this.type)
	},
	destroyed() {
  },
	methods: {
		reload(){
			this.$destroy();
			// this.$el.parentNode.removeChild(this.$el);
			vm.onSelect("home");
			console.clear();
		},
		async onChangeType(e){
			if(vm.isSQL == false && FireStore.user == null) return;
			this.datas = {}, obj = {}, rows = [];
			try {
				vm.loading();
				if(vm.isSQL == false) {
					let ref1, ref2, date = (new Date()).getTime();
					if(FireStore.user.DEP == "RD" && e == "STATUS") { // 有問題
						ref1 = FireStore.db.collection('SHEET')
							.where("ACTIVE", "==", "Y")
							.where("RD", "==", FireStore.user.USR_NAME);
						ref2 = FireStore.db.collection('SHEET')
							.where("MODIFY_DATE", ">", date)
							.where("RD", "==", FireStore.user.USR_NAME);
					} else if(this.isBoss == true){
						ref1 = FireStore.db.collection('SHEET')
							.where("ACTIVE", "==", "Y");
						ref2 = FireStore.db.collection('SHEET')
							.where("MODIFY_DATE", ">", date);
					} else {
						let role = this.isPM ? "PM" : "RD";
						ref1 = FireStore.db.collection('SHEET')
							.where("ACTIVE", "==", "Y")
							.where(role, "==", FireStore.user.USR_NAME);
						ref2 = FireStore.db.collection('SHEET')
							.where("MODIFY_DATE", ">", date)
							.where(role, "==", FireStore.user.USR_NAME);
					}
					// ref1.orderBy("PRJ_NAME", "desc")
					let snapshot = await ref1.get();
					snapshot.forEach(doc => {
						rows.push(Object.assign({PK: parseInt(doc.id, 10)}, doc.data()));
					});

					if(this.onSnapshot) this.onSnapshot();
					this.onSnapshot = ref2.onSnapshot(snapshot => { // 監聽........
						// var source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
						if(snapshot.metadata.hasPendingWrites) return; // local

						snapshot.docChanges().forEach(change => {
							// if(change.type == "modified") {
							// } else if (change.type === 'removed') {
							// }

							snapshot.forEach(doc => {
								let key = doc.data()[e];
								let PK = parseInt(doc.id, 10);
								
								if (change.type === 'removed') { // 有問題，delete 的 modify_date 沒有用....
									let rows = this.datas[key];
									for(let i = 0; i < rows.length; i++) {
										if(rows[i].PK == PK) {
											rows.splice(i, 1);
										}
									}
								} else {
									let msg = "";
									let b = false;
									for(let key2 in this.datas) {
										let rows = this.datas[key2];
										for(let i = 0; i < rows.length; i++) {
											if(rows[i].PK == PK) {
												if(key == key2) {
													this.$set(this.datas[key], i, Object.assign({PK}, doc.data()));
												} else {
													this.datas[key2].splice(i, 1)
													if(typeof this.datas[key] == "undefined") {
														this.$set(this.datas, key, [Object.assign({PK}, doc.data())])
													} else {
														this.datas[key].push(Object.assign({PK}, doc.data()))
													}
												}
												b = true;
											}
										}
									}
									if(b == false) {
										if(typeof this.datas[key] == "undefined") {
											this.$set(this.datas, key, [Object.assign({PK}, doc.data())])
										} else {
											this.datas[key].push(Object.assign({PK}, doc.data()))
										}
									}

									this.$Message.destroy();
									this.$Message.info({
										content: (b == false ? "新增" : "異動") + "：" + doc.data().PRJ_NAME + "<br/>" + doc.data().TITLE,
										duration: 3,
										closable: true
									});
								}
							})
						})
					})
				} else {
					let where = "";
					if(Sqlite.user.DEP == "RD" && e == "STATUS") {
						where = "and RD = '" + Sqlite.user.USR_NAME + "' ";
					} else if(this.isBoss == false){
						where = " and " + (this.isPM ? "PM" : "RD") + " = '" + Sqlite.user.USR_NAME + "' ";
					}
					let sql = "Select * from SHEET where ACTIVE = 'Y' " + where;
					rows = await window.sqlite.execute(sql);
				}


				rows.sort(function (a, b) {
					if(e == "STATUS")
						return a[e] + "=" + a["PRJ_NAME"] > b[e] + "=" + a["PRJ_NAME"] ? 1 : -1;
					else 
						return a[e] > b[e] ? 1 : -1;
				});

				let pk = "";
				for(let i = 0; i < rows.length; i++) {
					if(i == 0 || rows[i][e] != rows[i-1][e]){
						pk = rows[i][e];
						obj[pk] = [];
					}
					obj[pk].push(rows[i]);
				}
				if(e == "STATUS") {
					this.status.forEach(item=>{
						if(typeof obj[item.CD_NAME] != "undefined")
							this.$set(this.datas, item.CD_NAME, obj[item.CD_NAME])
					});
				} else {
					for(let key in obj) {
						this.$set(this.datas, key, obj[key])
					}					
				}
				this.msg = rows.length == 0 ? "暫無資料" : "";
				vm.loading(false);
			} catch(e) {
			}
		},
		onNew(){
			this.editData = {};
			this.visible = true;
			this.$Message.destroy();
		},
		onClose(mode, data){
			let self = this;
			if(typeof mode == "string") {
				let key = data[this.type];

				if(mode == "insert") {
					if(Array.isArray(this.datas[key]) ){
						this.datas[key].push(data)
					} else {
						this.datas[key] = [data];
					}
				} else {
					if(!Array.isArray(this.datas[key]) ){
						this.datas[key] = [data];
						reomve();
					} else {
						for(let i = 0; i < self.datas[key].length; i++){
							if(self.datas[key][i].PK == data.PK) {
								this.$set(self.datas[key], i, data);
								break;
							}
							if(i == self.datas[key].length - 1) {
								self.datas[key].push(data)
								reomve();
							}
						}
					}
				}
				function reomve(){
					for(let key2 in self.datas) {
						if(key != key2) {
							for(let i = 0; i < self.datas[key2].length; i++){
								if(self.datas[key2][i].PK == data.PK) {
									self.datas[key2].splice(i, 1)
									return;
								}
							}
						}
					}
				}
				let s = "暫無資料";
				for(let key2 in self.datas) {
					if(self.datas[key2].length > 0) {
						s = "";
						break;
					}
				}
				this.msg = s;
			}
			this.visible = false;
		},
		onClick(arg) {
			this.current = arg;
			this.editData = arg.item;
			this.visible = true;
			this.$Message.destroy();
		},
		onDrop(source, target, update) {
			let x = source.id.split("_")[2];
			let obj = this.datas[source.getAttribute("data-title")].splice(x, 1);
			obj[0][this.type] = target.getAttribute("data-title");

			let y = target.id.split("_")[2];
			this.datas[target.getAttribute("data-title")].splice(y, 0, obj[0]);
			if(update == true) {
				if(vm.isSQL == false)
					FireStore.update("SHEET", obj[0]);
				else {
					let sql = sqlite.convertToUpdate("SHEET", obj[0]);
					window.sqlite.execute(sql);					
				}
			}
		},
		changeRD(){
			this.onChangeType(this.type)
		}
	}
}).$mount('#frame');