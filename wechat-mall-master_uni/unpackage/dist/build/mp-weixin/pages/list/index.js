(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/list/index"],{1455:function(t,n,e){"use strict";e.r(n);var r=e("90fc"),o=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=o.a},"3a94":function(t,n,e){},"66c6":function(t,n,e){"use strict";(function(t){e("e65a"),e("921b");r(e("66fd"));var n=r(e("952d"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},"90fc":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(e("a34a")),o=e("df69");function a(t){return t&&t.__esModule?t:{default:t}}function u(t){return f(t)||s(t)||c(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,n){if(t){if("string"===typeof t)return l(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?l(t,n):void 0}}function s(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function f(t){if(Array.isArray(t))return l(t)}function l(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function d(t,n,e,r,o,a,u){try{var i=t[a](u),c=i.value}catch(s){return void e(s)}i.done?n(c):Promise.resolve(c).then(r,o)}function h(t){return function(){var n=this,e=arguments;return new Promise((function(r,o){var a=t.apply(n,e);function u(t){d(a,r,o,u,i,"next",t)}function i(t){d(a,r,o,u,i,"throw",t)}u(void 0)}))}}var p={data:function(){return{list:[],currentIndex:1,sort:"",isEnd:!1,goods:[],host:""}},onLoad:function(t){this.loadList()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){this.loadList(1)},onReachBottom:function(){this.isEnd?t.showToast({title:"暂无新数据！",icon:"none"}):(this.setData({currentIndex:++this.currentIndex}),this.loadList())},onShareAppMessage:function(){},methods:{loadList:function(){var n=this;return h(r.default.mark((function e(){var a,i,c,s,f;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=n.currentIndex,e.next=3,o.Goods.list({pageIndex:a,pageSize:5});case 3:if(i=e.sent,c=i.status,s=i.goods,!c){e.next=18;break}if(0!=s.length){e.next=11;break}return t.showToast({title:"暂无新数据！",icon:"none"}),n.setData({currentIndex:a-1,isEnd:!0}),e.abrupt("return");case 11:if(1!=a){e.next=15;break}return n.setData({list:s}),t.stopPullDownRefresh(),e.abrupt("return");case 15:f=n.list,n.setData({list:[].concat(u(f),u(s))}),t.stopPullDownRefresh();case 18:case"end":return e.stop()}}),e)})))()}}};n.default=p}).call(this,e("543d")["default"])},"952d":function(t,n,e){"use strict";e.r(n);var r=e("ab87"),o=e("1455");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("d924");var u,i=e("f0c5"),c=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);n["default"]=c.exports},ab87:function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}));var o=function(){var t=this,n=t.$createElement;t._self._c},a=[]},d924:function(t,n,e){"use strict";var r=e("3a94"),o=e.n(r);o.a}},[["66c6","common/runtime","common/vendor"]]]);