Vue.component('SheetEdit', {
	template: `
	<modal v-model="modal" class-name="vertical-center-modal" title="需求單" :width="600" footer-hide @on-visible-change="onVisibleChange">
		<table style="width: 100%;" class="layout" ref='tblSheetEdit'>
			<tr>
				<td class="label">專案：</td>
				<td>
					<i-select v-if="typeof dataSheet.PK == 'undefined'" v-model="dataSheet.PRJ_NAME" @on-change="changeProject">
						<i-option v-for="item in project" :value="item.PRJ_NAME" :key="item.PRJ_NAME">
							{{ item.PRJ_NAME }}
						</i-option>
					</i-select>
					<div v-else style="font-size: 16px; flex: 1; ">{{dataSheet.PRJ_NAME}}</div>
				</td>
				<td class="label">進度：</td>
				<td>
					<i-select v-model="dataSheet.STATUS">
						<i-option v-for="item in status" :value="item.CD_NAME" :key="item.CD_NAME">
							{{ item.CD_NAME }}
						</i-option>
					</i-select>
				</td>
			</tr>
			<tr>
				<td class="label">主旨：</td>
				<td colspan=3><i-input v-model="dataSheet.TITLE" size="large" /></td>
			</tr>
			<tr>
				<td class="label">單號：</td>
				<td colspan=3><i-input v-model="dataSheet.ORD_NO" size="large" /></td>
			</tr>
			<tr>
				<td class="label">RD：</td>
				<td>
					<i-select v-model="dataSheet.RD">
						<i-option v-for="item in rd" :value="item.USR_NAME" :key="item.USR_NAME">
							{{ item.USR_NAME }}
						</i-option>
					</i-select>
				</td>
				<td class="label">PM：</td>
				<td>
					<i-select v-model="dataSheet.PM">
						<i-option v-for="item in pm" :value="item.USR_NAME" :key="item.USR_NAME">
							{{ item.USR_NAME }}
						</i-option>
					</i-select>
				</td>
			</tr>
			<tr>
				<td class="label">說明：</td>
				<td colspan=3>
					<i-input v-if="editing == true"
						v-model="dataSheet.MEMO" size="large" style="flex: 1;"  
						type="textarea" :rows="5"></i-input>
					<div v-else v-html="compiledMarkdown"></div>
				</td>
			</tr>
		</table>
		<div v-if="editing == true" style="margin-top: 10px; text-align: right">
			<i-button @click="onHide">取消</i-button>
			<i-button type="primary" @click="onSave">確定</i-button>
		</div>
	</modal>`,
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		data: Object,
		// onClose: Function
	},
	data() {
		return {
			dataSheet: {
				PRJ_NAME: "",
				STATUS: "",
				TITLE: "",
				ORD_NO: "",
				RD: "",
				PM: "",
				MEMO: ""
			},
			dataHistory: [],
			details: [],
			project: [],
			status: [],
			rd: [],
			pm: [],
			editing: true,
			modal: false
		};
	},
	created(){
	},
	async mounted () {
		this.count = 0;
		this.dataSheet = Object.assign(this.dataSheet, this.data);
		vm.loading();
		if(vm.isSQL == false) {
			try {
				let ref = FireStore.db.collection('CODE')
					.where("ACTIVE", "==", "Y")
					.where("CD_KIND", "==", "進度")
				let snapshot2 = await ref.get();
				snapshot2.forEach(doc => {
					this.status.push({CD_KEY: doc.data().CD_KEY, CD_NAME: doc.data().CD_NAME});
				});
				this.status.sort(function (a, b) {
					return a.CD_KEY > b.CD_KEY ? 1 : -1;
				});
				this.dataSheet.STATUS = this.status.length > 0 ? this.status[0].CD_NAME : "";
			} catch(e) {
				console.log(e)
			} finally {
				vm.loading(false);
			}
			let el = document.querySelector(".ivu-modal-content");
			el.addEventListener('dragenter', this.onDragEnter,false);
			el.addEventListener('dragleave', this.onDragLeave,false);
			el.addEventListener('dragover', this.onDragOver,false);
			el.addEventListener('drop', this.onDrop,false);
		} else {
			try {
				let sql = "Select CD_NAME from CODE where CD_KIND = '進度' and ACTIVE = 'Y' order by CD_KEY, CD_NAME";
				this.status = await window.sqlite.execute(sql);
			} catch(e) {
			}			
		}
	},
	destroyed() {
		if(vm.isSQL == false) {
			let el = document.querySelector(".ivu-modal-content");
			el.removeEventListener('dragenter', this.onDragEnter,false);
			el.removeEventListener('dragleave', this.onDragLeave,false);
			el.removeEventListener('dragover', this.onDragOver,false);
			el.removeEventListener('drop', this.onDrop,false);
		}
  },
	methods: {
		onDragEnter(e){
			e.preventDefault();
			let el = document.querySelector(".ivu-modal-content");
			el.classList.add("drag")
			this.count++;
			// console.log(el)
		},
		onDragLeave(e){
			e.preventDefault();
			this.count--;
			if(this.count == 0) {
				let el = document.querySelector(".ivu-modal-content");
				el.classList.remove("drag")
			}
		},
		onDragOver(e){
			e.preventDefault();
		},
		onDrop(e){
			this.count = 0;
			e.preventDefault();
		  if (e.dataTransfer.items && vm.isSQL == false) {
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
          if (e.dataTransfer.items[i].kind === 'file') {
						var file = e.dataTransfer.items[i].getAsFile();
						console.log('... file[' + i + '].name = ' + file.name);
						let reader = new FileReader();
						reader.onload = function (event) {
							FireStore.uploadString(file.name, event.target.result)
						};
						reader.readAsDataURL(file);  
          }
        }
			}
			let el = document.querySelector(".ivu-modal-content");
			el.classList.remove("drag")
		},
		onHide(){
			this.$emit("onClose");
		},
		async onSave(){
			if(this.dataSheet.PRJ_NAME.length == 0) {
				vm.showMessage("請輸入專案");
			} else if(this.dataSheet.TITLE.length == 0) {
				vm.showMessage("請輸入主旨");
			} else {
				let mode = typeof this.dataSheet.PK == "undefined" ? "insert" : "update";
				if(vm.isSQL == false) {
					try {
						if(mode == "insert")
							FireStore.insert("SHEET", this.dataSheet)
						else {
							FireStore.update("SHEET", this.dataSheet)
						}
					} catch(e) {
						vm.showMessage(e.message)
					}
				} else {
					let sql;
					if(typeof this.dataSheet.PK == "undefined") {
						this.dataSheet.PK = (new Date()).getTime();
						sql = sqlite.convertToInsert("SHEET", this.dataSheet)
					} else {
						sql = sqlite.convertToUpdate("SHEET", this.dataSheet);
					}
					await window.sqlite.execute(sql);
				}	
				this.$emit("onClose", mode, this.dataSheet);
			}
		},
		async changeProject(){
			if(this.dataSheet.PRJ_NAME.length == 0) return;
			this.rd = [];
			this.pm = [];
			if(typeof this.dataSheet.PK == "undefined") {
					this.dataSheet.RD = "";
					this.dataSheet.PM = "";
			}

			vm.loading();
			try {
				let project = this.project.filter(item=>{
					return item.PRJ_NAME == this.dataSheet.PRJ_NAME;
				})
				if(project.length == 0) {
					vm.loading(false);
					return;
				}
				if(vm.isSQL == false) {
					let snapshot = await FireStore.db.collection('USER')
						.where("ACTIVE", "==", "Y")
						.get();
					snapshot.forEach(doc => {
						if(("," + project[0].MEMBER + ",").indexOf("," + doc.data().USR_NAME + ",") == -1) {

						} else if(doc.data().DEP == "RD") {
							this.rd.push(doc.data())
						} else if(doc.data().DEP == "PM") {
							this.pm.push(doc.data())
						}
					});
					if(typeof this.dataSheet.PK == "undefined") {
						if(this.rd.length == 1)
							this.dataSheet.RD = this.rd[0].USR_NAME;
						if(this.pm.length == 1)
							this.dataSheet.PM = this.pm[0].USR_NAME;
					}
				} else {
					try {
						let sql = "Select MEMBER from PROJECT where PRJ_NAME = '" + this.dataSheet.PRJ_NAME + "' and ACTIVE = 'Y' ";
						let rows = await window.sqlite.execute(sql);
						if(rows.length > 0 ) {
							let arr = rows[0]["MEMBER"].split(",");
							arr.forEach((el, index) => {
								arr[index] = "'" + el + "'"
							});
		
							sql = "Select * from USER where DEP = 'RD' and ACTIVE = 'Y' and USR_NAME in(" + arr.join() + ") order by JOB, USR_NAME";
							this.rd = await window.sqlite.execute(sql);
							if(typeof this.dataSheet.PK == "undefined" && this.rd.length == 1) {
								this.dataSheet.RD = this.rd[0].USR_NAME;
							}
				
							sql = "Select * from USER where DEP = 'PM' and ACTIVE = 'Y' and USR_NAME in(" + arr.join() + ")  order by JOB, USR_NAME";
							this.pm = await window.sqlite.execute(sql);
							if(typeof this.dataSheet.PK == "undefined" && this.pm.length == 1) {
								this.dataSheet.PM = this.pm[0].USR_NAME;
							}
						}
					} catch(e) {
					}
				}
			} catch(e) {
				console.log(e)
			} finally {
				vm.loading(false);
			}
		},
		onVisibleChange(v){
			if(v == false) {
				this.modal = false;
				this.$emit("onClose");
			}
		}
	},
	computed: {
    compiledMarkdown: function () {
      return marked(this.dataSheet.MEMO, { sanitize: true });
    }
	},
	watch: {
		async visible(value) {
			if(value == true && this.project.length == 0) {
				vm.loading();
				if(vm.isSQL == false) {
					let ref = FireStore.db.collection('PROJECT')
						.where("ACTIVE", "==", "Y");
					let snapshot1 = await ref.get();
					snapshot1.forEach(doc => {
						if(FireStore.user.JOB == "主管") {
							this.project.push({"PRJ_NAME": doc.data().PRJ_NAME, MEMBER: doc.data().MEMBER});
						} else {
							let MEMBER = "," + doc.data().MEMBER + ",";
							if(MEMBER.indexOf("," + FireStore.user.USR_NAME + ",") > -1) {
								this.project.push({"PRJ_NAME": doc.data().PRJ_NAME, MEMBER: doc.data().MEMBER});
							}
						}
					});
				} else {
					let sql = "Select PRJ_NAME, MEMBER from PROJECT where ACTIVE = 'Y' order by PRJ_NAME";
					let arr = await window.sqlite.execute(sql);
					arr.forEach(item => {
						if(Sqlite.user.JOB == "主管") {
							this.project.push({"PRJ_NAME": item.PRJ_NAME, MEMBER: item.MEMBER});
						} else {
							let MEMBER = "," + item.MEMBER + ",";
							if(MEMBER.indexOf("," + Sqlite.user.USR_NAME + ",") > -1) {
								this.project.push({"PRJ_NAME": item.PRJ_NAME, MEMBER: item.MEMBER});
							}
						}						
					})
				}
				vm.loading(false);
			}
			this.modal = value;
		},
		data(value) {
			this.dataSheet = Object.assign({
				PRJ_NAME: "",
				STATUS: this.status.length > 0 ? this.status[0].CD_NAME : "",
				TITLE: "",
				ORD_NO: "",
				RD: "",
				PM: "",
				MEMO: "",
				ACTIVE: "Y"
			}, value);
			this.changeProject();
		}
	},
});