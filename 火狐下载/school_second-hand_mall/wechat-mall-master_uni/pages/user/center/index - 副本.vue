<template>
    <block>
        <!-- pages/user/center/index.wxml -->
        <view class="user-card text-white text-center bg-red">
            <view class="left">
                <view class="text-lg margin-bottom-xs">150</view>
                <text class="cu-tag bg-orange radius">我的积分</text>
            </view>
            <view>
                <view class="avatar">
                    <open-data type="userAvatarUrl"></open-data>
                </view>
                <view class="text-df margin-tb-xs">
                    <open-data type="userNickName"></open-data>
                </view>
                <view class="text-xs">(ID:12)</view>
            </view>
            <view class="right">
                <view class="margin-bottom-xs">
                    <text class="text-lg">120</text>
                    <text class="text-sm">.00</text>
                </view>
                <text class="cu-tag bg-orange radius">可提现金额</text>
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
                    <view class="cuIcon-pay text-grey"></view>
                    <text>待付款</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-send text-grey"></view>
                    <text>待发货</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-deliver text-grey"></view>
                    <text>待收货</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-comment text-grey"></view>
                    <text>待评价</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-refund text-grey"></view>
                    <text>退换/售后</text>
                </view>
            </view>
            <!-- 服务 -->
            <view class="cu-bar bg-white solid-bottom margin-top">
                <view class="action">我的服务</view>
            </view>
            <view class="cu-list grid col-4 no-border">
                <view class="cu-item">
                    <view class="cuIcon-choiceness text-grey"></view>
                    <text>我的积分</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-friend text-grey"></view>
                    <text>团队成员</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-moneybag text-grey"></view>
                    <text>申请提现</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-qrcode text-grey"></view>
                    <text>推广二维码</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-choiceness text-grey"></view>
                    <text>团队销售额</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-choiceness text-grey"></view>
                    <text>其他</text>
                </view>
            </view>
            <view class="cu-list grid col-4 no-border">
                <view class="cu-item">
                    <navigator>
                        <view class="cuIcon-settings text-grey"></view>
                        <text>设置</text>
                    </navigator>
                </view>
                <view class="cu-item">
                    <navigator url="../address/list/index">
                        <view class="cuIcon-location text-grey"></view>
                        <text>地址</text>
                    </navigator>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-favor text-grey"></view>
                    <text>收藏</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-footprint text-grey"></view>
                    <text>足迹</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-service text-grey"></view>
                    <text>在线客服</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-choiceness text-grey"></view>
                    <text>企业采购</text>
                </view>
                <view class="cu-item">
                    <view class="cuIcon-choiceness text-grey"></view>
                    <text>货源推荐</text>
                </view>
            </view>
        </view>
    </block>
</template>

<script>
// pages/user/center/index.js
export default {
    data() {
        return {};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
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
    methods: {}
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
