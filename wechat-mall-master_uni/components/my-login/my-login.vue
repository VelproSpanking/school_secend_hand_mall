<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
   <button type="primary" class="btn-login" open-type="getUserinfo" @click="login">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
	import { User } from '../../api/index.js';
	export default {
	    data() {
	        return {};
	    },
	    /**
	     * 组件的属性列表
	     */
	
	    /**
	     * 组件的方法列表
	     */
		
methods: {
  // 获取微信用户的基本信息
  login() {
  				// console.log("触发")
  				uni.getUserProfile({
  					desc: "获取你的昵称、头像、地区及性别",
  					success: async ({userInfo}) => {
						//let userinfo = uni.getStorageSync('userinfo');
						//uni.setStorageSync('userinfo', res.userinfo);
						let { status1, msg } = await User.info(userInfo);
						if (status1) {
						    // 缓存授权状态
						    uni.setStorageSync('isAuth', true); // 缓存userInfo
						  
						    uni.setStorageSync('userInfo', userInfo); // 将获取的userInfo传递出去
						
						    this.$emit('permit', {
						        detail: userInfo
						    });
						}
						
						uni.login({
							
							
						  success: async ({ code }) => {
							  
							console.log("code2",code)
						    // 发送 res.code 到后台换取 openId, sessionKey, unionId
						    let { status, token } = await User.token({ code });
						    // 存储token
						    if (status) {
						      uni.setStorageSync("token", token);
							  uni.setStorageSync("userInfo", userInfo)
						    }
                            //this.userinfo()
							
						
						  },
						  fail:function(res){
						  	console.log(res);
						  }
						});
						uni.reLaunch({
						url: '/pages/index/index'
						});
  					},
  					fail(res) {
  						console.log(res);
  					}
  				})
  			},
        async userinfo(){
            debugger

		},


 //  getUserProfile(e) {
 //    // 判断是否获取用户信息成功
 //    if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')

 //    // 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
 //    console.log("用户基本信息",e.detail.userInfo)
	// let userinfo = uni.getStorageSync('userinfo');
	// this.getToken(e.detail)
 //  },
  async getToken(info) {
    // 调用微信登录接口
    const [err, res] = await uni.login().catch(err => err)
    // 判断是否 uni.login() 调用失败
    if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
  
    // 准备参数对象
    const query = {
      code: res.code,
      encryptedData: info.encryptedData,
      iv: info.iv,
      rawData: info.rawData,
      signature: info.signature
    }
  
    // 换取 token
    const { status,token } = await User.token({ code })
        if (status) {
          uni.setStorageSync("token", token);
        }
  }
}

}

</script>

<style>
	.login-container {
	  // 登录盒子的样式
	  height: 750rpx;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  background-color: #f8f8f8;
	  position: relative;
	  overflow: hidden;
	
	  // 绘制登录盒子底部的半椭圆造型

/* 	  #login-container::after {
	    content: ' ';
	    display: block;
	    position: absolute;
	    width: 100%;
	    height: 40px;
	    left: 0;
	    bottom: 0;
	    background-color: white;
	    border-radius: 100%;
	    transform: translateY(50%);
	  } */
	
	  // 登录按钮的样式
/* 	  btn-login {
	    width: 90%;
	    border-radius: 100px;
	    margin: 15px 0;
	    background-color: #c00000;
	  }
	
	  // 按钮下方提示消息的样式
	  .tips-text {
	    font-size: 12px;
	    color: gray;
	  } */
	}
</style>
