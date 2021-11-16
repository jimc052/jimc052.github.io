// https://www.iviewui.com/components/menu  
Vue.component('my-menu', { 
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
      <i-menu theme="light" :width="width" ref="menu" @on-select="onSelect" @on-open-change="onOpenChange" style="flex: 1" 
        :active-name="active" :open-names="[submenu]">
        <Submenu v-for="(list, key) in menu" :name="key" :key="key">
            <template slot="title">
                <Icon type="md-folder" />
                {{key}}
            </template>
          <menu-item v-for="(item, index) in list" :name="key + '-' + index" :key="index">
              {{item.title}}
          </menu-item>
        </Submenu>
      </i-menu>
      <div style="" id="version">
        2021-11-16 08:30
      </div>
    </div>
  `,
	props: {
	},
	data() {
		return {
      smallScreen: true, 
      width: "310",
      active: "0",
      submenu: "",
      menu: {
        "ALC": [{
            "key": "WmPkfzc1F1o",
            "title": "ALCPT form 72",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "RXyBGXf2W7w",
            "title": "ALCPT form 73",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "sJNcYm1Cnuw",
            "title": "ALCPT form 75",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "lGcoR6EVbGU",
            "title": "ALCPT form 76",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "3YUvDJlzU6Y",
            "title": "ALCPT form 77",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "ZQowNSe9mak",
            "title": "ALCPT form 78",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "IAr-IyEYV7I",
            "title": "ALCPT form 79",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "-UZCQfLZVSQ",
            "title": "ALCPT form 81",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "htlV4SQa-Mk",
            "title": "ALCPT form 84",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "iaVWQrpT_6Q",
            "title": "ALCPT form 87",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "aHVGP20liAI",
            "title": "ECL   Listening Script  Reading – Version 1",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "rtLKj98xCiw",
            "title": "ECL   Listening Script  Reading – Version 2",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "NlGIMHYnw4Y",
            "title": "ECL   Listening Script  Reading – Version 3",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "fMTkIGxd6Io",
            "title": "ECL   Listening Script  Reading – Version 4",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "4jdKsqIguqA",
            "title": "ECL   Listening Script  Reading – Version 5",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "SqIesid5H9Q",
            "title": "ECL 59",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          },  {
            "key": "nYEe1HrznqM",
            "title": "ECL A12",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }, {
            "key": "IW930Dr7q4U",
            "title": "ECL TEST FORM E17",
            "author": "ALCPT & ECL",
            "date": "2021/11/12 13:00:00",
            "fileName": ""
          }
        ],
        "知心英文": [
          {
            "key": "0i0TKAe0KvQ",
            "title": "100個重要英文短句（初級篇）",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "2O_4kk5U-7U",
            "title": "15個英語萬用句型",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "_pl0TyRRzHo",
            "title": "300個英語常用短句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "_e_efxI5BcM",
            "title": "30個英文問句萬用句型",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "zr2aev0RB2I",
            "title": "40分鐘改變英文耳聽力",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "Xhqs2EhTyT4",
            "title": "超實用的初級英語句子",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "q0KGDvwdDzs",
            "title": "正確用英語打電話接電話",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "1dr--2kaNQQ",
            "title": "僅有3個初級單詞的英文口說短句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "b69iHv0x5dc",
            "title": "光聽就出效果！實用基礎英文99句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "eNPnKI1F9II",
            "title": "在家裡說的超常用英語80句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "vkGwKRCToZI",
            "title": "英語萬用句型23個",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "4eMwNhtsf8s",
            "title": "英美生活中常用199句英文",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "k6Il4oueSo0",
            "title": "100句英文問答",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "0ZXOoLDICtw",
            "title": "1小時英語聽力磨練",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "guPvt02BSis",
            "title": "英語聽力練習180句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "eguwmuwbCiY",
            "title": "帶take的英文慣用語16個",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "IhAJASIwJmQ",
            "title": "有效英語聽力",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "hcEdzGHO3Mk",
            "title": "提高英語口說90句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "gujSdtvH-eU",
            "title": "生活英語口語200句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "CbqIl_b_RW0",
            "title": "日常溝通190句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "L0DE5KkBJXo",
            "title": "20個常用英語動詞片語",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "zm8GabWAyF0",
            "title": "常用英語口語190",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "kyI-KB2zEPY",
            "title": "百搭英文句型17個",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "ildcNarakUE",
            "title": "睡前英語聽力150句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "RIspU7aPrkk",
            "title": "18個重要英文句型",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "CDXNE-5QFoM",
            "title": "反覆練習的英文聽力材料200句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "wunTdqjTxwQ",
            "title": "高頻英語表達149句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "Kd55yRJnnIQ",
            "title": "萬能口語句型15個",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "mzx2QJHlMQQ",
            "title": "耳朵越聽越敏銳 - 隨時隨地聽英文，改變你的聽力理解",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "dUdXJwFTxGM",
            "title": "耳朵逐漸清晰：超有效的英語聽力練習｜絕佳英文聽力素材100句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "rAxKVc5CBJw",
            "title": "聽清英語 練耳朵聽力｜重點反覆訓練，改變聽力現狀",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "E44NNbhmOdw",
            "title": "25個高頻萬能英文句型",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "MVoIjLTvxEk",
            "title": "身邊實用135句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "Bhg8jXma7G0",
            "title": "英美劇中最常說的100句英文口說短句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "QNQw5GchW2w",
            "title": "英語每日一聽，逐漸清晰 邊聽邊讀邊模仿｜聽清老外說的常用英文",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "0ra21D3jfbY",
            "title": "英語聽力應該這樣練：聽懂每一句 | 非常高效的英語聽說訓練",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "rQavyUH7df8",
            "title": "17個口語萬能句型",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "o1CRBfyquDg",
            "title": "邊睡邊記：超實用英語泛聽訓練150｜躺着把英文學會",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "r-RLsAOxU54",
            "title": "重點英文片語 學懂了對英語會話很有用！(帶多個使用例句/音標)",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "SuMFKTmpFd4",
            "title": "20個高頻實用英文片語/詞組",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "84OHgZYqvYI",
            "title": "高效磨耳朵英語聽力 - 加速提高你的英文聽力敏銳度",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "FYkAP5X7z4Q",
            "title": "高效養成習慣 - 每天英語訓練，穩步提升英聽和口說",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "EVtScJlupwU",
            "title": "鲜活英文口语 用英语表达每天的生活｜初级英文口说强效训练",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          }
        ]
      }
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
    let s = window.localStorage["mytube-submenu"];
    if(typeof s == "string" && s.length > 0) {
      this.submenu = s;
    } else {
      for(let key in this.menu) {
        this.submenu = key;
        console.log(key)
        break;
      }
    }
    let m = window.localStorage["mytube-menu-" + this.submenu];
    let index = "0";
    if(typeof m == "string" && m.length > 0) {
      for(let i = 0; i < this.menu[this.submenu].length; i++ ) {
        if(this.menu[this.submenu][i].key == m) {
          index = i.toString();
          setTimeout(() => {
            this.onSelect(this.submenu + "-" + i)
          }, 300);
          break;
        }
      }
    }

    this.active = this.submenu + "-" + index;
    setTimeout(() => {
      this.$nextTick(()=>{
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
    }, 600);
    // this.onSelect(this.active);
    this.broadcast.$on('onResize', this.onResize);
	},
	destroyed() {
    this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
    onOpenChange(index, item){
      if(index.length == 0) {
        this.submenu = "";
      } else {
        this.submenu = index[0];
      }
      window.localStorage["mytube-submenu"] = this.submenu;
      if(this.submenu.length > 0) {
        let m = window.localStorage["mytube-menu-" + this.submenu];
        let index = "0";
        if(typeof m == "string" && m.length > 0) {
          for(let i = 0; i < this.menu[this.submenu].length; i++ ) {
            if(this.menu[this.submenu][i].key == m) {
              index = i.toString();
              setTimeout(() => {
                this.onSelect(this.submenu + "-" + i)
              }, 300);
              break;
            }
          }
        }
        this.active = this.submenu + "-" + index;
      }      
      setTimeout(() => {
        this.$nextTick(()=>{
          this.$refs.menu.updateOpened();
          // this.$refs.menu.updateActiveName();
        });
      }, 600);
    },
    async onSelect(index){
      let arr = index.split("-")
      this.$emit('on-select', this.menu[arr[0]][arr[1]]);
      window.localStorage["mytube-menu-" + this.submenu] = this.menu[arr[0]][arr[1]].key;
      if(this.smallScreen == true) {
        this.onClickIcon();
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
        this.width = "310";
        el.style.visibility = "visible";
      }
    }
	},
	computed: {
	},
	watch: {
    
	}
});