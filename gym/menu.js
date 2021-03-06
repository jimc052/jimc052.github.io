// :style="{width: width + 'px'}" 
Vue.component('gym-menu', { 
	template:  `
    <div id='frameMenu' style="height: 100%; display: flex; flex-direction: column;"
        :style="{width: width + 'px'}">
      <div v-if="smallScreen" id="headerMenu" :style="{background: '#2d8cf0', 
        'display': 'flex', 'flex-direction': 'row', 'justify-content': 'flex-start',
        'align-items': 'center',
        height: '50px', 'padding-right': '5px'
        }">
        <Icon type="md-arrow-back" size="28" color="white" @click.native="onClickIcon" 
        style="cursor: pointer; margin-left: 10px;"></Icon>
        
      </div>
      <i-menu theme="light" :width="width" ref="menu" @on-select="onSelect" style="flex: 1" 
        :active-name="active">
        <menu-group title="">
          <menu-item v-for="(item, index) in menu" :name="index + ''" :key="index">
              {{item.title}}
          </menu-item>
        </menu-group>
      </i-menu>
      <div style="" id="version">
        2021-05-28 08:30
      </div>
    </div>
  `,
	props: {
	},
	data() {
		return {
      smallScreen: true, 
      width: "240",
      active: "0",
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
        title: "腹肌10分鐘運動-May", id: "4pOjPjN7AqI", 
        children: [
          {title: "抬腿", start: 17.8, end: 47},
          {title: "捲腹伸腿", start: 47.2, end: 77.5},
          {title: "仰臥踢腿", start: 78, end: 107},
          {title: "剪刀腳踢腿", start: 107.5, end: 136},
          {title: "捲腹伸腿", start: 137.5, end: 166},
          {title: "對邊捲腹", start: 167.5, end: 198},
          {title: "仰臥捲腹", start: 198, end: 229},
          {title: "單邊抬腳", start: 230, end: 258},
          {title: "腳踏車捲腹", start: 258, end: 287},
          {title: "俄羅斯轉體", start: 288, end: 318},
          {title: "側平板支撐", start: 346, end: 378},
          {title: "側平板抬臀", start: 378.2, end: 407},
          {title: "側平板轉體", start: 407.5, end: 438},
          {title: "登山式", start: 528.5, end: 558},
          {title: "平板支撐", start: 558.2, end: 588},
          {title: "平板前後移", start: 588.5, end: 619.5},
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
      }, {
        title: "彈力帶-Judy", id: "qdwH7TE6_jI", 
        children: [
          {title: "肱二頭肌彎舉", start: 24.5, end: 67.5},
          {title: "前三角肌平舉", start: 69, end: 95},
          {title: "深蹲", start: 96, end: 133},
          {title: "三頭肌伸展", start: 138, end: 184},
        ]        
      }, {
        title: "地獄腹肌訓練", id: "4CPNOjRJ4aU", 
        children: [
          {title: "卷腹", start: 16, end: 68.5},
          {title: "交換碰跟卷腹", start: 69, end: 122},
          {title: "交換抬腿", start: 138, end: 190},
          {title: "仰臥抬腿", start: 191, end: 243.5},
          {title: "剪刀式踢腳", start: 258.5, end: 311},
          {title: "俄羅斯轉體", start: 311.2, end: 363},
          {title: "仰臥起坐", start: 379, end: 431},
          {title: "左右碰膝", start: 432.5, end: 484.5},
          {title: "登山者", start:  500.5, end: 552.5},
          {title: "左右膝碰肘", start:  553, end: 605.5},
        ]
      }]
		}; // 
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
	mounted () {
    let m = window.localStorage["youtube-menu"];
    if(typeof m == "string" || typeof x == "number") {
      this.active = m;
      for(let i = 0; i < this.menu.length; i++ ) {
        if(this.menu[i].id == m) {
          this.active = i.toString();
          break;
        }
      }
    } else 
      this.active = '0';
    setTimeout(() => {
      this.$nextTick(()=>{
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
    }, 600);
    this.onSelect(this.active);
    this.broadcast.$on('onResize', this.onResize);
	},
	destroyed() {
    this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
    async onSelect(index){
      if(index < this.menu.length) {
        this.$emit('on-select', this.menu[index]);
        window.localStorage["youtube-menu"] = this.menu[index].id;
        if(this.smallScreen == true) {
          this.onClickIcon();
        }
        this.active = index + '';
      }
    },
    onClickIcon(){
      let el = document.getElementById("frameMenu");
      el.style.visibility = "hidden";
    },
    onResize(small){
      this.smallScreen = small;
      let el = document.getElementById("frameMenu");
      if(small == true) {
        el.classList.add("smallScreen");
        this.width = document.body.clientWidth + "";
        el.style.visibility = "hidden";
      } else {
        el.classList.remove("smallScreen");
        this.width = "240";
        el.style.visibility = "visible";
      }
    }
	},
	computed: {
	},
	watch: {
    
	}
});