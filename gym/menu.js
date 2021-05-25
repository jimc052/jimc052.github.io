Vue.component('gym-menu', { 
	template:  `
    <div style="width: 240px; height: 100%; display: flex; flex-direction: column;">
      <i-menu theme="light" ref="menu" @on-select="onSelect" style="flex: 1"  :active-name="active">
        <menu-group title="">
          <menu-item v-for="(item, index) in menu" :name="index + ''" :key="index">
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
      active: -1,
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
        title: "棒式運動-黑面蔡媽媽", id: "66gO0V2M-7w", 
        children: [
          {title: "棒式基本型", start: 27.5, end: 70},
          {title: "棒式後抬腿", start: 70, end: 105},
          {title: "棒式開合跳", start: 105, end: 131},
          {title: "棒式抬臀", start: 131.5, end: 160.8},
          {title: "棒式扭臀", start: 166, end: 196.8},
        ]
      }, {
        title: "瘦小腹運動-黑面蔡媽媽", id: "6EDuWA56UwM", 
        children: [
          {title: "船式", start: 102, end: 131},
          {title: "踩腳踏車", start: 132, end: 172},
          {title: "俄羅斯旋轉", start: 182, end: 212},
          {title: "仰臥抬腿", start: 221, end: 251},
          {title: "仰臥交叉抬腿", start: 261.5, end: 291},
          {title: "交叉卷腹觸腿", start: 301.7, end: 331},
          {title: "卷腹", start: 342, end: 371.5},
          {title: "觸足屈腹", start: 382, end: 411.5},
          {title: "屈腿提臀", start: 422, end: 451.5},
          {title: "橋式+蚌殻式", start: 461.5, end: 491.5},
        ]
      }, {
        title: "彈力帶-黑面蔡媽媽", id: "u56LGvX3zdQ", 
        children: [
          {title: "站姿前推", start: 87.5, end: 133},
          {title: "交替彎舉", start: 135.8, end: 179},
          {title: "踩腳踏車", start: 188.8, end: 224},
          {title: "跪姿後抬腿", start: 228.5, end: 271},
          {title: "腿外展", start: 274.5, end: 303},
        ]
        // 
      }]
		};
	},
	created(){
    /*
      }, {
        title: "", id: "", 
        children: [
          {title: "", start: , end: },
        ]
    */
	},
	async mounted () {
    let x = window.localStorage["youtube-menu"];
    if(typeof x == "string" || typeof x == "number")
      this.active = x;
    else 
      this.active = 0;
    setTimeout(() => {
      this.$nextTick(()=>{
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
       
    }, 600);
    this.onSelect(this.active)
	},
	destroyed() {		
  },
	methods: {
    async onSelect(index){
      this.$emit('on-select', index, this.menu[index]);
      window.localStorage["youtube-menu"] = index;
    }
	},
	computed: {
	},
	watch: {
	}
});