(function(){"use strict";var t={7076:function(t,n,e){e(6992),e(8674),e(9601),e(7727);var r=e(144),o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-app",[e("v-app-bar",{attrs:{app:""}},[e("v-app-bar-nav-icon",{on:{click:function(n){n.stopPropagation(),t.drawer=!t.drawer}}}),e("v-spacer")],1),e("v-navigation-drawer",{attrs:{absolute:"",temporary:""},model:{value:t.drawer,callback:function(n){t.drawer=n},expression:"drawer"}},[e("v-list",{attrs:{nav:"",dense:""}},[e("v-list-item-group",{attrs:{"active-class":"deep-purple--text text--accent-4"},model:{value:t.group,callback:function(n){t.group=n},expression:"group"}},[e("v-list-item",{on:{click:t.goToMain}},[e("v-list-item-title",[t._v("Главная")])],1),e("v-list-item",{on:{click:t.goToDictionary}},[e("v-list-item-title",[t._v("Словарь")])],1)],1)],1)],1),e("v-main",[e("v-container",[e("router-view")],1)],1),e("v-bottom-navigation",{attrs:{app:"",value:t.value,color:"primary"}},[e("v-btn",[e("div",{staticClass:"font-weight-regular"},[e("small",[t._v("Русский")])]),e("div",{},[t._v("Язык")])]),e("v-btn",[e("span",[t._v("Справка")])]),e("v-btn",[e("div",{staticClass:"font-weight-regular"},[e("small",[t._v("Сложный")])]),e("div",{},[t._v("Режим")])])],1)],1)},a=[],i={name:"App",data:function(){return{drawer:!1,group:null,value:1}},watch:{group:function(){this.drawer=!1}},methods:{goToMain:function(){this.$router.push({name:"home"})},goToDictionary:function(){this.$router.push({name:"dictionary"})}}},u=i,c=e(1001),s=e(3453),l=e.n(s),v=e(7524),p=e(4143),f=e(5206),d=e(1049),m=e(680),h=e(9846),g=e(6816),Z=e(7620),w=e(7874),b=e(3466),y=e(7877),_=e(3120),V=e(9762),O=(0,c.Z)(u,o,a,!1,null,null,null),C=O.exports;l()(O,{VApp:v.Z,VAppBar:p.Z,VAppBarNavIcon:f.Z,VBottomNavigation:d.Z,VBtn:m.Z,VContainer:h.Z,VList:g.Z,VListItem:Z.Z,VListItemGroup:w.Z,VListItemTitle:b.V9,VMain:y.Z,VNavigationDrawer:_.Z,VSpacer:V.Z});var k=e(8345),x=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-row",t._l(6,(function(n){return e("v-col",{key:n,attrs:{cols:"6"}},[e("v-card",{staticClass:"pa-2"},[t._v("One of three columns "+t._s(n))])],1)})),1)},F=[],T={name:"HomeItem"},j=T,P=e(26),S=e(2102),B=e(2877),I=(0,c.Z)(j,x,F,!1,null,null,null),M=I.exports;l()(I,{VCard:P.Z,VCol:S.Z,VRow:B.Z});var $=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-row",t._l(6,(function(n){return e("v-col",{key:n,attrs:{cols:"6"}},[e("v-card",{staticClass:"pa-2"},[t._v("One of three columnssss "+t._s(n))])],1)})),1)},A=[],D={name:"DictionaryItem"},E=D,L=(0,c.Z)(E,$,A,!1,null,null,null),N=L.exports;l()(L,{VCard:P.Z,VCol:S.Z,VRow:B.Z}),r.Z.use(k.Z);var z=[{path:"/",name:"home",component:M},{path:"/dictionary",name:"dictionary",component:N}],R=new k.Z({mode:"history",base:"/buzzwords/docs/",routes:z}),G=R,H=e(629);r.Z.use(H.ZP);var q=new H.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}}),J=e(5591),K=e(413);r.Z.use(J.Z);var Q=new J.Z({theme:{options:{customProperties:!0},themes:{light:{primary:"#007BFF",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}},lang:{locales:{ru:K.Z},current:"ru"}});r.Z.config.productionTip=!1,new r.Z({router:G,store:q,vuetify:Q,render:function(t){return t(C)}}).$mount("#app")}},n={};function e(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={exports:{}};return t[r](a,a.exports,e),a.exports}e.m=t,function(){var t=[];e.O=function(n,r,o,a){if(!r){var i=1/0;for(l=0;l<t.length;l++){r=t[l][0],o=t[l][1],a=t[l][2];for(var u=!0,c=0;c<r.length;c++)(!1&a||i>=a)&&Object.keys(e.O).every((function(t){return e.O[t](r[c])}))?r.splice(c--,1):(u=!1,a<i&&(i=a));if(u){t.splice(l--,1);var s=o();void 0!==s&&(n=s)}}return n}a=a||0;for(var l=t.length;l>0&&t[l-1][2]>a;l--)t[l]=t[l-1];t[l]=[r,o,a]}}(),function(){e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,{a:n}),n}}(),function(){e.d=function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){e.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};e.O.j=function(n){return 0===t[n]};var n=function(n,r){var o,a,i=r[0],u=r[1],c=r[2],s=0;if(i.some((function(n){return 0!==t[n]}))){for(o in u)e.o(u,o)&&(e.m[o]=u[o]);if(c)var l=c(e)}for(n&&n(r);s<i.length;s++)a=i[s],e.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return e.O(l)},r=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=e.O(void 0,[998],(function(){return e(7076)}));r=e.O(r)})();
//# sourceMappingURL=app-legacy.78e4352f.js.map