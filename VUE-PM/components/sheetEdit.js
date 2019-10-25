Vue.component('SheetEdit', {
	template: `
	<modal v-model="modal" class-name="vertical-center-modal" title="需求單" :width="600" footer-hide @on-visible-change="onVisibleChange">
		<table style="width: 100%;" class="layout">
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
		this.dataSheet = Object.assign(this.dataSheet, this.data)
		try {
			let sql = "Select PRJ_NAME from PROJECT where ACTIVE = 'Y' order by PRJ_NAME";
			this.project = await window.sqlite.execute(sql);

			sql = "Select CD_NAME from CODE where CD_KIND = '進度' and ACTIVE = 'Y' order by CD_KEY, CD_NAME";
			this.status = await window.sqlite.execute(sql);
		} catch(e) {
		}
	},
	destroyed() {
  },
	methods: {
		onHide(){
			this.$emit("onClose");
		},
		async onSave(){
			if(this.dataSheet.PRJ_NAME.length == 0) {
				vm.showMessage("請輸入專案");
			} else if(this.dataSheet.TITLE.length == 0) {
				vm.showMessage("請輸入主旨");
			} else {
				let mode = "update", sql;
				if(typeof this.dataSheet.PK == "undefined") {
					mode = "new";
					this.dataSheet.PK = (new Date()).getTime();
					sql = sqlite.convertToInsert("SHEET", this.dataSheet)
				} else {
					sql = sqlite.convertToUpdate("SHEET", this.dataSheet);
				}
				let result = await window.sqlite.execute(sql);
				this.$emit("onClose", mode, this.dataSheet);
			}
		},
		async changeProject(){
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
		visible(value) {
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