// :style="{width: width + 'px'}" 
Vue.component('yt-menu', { 
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
      <div style="padding: 10px 10px; z-index: 10;" v-if="!smallScreen && project.length > 0">
        <Dropdown @on-click="onClickProject">
          <a href="javascript:void(0)">
              {{project[topic].title}}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu v-for="(item, index) in project" :key="index" slot="list">
              <DropdownItem :name="index" :selected="index == topic">{{item.title}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      
      <i-menu theme="light" :width="width" ref="menu" @on-select="onSelect" 
        style="flex: 1; overflow-y: auto; overflow-x: hidden; z-index: 0;" 
        :active-name="active">
        <menu-group title="">
          <menu-item v-for="(item, index) in menu" :id="'menu' + index" :name="index + ''" :key="index">
            <span>{{item.title}}</span>
            <span v-if="$isDebug() && $isLogin() && (typeof item.children == 'undefined' || item.children.length == 0)" style="color: red; font-size: 8px;">{{"無"}}</span>
          </menu-item>
        </menu-group>
      </i-menu>
      <div style="display: flex; flex-direction: row; align-items: center;" id="version">
        <div  style="flex: 1;">2022-02-18 17:00</div>
        <i-button v-if="$isDebug() && $isLogin()" type="success"  @click.native="onClickAdd()"  icon="md-add" shape="circle" style="margin: 0px 5px; "></i-button>
      </div>
    </div>
  `,
	props: {
	},
	data() {
		return {
      smallScreen: true, 
      width: "250",
      active: "0",
      topic: "0",
      project: [
      ], // https://www.youtube.com/c/ClubJamesStudios/videos
      menu: [],
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
    this.intit();
    this.broadcast.$on('onResize', this.onResize);
	},
	destroyed() {
    this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
    async intit(){
      if(this.$isLogin()) {
        this.project = await this.downloadProject();
        if(this.project.length > 0) {
          let m = window.localStorage["yt-project"];
          if(typeof m != "undefined") {
            this.topic = m;
          }
          this.menu = await this.downloadMenu();
        }
      }
      document.body.style.visibility = "visible";
      this.projectUpload()
    },
    async onSelect(index){
      if(index < this.menu.length) {
        this.$emit('on-select', this.menu[index]);
        let project = this.project[this.topic].id;
        window.localStorage["yt-menu-" + project] = this.menu[index].id;
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

      let obj = Object.assign({}, data)
      if(i > -1) {
        this.menu[i] = data;
        this.$set(this.menu, i, data)
      } else {
        this.menu.push(data)
        obj.index = this.menu.length - 1;
      }
      this.upload(obj)
      return i;
    },
    async upload(json){
      let id = json.id;
      delete json.id;
      let date = (new Date()).getTime();
      try {
        let ref = FireStore.db.collection("YouTube").doc(id);
        json.date = date;
        let x = await ref.set(json);        
      } catch(e) {
        console.log(e)
      }
    }, 
    async downloadProject() {
      return new Promise( async (success, error) => {
        try {
          let project = [];
          let snapshot = await FireStore.db.collection("YouTube").doc("目錄")
            .collection("project").get();
          snapshot.forEach(async doc => {
            let json = Object.assign({id: doc.id}, doc.data());
            project.push(json);
          });
          project.sort((a, b) => {
            if(a.index > b.index)
              return 1;
            else if(a.index < b.index)
              return -1;
            else
              return 0;
          });
          success(project);
        } catch(e) {
          console.log(e)
        }
      });
    },
    async downloadMenu(){
      return new Promise( async (success, error) => {
        try {
          let project = this.project[this.topic].id;
          let menu = [];
          let snapshot = await FireStore.db.collection("YouTube").doc("目錄")
            .collection(project).get();
          snapshot.forEach(async doc => {
            let json = Object.assign({id: doc.id}, doc.data());
            menu.push(json);
          });
          menu.sort((a, b) => {
            if(a.index > b.index)
              return 1;
            else if(a.index < b.index)
              return -1;
            else
              return 0;
          });

          let m = window.localStorage["yt-menu-" + project];
          if(typeof m == "string" || typeof x == "number") {
            // this.active = m;
            for(let i = 0; i < menu.length; i++ ) {
              if(menu[i].id == m) {
                this.active = i.toString();
                break;
              }
            }
          } else 
            this.active = '0';
          console.log(m + "-" + this.active)
          setTimeout(() => {
            this.$nextTick(()=>{
              this.$refs.menu.updateOpened();
              this.$refs.menu.updateActiveName();
            });
            let el = document.getElementById("menu" + this.active);
            if(el != null)
              el.scrollIntoView({block: "center"});
            this.onSelect(this.active);
          }, 600);
          success(menu);
        } catch(e) {
          console.log(e)
        }
      });
    },
    async projectUpload(){
      return;
      console.log("fiebase.............")
      let date = (new Date()).getTime(); // /" + report
      let project = [{title: "ALCPT", key: "ALCPT"},
        {title: "知心英文", key: "知心"},
        {title: "多彩英文", key: "多彩"},
        {title: "雪薇英文", key: "雪薇"},
        {title: "Ozma英文", key: "Ozma"},
        {title: "向上英文", key: "向上"},
        {title: "Club James Studios", key: "ClubJamesStudios"},
        {title: "跟洋妞学英语", key: "JackiesEnglishClass"}
      ]
      async function uploadProject(){ // upload Project
        try {
          for(let i = 0; i < project.length; i++) {
            let obj = Object.assign({}, project[i]);
            obj.modifyDate = date;
            obj.index = i;
            let key = obj.key;
            delete obj.key;
            let ref = FireStore.db.collection("YouTube").doc("目錄").
              collection("project").doc(key);
            let x = await ref.set(obj);
            console.log(x)
          }
        } catch(e) {
          console.log(e)
        }
      }
      async function uploadMenu(){
        try {
          let menu = [
            {
              "key": "cjIAZ3XP3Is",
              "title": "Form 41",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "22yOv3IRqvw",
              "title": "Form 42",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "-pWQl496Gh8",
              "title": "Form 43",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "nUtU5Klvg-I",
              "title": "Form 44",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "6z2Ca1nXWV4",
              "title": "Form 45",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "wlCxzGWIYaY",
              "title": "Form 46",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "uxW4t5QwkSI",
              "title": "Form 47",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "SHZXdsF4Mk8",
              "title": "Form 48",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "FZyFjEGT5ys",
              "title": "Form 49",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "7ZhfDBkD2vU",
              "title": "Form 50",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "LMbJCAAQETI",
              "title": "Form 51",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "wwyvPRSmrq0",
              "title": "Form 52",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "-9rDFY2i7po",
              "title": "Form 53",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "arjftnJcZaE",
              "title": "Form 54",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "s2M2dqAbTLA",
              "title": "Form 55",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "J3X-GZsHPSc",
              "title": "Form 56",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "ZH1gbTnvwqY",
              "title": "Form 57",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "4Ua-lgPV7mo",
              "title": "Form 58",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "k4dTgK9uA9k",
              "title": "Form 59",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "urwiq6QScK4",
              "title": "Form 60",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "Vgg_PGEQxv0",
              "title": "Form 64",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "fTq5t1LTLf0",
              "title": "Form 65",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "L7yeIeWymq8",
              "title": "Form 67",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "PyxOjTKPl00",
              "title": "Form 68",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "QOX6wQnQp8I",
              "title": "Form 69",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "bjYsK06i_vg",
              "title": "Form 70",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "CTjNWpsv4a4",
              "title": "Form 71",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "MJ1d67-F3y8",
              "title": "Form 72",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "zL9WH6YT4Pc",
              "title": "Form 73",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "jkf3h0tlSj4",
              "title": "Form 74",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "Um19MO19LWE",
              "title": "Form 75",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "xORUPkA7EPs",
              "title": "Form 76",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "qofqP6vX8Mw",
              "title": "Form 77",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "chKZKqZUT-I",
              "title": "Form 78",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "tPVnR3vkN5g",
              "title": "Form 79",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "9XTQITphs4I",
              "title": "Form 81",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "hVjHW5dogjM",
              "title": "Form 82",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "QrcUFYTNcZg",
              "title": "Form 83",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "FZWXVGqWJqk",
              "title": "Form 84",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "9LDi6YXqRWA",
              "title": "Form 85",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "KxhdxRPZkjQ",
              "title": "Form 86",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "mtkV7gHT1fc",
              "title": "Form 87",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "gkXM1ucGAM8",
              "title": "Form 88",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "66OW2aHr2EE",
              "title": "Form 89",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "JIlz0YxgBXs",
              "title": "Form 90",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "n0hzvB_hCK4",
              "title": "Form 91",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "ZUSa03dSKMk",
              "title": "Form 92",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "bR1rJJBHCKk",
              "title": "Form 93",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "8zJTvR3jtYI",
              "title": "Form 94",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "FVBSQInuP6s",
              "title": "Form 95",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "HwFpbUZS4Ew",
              "title": "Form 96",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "UXWr_JEw4Cc",
              "title": "Form 97",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "pW2YgF3fH4k",
              "title": "Form 98",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "Xy4-2O0Yqog",
              "title": "Form 99",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "3Hscb0tARAk",
              "title": "Form 100",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "d5XBy87fWKA",
              "title": "Book 5 Quiz A ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "6WUAaAMDfLs",
              "title": "Book 7 Quiz C ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "0r1QEJYvR_Q",
              "title": "Book 8 Quiz C with ANSWERS ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "--31skLWrhQ",
              "title": "Book 9 Quiz B ALCPT",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "0FhZu-uP0sw",
              "title": "Book 13 Quiz B ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "WLl1aVka-t4",
              "title": "Book 14 Quiz C ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "tNpt0GHkGik",
              "title": "Book 15 Quiz B ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "5j5-EsOvh7E",
              "title": "Book 15 Quiz C ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "1t6FTrJ7ij8",
              "title": "Book 18 Quiz B - Listening ALCPT",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "iMfCuMtjbsI",
              "title": "Book 18 Quiz C ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "hNYgdIsW2gE",
              "title": "Book 19 Quiz C ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "UAu5-fE_IsA",
              "title": "Book 21 Quiz B ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "3FI8MRrfHJc",
              "title": "Book 22 Quiz C ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "FDcxOIs074Q",
              "title": "Book 24 Quiz B with ANSWERS in the End ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "-TmA02PWWrs",
              "title": "Book 27 Quiz B ",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            },
            {
              "key": "vnLFpKn4vsc",
              "title": "Book 28 Quiz C ALCPT",
              "author": "ALCPT",
              "date": "2021/11/19 08:00:00"
            }
          ];

          for(let i = 0; i < menu.length; i++) {
            if(menu[i].title.indexOf("Form ") != 0) {
              continue;
            }
            let obj = {
              title: menu[i].title,
              modifyDate: date,
              index: i
            }
            let ref = FireStore.db.collection("YouTube").doc("目錄").
              collection(project[0].key).doc(menu[i].key);
            let x = await ref.set(obj);
            console.log(x)
          }
        } catch(e) {
          console.log(e)
        }
      }

      uploadMenu();
    },
    async onClickProject(name){
      console.log(name)
      this.topic = name;
      window.localStorage["yt-project"] = name;
      this.menu = await this.downloadMenu();
    }
	},
	computed: {
	},
	watch: {
	}
});