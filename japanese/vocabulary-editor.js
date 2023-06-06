Vue.component('editor', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
		id="editor"  :fullscreen="false" :closable="false" style="overflow: hidden;"
    :width="width"
    @on-ok="save"
	>
    <div v-for="(item, index) in colTitle" style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
      <div style="width: 120px; text-align: right;">{{item + "："}}</div>
      <Input v-if="visible == true" v-model="target[item]"
				style="flex: 1; font-size: 20px; padding: 5px;" size="large" 
        clearable
        @on-change="onKeyChange" 
      />
    </div>
		<div slot="footer" style="display: flex; padding: 0px;">
			<div style="flex: 1;" />
			<Button type="default" size="large"  @click="cancel" style="width: 100px;">取消</Button>
			<Button v-if="dirty == true" type="primary" size="large"  @click="save" style="width: 100px;">確定</Button>
		</div>
	</modal>`,
	props: {
		word: {
			type: Object,
			require: true, 
			default: undefined
		},
    colTitle: {
      type: Array
    }
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
    save() {
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