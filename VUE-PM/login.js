new Vue({
	template:  `<modal v-model="modal" class-name="vertical-center-modal" title="專案管理" :width="400" :closable="false" :mask-closable="false">
		<table style="width: 100%;" class="layout">
			<tr v-if="first">
				<td class="label">金鑰：</td>
				<td><i-input v-model="aes" size="large" style="flex: 1;" /></td>
			</tr>
			<tr>
				<td class="label">帳號：</td>
				<td><i-input v-model="email" size="large" style="flex: 1;" :readonly="!first" /></td>
			</tr>
			<tr>
				<td class="label">密碼：</td>
				<td>
					<i-input v-if="isPassword" v-model="password" type="password" size="large" style="flex: 1;">
						<Icon type="ios-eye" style="cursor: pointer;" slot="suffix" @click.native="onClickPassword" />
					</i-input>
					<i-input v-else v-model="password"  size="large" style="flex: 1;">
						<Icon type="ios-eye-off" style="cursor: pointer;" slot="suffix" @click.native="onClickPassword" />
					</i-input>
				</td>
			</tr>
			<tr>
				<td class="label"></td>
				<td><Checkbox v-model="keepPassword">記住密碼</Checkbox></td>
			</tr>
		</table>
		<div slot="footer">
			<i-button type="primary" @click="onOK">登入</i-button>
		</div>
	</modal>`,
	data() {
		return {
			modal: true,
			first: true,
			aes: "",
			email: "",
			password: "",
			keepPassword: false,
			isPassword: true
		};
	},
	created(){
	},
	async mounted () {
		
		let aes = window.localStorage["aes"];
		if(typeof aes == "string" && aes.length > 0) {
			this.first = false;
			this.aes = aes;
			this.email = window.localStorage["email"];
			this.keepPassword = window.localStorage["keepPassword"] == "Y" ? true : false;
			if(this.keepPassword == true) {
				this.password = window.localStorage["password"]
			}
		}
	},
	destroyed() {
  },
	methods: {
		async onOK(){
			if(this.aes.length == 0){
				vm.showMessage("請輸入金鑰");
				return;
			} else if(this.email.length == 0){
				vm.showMessage("請輸入帳號");
				return;
			} else if(this.password.length == 0){
				vm.showMessage("請輸入密碼");
				return;
			}
					
			vm.loading();
			FireStore.initial(this.aes);
			try {
				await FireStore.signIn(this.email, this.password)
				if(this.first == true) {
					window.localStorage["aes"] = this.aes;
					window.localStorage["email"] = this.email;
				}
				window.localStorage["keepPassword"] = this.keepPassword ? "Y" : "N"
				if(this.keepPassword) {
					window.localStorage["password"] = this.password;
				}	else 
					delete window.localStorage["password"];
					vm.loading(false);
					// console.log(location.href)
					if(location.href.indexOf("file:///Users/") == 0){
						vm.onSelect("home");
					} else 
						vm.onSelect("home");
					
					this.$destroy();
					this.$el.parentNode.removeChild(this.$el);
			} catch(e) {
				vm.loading(false);
				vm.showMessage(e.message);
				return;
			}
		},
		onClickPassword(){
			this.isPassword = ! this.isPassword;
		}
	}
}).$mount('#login');