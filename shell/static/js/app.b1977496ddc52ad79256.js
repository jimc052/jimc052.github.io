webpackJsonp([3],{"+skl":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),i={name:"App",components:{},data:function(){return{visible:!1,cycle:5,cycles:[1,2,3,5,10,20,30,50,80,100],interval:10,intervals:[0,10,15,20,30],width:document.body.clientWidth-200,height:document.body.clientHeight-300,stdout:""}}},r={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{attrs:{id:"app"}})},staticRenderFns:[]};var a=n("VU/8")(i,r,!1,function(e){n("kMpH")},null,null).exports,c=n("BTaQ"),u=n.n(c);n("+skl");o.default.use(u.a),o.default.config.productionTip=!1,o.default.prototype.broadcast=new o.default,o.default.prototype.$isElectron=navigator.userAgent.indexOf("Electron")>-1,new o.default({el:"#app",components:{App:a},template:"<App/>",mounted:function(){var e=this;window.onresize=function(){e.broadcast.$emit("on-resize")}}})},kMpH:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.b1977496ddc52ad79256.js.map