webpackJsonp([1],{"+skl":function(t,e){},"2x0r":function(t,e){},"3GU3":function(t,e){},"4/hK":function(t,e){},"4/jD":function(t,e){},"9YiH":function(t,e){},GUiZ:function(t,e){},"P8+U":function(t,e){},UM8r:function(t,e){},YLLs:function(t,e){},Yokd:function(t,e){},twTI:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),o=n("pFYg"),r=n.n(o),a=n("mvHQ"),s=n.n(a),c=n("Xxa5"),l=n.n(c),d=n("exGp"),u=n.n(d),p={name:"ModalDatabaseOption",props:["visible","config"],data:function(){return{mode:"複製",tables:["系統資料表","基本資料表"],database:[],sql_var:[],target:"",source:""}},mounted:function(){var t=this;return u()(l.a.mark(function e(){var n,i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("string"==typeof(n=localStorage["adb-database-option"])&&n.length>0)for(i in n=JSON.parse(n))t[i]=n[i];case 2:case"end":return e.stop()}},e,t)}))()},methods:{onOK:function(){var t=this,e={mode:this.mode,tables:this.tables,sql_var:this.sql_var,target:this.target,source:this.source};"複製"==this.mode&&0==this.source.length?alert("請選擇 Source"):0==this.target.length?alert("請選擇 Target"):0==this.sql_var[0].value.length?alert("請輸入 SITE"):(localStorage["adb-database-option"]=s()(e),e.source_config=this.database.filter(function(e){return e.title==t.source})[0],e.target_config=this.database.filter(function(e){return e.title==t.target})[0],this.$emit("on-close",e))},onVisibleChange:function(t){if(!1===t)this.$emit("on-close");else{var e=localStorage["adb-config"];if("string"==typeof e&&e.length>0){var n=JSON.parse(e).database.filter(function(t){return"object"==r()(t.children)});if(n.length>0){var i=["host","user","password","database","sys_database"],o=n[0].children.filter(function(t){if("database"==t.role){for(var e=0;e<i.length;e++)if(void 0===t[i[e]]||0==t[i[e]].length)return!1;return!0}return!1});o.forEach(function(t){t.security=t.host.trim().toLowerCase().indexOf("myjabezpos")>-1&&(0==t.database.trim().toLowerCase().indexOf("jp_")||0==t.sys_database.trim().toLowerCase().indexOf("jp_"))}),this.database=o,0==o.length&&alert("請先設定資料庫")}}}}},watch:{visible:function(t){},source:function(t){t.length>0&&this.target==t&&(this.target="")},config:function(t){var e=this;if("object"==(void 0===t?"undefined":r()(t))){var n=localStorage["adb-database-option"];n="string"==typeof n&&n.length>0?JSON.parse(n).sql_var:[],this.sql_var=[{title:"SITE",value:""}],Array.isArray(t.sql_var)&&(t.sql_var.forEach(function(t){e.sql_var.push({title:t,value:""})}),this.sql_var.forEach(function(t){var e=n.find(function(e){return e.title==t.title});void 0!==e&&e.value.trim().length>0&&(t.value=e.value.trim())}))}}}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{attrs:{id:"modalDatatbaseOption",title:"資料庫複製","class-name":"vertical-center-modal",closable:!1},on:{"on-visible-change":t.onVisibleChange},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",[n("div",{staticStyle:{margin:"10px 0px"}},[n("RadioGroup",{attrs:{type:"button"},model:{value:t.mode,callback:function(e){t.mode=e},expression:"mode"}},[n("Radio",{attrs:{label:"複製"}}),t._v(" "),n("Radio",{attrs:{label:"刪除"}})],1)],1),t._v(" "),"複製"==t.mode?n("div",{staticStyle:{margin:"10px 0px"}},[n("CheckboxGroup",{model:{value:t.tables,callback:function(e){t.tables=e},expression:"tables"}},[n("Checkbox",{attrs:{label:"系統資料表",border:"",disabled:""}}),t._v(" "),n("Checkbox",{attrs:{label:"基本資料表",border:"",disabled:""}}),t._v(" "),n("Checkbox",{attrs:{label:"交易資料表",border:""}}),t._v(" "),n("Checkbox",{attrs:{label:"自訂資料表",border:""}})],1)],1):t._e(),t._v(" "),n("div",{staticStyle:{margin:"10px 0px",display:"flex","flex-direction":"row","justify-content":"start","align-items":"center"}},["複製"==t.mode?n("div",[t._v("Source：")]):t._e(),t._v(" "),"複製"==t.mode?n("Select",{model:{value:t.source,callback:function(e){t.source=e},expression:"source"}},t._l(t.database,function(e){return n("Option",{key:e.title,attrs:{value:e.title}},[t._v("\n          "+t._s(e.title)+"\n        ")])}),1):t._e(),t._v(" "),n("div",{staticStyle:{"margin-left":"5px"}},[t._v("Target：")]),t._v(" "),n("Select",{model:{value:t.target,callback:function(e){t.target=e},expression:"target"}},t._l(t.database,function(e){return 0==e.security&&e.title!=t.source?n("Option",{key:e.title,attrs:{value:e.title}},[t._v("\n          "+t._s(e.title)+"\n        ")]):t._e()}),1)],1),t._v(" "),t._l(t.sql_var,function(e,i){return n("div",{key:e.title},["複製"==t.mode||"刪除"==t.mode&&0==i?n("div",{staticClass:"row"},[t._v("\n        "+t._s(e.title+"：")+"\n        "),n("Input",{attrs:{size:"large",clearable:""},model:{value:e.value,callback:function(n){t.$set(e,"value",n)},expression:"item.value"}})],1):t._e()])})],2),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("i-button",{attrs:{type:"error"},on:{click:function(e){return t.$emit("on-close")}}},[t._v("取消")]),t._v(" "),n("i-button",{attrs:{type:"primary"},on:{click:t.onOK}},[t._v("確定")])],1)])},staticRenderFns:[]};var h=n("VU/8")(p,f,!1,function(t){n("YLLs")},null,null).exports,b={name:"ModalDatabasePicker",props:["database","cols"],components:{},data:function(){return{}},mounted:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},methods:{onChange:function(t){this.$emit("onChange",this.database)}}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("table",{staticStyle:{width:"100%"}},t._l(t.cols,function(e){return n("tr",{key:e.key},[n("td",{staticStyle:{"text-align":"right",width:"100px"}},[t._v(t._s(e.title+"："))]),t._v(" "),n("td",[n("Input",{attrs:{id:"host",size:"large",clearable:""},on:{"on-change":t.onChange},model:{value:t.database[e.key],callback:function(n){t.$set(t.database,e.key,n)},expression:"database[item.key]"}})],1)])}),0)])},staticRenderFns:[]};var g=n("VU/8")(b,m,!1,function(t){n("zql2")},null,null).exports,v=n("woOf"),y=n.n(v),k=n("bOdI"),_=n.n(k),S=n("E5Az"),x=(n("GUiZ"),n("4/hK"),n("UM8r"),n("5IAE"),n("ryyk"),n("4IWT"),n("Yokd"),n("THjC"),n("Kk9m"),n("U3HU"),n("fo6W"),n("soCA"),{name:"TableConfig",props:["columns","datas","height","name","active"],data:function(){return{dirty:!1,columns2:[],editIndex:-1,rows:this.datas,editRow:null}},mounted:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.broadcast.$on("config-add",t.onAdd),t.columns2.push({title:" ",width:40,slot:"index"}),t.columns2=t.columns2.concat(t.columns),t.columns2.push({title:"操作",width:100,slot:"action"}),window.addEventListener("keydown",t.onKeydown,!1);case 5:case"end":return e.stop()}},e,t)}))()},destroyed:function(){this.broadcast.$off("config-add",this.onAdd),window.removeEventListener("keydown",this.onKeydown,!1)},methods:{onKeydown:function(t){if(0!=this.active){document.activeElement;var e=navigator.userAgent.indexOf("Macintosh")>-1?t.metaKey:t.ctrlKey,n=(navigator.userAgent.indexOf("Macintosh")>-1?t.ctrlKey:t.altKey,t.shiftKey,t.keyCode),i=t.keyCode>=48&&t.keyCode<=122?String.fromCharCode(t.keyCode).toUpperCase():"";if(27==n&&this.editIndex>-1)this.editIndex=-1,this.dirty=!1;else if(1==e&&"S"==i&&this.editIndex>-1)this.onEdit(this.editRow,this.editIndex);else{if(1!=this.$isElectron||1!=e||"N"!=i||-1!=this.editIndex)return;this.onAdd(this.name)}t.preventDefault(),t.stopImmediatePropagation(),t.stopPropagation()}},onAdd:function(t){var e=this;this.name==t&&-1==this.editIndex&&(this.rows.push({}),setTimeout(function(){e.editRow={},e.editIndex=e.rows.length-1,setTimeout(function(){var t=document.querySelectorAll("#"+e.name+"-tbl input[type='text']");t.length>0&&t[0].focus()},600)},300))},onRowClick:function(t){},onRowDoubleClick:function(t,e){1!=this.dirty&&(this.editIndex=e,this.editRow=y()({},t),this.dirty=!1)},onEdit:function(t,e){for(var n in console.log("dirty: "+this.dirty),this.editRow)0==n.indexOf("_")?delete this.editRow[n]:"boolean"==typeof this.editRow[n]&&0==this.editRow[n]&&delete this.editRow[n];this.$set(this.rows,e,this.editRow),1==this.dirty&&this.$emit("on-update",this.rows),this.editIndex=-1,this.editRow=null,this.dirty=!1},onRemove:function(t,e){this.dirty=!1,this.rows.splice(e,1),this.$emit("on-update",this.rows)},onChange:function(){this.dirty=!0}},watch:{active:function(t){}}}),w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Table",{staticStyle:{margin:"0px 2px 2px 2px"},attrs:{border:"",columns:t.columns2,data:t.rows,id:t.name+"-tbl",height:t.height-10},on:{"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDoubleClick},scopedSlots:t._u([{key:"index",fn:function(e){var i=e.index;return[n("div",{staticStyle:{"text-align":"center"}},[t._v(t._s(i+1))])]}},t._l(t.columns,function(e,i){return{key:e.key,fn:function(o){var r=o.row,a=o.index;return[t.editIndex==a?n("div",{key:i,staticStyle:{"text-align":"center"}},["string"==typeof e.type&&"checkbox"==e.type?n("Checkbox",{on:{"on-change":t.onChange},model:{value:t.editRow[e.key],callback:function(n){t.$set(t.editRow,e.key,n)},expression:"editRow[item.key]"}}):n("Input",{attrs:{size:"large",clearable:""},on:{"on-change":t.onChange},model:{value:t.editRow[e.key],callback:function(n){t.$set(t.editRow,e.key,n)},expression:"editRow[item.key]"}})],1):n("div",{key:i+1e3},[t._v("\n      "+t._s(r[e.key])+"\n    ")])]}}}),{key:"action",fn:function(e){var i=e.row,o=e.index;return[-1==t.editIndex?n("div",{staticStyle:{"text-align":"center"}},[n("Button",{staticStyle:{"margin-right":"2px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.onRowDoubleClick(i,o)}}},[t._v("編輯")]),t._v(" "),n("Button",{attrs:{type:"error",size:"small"},on:{click:function(e){return t.onRemove(i,o)}}},[t._v("刪除")])],1):t.editIndex==o?n("div",{staticStyle:{"text-align":"center"}},[n("Button",{staticStyle:{"margin-right":"2px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.onEdit(i,o)}}},[t._v("存檔")]),t._v(" "),n("Button",{attrs:{type:"error",size:"small"},on:{click:function(e){t.editIndex=-1,t.dirty=!1}}},[t._v("取消")])],1):t._e()]}}],null,!0)})},staticRenderFns:[]};var T=n("VU/8")(x,w,!1,function(t){n("3GU3")},null,null).exports;n("aOjs");var C={name:"ModalConfig",props:["visible","config"],components:{codemirror:S.codemirror,TableConfig:T},data:function(){var t;return{dirty:!1,cmOptions:(t={lineNumbers:!0,mode:"application/json",theme:"monokai",lint:!0,styleActiveLine:!0,matchBrackets:!0},_()(t,"theme","monokai"),_()(t,"autoCloseTags",!0),_()(t,"autofocus",!0),_()(t,"lineWrapping",!0),_()(t,"indentUnit",2),_()(t,"indentWithTabs",!0),_()(t,"smartIndent",!0),_()(t,"tabSize",2),_()(t,"lineWiseCopyCut",!1),_()(t,"foldGutter",!0),_()(t,"lint",!0),_()(t,"gutters",["CodeMirror-linenumbers","CodeMirror-foldgutter","CodeMirror-lint-markers"]),t),height:0,mode:"原始碼",panel1:{sql_var:{cols:[{title:"參數",key:"value",slot:"value"}],datas:[]},projects:{cols:[{title:"project",key:"project",slot:"project",width:100},{title:"package",key:"package",slot:"package",width:180},{title:"folder",key:"folder",slot:"folder"},{title:"apk",key:"apk",slot:"apk"}],datas:[]},database:{cols:[{title:"title",key:"title",slot:"title",width:100},{title:"host",key:"host",slot:"host",width:180},{title:"port",key:"port",slot:"port",type:"number"},{title:"user",key:"user",slot:"user"},{title:"password",key:"password",slot:"password"},{title:"database",key:"database",slot:"database"},{title:"sys_database",key:"sys_database",slot:"sys_database"}],datas:[]}},panel2:{cols:[{title:"群組",key:"group",slot:"group",width:100},{title:"title",key:"title",slot:"title",width:150},{title:"指令",key:"cmd",slot:"cmd"}],datas:[]},dataDatabase:[],colTables:[{title:"失能",key:"disable",width:60,slot:"disable",type:"checkbox"},{title:"表格名稱",key:"tbl",width:200,slot:"tbl"},{title:"欄位",key:"cols",slot:"cols"},{title:"where",key:"where",slot:"where"}],configTables:{SYS:[],BASE:[],TRANSACTION:[],OPTIONS:[]},tabCurr:"SYS"}},mounted:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},methods:{onTabClick:function(t){this.tabCurr=t,console.log(t)},onTabsAdd:function(){this.broadcast.$emit("config-add",this.tabCurr)},onCmReady:function(t){t.focus(),this.editor=t},onCmFocus:function(t){},onCmCodeChange:function(t){this.dirty=!0},onOK:function(){try{var t=JSON.parse(this.editor.getValue());this.$emit("on-close",t)}catch(t){}},onVisibleChange:function(t){this.dirty=!1,!1===t&&this.$emit("on-close")},onResize:function(){var t=document.querySelector("#configTabs").clientHeight,e=document.querySelector("#configTabs .ivu-tabs-bar").clientHeight;this.height=t-e,document.querySelector("#configTabs .ivu-tabs-content").style.height=this.height+"px";var n=document.querySelector("#tabPaneCode").clientHeight;this.height=n,document.querySelector(".CodeMirror").style.height=n+"px"},readConfig:function(t){var e=function t(e){var n={};for(var i in e)if(!("nodeKey,expand,selected".indexOf(i)>-1))if("tables"==i||"projects"==i||"sql_var"==i||"string"==typeof e[i]||"number"==typeof e[i]||"boolean"==typeof e[i])n[i]=e[i];else if(Array.isArray(e[i])){for(var o=[],a=0;a<e[i].length;a++){var s=t(e[i][a]);o.push(s)}n[i]=o}else"object"==r()(e[i])&&(n[i]=t(e[i]));return n}(t);this.editor.setValue(s()(e,null,"\t"))},onUpdate:function(t){var e=this;this.dirty=!0;var n=JSON.parse(this.editor.getValue());if("SYS,BASE,TRANSACTION,OPTIONS".indexOf(this.tabCurr)>-1){var i=[];t.forEach(function(t){var n="";e.colTables.forEach(function(e,i){"disable"==e.key&&1==t[e.key]?n+=i:"string"==typeof t[e.key]&&t[e.key].length>0&&(n+=i)}),"1"==n?i.push(t.tbl):n.indexOf("1")>-1&&n.length>1&&i.push(t)}),console.log(i),n.tables[this.tabCurr]=i}else if("commands"==this.tabCurr){if("object"==r()(n.commands)){console.log(this.panel2.datas);var o=[];this.panel2.datas.forEach(function(t){var e=o.findIndex(function(e){return t.group==e.title});-1==e&&(o.push({title:t.group,icon:t.icon,children:[]}),e=o.length-1),o[e].children.push({title:t.title,cmd:t.cmd})});var a=n.commands.filter(function(t){return"clear"==t.role});1==a.length&&o.push(a[0]),n.commands=o}}else{var s=this.panel1[this.tabCurr].cols,c=[];t.forEach(function(t){if(1==s.length)"string"==typeof t.value&&t.value.length>0&&c.push(t.value);else{var e=!0,n=!1;s.forEach(function(i){1==i.isRequire&&(void 0===t[i.key]?e=!1:"string"==typeof t[i.key]&&0==t[i.key].length&&(e=!1)),0==n&&("string"==typeof t[i.key]&&t[i.key].length>0?n=!0:"number"==typeof t[i.key]&&(n=!0))}),1==e&&1==n&&c.push(t)}}),"database"==this.tabCurr?n[this.tabCurr][0].children=c:n[this.tabCurr]=c}this.readConfig(n)}},watch:{visible:function(t){var e=this;1==t?setTimeout(function(){e.onResize()},600):this.height=0},config:function(t){var e=this;if(void 0===t)this.editor.setValue("");else{for(var n in this.configTables)this.configTables[n]=[];if("object"==r()(t.tables)){var i=function(n){var i=t.tables[n],o=e.configTables[n];i.forEach(function(t){"string"==typeof t?o.push({tbl:t}):o.push(y()({},t))}),o.sort(function(t,e){return t.tbl>e.tbl?1:t.tbl<e.tbl?-1:0})};for(var o in t.tables)i(o)}var a=function(n){var i=e.panel1[n];i.datas=[],("database"==n?t[n][0].children:t[n]).forEach(function(t){var e={};1==i.cols.length?i.datas.push({value:t}):(i.cols.forEach(function(n){void 0!==t[n.key]&&(e[n.key]=t[n.key])}),i.datas.push(e))})};for(var s in this.panel1)a(s);this.panel2.datas=[],Array.isArray(t.commands)&&t.commands.forEach(function(t,n){Array.isArray(t.children)&&t.children.forEach(function(n,i){e.panel2.datas.push({group:t.title,icon:t.icon,title:n.title,cmd:n.cmd})})}),this.readConfig(t)}}}},E={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{attrs:{id:"modalConfig",title:"配置","class-name":"vertical-center-modal",closable:!1,fullscreen:""},on:{"on-visible-change":t.onVisibleChange},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("Tabs",{staticStyle:{"margin-top":"5px"},attrs:{type:"card",id:"configTabs"},on:{"on-click":t.onTabClick}},[t._l(t.configTables,function(e,i){return n("TabPane",{key:i,attrs:{closable:!1,label:i,name:i}},[1==t.visible?n("TableConfig",{attrs:{columns:t.colTables,datas:e,name:i,height:t.height,active:t.tabCurr==i},on:{"on-update":t.onUpdate}}):t._e()],1)}),t._v(" "),t._l(t.panel1,function(e,i){return n("TabPane",{key:i,attrs:{closable:!1,label:i,name:i}},[1==t.visible?n("TableConfig",{attrs:{columns:e.cols,datas:e.datas,name:i,height:t.height,active:t.tabCurr==i},on:{"on-update":t.onUpdate}}):t._e()],1)}),t._v(" "),n("TabPane",{attrs:{closable:!1,label:"commands",name:"commands"}},[1==t.visible?n("TableConfig",{attrs:{columns:t.panel2.cols,datas:t.panel2.datas,height:t.height,active:"commands"==t.tabCurr},on:{"on-update":t.onUpdate}}):t._e()],1),t._v(" "),n("TabPane",{attrs:{closable:!1,label:"原始碼",name:"原始碼",id:"tabPaneCode"}},[n("codemirror",{ref:"editor",attrs:{options:t.cmOptions},on:{ready:t.onCmReady,focus:t.onCmFocus,input:t.onCmCodeChange}})],1),t._v(" "),"原始碼"!=t.tabCurr?n("Button",{staticStyle:{"margin-right":"5px"},attrs:{slot:"extra",size:"small"},on:{click:t.onTabsAdd},slot:"extra"},[t._v("\n      新增\n    ")]):t._e()],2),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("i-button",{attrs:{type:"error"},on:{click:function(e){return t.$emit("on-close")}}},[t._v("取消")]),t._v(" "),t.dirty?n("i-button",{attrs:{type:"primary"},on:{click:t.onOK}},[t._v("確定")]):t._e()],1)],1)},staticRenderFns:[]};var O=n("VU/8")(C,E,!1,function(t){n("4/jD")},null,null).exports,R=n("//Fk"),P=n.n(R),A='<i class="demo-spin-icon-load ivu-icon ivu-icon-ios-loading"></i>',I="<span class='term-cursor' />",M="shell",j={name:"Terminal",components:{},props:["title","height"],data:function(){return{history:"",processing:!1,id:"term"+(new Date).getTime()}},mounted:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.addHistory("cwd","cursor"),t.broadcast.$on("term-execute",function(e,n){e==t.title&&("shell"!=M&&(t.history="",document.getElementById(t.id).innerHTML=""),setTimeout(function(){"shell"!=M&&t.addHistory("cwd","cursor"),t.execute(e,n)},"shell"!=M?600:0))}),t.broadcast.$on("term-database",function(e,n){e==t.title&&(t.history="",document.getElementById(t.id).innerHTML="",setTimeout(function(){t.database(e,n)},600))});case 3:case"end":return e.stop()}},e,t)}))()},destroyed:function(){void 0!==this.pid&&window.process.kill(this.pid),this.broadcast.$off("term-execute"),this.broadcast.$off("term-database")},methods:{cwd:function(){var t,e=this;return new P.a((t=u()(l.a.mark(function t(n,i){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:0==e.$isElectron?n("~"):"win32"==window.process.platform||window.child_process.exec("lsof -p "+window.process.pid+" | grep cwd | tr -s ' ' | cut -d ' ' -f9-",function(t,e){n(e.trim())});case 1:case"end":return t.stop()}},t,e)})),function(e,n){return t.apply(this,arguments)}))},execute:function(t,e){var n=this;return u()(l.a.mark(function t(){var i,o;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(M="shell",console.log(e),"clear"!=e){t.next=7;break}return n.history="",n.addHistory("cwd","cursor"),n.broadcast.$emit("term-finish"),t.abrupt("return");case 7:n.processing=!0,i=e.split("&&"),"",o=0;case 10:if(!(o<i.length)){t.next=22;break}return t.prev=11,t.next=14,n.exeCmd(i[o]);case 14:t.next=19;break;case 16:return t.prev=16,t.t0=t.catch(11),t.abrupt("break",22);case 19:o++,t.next=10;break;case 22:n.processing=!1,n.broadcast.$emit("term-finish");case 24:case"end":return t.stop()}},t,n,[[11,16]])}))()},database:function(t,e){var n=this;return u()(l.a.mark(function t(){var i,o,a,c,d,p,f,h,b,m,g,v,y,k,_,S,x,w,T,C;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(C=function(){i.addPrompt("結束："+(new Date).toString()),i.processing=!1,i.broadcast.$emit("term-finish")},T=function(t,e){var n,o=this;return new P.a((n=u()(l.a.mark(function n(r,a){return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:1==i.$isElectron?t.query(e,function(t,n,i){t?a(t+"<br/><br/>"+e):setTimeout(function(){r({rows:n,fields:i})},600)}):setTimeout(function(){r("error test")},1e3);case 1:case"end":return n.stop()}},n,o)})),function(t,e){return n.apply(this,arguments)}))},w=function(t){var e,n=this;return new P.a((e=u()(l.a.mark(function e(o,r){var a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:1==i.$isElectron?(a=window.mysql.createConnection(t)).connect(function(t){t?r(t):o(a)}):setTimeout(function(){o("error test")},1e3);case 1:case"end":return e.stop()}},e,n)})),function(t,n){return e.apply(this,arguments)}))},M="database",i=n,n.processing=!0,e.site=e.sql_var[0].value,e.sql_var.splice(0,1),console.log(e),n.addPrompt("開始："+(new Date).toString()),o=void 0,a=void 0,"複製"!=e.mode){t.next=26;break}return t.prev=12,n.addPrompt({id:"source_connect",msg:e.source+"連線中"}),t.next=16,w(e.source_config);case 16:a=t.sent,n.addPrompt({id:"source_connect",msg:e.source+"已連線"}),t.next=26;break;case 20:return t.prev=20,t.t0=t.catch(12),n.addPrompt({id:"source_connect",msg:e.source+"連線失敗!!"}),n.addPrompt({error:t.t0.toString()}),C(),t.abrupt("return");case 26:return t.prev=26,n.addPrompt({id:"target_connect",msg:e.target+"連線中"}),t.next=30,w(e.target_config);case 30:o=t.sent,n.addPrompt({id:"target_connect",msg:e.target+"已連線"}),console.log(o),t.next=41;break;case 35:return t.prev=35,t.t1=t.catch(26),n.addPrompt({id:"target_connect",msg:e.target+"連線失敗!!"}),n.addPrompt({error:t.t1.toString()}),C(),t.abrupt("return");case 41:for(c in e.tables)for(d=e.tables[c],p=d.length-1;p>=0;p--)"object"==(void 0===(f=d[p])?"undefined":r()(f))&&"boolean"==typeof f.disable&&1==f.disable&&d.splice(p,1);if("複製"!=e.mode){t.next=69;break}({}),i.addPrompt(e.source+"資料表複製："+e.site),t.t2=l.a.keys(e.tables);case 46:if((t.t3=t.t2()).done){t.next=65;break}h=t.t3.value,b=e.tables[h],m=l.a.mark(function t(i){var c,d,u,p,f,m,g,v,y,k,_,S;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(c=b[i],d="",u="*","object"!=(void 0===c?"undefined":r()(c))){t.next=11;break}if("string"==typeof c.cols&&c.cols.length>0&&(u=c.cols),"string"!=typeof c.tbl){t.next=8;break}"string"==typeof c.where&&c.where.trim().length>0&&(0==(p=c.where.toUpperCase()).indexOf("AND ")||0==p.indexOf("OR ")||0==p.indexOf("ORDER BY")||0==p.indexOf("LIMIT ")||(d=" and "+c.where),e.sql_var.forEach(function(t){d=d.replace("{"+t.title+"}",t.value)})),c=c.tbl,t.next=11;break;case 8:return console.log("表格參數不正確",c),n.addPrompt({error:"表格參數不正確<br/>"+s()(c)}),t.abrupt("return","break");case 11:return t.prev=11,n.addPrompt({id:"source_"+c,msg:"讀取 "+c+" ......"}),f="Select "+u+" from "+("SYS"==h?e.source_config.sys_database+".":"")+c+" Where "+("USERGROUPS"==c?"USERID Like Concat('%@','"+e.site+"')":"SITE = '"+e.site+"'")+d,t.next=16,T(a,f);case 16:m=t.sent,n.addPrompt({id:"source_"+c,msg:"讀取 "+c+"；"+m.rows.length+" 列"}),g=0;case 19:if(!(g<m.rows.length)){t.next=32;break}for(_ in n.addPrompt({id:"target_"+c,msg:"寫入 "+c+": "+(g+1)+" / "+m.rows.length}),v="",v="Insert Into "+("SYS"==h?e.target_config.sys_database+".":"")+c+" Set ",y=m.rows[g],k="",y)null!=y[_]&&(S="string"==typeof y[_]?y[_].replace(new RegExp("'","gm"),"''").replace("\\","\\\\"):y[_],k+=(k.length>0?", ":"")+_+"='"+S+"'");return v+=k,t.next=29,T(o,v);case 29:g++,t.next=19;break;case 32:m.rows.length>0&&n.addPrompt({id:"target_"+c,msg:"寫入 "+c+": "+m.rows.length+" 列"}),t.next=40;break;case 35:return t.prev=35,t.t0=t.catch(11),n.addPrompt({error:t.t0.toString()}),C(),t.abrupt("return",{v:void 0});case 40:case"end":return t.stop()}},t,n,[[11,35]])}),g=0;case 51:if(!(g<b.length)){t.next=63;break}return t.delegateYield(m(g),"t4",53);case 53:v=t.t4,t.t5=v,t.next="break"===t.t5?57:58;break;case 57:return t.abrupt("break",63);case 58:if("object"!==(void 0===v?"undefined":r()(v))){t.next=60;break}return t.abrupt("return",v.v);case 60:g++,t.next=51;break;case 63:t.next=46;break;case 65:a.end(),o.end(),t.next=106;break;case 69:i.addPrompt(e.target+"資料表刪除："+e.site),t.t6=l.a.keys(e.tables);case 71:if((t.t7=t.t6()).done){t.next=105;break}y=t.t7.value,k=e.tables[y],_=0;case 75:if(!(_<k.length)){t.next=103;break}if("object"!=(void 0===(S=k[_])?"undefined":r()(S))){t.next=85;break}if("string"!=typeof S.tbl){t.next=82;break}S=S.tbl,t.next=85;break;case 82:return console.log("表格參數不正確",S),n.addPrompt({error:"表格參數不正確<br/>"+s()(S)}),t.abrupt("break",103);case 85:return t.prev=85,n.addPrompt({id:"target_"+S,msg:"刪除 "+S+" ......"}),x="Delete from "+("SYS"==y?e.target_config.sys_database+".":"")+S+" Where "+("USERGROUPS"==S?"USERID Like Concat('%@','"+e.site+"')":"SITE = '"+e.site+"'"),console.log(x),t.next=91,T(o,x);case 91:t.sent,n.addPrompt({id:"target_"+S,msg:"刪除 "+S}),t.next=100;break;case 95:return t.prev=95,t.t8=t.catch(85),n.addPrompt({error:t.t8.toString()}),C(),t.abrupt("return");case 100:_++,t.next=75;break;case 103:t.next=71;break;case 105:o.end();case 106:C();case 107:case"end":return t.stop()}},t,n,[[12,20],[26,35],[85,95]])}))()},exeCmd:function(t){var e,n=this;return this.history=this.history.replace(I,""),new P.a((e=u()(l.a.mark(function e(i,o){var r,a,s,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n.addHistory(t.trim(),"waiting","\n"),1==n.$isElectron?(r=t.trim().split(" "),a="",s=r[0],r.splice(0,1),c=window.child_process.spawn(s,r),n.pid=c.pid,c.stdout.on("data",function(t){console.log("stdout: "+t.toString()),n.addHistory(t.toString())}),c.stderr.on("data",function(){var t=u()(l.a.mark(function t(e){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:window.process.kill(c.pid),n.pid=void 0,o(e.toString()),n.history=n.history.replace(A,""),n.addHistory({error:e.toString()}),n.addHistory("\n","cwd","cursor");case 6:case"end":return t.stop()}},t,n)}));return function(e){return t.apply(this,arguments)}}()),c.on("exit",function(){var t=u()(l.a.mark(function t(e){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:void 0!==n.pid&&(n.history=n.history.replace(A,""),n.pid=void 0,console.log("exit......."),i(a),n.addHistory("cwd","cursor"));case 1:case"end":return t.stop()}},t,n)}));return function(e){return t.apply(this,arguments)}}())):(n.history=n.history.replace(A,""),n.addHistory("cwd","cursor"),i());case 2:case"end":return e.stop()}},e,n)})),function(t,n){return e.apply(this,arguments)}))},addHistory:function(){for(var t=this,e=0;e<arguments.length;e++)"string"==typeof arguments[e].error?(this.history.replace(A,""),this.history+="<span class='term-error' >"+arguments[e].error+"</span>"):"cwd"==arguments[e]?this.history+="<span class='tem-prompt' >~ $ </span>":"cursor"==arguments[e]?this.history+=I:"waiting"==arguments[e]?this.history+=A:this.history+="<span>"+arguments[e].replace(new RegExp("\n","gm"),"<br/>")+"</span>";setTimeout(function(){t.$refs.term.scrollTop=t.$refs.term.scrollHeight},300)},addPrompt:function(t){var e=this;if("string"==typeof t.id){var n=document.querySelector("#"+this.id+" ."+t.id);if(null==n){var i=document.createElement("div");i.innerHTML="<span class='tem-prompt' >SQL > </span><span class='"+t.id+"'>"+t.msg+A+"</span",document.getElementById(this.id).appendChild(i)}else n.innerHTML=t.msg}else if("string"==typeof t.error){var o=document.createElement("div");o.innerHTML="<span class='term-error' >"+t.error+"</span>",document.getElementById(this.id).appendChild(o)}else if("string"==typeof t){var r=document.createElement("div");r.innerHTML=t,document.getElementById(this.id).appendChild(r)}setTimeout(function(){e.$refs.term.scrollTop=e.$refs.term.scrollHeight},300)}},watch:{}},D={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"term-frame",style:{height:this.height+"px",position:"relative"}},[e("div",{ref:"term",staticClass:"term",attrs:{id:this.id},domProps:{innerHTML:this._s(this.history)}},[this._v("\n    "+this._s(this.history)+"\n  ")])])},staticRenderFns:[]};var U=n("VU/8")(j,D,!1,function(t){n("P8+U")},null,null).exports,$={name:"ModalProject",props:["list"],components:{},data:function(){return{columns:[{title:"專案",key:"project"}]}},mounted:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},methods:{onRowClick:function(t,e){this.$emit("rowClick",t)}}},N={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"modalProject"}},[e("Table",{attrs:{border:"",columns:this.columns,data:this.list},on:{"on-row-click":this.onRowClick}})],1)},staticRenderFns:[]};var L=n("VU/8")($,N,!1,function(t){n("2x0r")},null,null).exports,B=!1,F=[{title:"主機",key:"host"},{title:"埠",key:"port"},{title:"帳號",key:"user"},{title:"密碼",key:"password"},{title:"database",key:"database"},{title:"sys_database",key:"sys_database"}],H={name:"ADB",components:{ModalConfig:O,Terminal:U,ModalDatabaseOption:h},data:function(){return{split1:.3,visibleConfig:!1,visibleOption:!1,tabs:[{title:"1",id:1}],tabIndex:1,tabCurr:"1",height:0,project:null,config:{projects:[{project:"BiPOS",package:"com.bipos",folder:"~/Documents/Project/BiPOS2",apk:"/release/BiPOS2-release.apk"},{project:"mECR",package:"com.bethel.v1",folder:"~/react-native/V1/android",apk:"/app/build/outputs/apk/mECR.apk"},{project:"KONE",package:"com.jabezpos.kone",folder:"~/react-native/kone/android",apk:"/app/build/outputs/apk/release/KONE.apk"},{project:"JabezDC",package:"com.jabezdc",folder:"~/react-native/jabezdc/android",apk:"/app/build/outputs/apk/release/JabezDC.apk"}],commands:[{title:"app 專案",icon:"logo-android",expand:!0,children:[{title:"開啟資料夾",cmd:"open {project.folder}"},{title:"安裝專案",cmd:"adb install -r {project.folder}{project.apk}"},{title:"啓動專案",cmd:"adb shell am start {project.package}/{project.package}.MainActivity"},{title:"停止專案",cmd:"adb shell am force-stop {project.package}"},{title:"移除專案",cmd:"adb shell pm uninstall -k {project.package}"}]},{title:"ADB",expand:!0,children:[{title:"reverse(8081)",cmd:"adb reverse tcp:8081 tcp:8081"},{title:"擷取畫面",cmd:"adb shell screencap -p /sdcard/Download/screencap.png && adb pull /sdcard/Download/screencap.png ~/Downloads && open ~/Downloads && adb shell rm /sdcard/Download/screencap.png"}]},{title:"清除終端機",role:"clear"}],database:[{title:"資料庫設定",expand:!0,children:[{title:"正式區",role:"database",port:3306},{title:"測試區",role:"database",port:3306},{title:"77區",role:"database",port:3306}]},{title:"資料庫複製",icon:"md-redo",role:"database-replicate"}],tables:{SYS:["SITES","USERS","USERGROUPS"],BASE:["APLSYS","TMMF","STKNAME","STOCK","SYSCOD","BAS_EMP","BAS_IO","BAS_IOGROUP","BAS_PTYPE","BAS_PUBLIC","BAS_SER","CASHMF","CLEVEL","CODE","DPF_PLU2","DPF_PLU3","DPF_PLU4","DPMF","F_PLU1","F_PLU12","F_PLU2","F_PLU23MF","F_PLU3","F_PLU4","F_TABMF","GPMF","MGUIELEC","MGUIELEC_D","MGUIELEC_H","MGUIELEC_S","PADNAME","PAYMENT","PRN_TYPE","PSERVER","PSERVER_LST","PSERVER_STORE","PRODUCT","PRODUCT_ORD","PRODUCT_RATE","FFDP","FFDPPLU","FFDP_HS","FFPLU","FFRTR","PROMO_H","PROMO_I","SITES_JPC_PARAM","SITES_JPC_PARAM_D","SITES_PARAM","SIZE","BAS_DESC2","BAS_DP"],TRANSACTION:[{tbl:"HTRH",disable:!0,where:"STOCK_NO = '{STOCK_NO}' and TRN_DATE = '{T_DAY}'"},{tbl:"HTRI",disable:!0,where:"STOCK_NO = '{STOCK_NO}' and TRN_DATE = '{T_DAY}'"},{tbl:"POS_H",where:"T_STORE = '{STOCK_NO}' and T_DAY = '{T_DAY}'"},{tbl:"POS_I",where:"T_STORE = '{STOCK_NO}' and T_DAY = '{T_DAY}'"},{tbl:"POS_HM",where:"T_STORE = '{STOCK_NO}' and T_DAY = '{T_DAY}'"}],OPTIONS:["ADCAROUSEL","APPSITEMENU","BARCODE_FMT","BEACONPOS","BEACONTMPLIST","BGPMF","BONUSLOG","BONUSMASTER","BULLETIN_BOARD","COLOR","FINDATA","IMPORT","IITEM","IOAMT_H","IOAMT_I","MAKER","MAKER_C","MTAXH","MTAXI","PACK","POS_E","PREPAIDRULE","QITEM","RECEPTION","RIITEM","RIMP","SCHG_H","SCHG_I","TAKE_H","TAKE_I","TOITEM","TORDER","TRANS_2UBILL","TRANS_EZPAYMENT","TRANS_IPASS","TRANS_IPASS_CR","TRANS_PMS","TRANS_UUPON","VIPMF","VIPMF_LOG"]},sql_var:["STOCK_NO","TM_NO","T_DAY"]}}},mounted:function(){var t=this;return u()(l.a.mark(function e(){var n,i,o;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:void 0===(n=localStorage["adb-split-left-width"])&&(n=300),t.split1=1-(document.body.clientWidth-n)/document.body.clientWidth,t.$isElectron,"string"==typeof(i=localStorage["adb-config"])&&i.length>0&&(t.config=JSON.parse(i)),"string"==typeof(i=localStorage["adb-project"])&&i.length>0&&1==(o=t.config.projects.filter(function(t){return t.project==i})).length&&(t.project=o[0]),t.broadcast.$on("on-resize",t.onResize),t.onResize(),t.broadcast.$on("term-finish",t.executeFinish);case 11:case"end":return e.stop()}},e,t)}))()},destroyed:function(){this.broadcast.$off("on-resize",this.onResize),this.broadcast.$off("term-finish",this.executeFinish)},methods:{onMoveEnd:function(){var t=document.querySelector(".left-pane").clientWidth;localStorage["adb-split-left-width"]=t},onResize:function(){var t=document.querySelector("#adbTabs").clientHeight,e=document.querySelector("#adbTabs .ivu-tabs-bar").clientHeight;this.height=t-e,document.querySelector("#adbTabs .ivu-tabs-content").style.height=this.height+"px"},onClickIcon:function(){alert("還沒寫，只作測試用，"+this.tabCurr)},onCloseConfig:function(t){void 0!==t&&(localStorage["adb-config"]=s()(t),this.config=t),this.visibleConfig=!1},onCloseDatabaseOption:function(t){if(this.visibleOption=!1,"object"==(void 0===t?"undefined":r()(t))){B=!0;var e={SYS:this.config.tables.SYS,BASE:this.config.tables.BASE};"刪除"!=t.mode&&-1==t.tables.indexOf("交易資料表")||(e.TRANSACTION=this.config.tables.TRANSACTION),"刪除"!=t.mode&&-1==t.tables.indexOf("自訂資料表")||(e.OPTIONS=this.config.tables.OPTIONS),t.tables=e,this.broadcast.$emit("term-database",this.tabCurr,t)}},onSelectChange:function(t){var e=this;if(1!=B)for(var n in void 0===t.children&&("string"==typeof t.cmd&&t.cmd.trim().length>0?t.cmd.indexOf("{project.")>-1?null==this.project?this.projectPicker(function(){l(t.cmd)}):l(t.cmd):c(t.cmd):"string"==typeof t.role&&("clear"==t.role?c(t.role):"database-replicate"==t.role?e.visibleOption=!0:"database"==t.role?e.databasePicker(t):alert("role: "+t.role))),this.config.commands){var i=this.config.commands[n];if("object"==r()(i.children))for(var o=this.config.commands[n].children,a=0;a<o.length;a++){var s=o[a];"object"==r()(s.children)||("boolean"==typeof s.selected?t.nodeKey!=s.nodeKey&&(s.selected=void 0,this.$set(this.config.commands[n].children,a,s)):t.nodeKey==s.nodeKey&&(s.selected=!0,this.$set(this.config.commands[n].children,a,s)))}else"boolean"==typeof i.selected?t.nodeKey!=i.nodeKey&&(i.selected=void 0,this.$set(this.config.commands,n,this.config.commands[n])):t.nodeKey==i.nodeKey&&(i.selected=!0,this.$set(this.config.commands,n,this.config.commands[n]))}function c(t){"object"==r()(window.process)&&(t=t.replace(new RegExp("~/","gm"),"/Users/"+window.process.env.USER+"/")),B=!0,e.broadcast.$emit("term-execute",e.tabCurr,t)}function l(t){for(var n in e.project)"project"!=n&&(t=t.replace(new RegExp("{project."+n+"}","gm"),e.project[n]));c(t)}},projectPicker:function(t){var e=this,n=this;this.$Modal.info({title:"專案清單",width:300,render:function(i){return i(L,{props:{list:n.config.projects},on:{rowClick:function(i){n.project=i,0==e.$isElectron&&(localStorage["adb-project"]=i.project),"function"==typeof t&&t(),n.$Modal.remove()}}})}})},databasePicker:function(t){var e=this,n=!1;this.$Modal.confirm({title:"資料庫設定［"+t.title+"］",width:500,render:function(e){return e(g,{props:{database:t,cols:F},on:{onChange:function(t){n=!0}}})},onOk:function(){1==n&&(localStorage["adb-config"]=s()(e.config))}})},executeFinish:function(){B=!1},onTabRemove:function(t){for(var e=0;e<this.tabs.length;e++)if(this.tabs[e].title==t){e==this.tabs.length-1?this.tabCurr=this.tabs[e-1].title:this.tabCurr=this.tabs[e+1].title,this.tabs.splice(e,1);break}},onTabsAdd:function(){++this.tabIndex,this.tabs.push({title:this.tabIndex.toString(),id:this.tabIndex})},onTabClick:function(t){this.tabCurr=t,console.log("onTabClick: ",t)},renderTreeItem:function(t,e){var n=this,i=(e.root,e.node,e.data),o=[t("span",{class:"ivu-tree-title"+(1==i.selected?" ivu-tree-title-selected":""),on:{click:function(){n.onSelectChange(i)}}},i.title)];return o.unshift(t("Icon",{props:{type:"string"==typeof i.icon?i.icon:void 0===i.children?"ios-paper-outline":1==i.expand?"ios-folder-open":"md-folder"},style:{marginRight:"2px"}})),t("span",{style:{display:"inline-block",width:"100%",marginBottom:"0px"}},o)}}},K={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{display:"flex","flex-direction":"column","align-items":"stretch","justify-content":"end"},attrs:{id:"app"}},[n("div",{staticStyle:{background:"#2d8cf0",display:"flex","flex-direction":"row","justify-content":"start","align-items":"center"}},[n("div",{staticStyle:{flex:"1","text-align":"left",color:"white",padding:"5px"}},[t._v("\n      "+t._s("指令集")+"\n      "),null!=t.project?n("span",{staticStyle:{cursor:"pointer"},on:{click:t.projectPicker}},[t._v("\n        "+t._s("["+t.project.project+"]")+"\n      ")]):t._e()]),t._v(" "),n("Icon",{staticClass:"btn",attrs:{type:"md-cog"},nativeOn:{click:function(e){t.visibleConfig=!0}}})],1),t._v(" "),n("div",{staticStyle:{flex:"1"}},[n("Split",{on:{"on-move-end":t.onMoveEnd},model:{value:t.split1,callback:function(e){t.split1=e},expression:"split1"}},[n("div",{staticClass:"demo-split-pane",staticStyle:{"z-index":"1","overflow-x":"hidden"},attrs:{slot:"left",id:"left"},slot:"left"},[n("div",{staticStyle:{flex:"1"}},[n("Tree",{staticStyle:{"z-index":"-1"},attrs:{data:t.config.commands.concat(t.config.database),render:t.renderTreeItem},on:{"on-select-change":t.onSelectChange}})],1),t._v(" "),n("div",{attrs:{id:"version"}},[t._v("2021-05-05 16:00")])]),t._v(" "),n("div",{staticClass:"demo-split-pane",staticStyle:{"z-index":"1","overflow-x":"hidden"},attrs:{slot:"right",id:"right"},slot:"right"},[n("Tabs",{attrs:{type:"card",id:"adbTabs"},on:{"on-tab-remove":t.onTabRemove,"on-click":t.onTabClick}},[t._l(t.tabs,function(e,i){return n("TabPane",{key:e.id,attrs:{closable:0!=i,name:e.title,label:"Shell "+e.title}},[n("Terminal",{ref:"term-"+e.title,refInFor:!0,attrs:{height:t.height,title:e.title}})],1)}),t._v(" "),n("Button",{attrs:{slot:"extra",size:"small"},on:{click:t.onTabsAdd},slot:"extra"},[t._v("增加")])],2)],1)])],1),t._v(" "),n("ModalConfig",{attrs:{visible:t.visibleConfig,config:0==t.visibleConfig?void 0:t.config},on:{"on-close":t.onCloseConfig}}),t._v(" "),n("ModalDatabaseOption",{attrs:{visible:t.visibleOption,config:0==t.visibleOption?void 0:t.config},on:{"on-close":t.onCloseDatabaseOption}})],1)},staticRenderFns:[]};var q=n("VU/8")(H,K,!1,function(t){n("9YiH")},null,null).exports,Y=n("BTaQ"),z=n.n(Y),G=(n("+skl"),n("4lpq"));i.default.use(z.a,{locale:G.a}),i.default.config.productionTip=!1,i.default.prototype.broadcast=new i.default,i.default.prototype.$isElectron=navigator.userAgent.indexOf("Electron")>-1,new i.default({el:"#app",components:{ADB:q},template:"<ADB />",mounted:function(){var t=this;window.onresize=function(){t.broadcast.$emit("on-resize")}}})},zql2:function(t,e){}},["twTI"]);
//# sourceMappingURL=adb.c4ea462d47617b001a45.js.map