Vue.component('editor', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
		id="editor"  :fullscreen="true" :closable="false" style="overflow: hidden;" @on-ok="ok"
	>
		<iframe id="iframe" v-if="visible" style="width: 100%; height: calc(100% - 4px);" 
			src="code.html"
			sandbox='allow-scripts allow-top-navigation allow-same-origin allow-modals'
			scrolling='no' frameborder='0' seamless='seamless'
		></iframe>
		<div slot="footer" style="display: flex; padding: 0px;">
			<div style="flex: 1;" />
			<Button type="default" size="large"  @click="cancel" style="width: 100px;">取消</Button>
			<Button v-if="source.length > 0" type="warning" size="large"  @click="clear" style="width: 100px;">清除</Button>
			<Button type="primary" size="large"  @click="ok" style="width: 100px;">確定</Button>
		</div>
	</modal>`,
	props: {
		modal: {
			type: Boolean,
			require: true, 
			default: false 
		},
		datas: {
			type: Array,
			require: true, 
			default: []
		},
	},
	data() {
		return {
			visible: false,
			source: ""
		};
	},
	created(){
		this.visible = this.modal;
	},
	mounted () {
	},
	destroyed() {
  },
	methods: {
		onMessage(e) {
			let json = JSON.parse(e.data);
			console.log(json.action)
			if(typeof json.data == "string")
				this.source = json.data;
			if(typeof json.action == "string"){
				if(json.action.indexOf("save") == 0) {
					if(json.action == "save-close")
						this.$emit("onClose", json.data);
				} else if(json.action == "close"){
					this.$emit("onClose");
				} else if(json.action == "error") {
					alert("內容錯誤!!");
				} else if(json.action == "mounted") {
					let win = document.getElementById('iframe').contentWindow;
					win.postMessage(this.datas, "*");		
				}
			}
		},
		send(s){
			let win = document.getElementById('iframe').contentWindow;
			win.postMessage(s, "*");
		},
		save(){
			this.send("save")
		},
		ok(){
			this.send("save-close")
		},
		cancel() {
			this.$emit("onClose");
		},
		clear(){
			this.send("clear")
		}
	},
	watch: {
		modal(value) {
			this.visible = value;
			if(value == true) {
				setTimeout(() => {
					// this.send("test from jim")
				}, 600);
				window.addEventListener("message", this.onMessage, false);
				setTimeout(() => {
								
				}, 300);


			} else {
				window.removeEventListener("message", this.onMessage, false);
			}
		}
	},
});