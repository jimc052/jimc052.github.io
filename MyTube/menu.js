// :style="{width: width + 'px'}" 
Vue.component('yt-menu', { 
	template:  `
    <div id='frameMenu' style="height: 100%; display: flex; flex-direction: column; "
        :style="{width: width + 'px'}">
      
      <div v-if="smallScreen" id="headerMenu" :style="{background: '#2d8cf0', 
        'display': 'flex', 'flex-direction': 'row', 'justify-content': 'flex-start',
        'align-items': 'center',
        height: '50px', 'padding-right': '5px'
        }">
        <Icon type="md-arrow-back" size="28" color="white" @click.native="onClickIcon" 
        style="cursor: pointer; margin-left: 10px;"></Icon>
        <span v-if="project.length > 0" style="color: white; margin-left: 10px; font-size: 20px;">
          {{project[topic].title}}
        </span>
      </div>
      <div :style="{padding: !smallScreen && project.length > 0 ? '10px' : '0px', zIndex: '10'}" 
        v-if="$isDebug() && !smallScreen && project.length > 0">
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
            <span v-if="$isDebug() && $isLogin() 
              && (typeof item.position == 'undefined' || item.position.length == 0)
              && (typeof item.topic == 'undefined' || item.topic.length == 0)" 
              style="color: red; font-size: 8px;">{{"無"}}</span>
            <span v-else-if="$isDebug() && $isLogin() 
              && (typeof item.position == 'undefined' || item.position.length == 0)
              && (Array.isArray(item.topic) && item.topic.length > 0)" 
              style="color: blue; font-size: 8px;">{{"合"}}</span>
            <span v-else-if="$isDebug() && $isLogin() 
              && Array.isArray(item.position)
              && Array.isArray(item.topic)
              && item.position.length != item.topic.length" 
              style="color: green; font-size: 8px;">{{"未"}}</span>
          </menu-item>
        </menu-group>
      </i-menu>
      <div style="display: flex; flex-direction: row; align-items: center;" id="version">
        <i-button v-if="$isLogin()" type="success"  @click.native="onClickDocument()"  icon="md-document" shape="circle" style="margin: 0px 5px; "></i-button>
        <div  style="flex: 1;">2022-04-13 09:30</div>
        <i-button v-if="$isDebug() && $isLogin()" type="success"  @click.native="onClickAdd()"  icon="md-add" shape="circle" style="margin: 0px 5px; "></i-button>
      </div>
      <Icon v-if="$isFlutter()" type="logo-youtube" size="28" color="red" @click.native="changeTo()" 
				style="cursor: pointer; position: absolute; right: 20px; bottom: 50px; padding: 10px;">
      </Icon>
      <yt-document :menu="document" @on-close="document = [];" ></yt-document>
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
      document: []
		}; // 
	},
	created(){
    /*    
      }, {
        title: "", id: "", 
        position: [
        ]

      }, {
        title: "", id: "", 
        position: [
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
    onClickDocument(){
      this.document = this.menu;
    },
    changeTo() {
      location.replace('../VOA/index.html');
    },
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
      // this.projectUpload()
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
        // if(this.menu[index].title.indexOf("Form ") == 0) { // 修改 ALCPT index
        //   console.log(this.menu[index].title + ", index: " + this.menu[index].index);
          
        //   if(typeof this.menu[index].position == "undefined" && Array.isArray(this.menu[index].children)) {
        //     this.menu[index].position = this.menu[index].children;
        //     delete this.menu[index].children;
        //     this.upload(Object.assign({}, this.menu[index]))
        //   }
        //   console.log(this.menu[index])

        //   // this.menu[index].index = parseInt(this.menu[index].title.replace("Form ", ""), 10);
        //   // console.log(this.menu[index].title + ", index: " + this.menu[index].index);
        //   // 
        // }
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

      if(obj.id == "" && typeof obj.topic == "undefined") {
        // obj.topic = []
      }
      this.upload(obj)
      return i;
    },
    async upload(json){
      let id = json.id;
      delete json.id;
      let date = (new Date()).getTime();
      try {
        let ref = FireStore.db.collection("YouTube").doc("目錄").
              collection(this.project[this.topic].id).doc(id);
        let x = await ref.set(json);
        this.$Notice.success({title: '已上傳 Firebase'});
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
            if(! this.$isDebug() && json.index <= 40){

            } else if(this.$isDebug() 
                || (Array.isArray(json.position) && Array.isArray(json.topic) && json.topic.length ==  json.position.length) 
                || (Array.isArray(json.topic) && json.topic.length > 0 
                    && (!Array.isArray(json.position) || json.position.length ==0)
                )
              )
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
          // console.log(m + "-" + this.active)
          setTimeout(() => {
            this.$nextTick(()=>{
              this.$refs.menu.updateOpened();
              this.$refs.menu.updateActiveName();
            });
            if(this.menu.length > 0) {
              let el = document.getElementById("menu" + this.active);
              if(el != null)
                el.scrollIntoView({block: "center"});
            }
            this.onSelect(this.active);
          }, 600);
          success(menu);
        } catch(e) {
          console.log(e)
        }
      });
    },
    async projectUpload(){
      console.log("fiebase.............")
      let date = (new Date()).getTime(); // /" + report
      let project = [
      ];
      let xProject = 0;
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
          let menu = [];

          for(let i = 0; i < menu.length; i++) {
            let obj = {
              title: menu[i].title,
              modifyDate: date,
              index: i
            }
            let ref = FireStore.db.collection("YouTube").doc("目錄").
              collection(project[xProject].key).doc(menu[i].key);
            let x = await ref.set(obj);
            console.log(x)
          }
        } catch(e) {
          console.log(e)
        }
      }

      // uploadMenu();
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