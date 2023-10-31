Vue.component('sortable', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
		id="sortable"  :fullscreen="true" :closable="false" style="overflow: hidden;"
	>
    <div id="sortable-body" style="display: flex; flex-direction: row; align-items: center; justify-content: center;"
      v-if="visible"
    >
    <draggable v-model="list" @start="drag=true" @end="drag=false; dirty = true;">
      <div v-for="(item, index) in list" :key="item.id"
        style="background: white; border-radius: 5px; padding: 10px;"
        :style="{marginTop: index == 0 ? '0px' : '5px'}"
      >
        <div>{{item.語}}</div>
        <div>{{item.漢}}</div>
        <div>{{item.中}}</div>

      </div>
    </draggable>
    </div>
		<div slot="footer" style="display: flex; padding: 0px;">
			<div style="flex: 1;" />
			<Button type="default" size="large"  @click="cancel" style="width: 100px;">取消</Button>
      <Button v-if="dirty" type="primary" size="large"  @click="save" style="width: 100px;">確定</Button>
		</div>
	</modal>`,
	props: {
		visible: {
			type: Boolean,
			require: true, 
			default: false,
		},
    note: {
			type: String,
			require: false, 
			default: "",
		},
    ds: {
			type: Array,
			require: false, 
			default: [],
		},
	},
	data() {
		return {
      drag: false,
      list: [],
      dirty: false
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
      let sort = "";
      this.list.forEach(el => {
        sort += el.id + ","
      })
      this.$emit("onClose", sort);
    },
	},
	watch: {
		visible(value) {
      this.dirty = false;
      if(this.visible == true) {
        let body = document.querySelector("#sortable .ivu-modal-body");
        body.style.background = "#eee"
        this.note.split(",").forEach(el => {
          if(el.trim().length > 0) {
            let index = this.ds.findIndex(el2 => {
              return el2.id == el;
            });
            if(index > -1) 
              this.list.push(this.ds[index])
          }
        });
      } else {
        this.list = [];
      }
		}
	},
});