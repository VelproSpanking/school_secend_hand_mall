<template>
    <block>
        <!-- pages/user/center/index.wxml -->
        <view class="user-card text-white text-center bg-red">
            <view>
                <view class="avatar">
                    <open-data type="userAvatarUrl"></open-data>
                </view>
                <view class="text-df margin-tb-xs">
                    <open-data type="userNickName"></open-data>
                </view>
            </view>
            <view class="right">
                <text class="cu-tag bg-orange radius" @click="quit()">退出登录</text>
            </view>
        </view>

        <view class="padding-sm">
            <!-- 订单 -->
            <view class="cu-bar bg-white solid-bottom margin-top">
                <view class="action">我的订单</view>
                <view class="action">
                    <text class="cuIcon-right text-gray"></text>
                </view>
            </view>
            <view class="cu-list grid col-5 no-border">
                <view class="cu-item">
					<navigator url="../mine_ldle/index">
                    <view class="cuIcon-pay text-grey"></view>
                    <text>我的发布</text>
					</navigator>
                </view>
                <view class="cu-item">
					<navigator url="../mine_buy/index">
                    <view class="cuIcon-send text-grey"></view>
                    <text>我的求购</text>
					</navigator>
                </view>
                <view class="cu-item">
					<navigator url="../mine_runner/index">
                    <view class="cuIcon-deliver text-grey"></view>
                    <text>我的跑腿</text>
					</navigator>
                </view>
                <view class="cu-item">
					<navigator url="../mine_runner_order/index">
                    <view class="cuIcon-choiceness text-grey"></view>
                    <text>我的抢单</text>
					</navigator>
                </view>
				<view class="cu-item">
					<navigator url="../../collection/index">
				    <view class="cuIcon-favor text-grey"></view>
				    <text>收藏</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator url="../mine_foundnotice/index">
				    <view class="cuIcon-footprint text-grey"></view>
				    <text>我的寻物启事</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator url="../mine_lostandfound/index">
				    <view class="cuIcon-refund text-grey"></view>
				    <text>我的失物招领</text>
					</navigator>
				</view>
            </view>
        </view>
    </block>
</template>

<script>
// pages/user/center/index.js
import {  User } from '../../../api/index.js'
export default {
    data() {
        return {
			nickName:''
		};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
		const userInfo = uni.getStorageSync('userInfo');
		let nickName=userInfo.nickName
		console.log(userInfo);
		console.log(userInfo.nickName);
	    console.log(nickName);
	},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
		const userInfo = uni.getStorageSync('userInfo');
		let nickName=userInfo.nickName
		console.log(userInfo);
		console.log(userInfo.nickName);
		console.log(nickName);
	},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

	},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
		 quit(){
			let { data } = User.logout({
			});
		}
	}
};
</script>
<style>
/* pages/user/center/index.wxss */

.user-card {
    height: 200rpx;
    padding-left: 45rpx;
    padding-right: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user-card .avatar {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    overflow: hidden;
}
</style>
