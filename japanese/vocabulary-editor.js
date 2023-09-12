Vue.component('editor', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
		id="editor"  :fullscreen="false" :closable="false" style="overflow: hidden;"
    :width="width"
    @on-ok="save"
	>
    <div v-for="(item, index) in columns" v-if="typeof item.key == 'string' "
				style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
      <div style="width: 120px; text-align: right; user-select: none; color: #2d8cf0;">
				{{item.title + "："}}
			</div>
			<div v-if="visible == true" style="flex: 1;">
				<Select v-if="! $isDebug() && item.key == '類'" v-model="target[item.key]" 
					style="padding: 5px; width: 200px" size="large" 
					@on-change="onKeyChange" 
				>
					<Option value=""></Option>
					<Option v-for="item2 in options" :value="item2" :key="item2">
						{{ item2 }}
					</Option>
				</Select>
				<Input v-else v-model="target[item.key]"
					style="font-size: 20px; padding: 5px;" size="large" 
					clearable
					@on-change="onKeyChange" 
					:disabled="! $isDebug() || item.key == 'id'"
				/>
			</div>
    </div>
		<div slot="footer" style="display: flex; padding: 0px;">
			<div v-if="visible == true && typeof target.date != 'undefined'" style="">
				{{ new Date(target.date)}}
			</div>
			<div style="flex: 1;" />
			<Button type="default" size="large"  @click="cancel" style="width: 100px;">取消</Button>
			<Button v-if="visible == true && $isDebug() && typeof target.id != 'undefined' " type="error" size="large"  @click="onDelete" style="width: 100px;">刪除</Button>
			<Button v-if="dirty == true" type="primary" size="large"  @click="save" style="width: 100px;">確定</Button>
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
			// console.log(this.target); return;
			if(typeof this.target["類"] == "undefined") 
				delete this.target["類"];

      this.$emit("onClose", this.target);
    },
    onKeyChange() {
      this.dirty = true;
    }
	},
	watch: {
		word(value) {
      this.dirty = false;
      this.target = value == null || typeof value == "undefined" ? {} : Object.assign({}, this.word);
			this.visible = value == null || typeof value == "undefined" ? false : true;
		}
	},
});