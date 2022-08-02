<template>
	  <view>
	
	   <button class="login-btn" type="primary" @click="getUserInfo">
	         微信用户一键登录
	       </button>
	
	  </view>
</template>

<script>
	const app = getApp();
	import { User } from '../../api/index.js';
export default {
	data() {
	        return {};
	    },
	    onLoad: function (query) {},
	    onShow() {
	        app.globalData
	            .login()
	            .then((res) => {
	                app.globalData.code = res;
	            })
	            .catch(() => {
	                uni.showToast({
	                    title: '网络异常！',
	                    icon: 'none',
	                    duration: 1000
	                });
	            });
	    },
	    methods: {
	        //登陆页面  查看用户是否授权
	        getUserInfo: function (userInfo) {
	            // console.log(userInfo, " 查看用户授权信息")
	            //查看用户是否授权
	            uni.getSetting({
	                success(res) {
	                    if (!res.authSetting['scope.record']) {
	                        // console.log('没有授权')
	                    } else {
	                        // console.log('授权过了')
	                    }
	                }
	            }); //判断是点击授权  点击拒绝停在登录页面
console.log(userInfo);
	            if (!userInfo.detail.rawData || !userInfo.detail.signature) {
						
	                uni.showModal({
	                    title: '提示',
	                    content: '您没有授权，不能查看祝福'
	                });
	                return false;
	            } // 展示登录中加载提示
	uni.login({
	  success: async ({ code }) => {
	    // 发送 res.code 到后台换取 openId, sessionKey, unionId
	    let { status, token } = await User.token({ code });
	    // 存储token
	    if (status) {
	      uni.setStorageSync("token", token);
		  uni.redirectTo({
		      url: '/pages/index/index'
		  })
	    }
	
	  }
	});
	        }
	    }
	};
	
</script>

<style>
</style>
