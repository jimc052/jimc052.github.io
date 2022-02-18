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
      <i-menu theme="light" :width="width" ref="menu" @on-select="onSelect" 
        style="flex: 1; overflow-y: auto; overflow-x: hidden; " 
        :active-name="active">
        <menu-group title="">
          <menu-item v-for="(item, index) in menu" :id="'menu' + index" :name="index + ''" :key="index">
              <span>{{item.title}}</span>
              <span v-if="$isDebug() && item.children.length == 0" style="color: red; font-size: 8px;">{{"無"}}</span>
              <span v-if="typeof item.mode == 'string'" style="color: blue; font-size: 8px;">{{"暫存"}}</span>
          </menu-item>
        </menu-group>
      </i-menu>
      <div style="display: flex; flex-direction: row; align-items: center;" id="version">
        <div  style="flex: 1;">2022-02-17 16:00</div>
        <i-button v-if="$isDebug()" type="success"  @click.native="onClickAdd()"  icon="md-add" shape="circle" style="margin: 0px 5px; "></i-button>
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
      }, {
        title: "腹肌锻炼", id: "IrA9dvgRKR0", 
        children: [
          {"title": "腳跟觸地", "start": 5, "end": 46 }, 
          {"title": "交叉仰臥起坐", "start": 52.5, "end": 97}, 
          {"title": "膝觸",  "start": 127.8, "end": 172}, 
          {"title": "抬腿", "start": 175.5, "end": 220}, 
          {"title": "長臂仰臥起坐", "start": 251, "end": 295}, 
          {"title": "向上緊縮", "start": 298.5, "end": 342},  
          {"title": "仰臥起坐",  "start": 374, "end": 418.5}, 
          {"title": "卷腹抬腿", "start": 421.5,  "end": 466}, 
          {"title": "卷腹向上拍手",  "start": 497.5, "end": 541}, 
          {"title": "斜仰臥起坐(左右)", "start": 544.5,"end": 603.8}
        ]
      }, {
        title: "*** 平板锻炼挑战", id: "e13yvYaOyqg",
        children: [
          {title: "登山板", start: 6, end: 49},
          {title: "平板支撐側平舉", start: 68, end: 110},
          {title: "平板到腳趾輕拍", start: 127, end: 172},
          {title: "前平板支撐(手腳提升)", start: 187, end: 230},
          {title: "平板杰克", start: 247, end: 291},
          {title: "動態平板支撐", start: 307, end: 351},
          {title: "扭轉平板", start: 367, end: 412},
          {title: "前平板支撐", start: 427, end: 483},
        ]
      }, {
        title: "腹部锻炼撕裂斜肌", id: "3kgqeZj5fIE", 
        children: [
          {title: "躺膝扭動", start: 1, end: 39},
          {title: "扭轉卷腹", start: 57, end: 95},
          {title: "腳跟碰觸", start: 107, end: 146},
          {title: "俄羅斯轉", start: 161, end: 200},
          {title: "抬腿-左", start: 212, end: 250},
          {title: "抬腿-右", start: 255, end: 291},
          {title: "俯臥撐", start: 305, end: 342},
          {title: "平板膝蓋扭轉", start: 359.5, end: 399},
          {title: "斜向緊縮(右)", start: 410, end: 449},
          {title: "斜向緊縮(左)", start: 453, end: 492},
          {title: "扭臀", start: 503, end: 542},
          {title: "斜高膝", start: 558, end: 597},
          {title: "雨刷", start: 609, end: 648},
        ]
      }, {
        title: "在家中最好的热身运动", id: "-aK12bO4evs", 
        children: [
          {title: "拍打", start: 1, end: 29},
          {title: "手臂圈", start: 30, end: 59},
          {title: "中間側平舉", start: 61, end: 89},
          {title: "站立側彎", start: 91, end: 119},
          {title: "側抬腿", start: 121, end: 149},
          {title: "弓步", start: 151, end: 179},
          {title: "星際衝刺", start: 181, end: 210},
          {title: "螃蟹轉", start: 211, end: 240},
          {title: "平板支撐", start: 241, end: 270},
          {title: "平躺天使", start: 271, end: 300},
          {title: "跳躍杰克", start: 302, end: 330.5},
        ]
      }, {
        title: "下腹肌最佳练习", id: "3b-701_2sds", 
        children: [
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
        ]
      }, {
        title: "腿部练习", id: "e6C0Ia5Cazo", 
        children: [
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
        ]
      }, {
        title: "热身", id: "Wi0wLCg4jho", 
        children: [
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
          // {title: "", start: , end: },
        ]
      }, {
          title: "腹肌", id: "gGqQX9HqHEk", 
          children: [
            // {title: "", start: , end: },
            // {title: "", start: , end: },
            // {title: "", start: , end: },
            // {title: "", start: , end: },
            // {title: "", start: , end: },
            // {title: "", start: , end: },
            // {title: "", start: , end: },
            // {title: "", start: , end: },
            // {title: "", start: , end: },
            // {title: "", start: , end: },
          ]
      }]
		}; // 
	},
	created(){
    /*    
      }, {
        title: "", id: "", 
        children: [
        ]

      }, {
        title: "", id: "", 
        children: [
          {title: "", start: , end: },
        ]
    */
	},
	mounted () {
    let m = window.localStorage["gym-ds"], json = {};
    if(typeof m == "string" && m.length > 0) {
      json = JSON.parse(m);
    }
    // console.log(m)

    this.menu.forEach((el, index) => {
      if(typeof json[el.id] != "undefined") {
        this.$set(this.menu, index, Object.assign({mode: "temp"},json[el.id]))
        delete json[el.id];
      }
    });

    for(let key in json) {
      let data = Object.assign({mode: "temp"}, json[key]);
      this.menu.push(data)
      this.$set(this.menu, this.menu.length - 1, data)
    }

    m = window.localStorage["gym-menu"];
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
      let el = document.getElementById("menu" + this.active);
      if(el != null)
        el.scrollIntoView({block: "center"});
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
        window.localStorage["gym-menu"] = this.menu[index].id;
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
    }, 
    onClickAdd(){
      this.$emit('on-click-add');
    },
    set(data){
      let i = this.menu.findIndex(el =>{
        return el.id == data.id;
      })
      if(i > -1) {
        this.menu[i] = data;
        this.$set(this.menu, i, data)
      } else {
        this.menu.push(data)
      }

      let m = window.localStorage["gym-ds"], json = {};
      if(typeof m == "string" && m.length > 0) {
        json = JSON.parse(m);
      }
      json[data.id] = data;
      window.localStorage["gym-ds"] = JSON.stringify(json);
    }
	},
	computed: {
	},
	watch: {
    
	}
});