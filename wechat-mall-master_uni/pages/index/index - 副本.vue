<template>
    <block>
        <!-- pages/index/index.wxml -->
        <rich-text :nodes="detail"></rich-text>
        <!-- 自定义组件 -->
        <auth-modal @permit="handlePermit" :is-show="authModalShow"></auth-modal>
    </block>
</template>

<script>
import authModal from '../../components/Auth-Modal/index';
// pages/index/index.js
export default {
    components: {
        authModal
    },
    data() {
        return {
            authModalShow: false,
            detail: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let isAuth = uni.getStorageSync('isAuth');
        this.setData({
            authModalShow: !isAuth
        });
    },
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
    methods: {
        // 授权成功
        handlePermit(e) {
            this.setData({
                authModalShow: false
            });
            uni.showTabBar();
        }
    }
};
</script>
<style>
/* pages/index/index.wxss */
</style>
