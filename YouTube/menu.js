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
      <div style="padding: 10px 10px; z-index: 10;" v-if="!smallScreen">
        <Dropdown @on-click="onClickProject" v-if="project.length > 0" >
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
            <span v-if="$isAdmin() && item.children.length == 0" style="color: red; font-size: 8px;">{{"無"}}</span>
          </menu-item>
        </menu-group>
      </i-menu>
      <div style="display: flex; flex-direction: row; align-items: center;" id="version">
        <div  style="flex: 1;">2022-02-18 17:00</div>
        <i-button v-if="$isAdmin()" type="success"  @click.native="onClickAdd()"  icon="md-add" shape="circle" style="margin: 0px 5px; "></i-button>
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
      if(this.$isAdmin()) {
        this.project = await this.downloadProject();
        if(this.project.length > 0) {
          let m = window.localStorage["yt-project"];
          if(typeof m != "undefined") {
            this.topic = m;
          }
          let menu = await this.downloadMenu();
        }
      }
      // let menu = this.$isAdmin() ? await this.download() : await this.getMenu(); 
      // menu.forEach((el, index) => {
      //   this.$set(this.menu, index, el)
      // });

      // let m = window.localStorage["yt-menu"];
      // if(typeof m == "string" || typeof x == "number") {
      //   this.active = m;
      //   for(let i = 0; i < this.menu.length; i++ ) {
      //     if(this.menu[i].id == m) {
      //       this.active = i.toString();
      //       break;
      //     }
      //   }
      // } else 
      //   this.active = '0';
      // setTimeout(() => {
      //   this.$nextTick(()=>{
      //     this.$refs.menu.updateOpened();
      //     this.$refs.menu.updateActiveName();
      //   });
      //   let el = document.getElementById("menu" + this.active);
      //   if(el != null)
      //     el.scrollIntoView({block: "center"});
      // }, 600);
      // this.onSelect(this.active);
      document.body.style.visibility = "visible";

      // this.projectUpload()
    },
    async onSelect(index){
      if(index < this.menu.length) {
        this.$emit('on-select', this.menu[index]);
        window.localStorage["yt-menu"] = this.menu[index].id;
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
    async download(project){
      return new Promise( async (success, error) => {
        try {
          let menu = [];
          let snapshot1 = await FireStore.db.collection("YouTube").get();
          snapshot1.forEach(async doc => {
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
          success(menu);
        } catch(e) {
          console.log(e)
        }
      });
    },
    async projectUpload(){
      console.log("fiebase.............")
      let project = [{title: "ALCPT", key: "ALCPT"},
        {title: "知心英文", key: "知心"},
        {title: "多彩英文", key: "多彩"},
        {title: "雪薇英文", key: "雪薇"},
        {title: "Ozma英文", key: "Ozma"},
        {title: "向上英文", key: "向上"},
        {title: "Club James Studios", key: "ClubJamesStudios"},
        {title: "跟洋妞学英语", key: "JackiesEnglishClass"}
      ]
      { // upload Project
        // let date = (new Date()).getTime(); // /" + report
        // try {
        //   for(let i = 0; i < project.length; i++) {
        //     let obj = Object.assign({}, project[i]);
        //     obj.modifyDate = date;
        //     obj.index = i;
        //     let key = obj.key;
        //     delete obj.key;
        //     let ref = FireStore.db.collection("YouTube").doc("目錄").
        //       collection("project").doc(key);
        //     let x = await ref.set(obj);
        //     console.log(x)
        //   }
        // } catch(e) {
        //   console.log(e)
        // }
      }
      return;
      try {
        let menu = [
          {
            "key": "cjIAZ3XP3Is",
            "title": "ALCPT Form 41",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "22yOv3IRqvw",
            "title": "ALCPT Form 42",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "-pWQl496Gh8",
            "title": "ALCPT Form 43",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "nUtU5Klvg-I",
            "title": "ALCPT Form 44",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "6z2Ca1nXWV4",
            "title": "ALCPT Form 45",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "wlCxzGWIYaY",
            "title": "ALCPT Form 46",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "uxW4t5QwkSI",
            "title": "ALCPT Form 47",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "SHZXdsF4Mk8",
            "title": "ALCPT Form 48",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "FZyFjEGT5ys",
            "title": "ALCPT Form 49",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "7ZhfDBkD2vU",
            "title": "ALCPT Form 50",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "LMbJCAAQETI",
            "title": "ALCPT Form 51",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "wwyvPRSmrq0",
            "title": "ALCPT Form 52",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "-9rDFY2i7po",
            "title": "ALCPT Form 53",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "arjftnJcZaE",
            "title": "ALCPT Form 54",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "s2M2dqAbTLA",
            "title": "ALCPT Form 55",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "J3X-GZsHPSc",
            "title": "ALCPT Form 56",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "ZH1gbTnvwqY",
            "title": "ALCPT Form 57",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "4Ua-lgPV7mo",
            "title": "ALCPT Form 58",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "k4dTgK9uA9k",
            "title": "ALCPT Form 59",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "urwiq6QScK4",
            "title": "ALCPT Form 60",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "Vgg_PGEQxv0",
            "title": "ALCPT Form 64",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "fTq5t1LTLf0",
            "title": "ALCPT Form 65",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "L7yeIeWymq8",
            "title": "ALCPT Form 67",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "PyxOjTKPl00",
            "title": "ALCPT Form 68",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "QOX6wQnQp8I",
            "title": "ALCPT Form 69",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "bjYsK06i_vg",
            "title": "ALCPT Form 70",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "CTjNWpsv4a4",
            "title": "ALCPT Form 71",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "MJ1d67-F3y8",
            "title": "ALCPT Form 72",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "zL9WH6YT4Pc",
            "title": "ALCPT Form 73",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "jkf3h0tlSj4",
            "title": "ALCPT Form 74",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "Um19MO19LWE",
            "title": "ALCPT Form 75",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "xORUPkA7EPs",
            "title": "ALCPT Form 76",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "qofqP6vX8Mw",
            "title": "ALCPT Form 77",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "chKZKqZUT-I",
            "title": "ALCPT Form 78",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "tPVnR3vkN5g",
            "title": "ALCPT Form 79",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "g5PFQLQ7hoA",
            "title": "ALCPT Form 80 with ANSWERS Reading",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "9XTQITphs4I",
            "title": "ALCPT Form 81",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "hVjHW5dogjM",
            "title": "ALCPT Form 82",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "QrcUFYTNcZg",
            "title": "ALCPT Form 83",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "FZWXVGqWJqk",
            "title": "ALCPT Form 84",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "9LDi6YXqRWA",
            "title": "ALCPT Form 85",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "KxhdxRPZkjQ",
            "title": "ALCPT Form 86",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "mtkV7gHT1fc",
            "title": "ALCPT Form 87",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "gkXM1ucGAM8",
            "title": "ALCPT Form 88",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "66OW2aHr2EE",
            "title": "ALCPT Form 89",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "JIlz0YxgBXs",
            "title": "ALCPT Form 90",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "n0hzvB_hCK4",
            "title": "ALCPT Form 91",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "ZUSa03dSKMk",
            "title": "ALCPT Form 92",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "bR1rJJBHCKk",
            "title": "ALCPT Form 93",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "8zJTvR3jtYI",
            "title": "ALCPT Form 94",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "FVBSQInuP6s",
            "title": "ALCPT Form 95",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "HwFpbUZS4Ew",
            "title": "ALCPT Form 96",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "UXWr_JEw4Cc",
            "title": "ALCPT Form 97",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "pW2YgF3fH4k",
            "title": "ALCPT Form 98",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "Xy4-2O0Yqog",
            "title": "ALCPT Form 99",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "3Hscb0tARAk",
            "title": "ALCPT Form 100",
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
          let obj = Object.assign({}, menu[i]);
          obj.modifyDate = date;
          obj.index = i;
          let key = obj.key;
          delete obj.key;
          let ref = FireStore.db.collection("YouTube").doc("目錄").
            collection(project[0].id).doc(key);
          let x = await ref.set(obj);
          console.log(x)
        }
      } catch(e) {
        console.log(e)
      } 
    },
    async allUpload(){
      console.log("fiebase.............")
      let menu = await this.getMenu();
      let date = (new Date()).getTime(); // /" + report
      // let ref = FireStore.db.collection("YouTube").doc("YouTube");
      try {
        for(let i = 0; i < menu.length; i++) {
          let obj = Object.assign({}, menu[i]);
          obj.modifyDate = date;
          obj.index = i;
          let id = obj.id;
          delete obj.id;
          let ref = FireStore.db.collection("YouTube").doc(id);
          let x = await ref.set(obj);
          console.log(x)
        }
      } catch(e) {
        console.log(e)
      } 
    },
    onClickProject(name){
      console.log(name)
      this.topic = name;
      window.localStorage["yt-project"] = name;
    }
	},
	computed: {
	},
	watch: {
    
	}
});
/*
    async function fiebase2(){
      console.log("fiebase.............")
      let date = (new Date()).getTime(); // /" + report
      // let ref = FireStore.db.collection("YouTube").doc("YouTube");
      try {
        let ref = FireStore.db.collection("YouTube").doc("YouTube");
        json = {};
        for(let i = 0; i < self.menu.length; i++) {
          let obj = Object.assign({}, self.menu[i]);
          obj.modifyDate = date;
          obj.index = i;
          let id = obj.id;
          delete obj.id;
          json[id] = obj
        }

        let x = await ref.set(json);

        // for(let i = 0; i < self.menu.length; i++) {
        //   let obj = Object.assign({}, self.menu[i]);
        //   obj.modifyDate = date;
        //   obj.index = i;
        //   let id = obj.id;
        //   delete obj.id;


        //   let ref = FireStore.db.collection("YouTube").doc(id);
        //   let x = await ref.set(obj);
        //   console.log(x)
        //   // if(i > 2) break;
        // }
        
      } catch(e) {
        console.log(e)
      }      
    }
    setTimeout(() => {
      // fiebase2();  
		}, 3000)

*/