Vue.component('gym-menu', { 
	template:  `
    <div style="width: 240px; height: 100%; display: flex; flex-direction: column;">
      <i-menu theme="light" @on-select="onSelect" style="flex: 1">
        <menu-group title="">
          <menu-item v-for="(item, index) in menu" :name="index" :key="index">
              {{item.title}}
          </menu-item>
        </menu-group>
      </i-menu>
      <div style="padding: 0px;">
      </div>
    </div>
  `,
	props: {
		// title: String
	},
	data() {
		return {
      menu: [{
        title: "上半身美背", id: "BM-BYDhuYRg", 
        children: [
          {title: "第一動", start: 5, end: 13},
          {title: "坐姿划船", start: 15, end: 23},
          {title: "棒式划船", start: 25, end: 53},
          {title: "站姿划船", start: 55, end: 74},
          {title: "臥姿划船", start: 75, end: 94},
          {title: "上臂屈曲", start: 95, end: 103},
        ]
      }, {
        title: "平板", id: "66gO0V2M-7w", 
        children: [
          {title: "第一動", start: 5, end: 13},
        
        ]
      }]
		};
	},
	created(){
	},
	async mounted () {
	
	},
	destroyed() {		
  },
	methods: {
    async onSelect(index){
      console.log("onSelect: " + index)
      this.$emit('on-select', index, this.menu[index]);
    }
	},
	computed: {
	},
	watch: {
	}
});