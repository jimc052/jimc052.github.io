webpackJsonp([2],{"+skl":function(t,e){},"12Im":function(t,e){},IbOO:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("7+uW"),s=i("pFYg"),r=i.n(s),o=i("mvHQ"),a=i.n(o),l=i("woOf"),c=i.n(l),d=i("Xxa5"),u=i.n(d),h=i("exGp"),p=i.n(h),v=i("w/TU"),f={name:"Script",components:{draggable:i.n(v).a},props:["editItem"],data:function(){return{title:"",visibleEdit:!1,visibleJSON:!1,dataJSON:null,row:{},list:[],enabled:!0,dragging:!1,cursor:-1}},mounted:function(){this.retrieve(this.editItem)},methods:{retrieve:function(t){var e=localStorage["monkeyScript-"+t];"string"==typeof e&&e.length>0?this.list=JSON.parse(e):this.list=[],this.$emit("on-row-change",this.list)},onEdit:function(t){this.cursor=t,this.row=c()({},this.list[t]),this.title="編輯",this.visibleEdit=!0,this.$emit("on-cursor-change",this.row,t)},onClickSerial:function(t){this.cursor=t,this.$emit("on-cursor-change",this.list[t],t)},onEditOK:function(){for(var t in this.row)if("x"==t||"y"==t||"second"==t)if("string"==typeof this.row[t]&&0==this.row[t].trim().length)this.row[t]=this.row[t].trim();else if(void 0!==this.row[t]&&(this.row[t]+"").length>0&&isNaN(this.row[t]))return void alert("請輸入數字");this.visibleEdit=!1;var e=c()({},this.row);if(void 0===e.title||0===e.title.length){var i=1;this.list.forEach(function(t){if("string"==typeof t.title&&0===t.title.indexOf("untitle")){var e=t.title.replace("untitle","");!isNaN(e)&&parseInt(e,10)>=i&&(i=parseInt(e,10)+1)}}),e.title="untitle"+i}void 0===e.id?(e.id=(new Date).getTime(),this.list.push(e),this.cursor=this.list.length-1,this.$emit("on-cursor-change",e,this.cursor)):(this.list[this.cursor]=e,this.$emit("on-cursor-change",e)),this.save(),this.$emit("on-row-change",this.list),this.row={}},add:function(t,e){this.row={x:t,y:e,second:1},this.title="新增",this.visibleEdit=!0},insertTo:function(){this.row={second:1,id:(new Date).getTime()},-1==this.cursor?(this.list.push(this.row),this.cursor=this.list.length-1):this.list.splice(this.cursor,0,this.row),this.title="新增",this.visibleEdit=!0},onClickIcon:function(t){this.list.splice(t,1),this.save(),this.$emit("on-row-change",this.list),this.$emit("on-cursor-change",null,-1),this.cursor=-1},datadragEnd:function(t){this.save()},update:function(t){for(var e in t=c()({},t))0==e.indexOf("_")&&delete t[e];for(var i=0;i<this.list.length;i++)if(this.list[i].id==t.id){this.$set(list,i,t),this.list[i]=t;break}this.save()},clearAll:function(){this.$emit("on-cursor-change",null),this.list=[],this.save()},insert:function(t){Array.isArray(t)?this.list=this.list.concat(t):this.list.push(t),this.save(),this.$emit("on-row-change",this.list)},save:function(){0==this.list.length?delete localStorage["monkeyScript-"+this.editItem]:localStorage["monkeyScript-"+this.editItem]=a()(this.list)},reset:function(){this.cursor=-1},onJSONShow:function(){var t="";this.list.forEach(function(e,i){t+=(t.length>0?",\n":"")+"  "+a()(e)}),this.dataJSON="[\n"+t+"\n]",this.visibleJSON=!0},onJSONOK:function(){try{var t=JSON.parse(this.dataJSON);t.forEach(function(t,e){t.id=e}),this.list=t,this.save(),this.$emit("on-row-change",this.list),this.row={},this.index=-1,this.visibleJSON=!1,this.dataJSON=null}catch(t){alert(t)}}},watch:{editItem:function(t){this.retrieve(t)}}},m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{height:"100%",display:"flex","flex-direction":"column"},attrs:{id:"script"}},[i("div",{staticStyle:{flex:"1",padding:"5px","overflow-y":"auto"},attrs:{id:"list"}},[i("draggable",{staticClass:"list-group",attrs:{list:t.list,disabled:!t.enabled,"ghost-class":"ghost"},on:{start:function(e){t.dragging=!0},end:function(e){t.dragging=!1},update:t.datadragEnd}},t._l(t.list,function(e,n){return i("div",{key:n,staticClass:"list-group-item2"},["string"==typeof e.title?i("div",{staticClass:"list-group-item",class:{active:n===t.cursor},staticStyle:{cursor:"pointer"}},[i("div",{staticStyle:{margin:"0px 5px",width:"26px",height:"26px","border-radius":"13px",border:"1px solid #95b8e7","flex-direction":"column","align-items":"center","justify-content":"center"},on:{click:function(e){return t.onClickSerial(n)}}},[t._v("\n              "+t._s(n+1+" ")+"\n            ")]),t._v(" "),i("div",{staticStyle:{flex:"1",margin:"0 3px"},on:{click:function(e){return t.onEdit(n)}}},[i("div",{staticStyle:{"font-size":"18px","text-align":"left"}},[t._v("\n                "+t._s(e.title)+"\n              ")]),t._v(" "),i("div",{staticStyle:{"text-align":"left","font-size":"12px"}},[t._v("\n                "+t._s("暫停："+e.second+" 秒")+"\n              ")]),t._v(" "),i("div")]),t._v(" "),i("div",{staticStyle:{padding:"3px 5px"},on:{click:function(e){return t.onClickIcon(n)}}},[i("Icon",{attrs:{type:"md-trash",size:"20"}})],1)]):i("div",{staticClass:"list-group-item",staticStyle:{color:"rgb(255,69,0)"}},[i("div",{staticStyle:{width:"30px"}},[t._v("\n              "+t._s(n+1+" ")+"\n            ")]),t._v(" "),i("div",{staticStyle:{flex:"1",margin:"0 3px"}},[i("div",{staticStyle:{"font-size":"16px","text-align":"left"}},[t._v("\n                "+t._s(e.name)+"\n              ")])]),t._v(" "),i("div",{staticStyle:{padding:"3px 5px",cursor:"pointer"},on:{click:function(e){return t.onClickIcon(n)}}},[i("Icon",{attrs:{type:"md-trash",size:"20"}})],1)])])}),0)],1),t._v(" "),i("div",{staticClass:"footer"},[i("div",[i("Button",{attrs:{type:"success"},on:{click:function(e){return t.add()}}},[t._v("新增")]),t._v(" "),i("Button",{attrs:{type:"success"},on:{click:function(e){return t.insertTo()}}},[t._v("插入")]),t._v(" "),t.list.length>0?i("Button",{attrs:{type:"error"},on:{click:t.clearAll}},[t._v("清除")]):t._e(),t._v(" "),t.list.length>0?i("Button",{attrs:{type:"success"},on:{click:t.onJSONShow}},[t._v("原始碼")]):t._e()],1)])]),t._v(" "),i("modal",{attrs:{"class-name":"vertical-center-modal",title:t.title,width:300,closable:!1},model:{value:t.visibleEdit,callback:function(e){t.visibleEdit=e},expression:"visibleEdit"}},[i("table",{staticClass:"layout",staticStyle:{width:"100%"}},[i("tr",[i("td",{staticClass:"label"},[t._v("標題：")]),t._v(" "),i("td",[i("Input",{attrs:{placeholder:"標題"},model:{value:t.row.title,callback:function(e){t.$set(t.row,"title",e)},expression:"row.title"}})],1)]),t._v(" "),i("tr",[i("td",{staticClass:"label"},[t._v("X 軸：")]),t._v(" "),i("td",[i("Input",{attrs:{placeholder:"X 軸"},model:{value:t.row.x,callback:function(e){t.$set(t.row,"x",e)},expression:"row.x"}})],1)]),t._v(" "),i("tr",[i("td",{staticClass:"label"},[t._v("Y 軸：")]),t._v(" "),i("td",[i("Input",{attrs:{placeholder:"Y 軸"},model:{value:t.row.y,callback:function(e){t.$set(t.row,"y",e)},expression:"row.y"}})],1)]),t._v(" "),i("tr",[i("td",{staticClass:"label"},[t._v("暫停：")]),t._v(" "),i("td",[i("Input",{attrs:{placeholder:"暫停(秒)"},model:{value:t.row.second,callback:function(e){t.$set(t.row,"second",e)},expression:"row.second"}})],1)])]),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("i-button",{attrs:{type:"error"},on:{click:function(e){t.visibleEdit=!1}}},[t._v("取消")]),t._v(" "),i("i-button",{attrs:{type:"primary"},on:{click:t.onEditOK}},[t._v("確定")])],1)]),t._v(" "),i("modal",{attrs:{fullscreen:"","class-name":"vertical-center-modal",title:"JSON",closable:!1},model:{value:t.visibleJSON,callback:function(e){t.visibleJSON=e},expression:"visibleJSON"}},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.dataJSON,expression:"dataJSON"}],staticStyle:{"font-size":"20px",width:"calc(100% - 0px)",height:"calc(100% - 5px)"},domProps:{value:t.dataJSON},on:{input:function(e){e.target.composing||(t.dataJSON=e.target.value)}}}),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("i-button",{attrs:{type:"error"},on:{click:function(e){t.visibleJSON=!1,t.dataJSON=null}}},[t._v("取消")]),t._v(" "),i("i-button",{attrs:{type:"primary"},on:{click:t.onJSONOK}},[t._v("確定")])],1)])],1)},staticRenderFns:[]};var y=i("VU/8")(f,m,!1,function(t){i("vE9C")},null,null).exports,g={name:"execScript",components:{},props:["script"],data:function(){return{visible:!1,cycle:5,cycles:[1,2,3,5,10,20,30,50,80,100,150,200,300],interval:10,intervals:[0,10,15,20,30],width:document.body.clientWidth-200,height:document.body.clientHeight-300,stdout:""}},mounted:function(){},methods:{onOK:function(){var t=this;return p()(u.a.mark(function e(){var i,n,s,o,a;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.stdout+=(t.stdout.length>0?"\n\n":"")+"開始："+new Date+"\n",e.prev=1,i=t.script+"#等待 "+t.interval+" 秒\nUserWait("+1e3*t.interval+")",n=u.a.mark(function e(n){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!1!==t.visible){e.next=2;break}return e.abrupt("return",{v:void 0});case 2:return e.next=4,window.execScript(i,{cycle:1,write:0===n,stdout:function(e){if(!1!==t.visible){var i=new Date;t.stdout+=(t.stdout.length>0?"\n":"")+e+(0===e.indexOf("adb shell monkey ......")?"第 "+(n+1)+" 次("+i.toString("hh:MM:ss")+")：":""),setTimeout(function(){t.$refs.textarea.scrollTop=t.$refs.textarea.scrollHeight},600)}}});case 4:case"end":return e.stop()}},e,t)}),s=0;case 5:if(!(s<t.cycle)){e.next=13;break}return e.delegateYield(n(s),"t0",7);case 7:if("object"!==(void 0===(o=e.t0)?"undefined":r()(o))){e.next=10;break}return e.abrupt("return",o.v);case 10:s++,e.next=5;break;case 13:a=new Date,t.stdout+="\n結束："+a.toString("hh:MM:ss"),e.next=21;break;case 17:e.prev=17,e.t1=e.catch(1),console.log(e.t1),alert(e.t1);case 21:case"end":return e.stop()}},e,t,[[1,17]])}))()},onVisibleChange:function(t){!1===t&&this.$emit("on-close")},onResize:function(){this.width=document.body.clientWidth-200,this.height=document.body.clientHeight-300}},watch:{script:function(t){this.visible=t.length>0,this.stdout="",1==this.visible?(this.onResize(),this.broadcast.$on("on-resize",this.onResize)):this.broadcast.$off("on-resize",this.onResize)}}},x={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("modal",{attrs:{"class-name":"vertical-center-modal",title:"monkey script",width:t.width,closable:!1},on:{"on-visible-change":t.onVisibleChange},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[i("textarea",{ref:"textarea",style:{width:"100%",height:t.height+"px",padding:"5px",resize:"none",fontSize:"18px"},attrs:{readonly:!0},domProps:{value:t.stdout}}),t._v(" "),i("div",{staticStyle:{display:"flex","flex-direction":"row"},attrs:{slot:"footer"},slot:"footer"},[i("i-button",{attrs:{type:"error"},on:{click:function(e){t.visible=!1}}},[t._v("取消")]),t._v(" "),t.stdout.length>0?i("i-button",{attrs:{type:"warning"},on:{click:function(e){t.stdout=""}}},[t._v("清除")]):t._e(),t._v(" "),i("div",{staticStyle:{flex:"1"}}),t._v(" "),i("i-select",{staticStyle:{width:"80px","margin-right":"10px"},model:{value:t.cycle,callback:function(e){t.cycle=e},expression:"cycle"}},t._l(t.cycles,function(e){return i("i-option",{key:e,attrs:{value:e}},[t._v(t._s(e+" 次"))])}),1),t._v(" "),i("i-select",{staticStyle:{width:"80px","margin-right":"10px"},model:{value:t.interval,callback:function(e){t.interval=e},expression:"interval"}},t._l(t.intervals,function(e){return i("i-option",{key:e,attrs:{value:e}},[t._v(t._s(e+" 秒"))])}),1),t._v(" "),i("i-button",{attrs:{type:"primary"},on:{click:t.onOK}},[t._v("確定")])],1)])},staticRenderFns:[]},_=i("VU/8")(g,x,!1,null,null,null).exports,w={name:"ModalOpen",props:["editItem","visible"],components:{},data:function(){return{projects:["BiPOS2","mECR","JabezDC","new2ECR","new2DC"],devices:["H10","V2","A920","T1","T2","T2mini"],edit_Item:{name:"",project:"",device:"",descript:""}}},mounted:function(){var t=this;return p()(u.a.mark(function e(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},methods:{onOK:function(){var t="";""==this.edit_Item.name.trim()?t="請輸入名稱":""==this.edit_Item.project.trim()?t="請輸入專案":""==this.edit_Item.device.trim()&&(t="請輸入裝置"),0==t.length?this.$emit("on-close",this.edit_Item):alert(t)},onVisibleChange:function(t){!1===t&&this.$emit("on-close")}},watch:{visible:function(t){},editItem:function(t){0==this.visible?this.edit_Item={name:"",project:"",device:"",descript:""}:this.edit_Item=c()({name:"",project:"",device:"",descript:""},t)}}},b={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("modal",{attrs:{"class-name":"vertical-center-modal",title:null!=t.edit_Item&&void 0===t.edit_Item.key?"新增":"編輯",width:"500",closable:!1},on:{"on-visible-change":t.onVisibleChange},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[1==t.visible?i("table",{staticStyle:{width:"100%"}},[i("tr",[i("td",{attrs:{width:"50px;"}},[t._v("名稱：")]),t._v(" "),i("td",[i("Input",{attrs:{placeholder:"名稱",id:"script_name"},model:{value:t.edit_Item.name,callback:function(e){t.$set(t.edit_Item,"name",e)},expression:"edit_Item.name"}})],1)]),t._v(" "),i("tr",[i("td",[t._v("專案：")]),t._v(" "),i("td",[i("Select",{staticStyle:{width:"200px"},model:{value:t.edit_Item.project,callback:function(e){t.$set(t.edit_Item,"project",e)},expression:"edit_Item.project"}},t._l(t.projects,function(e){return i("Option",{key:e,attrs:{value:e}},[t._v("\n            "+t._s(e)+"\n          ")])}),1)],1)]),t._v(" "),i("tr",[i("td",[t._v("裝置：")]),t._v(" "),i("td",[i("Select",{staticStyle:{width:"200px"},model:{value:t.edit_Item.device,callback:function(e){t.$set(t.edit_Item,"device",e)},expression:"edit_Item.device"}},t._l(t.devices,function(e){return i("Option",{key:e,attrs:{value:e}},[t._v("\n            "+t._s(e)+"\n          ")])}),1)],1)]),t._v(" "),i("tr",[i("td",[t._v("描述：")]),t._v(" "),i("td",[i("textarea",{staticStyle:{resize:"none",width:"100%",height:"100px"},domProps:{value:t.edit_Item.descript}})])])]):t._e(),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("i-button",{attrs:{type:"error"},on:{click:function(e){return t.$emit("on-close")}}},[t._v("取消")]),t._v(" "),i("i-button",{attrs:{type:"primary"},on:{click:t.onOK}},[t._v("確定")])],1)])},staticRenderFns:[]},S=i("VU/8")(w,b,!1,null,null,null).exports,k={name:"ModalInsert",props:["list"],components:{},data:function(){return{script:"",columns:[{title:"名稱",key:"name",width:150,fixed:"left"},{title:"專案",key:"project",width:100},{title:"裝置",key:"device",width:100},{title:"描述",key:"descript"}],height:document.body.clientHeight-200}},mounted:function(){var t=this;return p()(u.a.mark(function e(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:setTimeout(function(){for(var t=document.querySelectorAll(".ivu-modal"),e=0;e<t.length;e++)if("none"!=t[e].style.display){t[e].style.top="20px";var i=document.querySelector("#tab-script");document.querySelector("#scriptValue textarea").style.height=i.clientHeight-8+"px"}},300);case 1:case"end":return t.stop()}},e,t)}))()},methods:{onRowClick:function(t,e){this.$emit("rowClick",t)},scriptChange:function(){this.$emit("scriptChange",this.script)}}},I={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{style:{height:t.height+"px"}},[i("Tabs",{attrs:{type:"card"}},[i("TabPane",{staticClass:"tab-pane",attrs:{label:"JSON",id:"tab-script"}},[i("Input",{attrs:{type:"textarea",placeholder:"JSON",id:"scriptValue",styel:"height: 100%;",rows:20},on:{"on-change":t.scriptChange},model:{value:t.script,callback:function(e){t.script=e},expression:"script"}})],1),t._v(" "),i("TabPane",{staticClass:"tab-pane",attrs:{label:"清單"}},[i("Table",{attrs:{border:"",columns:t.columns,data:t.list},on:{"on-row-click":t.onRowClick}})],1)],1)],1)},staticRenderFns:[]};var O=i("VU/8")(k,I,!1,function(t){i("12Im")},null,null).exports,$=1,C={name:"Monkey",components:{Script:y,ExecScript:_,ModalOpen:S},data:function(){return{src:"",x:-1,y:-1,width:0,height:0,rows:0,execScript:"",cursor:null,script:{},playList:[],cursorRadius:10,visibleModalOpen:!1,editItem:null}},mounted:function(){var t=this;return p()(u.a.mark(function e(){var i,n;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:i=t,t.$refs.img.onload=function(){t.x=-1,t.y=-1,t.onResize(),t.$refs.script.reset(),t.cursor=null},t.$refs.img.onmousedown=function(e){t.$refs.script.add(t.x,t.y)},t.$refs.img.onmousemove=function(e){t.x=Math.ceil(e.offsetX*$),t.y=Math.ceil(e.offsetY*$)},t.$refs.img.onmouseout=function(e){t.x=-1,t.y=-1},E(document.getElementById("body"),function(e,i){t.src=i,t.cursor=null,localStorage["monkeyImg-"+t.editItem.key]=i}),t.broadcast.$on("on-resize",t.onResize),window.addEventListener("keydown",t.onKeydown,!1),document.querySelector("#cursor").addEventListener("mousedown",function(t){t.preventDefault();var e=document.querySelector("#cursor"),n=0,s=0,r=0,o=0;function a(t){t.preventDefault(),n=r-t.clientX,s=o-t.clientY,r=t.clientX,o=t.clientY;var a=e.offsetTop-s,l=e.offsetLeft-n,c=document.querySelector("#img").clientHeight,d=document.querySelector("#img").clientWidth;a>0-i.cursorRadius&&l>0-i.cursorRadius&&a<c-i.cursorRadius&&l<d-i.cursorRadius&&(e.style.top=a+"px",e.style.left=l+"px",i.cursor._y=a,i.cursor._x=l,i.cursor.x=Math.floor((i.cursor._x+i.cursorRadius)*$),i.cursor.y=Math.floor((i.cursor._y+i.cursorRadius)*$))}function l(){0==r&&0==o||(document.querySelector("#cursor").removeEventListener("mousemove",a),document.querySelector("#cursor").removeEventListener("mouseup",l),i.$refs.script.update(i.cursor),r=0,o=0)}r=t.clientX,o=t.clientY,document.querySelector("#cursor").addEventListener("mousemove",a,!1),document.querySelector("#cursor").addEventListener("mouseup",l,!1),document.querySelector("#cursor").addEventListener("mouseout",l,!1)},!1),"string"==typeof(n=localStorage.monkeyPlaylist)&&n.length>0&&(t.playList=JSON.parse(n)),t.playList.length>0&&t.selectItem(t.playList[0].key);case 12:case"end":return e.stop()}},e,t)}))()},destroyed:function(){this.broadcast.$off("on-resize",this.onResize),window.removeEventListener("keydown",this.onKeydown,!1)},methods:{onKeydown:function(t){document.activeElement,navigator.userAgent.indexOf("Macintosh")>-1?t.metaKey:t.ctrlKey,navigator.userAgent.indexOf("Macintosh")>-1?t.ctrlKey:t.altKey,t.shiftKey;var e=t.keyCode;t.keyCode>=48&&t.keyCode<=122&&String.fromCharCode(t.keyCode).toUpperCase();27==e&&(null==document.querySelector("#download_clipboard")&&null==document.querySelector("#scriptValue")||this.$Modal.remove())},onRowChange:function(t){this.rows=t.length},onCursorChange:function(t,e){if(null!=t){for(var i in t)if(("x"==i||"y"==i)&&(void 0===t[i]||"string"==typeof t[i]&&0==t[i].trim().length||void 0!==t[i]&&(t[i]+"").length>0&&isNaN(t[i])))return void(this.cursor=null);this.cursor=c()({},t),this.cursor._x=Math.ceil(t.x/$)-this.cursorRadius,this.cursor._y=Math.ceil(t.y/$)-this.cursorRadius}else this.cursor=null},onResize:function(){if(this.src.length>0){for(var t=document.querySelector("#monkey"),e=document.querySelectorAll("#monkey > *"),i=0,n=0;n<e.length-1;n++)i+=e[n].clientHeight;this.height=t.clientHeight-i;var s=document.querySelector("#frame"),r=document.querySelector("#script"),o=s.clientWidth-r.clientWidth-50;i=this.height,e=document.querySelectorAll("#left > *");for(var a=0;a<e.length;a++)"imgframe"!=e[a].id&&(i-=e[a].clientHeight);do{var l=this.$refs.img.naturalWidth/o,c=this.$refs.img.naturalHeight/l;this.$refs.img.naturalWidth;if(!(c>i-50)){o<this.$refs.img.naturalWidth?this.width=o:this.width=this.$refs.img.naturalWidth,$=this.$refs.img.naturalWidth/this.width,this.onCursorChange(this.cursor);break}o-=10}while(o>0)}},onMenuSelect:function(t){if("download"===t)this.download();else if("add"==t)this.editItem=null,this.src="",this.cursor=null,this.visibleModalOpen=!0;else if("delete"==t){delete localStorage["monkeyScript-"+this.editItem.key],delete localStorage["monkeyImg-"+this.editItem.key];for(var e=0;e<this.playList.length;e++)if(this.editItem.key==this.playList[e].key){this.playList.splice(e,1);break}localStorage.monkeyPlaylist=a()(this.playList),this.editItem=null,this.src="",this.cursor=null,document.title="monkey"}else if(0==t.indexOf("playlist-")){var i=t.replace("playlist-","");this.selectItem(i)}},selectItem:function(t){if(t!=this.playList[0].key)for(var e=0;e<this.playList.length;e++)if(t==this.playList[e].key){var i=this.playList.splice(e,1);this.playList.unshift(i[0]);break}this.playList.length>20&&this.playList.slice(20,this.playList.length);var n=localStorage["monkeyImg-"+this.playList[0].key];this.src="string"==typeof n&&n.length>0?n:"",this.cursor=null,localStorage.monkeyPlaylist=a()(this.playList),this.editItem=this.playList[0],document.title="monkey["+this.editItem.name+"("+this.editItem.project+", "+this.editItem.device+")]"},download:function(){var t=this;this.$Modal.confirm({title:"滙出",width:document.body.clientWidth-100,render:function(e){return e("textarea",{attrs:{id:"download_clipboard",style:"height: "+(document.body.clientHeight-300)+"px; width: 100%; padding: 5px; font-size: 16px; font-weight: 700;",readonly:!0},props:{},on:{blur:function(e){t.value=e.target.value},paste:function(t){}}},t.parseScript())},onOk:function(){if(t.$isElectron){var e=document.getElementById("download_clipboard");if("object"===(void 0===e?"undefined":r()(e)))try{window.execScript(e.value,{cycle:1})}catch(t){alert(t)}}}}),setTimeout(function(){var t=document.getElementById("download_clipboard");if(null!=t&&"object"===(void 0===t?"undefined":r()(t))){t.select();var e=document.createRange();e.selectNode(t),window.getSelection().addRange(e),document.execCommand("copy")}},1e3)},capture:function(){var t=this;return p()(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,vm.loading(),e.next=4,window.screenCapture();case 4:t.src=e.sent,localStorage["monkeyImg-"+t.editItem.key]=t.src,vm.loading(!1),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),vm.loading(!1);case 12:case"end":return e.stop()}},e,t,[[0,9]])}))()},parseScript:function(){var t="";return this.$refs.script.list.forEach(function(i,n){var s="";if("string"==typeof i.script){var r=localStorage["monkeyScript-"+i.script];if("string"==typeof r&&r.length>0)JSON.parse(r).forEach(function(t,i){var n=e(t);n.length>0&&(s+=(s.length>0?"\n":"")+n)})}else s=e(i);s.length>0&&(t+=(t.length>0?"\n":"")+s)}),t.length>0&&(t="type= raw events\ncount= 10\nspeed= 1.0\nstart data >>\n\n"+t),t;function e(t){var e="";return!isNaN(t.x)&&r()(!isNaN(t.y))&&(e+="DispatchPointer(0,0,0,"+t.x+","+t.y+",0,0,0,0,0,0,0)\nDispatchPointer(0,0,1,"+t.x+","+t.y+",0,0,0,0,0,0,0)"),isNaN(t.second)||(e+=(e.length>0?"\n":"")+"UserWait("+1e3*parseFloat(t.second)+")"),"string"==typeof t.title&&e.length>0&&(e="### "+t.title+" ###\n"+e),e}},runScript:function(){var t=this;return p()(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.execScript=t.parseScript();case 1:case"end":return e.stop()}},e,t)}))()},closeScript:function(){this.execScript=""},closeOpen:function(t){"object"==(void 0===t?"undefined":r()(t))&&(void 0===t.key&&(t.key=(new Date).toString("yyyy-mm-ddThh:MM:ss.ms")),this.playList.unshift(t),this.selectItem(t.key)),this.visibleModalOpen=!1},onOpenMondalInsert:function(){var t=this,e=[],i=this;this.playList.forEach(function(i,n){n>0&&i.project==t.editItem.project&&i.device==t.editItem.device&&e.push(i)});var n="";this.$Modal.confirm({title:"插入腳本",width:document.body.clientWidth-100,render:function(s){return s(O,{props:{list:e},on:{scriptChange:function(t){n=t},rowClick:function(e){i.$refs.script.insert({script:e.key,name:e.name}),t.$Modal.remove()}}})},onOk:function(){if(n.length>0)try{var t=JSON.parse(n);i.$refs.script.insert(t)}catch(t){alert(t)}}})}}};function E(t,e){function i(t){t.stopPropagation(),t.preventDefault()}t.addEventListener("dragover",function(t){i(t)},!1),t.addEventListener("dragleave",function(t){i(t)},!1),t.addEventListener("drop",function(t){i(t);var n=t.dataTransfer.files;for(var s in n)if("object"===r()(n[s])&&"image/jpeg, image/bmp, image/gif, image/png".indexOf(n[s].type)>-1)!function(){var t=new FileReader;t.onload=function(i){"function"==typeof e&&e("drop",t.result)},t.readAsDataURL(n[s])}();else if("object"===r()(n[s]))return void alert("檔案格式錯誤")},!1)}var N={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"monkey"}},[i("div",{staticStyle:{background:"#2d8cf0"},attrs:{id:"menu"}},[i("Dropdown",{staticClass:"dropdown",staticStyle:{"margin-right":"10px"},on:{"on-click":t.onMenuSelect}},[i("div",{staticStyle:{cursor:"pointer"}},[t._v("\n        腳本\n        "),i("Icon",{attrs:{type:"ios-arrow-down"}})],1),t._v(" "),i("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[i("DropdownItem",{attrs:{name:"add"}},[t._v("新增腳本")]),t._v(" "),null!=t.editItem?i("DropdownItem",{attrs:{name:"delete"}},[t._v("\n            刪除腳本\n          ")]):t._e(),t._v(" "),t.playList.length>1?i("Dropdown",{attrs:{placement:"right-start"}},[i("DropdownItem",{attrs:{disabled:0==t.playList.length,divided:""}},[t._v("開啟最近的腳本\n              "),i("icon",{staticStyle:{"margin-left":"2px"},attrs:{type:"ios-arrow-forward"}})],1),t._v(" "),t.playList.length>1?i("DropdownMenu",{attrs:{slot:"list"},slot:"list"},t._l(t.playList,function(e,n){return i("div",{key:n},[null!=t.editItem&&t.editItem.key!=e.key?i("DropdownItem",{attrs:{name:"playlist-"+e.key}},[t._v("\n                  "+t._s(n+". "+e.name+" ("+e.project+")")+"\n                ")]):t._e()],1)}),0):t._e()],1):t._e()],1)],1)],1),t._v(" "),i("div",{attrs:{id:"frame"}},[i("div",{staticStyle:{background:"rgb(32,32,32)"},style:{height:0==t.src.length?"100%":t.height+"px"},attrs:{id:"left"}},[i("div",{staticStyle:{flex:"1",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"},attrs:{id:"imgframe"}},[i("div",{staticStyle:{position:"relative"}},[i("img",{ref:"img",attrs:{id:"img",src:t.src,width:t.width+"px"}}),t._v(" "),i("div",{staticStyle:{border:"3px solid #c01921"},style:{top:(null==t.cursor?0:t.cursor._y)+"px",left:(null==t.cursor?0:t.cursor._x)+"px",display:null==t.cursor?"none":"inline-block",width:2*t.cursorRadius+"px",height:2*t.cursorRadius+"px",borderRadius:t.cursorRadius+"px"},attrs:{id:"cursor"}})])]),t._v(" "),t.src.length>0||null!=t.editItem&&t.$isElectron?i("div",{staticClass:"footer",attrs:{id:"left_footer"}},[i("div",[t.$isElectron?i("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"success"},on:{click:t.capture}},[t._v("截圖\n            ")]):t._e(),t._v(" "),t.$isElectron&&t.src.length>0&&t.rows>0?i("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"success"},on:{click:t.runScript}},[t._v("腳本")]):t._e(),t._v(" "),t.src.length>0&&t.rows>0?i("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"success"},on:{click:t.download}},[t._v("滙出")]):t._e()],1),t._v(" "),i("div",{staticStyle:{flex:"1"}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.x>-1&&t.y>-1,expression:"x > -1 && y > -1"}],staticStyle:{"margin-left":"10px",width:"40px",color:"white"}},[i("div",{staticStyle:{display:"flex","flex-direction":"row","align-items":"center"}},[i("div",{staticStyle:{"font-size":"12px !important"}},[t._v("X:")]),t._v(" "),i("div",{staticStyle:{flex:"1","text-align":"right","font-size":"12px !important"}},[t._v(t._s(t.x))])]),t._v(" "),i("div",{staticStyle:{display:"flex","flex-direction":"row","align-items":"center"}},[i("div",{staticStyle:{"font-size":"12px !important"}},[t._v("Y:")]),t._v(" "),i("div",{staticStyle:{flex:"1","text-align":"right","font-size":"12px !important"}},[t._v(t._s(t.y))])])])]):t._e()]),t._v(" "),null!=t.editItem?i("Script",{ref:"script",style:{height:0==t.src.length?"100%":t.height+"px",width:"300px"},attrs:{id:"right",editItem:t.editItem.key},on:{"on-row-change":t.onRowChange,"on-cursor-change":t.onCursorChange,"on-open-mondal":t.onOpenMondalInsert}}):t._e()],1),t._v(" "),i("ExecScript",{attrs:{script:t.execScript},on:{"on-close":t.closeScript}}),t._v(" "),i("ModalOpen",{attrs:{visible:t.visibleModalOpen,editItem:t.editItem},on:{"on-close":t.closeOpen}})],1)},staticRenderFns:[]};var L=i("VU/8")(C,N,!1,function(t){i("QCZJ")},null,null).exports,M=i("BTaQ"),R=i.n(M),J=(i("+skl"),i("4lpq"));n.default.use(R.a,{locale:J.a}),n.default.config.productionTip=!1,n.default.prototype.broadcast=new n.default,n.default.prototype.$isElectron=navigator.userAgent.indexOf("Electron")>-1,window.vm=new n.default({el:"#monkey",components:{Monkey:L},template:'<div style="height: 100%;"><Monkey /><div v-if="spin" class="demo-spin-container"><Spin fix></Spin></div></div>',data:function(){return{spin:!1}},mounted:function(){var t=this;window.onresize=function(){t.broadcast.$emit("on-resize")}},methods:{loading:function(t){var e=this;"boolean"==typeof t&&0==t?this.spinID=setTimeout(function(){e.$Spin.hide()},1e3):null==document.querySelector(".ivu-spin-main")&&(clearTimeout(this.spinID),this.$Spin.hide(),this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"spin-icon-load",props:{type:"ios-loading",size:30}}),e("div","string"==typeof t?t:"Loading")])}}))}}})},QCZJ:function(t,e){},vE9C:function(t,e){}},["IbOO"]);
//# sourceMappingURL=monkey.ac1fa73f655dfa84b5c0.js.map