Vue.component('login', {
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
			title="登入" :width="400" :closable="false" :mask-closable="false">
		<table style="width: 100%;" class="layout">
			<tr>
				<td class="label">帳號：</td>
				<td><i-input v-model="email" size="large" style="flex: 1;" /></td>
			</tr>
			<tr>
				<td class="label">密碼：</td>
				<td>
					<i-input v-if="isPassword" v-model="password" type="password" size="large" style="flex: 1;">
						<Icon type="ios-eye" style="cursor: pointer;" slot="suffix" @click.native="onClickIcon" />
					</i-input>
					<i-input v-else v-model="password"  size="large" style="flex: 1;">
						<Icon type="ios-eye-off" style="cursor: pointer;" slot="suffix" @click.native="onClickIcon" />
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
	props: ['visible'],
	data() {
		return {
			email: "",
			password: "",
			keepPassword: false,
			isPassword: true
		};
	},
	created(){
	},
	async mounted () {
		this.email = window.localStorage["email"];
		this.keepPassword = window.localStorage["keepPassword"] == "Y" ? true : false;
		if(this.keepPassword == true)
			this.password = window.localStorage["password"]
	},
	destroyed() {
  },
	methods: {
		async onOK(){
			if(this.email.length == 0){
				vm.showMessage("請輸入帳號");
			} else if(this.password.length == 0){
				vm.showMessage("請輸入密碼");
			} else {
				vm.loading();
				try {
					await FireStore.signIn(this.email, this.password)
					window.localStorage["email"] = this.email;
					window.localStorage["keepPassword"] = this.keepPassword ? "Y" : "N"
					if(this.keepPassword) {
						window.localStorage["password"] = this.password;
					}	else 
						delete window.localStorage["password"];
					// vm.loading(false); 自己要在實作 on-close 時關閉
					this.$emit("on-close");
					this.$destroy();
					this.$el.parentNode.removeChild(this.$el);
				} catch(e) {
					vm.loading(false);
					vm.showMessage(e.message);
					return;
				}
			}
		},
		onClickIcon(){
			this.isPassword = ! this.isPassword;
		}
	}
})