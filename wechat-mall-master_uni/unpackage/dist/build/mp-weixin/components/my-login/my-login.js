(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my-login/my-login"],{"168f":function(n,t,e){"use strict";e.r(t);var r=e("2d06"),o=e("bee4");for(var u in o)"default"!==u&&function(n){e.d(t,n,(function(){return o[n]}))}(u);e("a474");var a,c=e("f0c5"),i=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);t["default"]=i.exports},"2d06":function(n,t,e){"use strict";e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return r}));var r={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(e.bind(null,"4ec9"))}},o=function(){var n=this,t=n.$createElement;n._self._c},u=[]},"3f6b":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(e("a34a")),o=e("df69");function u(n){return n&&n.__esModule?n:{default:n}}function a(n,t){return l(n)||f(n,t)||i(n,t)||c()}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(n,t){if(n){if("string"===typeof n)return s(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?s(n,t):void 0}}function s(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function f(n,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(n)){var e=[],r=!0,o=!1,u=void 0;try{for(var a,c=n[Symbol.iterator]();!(r=(a=c.next()).done);r=!0)if(e.push(a.value),t&&e.length===t)break}catch(i){o=!0,u=i}finally{try{r||null==c["return"]||c["return"]()}finally{if(o)throw u}}return e}}function l(n){if(Array.isArray(n))return n}function d(n,t,e,r,o,u,a){try{var c=n[u](a),i=c.value}catch(s){return void e(s)}c.done?t(i):Promise.resolve(i).then(r,o)}function p(n){return function(){var t=this,e=arguments;return new Promise((function(r,o){var u=n.apply(t,e);function a(n){d(u,r,o,a,c,"next",n)}function c(n){d(u,r,o,a,c,"throw",n)}a(void 0)}))}}var v={data:function(){return{}},methods:{login:function(){var t=this;n.getUserProfile({desc:"获取你的昵称、头像、地区及性别",success:function(){var e=p(r.default.mark((function e(u){var a,c,i;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=u.userInfo,e.next=3,o.User.info(a);case 3:c=e.sent,i=c.status1,c.msg,i&&(n.setStorageSync("isAuth",!0),n.setStorageSync("userInfo",a),t.$emit("permit",{detail:a})),n.login({success:function(){var t=p(r.default.mark((function t(e){var u,c,i,s;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return u=e.code,console.log("code2",u),t.next=4,o.User.token({code:u});case 4:c=t.sent,i=c.status,s=c.token,i&&(n.setStorageSync("token",s),n.setStorageSync("userInfo",a));case 8:case"end":return t.stop()}}),t)})));function e(n){return t.apply(this,arguments)}return e}(),fail:function(n){console.log(n)}}),n.reLaunch({url:"/pages/index/index"});case 9:case"end":return e.stop()}}),e)})));function u(n){return e.apply(this,arguments)}return u}(),fail:function(n){console.log(n)}})},userinfo:function(){return p(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:case 1:case"end":return n.stop()}}),n)})))()},getToken:function(t){return p(r.default.mark((function e(){var u,c,i,s,f,l,d;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.login().catch((function(n){return n}));case 2:if(u=e.sent,c=a(u,2),i=c[0],s=c[1],!i&&"login:ok"===s.errMsg){e.next=8;break}return e.abrupt("return",n.$showError("登录失败！"));case 8:return{code:s.code,encryptedData:t.encryptedData,iv:t.iv,rawData:t.rawData,signature:t.signature},e.next=11,o.User.token({code:code});case 11:f=e.sent,l=f.status,d=f.token,l&&n.setStorageSync("token",d);case 15:case"end":return e.stop()}}),e)})))()}}};t.default=v}).call(this,e("543d")["default"])},"54f2":function(n,t,e){},a474:function(n,t,e){"use strict";var r=e("54f2"),o=e.n(r);o.a},bee4:function(n,t,e){"use strict";e.r(t);var r=e("3f6b"),o=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);t["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my-login/my-login-create-component',
    {
        'components/my-login/my-login-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("168f"))
        })
    },
    [['components/my-login/my-login-create-component']]
]);
