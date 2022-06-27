<script>
//app.js
// 导入API模块User
import { User } from './api/index.js'; // 导入服务器配置
import server from './utils/server.js';
export default {
    data() {
        return {};
    },
  onLaunch: function () {
    // 登录
uni.authorize({
    scope: 'scope.UserProfile',
    success() {
        uni.getUserProfile()
    }
})
		    uni.getUserProfile({
		      provider: 'weixin',
			  desc:'sdfgf',
		      success: function (infoRes) {
		       // console.log('用户昵称为：' + infoRes.userInfo.nickName);
				console.log(infoRes);
		      }
		    });
			uni.openSetting({
			  success(res) {
			    console.log(res.authSetting)
			  }
			});
    uni.login({
      success: async ({ code }) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let { status, token } = await User.token({ code });
        // 存储token
        if (status) {
          uni.setStorageSync("token", token);
        }

      }
    });
    // 获取授权
    uni.getSetting({
      success({ authSetting }) {
        // 未授权
        if (!authSetting['scope.userInfo']) {
          uni.setStorageSync('isAuth', false);
          return;
        }
        // 已授权
        uni.setStorageSync('isAuth', true);
        uni.getUserInfo({
          success({ userInfo }) {
            uni.setStorageSync('userInfo', userInfo);
          }
        });
      }
    })
  },
    globalData: {
        userInfo: null,
        ...server
    }
};
</script>
<style>
@import 'colorui/main.css';
@import 'colorui/icon.css'; /**app.wxss**/

@import '@/static/font/iconfont.css';
	@import './common/uni.css';
	@import '@/static/customicons.css';
	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@media screen and (min-width: 768px) {
		body {
			overflow-y: scroll;
		}
	}

	/* 顶栏通栏样式 */
	/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */

	uni-page-body {
		background-color: #F5F5F5 !important;
		min-height: 100% !important;
		height: auto !important;
	}

	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}

	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}

	/* #endif */

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #efeff4;
		height: 100%;
		font-size: 28rpx;
		/* line-height: 1.8; */
	}

	.fix-pc-padding {
		padding: 0 50px;
	}

	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.uni-header-image {
		width: 100px;
		height: 100px;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}

	/* #endif*/
.bg-red {
    background-color: #ff2732;
}
</style>
