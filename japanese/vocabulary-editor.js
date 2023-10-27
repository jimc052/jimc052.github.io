Vue.component('editor', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
		id="editor"  :fullscreen="false" :closable="false" style="overflow: hidden;"
    :width="width"
    @on-ok="save"
	>
    <div v-for="(item, index) in columns" v-if="typeof item.key == 'string' "
				style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
      <div style="width: 120px; font-size: 20px; text-align: right; user-select: none; color: #2d8cf0;">
				{{item.title + "："}}
			</div>
			<div v-if="visible == true" style="flex: 1;">
				<Select v-if="$isLogin() && $isDebug() && item.key == '類'" 
					v-model="target[item.key]" 
					style="padding: 5px; width: 200px" size="large" 
					@on-change="onSelectChange" 
				>
					<Option value=""></Option>
					<Option v-for="item2 in options" :value="item2" :key="item2">
						{{ item2 }}
					</Option>
				</Select>
				<div v-else-if="! ($isLogin() && $isDebug()) || item.key == 'id'"
					style="font-size: 20px; padding: 5px;"
				>
					{{target[item.key]}}
				</div>
				<Input v-else v-model="target[item.key]"
					:element-id="'editor' + index"
					style="font-size: 20px; padding: 5px;" size="large" 
					clearable
					@on-change="onKeyChange" 
					:disabled="! ($isLogin() && $isDebug()) || item.key == 'id'"
				/>
			</div>
    </div>
		<div slot="footer" style="display: flex; padding: 0px;">
			<div v-if="visible == true && typeof target.date != 'undefined'" style="">
				{{ new Date(target.date)}}
			</div>
			<div style="flex: 1;" />
			<Button type="default" size="large"  @click="cancel" style="width: 100px;">取消</Button>
			<Button v-if="visible == true && $isLogin() && $isDebug() && typeof target.id != 'undefined' " type="error" size="large"  @click="onDelete" style="width: 100px;">刪除</Button>
			<Button v-if="dirty == true && $isLogin() && $isDebug()" type="primary" size="large"  @click="save" style="width: 100px;">確定</Button>
		</div>
	</modal>`,
	props: {
		word: {
			type: Object,
			require: true, 
			default: undefined
		},
    columns: {
      type: Array
    },
		options: {
      type: Array
    },
	},
	data() {
		return {
			visible: false,
      width: 600,
      dirty: false,
      target: null
		};
	},
	created(){
	},
	mounted () {
	},
	destroyed() {
  },
	methods: {
    cancel() {
			this.$emit("onClose");
		},
		onDelete() {
			this.$emit("onClose", this.target.id);
		},
    save() {
      this.$emit("onClose", this.target);
    },
    onKeyChange() {
      this.dirty = true;
    },
		onSelectChange() {
			this.onKeyChange();
			if(typeof this.target.id == "undefined")
				window.sessionStorage["japanese-vocabulary-editor-option"] = this.target.類;	
		},
		onKeydown(event) { // 還沒寫
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			let sk = event.shiftKey, code = event.keyCode;
			
			if(pk && event.keyCode == 13) {
				let value = this.target.語.trim();
				if(value.length == 0) return;

				let ascii = value.charCodeAt(0);
				if(ascii >= 97 && ascii <= 122) {
					let arr = value.split(" "), 平 = "";
					arr.forEach(el => {
						if(el == "~") {
							平 += el;
						}
						else {
							let char = el.transferToKana("平");
							平 += char == null ? el : char;
						}
					});
					this.target.語 = 平;
				} else if(ascii >= 12353 && ascii <= 12438) { // 平假名
					let txt = "";
					for(let i = 0; i < value.length; i++) {
						let c1 = value.substr(i, 1);
						let c2 = c1.shiftKana();
						txt += c2 != null ? c2 : c1;
					}
					this.target.語 = txt;
				} else if(ascii >= 12449 && ascii <= 12531) { // 片假名
					let txt = "";
					for(let i = 0; i < value.length; i++) {
						let c1 = value.substr(i, 1);
						let c2 = c1.shiftKana();
						txt += c2 != null ? c2 : c1;
					}
					this.target.語 = txt;
				}
			}
			// event.preventDefault();
			// event.stopImmediatePropagation();
			// event.stopPropagation();
		}
	},
	watch: {
		word(value) {
      this.dirty = false;
      this.target = value == null || typeof value == "undefined" ? {} : Object.assign({}, this.word);
			this.visible = value == null || typeof value == "undefined" ? false : true;
			if(this.visible == true && typeof this.target.id == "undefined") {
				let s = window.sessionStorage["japanese-vocabulary-editor-option"];
				if(typeof s == "string" && s.length > 0) {
					this.target.類 = s;
				}
			}

			let id = setInterval(() => {
				let editor2 = document.querySelector("#editor2");
				if(editor2 != null) {
					clearInterval(id);
					if(this.visible == true) {
						editor2.focus();
						editor2.addEventListener('keydown', this.onKeydown, false);
					} else {
						editor2.removeEventListener('keydown', this.onKeydown, false);
					}			
				}
			}, 300);

		}
	},
});