new Vue({
	template: `<div id="frame" style="height: 100%; display: flex; flex-direction: column;">
			<header-bar title="首頁"></header-bar>
			<div style="padding: 5px 5px 0 5px ; ">
				<RadioGroup v-model="type" type="button" @on-change="onChangeType">
						<Radio label="STATUS">進度</Radio>
						<Radio label="PRJ_NAME">專案</Radio>
						<Radio label="RD">RD</Radio>
				</RadioGroup>
			</div>
			<div style="flex: 1; overflow: auto hidden; display: flex; flex-direction: row; padding: 10px;">
				<div v-if="msg.length > 0" style="flex: 1; color: red;" class="row">{{msg}}</div>
				<panel v-else v-for="(item, key, index) in datas" :key="key" :serial="index" :type="type"  :title="key" :datas="item"
					@onClick="onClick" @onDrop="onDrop"
					class="panel"
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
			msg: ""
		};
	},
	created(){
	},
	async mounted () {
		this.onChangeType(this.type)
	},
	destroyed() {
  },
	methods: {
		async onChangeType(e){
			this.datas = {}, obj = {};
			try {
				let sql = "Select * from SHEET where ACTIVE = 'Y' order by " + e;
				sql = "Select a.* " +
						"from SHEET a " +
						"Left Join CODE b on(a.STATUS = b.CD_NAME) " +
						"where a.ACTIVE = 'Y' and b.CD_KIND = '進度' " +
						"order by CD_KEY, CD_NAME";

				if(e != "STATUS") {
					sql = sql.replace("order by ", "order by " + e + ",");
				} else 
					sql += ", PRJ_NAME"
				let rows = await window.sqlite.execute(sql);

				let pk = "";
				for(let i = 0; i < rows.length; i++) {
					if(i == 0 || rows[i][e] != rows[i-1][e]){
						pk = rows[i][e];
						obj[pk] = [];
					}

					obj[pk].push(rows[i]);
				}
				
				for(let key in obj) {
					this.$set(this.datas, key, obj[key])
				}
				this.msg = rows.length == 0 ? "暫無資料" : "";
			} catch(e) {
			}
		},
		onNew(){
			this.editData = {};
			this.visible = true;
		},
		onClose(mode, data){
			let self = this;
			if(typeof mode == "string") {
				let key = data[this.type];

				if(mode == "new") {
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
		},
		onDrop(source, target) {
			let x = source.id.split("_")[2];
			let obj = this.datas[source.getAttribute("data-title")].splice(x, 1);
			obj[0][this.type] = target.getAttribute("data-title");

			let y = target.id.split("_")[2];
			this.datas[target.getAttribute("data-title")].splice(y, 0, obj[0]);
			sqlite.execute(sqlite.convertToUpdate("SHEET", obj[0]))
		}
	}
}).$mount('#frame');