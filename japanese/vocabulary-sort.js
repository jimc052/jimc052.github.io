Vue.component('sortable', { 
	template:  `<modal v-model="visible" class-name="vertical-center-modal" 
		id="sortable"  :fullscreen="true" :closable="false" style="overflow: hidden;"
	>
    <div id="sortable-body" v-if="visible"
      style="display: flex; flex-direction: row; align-items: center; justify-content: center; overflow-y: hidden;"
    >
    <draggable v-model="list" @start="drag=true" @end="drag=false; dirty = true;" v-bind="dragOptions">
      <div v-for="(item, index) in list" :key="item.id"
        style="background: white; border-radius: 5px; padding: 5px 10px; cursor: pointer;
          display: flex; flex-direction: row; align-items: center; justify-content: center;
        "
        :style="{marginTop: index == 0 ? '0px' : '5px'}"
      >
        <div style="width: 25px; margin-right: 5px; font-size: 14px;">{{index + 1}}</div>
        <div style="flex: 1; margin-right: 20px; font-size: 14px;">{{item.語}}</div>
        <div style="flex: 1; margin-right: 20px; font-size: 14px;">{{item.漢}}</div>
        <div style="width: 250px; font-size: 14px;">{{item.中}}</div>
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
      dirty: false,
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
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
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

        // setTimeout(() => {
        //   console.log(document.querySelector("#sortable").clientWidth)
        //   let width = document.querySelector("#sortable").clientWidth;
        //   document.querySelector("#sortable-body").style.width = (width -30) + "px"
        // }, 300);
      } else {
        this.list = [];
      }
		}
	},
});