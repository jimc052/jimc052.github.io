webpackJsonp([4],{"+skl":function(t,e){},jAT2:function(t,e){},twTI:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),r=n("//Fk"),s=n.n(r),i=n("Xxa5"),o=n.n(i),l=n("exGp"),c=n.n(l),u={name:"ADB",components:{},data:function(){return{split1:.3,tree:[]}},mounted:function(){var t=this;return c()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.$isElectron;case 1:case"end":return e.stop()}},e,t)}))()},methods:{retrive:function(t){var e,n=this;return t=void 0===t?"":t+"/",new s.a((e=c()(o.a.mark(function e(a,r){var s,i,l,c,u;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(1!=n.$isElectron){e.next=30;break}return e.prev=1,e.next=4,window.shell("adb shell ls -F "+t);case 4:s=e.sent,i=s.split("\n"),l=[],c=[],u=0;case 8:if(!(u<i.length)){e.next=22;break}if({},"/"!=i[u].substr(i[u].length-1,1)){e.next=14;break}l.push({title:i[u].substr(0,i[u].length-1),expand:!1,loading:!1,children:[],path:t}),e.next=19;break;case 14:if(!(i[u].length>0)){e.next=18;break}c.push({title:i[u]}),e.next=19;break;case 18:return e.abrupt("continue",19);case 19:u++,e.next=8;break;case 22:a(l.concat(c)),e.next=28;break;case 25:e.prev=25,e.t0=e.catch(1),r(e.t0);case 28:e.next=31;break;case 30:a([]);case 31:case"end":return e.stop()}},e,n,[[1,25]])})),function(t,n){return e.apply(this,arguments)}))}}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"adb"}},[n("Split",{attrs:{min:"120"},model:{value:t.split1,callback:function(e){t.split1=e},expression:"split1"}},[n("div",{staticClass:"demo-split-pane",staticStyle:{"z-index":"1","overflow-x":"hidden"},attrs:{slot:"left",id:"left"},slot:"left"},[n("Tree",{staticStyle:{"z-index":"-1"},attrs:{data:t.tree}})],1),t._v(" "),n("div",{staticClass:"demo-split-pane",staticStyle:{"z-index":"1","overflow-x":"hidden"},attrs:{slot:"right",id:"right"},slot:"right"})])],1)},staticRenderFns:[]};var p=n("VU/8")(u,d,!1,function(t){n("jAT2")},null,null).exports,f=n("BTaQ"),h=n.n(f),x=(n("+skl"),n("4lpq"));a.default.use(h.a,{locale:x.a}),a.default.config.productionTip=!1,a.default.prototype.broadcast=new a.default,a.default.prototype.$isElectron=navigator.userAgent.indexOf("Electron")>-1,new a.default({el:"#adb",components:{ADB:p},template:"<ADB />",mounted:function(){var t=this;window.onresize=function(){t.broadcast.$emit("on-resize")}}})}},["twTI"]);
//# sourceMappingURL=adb.9f4e1b419561714fad3d.js.map