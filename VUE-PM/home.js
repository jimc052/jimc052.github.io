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
				<panel v-for="(item, key) in datas" :key="key" :type="type" :title="key" :datas="item"
					@onClick="onClick"
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
			editData: {}
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
				if(e == "STATUS") {
					sql = "Select a.* " +
						"from SHEET a " +
						"Left Join CODE b on(a.STATUS = b.CD_NAME) " +
						"where a.ACTIVE = 'Y' and b.CD_KIND = '進度' " +
						"order by CD_KEY, CD_NAME";
				}
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
			} catch(e) {
			}
		},
		onNew(){
			this.editData = {};
			this.visible = true;
		},
		onClose(mode, data){
			if(typeof mode == "string") {
				let key = "";
				if(this.type == "進度")
					key = data["STATUS"];
				else if(this.type == "專案") 
					key = data["PRJ_NAME"];
				else {
					key = data[this.type];
				}

				if(mode == "new") {
					if(Array.isArray(this.datas[key]) ){
						this.datas[key].push(data)
					} else {
						this.datas[key] = [data];
					}
				} else {
					console.log(data)
				}
			}
			this.visible = false;
		},
		onClick(arg) {
			this.current = arg;
			this.editData = arg.item;
			this.visible = true;
		}
	}
}).$mount('#frame');