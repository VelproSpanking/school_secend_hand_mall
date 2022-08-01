<template>
    <!-- component/auth-modal/index.wxml -->
    <view :class="'shadow ' + (isShow ? 'show' : '')">
        <view class="modal-box">
            <view class="title grey">校园二手交易</view>
            <view class="content">
                获得您的公开信息(昵称，头像，性别等)
                <view class="user-card">
                    <view class="avatar">
                        <open-data type="userAvatarUrl"></open-data>
                    </view>
                    <view class="right">
                        <view class="nickname">
                            <open-data type="userNickName"></open-data>
                        </view>
                        <view>微信个人信息</view>
                    </view>
                </view>
            </view>
            <view class="footer">
                <navigator target="miniProgram" open-type="exit" class="cancel">
                    <button @tap="handleReject">拒 绝</button>
                </navigator>
                <button class="auth" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="handleGetUserInfo">允 许</button>
            </view>
        </view>
    </view>
</template>

<script>
// component/auth-modal/index.js
import { User } from '../../api/index';
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        async handleGetUserInfo({ detail: { encryptedData, iv, errMsg, userInfo } }) {
            if (errMsg == 'getUserInfo:fail auth deny') {
                uni.showToast({
                    title: '未授权获取用户信息！',
                    icon: 'none'
                });
                return false;
            } // 上传账户信息

            let { status, msg } = await User.info(userInfo);

            if (status) {
                // 缓存授权状态
                uni.setStorageSync('isAuth', true); // 缓存userInfo

                uni.setStorageSync('userInfo', userInfo); // 将获取的userInfo传递出去

                this.$emit('permit', {
                    detail: userInfo
                });
            }
        },

        handleReject() {
            // 缓存授权状态
            uni.setStorageSync('isAuth', false);
            this.$emit('reject');
        }
    },
    mounted: function () {
        // 在组件实例进入页面节点树时执行
        let { isShow } = this;

        if (isShow) {
            uni.hideTabBar();
        }
    },
    destroyed: function () {
        // 在组件实例被从页面节点树移除时执行
        uni.showTabBar();
    }
};
</script>
<style>
/* component/auth-modal/index.wxss */

.shadow {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    opacity: 0;
    z-index: 1000;
    transition: all 0.5s;
}

.shadow.show {
    opacity: 1;
    visibility: visible;
}

.modal-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    border-radius: 8rpx;
}

.modal-box .title {
    padding: 40rpx;
    border-bottom: 1rpx solid #ddd;
    font-size: 28rpx;
    color: #666;
}

.modal-box .content {
    padding: 40rpx;
    font-size: 32rpx;
}

.user-card {
    display: flex;
    align-items: center;
    border-top: 1rpx solid #e5e5e5;
    border-bottom: 1rpx solid #e5e5e5;
    padding: 20rpx 0;
    margin-top: 40rpx;
    font-size: 24rpx;
    color: #666;
}

.user-card .avatar {
    width: 140rpx;
    border: 1rpx solid #eee;
    margin-right: 40rpx;
    border-radius: 50%;
    overflow: hidden;
}

.user-card .nickname {
    padding-bottom: 20rpx;
    font-size: 28rpx;
}

.modal-box .footer {
    padding: 40rpx;
    padding-top: 0;
    display: flex;
}

.modal-box .footer button {
    width: 100%;
}

.modal-box .footer .cancel,
.modal-box .footer .auth {
    width: 50%;
}

.modal-box .footer .cancel {
    margin-right: 20rpx;
}
</style>
