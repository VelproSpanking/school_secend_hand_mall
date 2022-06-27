<template>
    <block>
        <!-- pages/search/bar/index.wxml -->
        <!-- 搜索操作条 -->
        <form @submit="handleSearch">
            <view class="cu-bar search bg-white">
                <view class="search-form round">
                    <text class="cuIcon-search"></text>
                    <input type="text" name="keyword" placeholder="搜索商品关键字" confirm-type="search" />
                </view>
                <view class="action">
                    <button form-type="submit" class="cu-btn bg-green shadow-blur round">搜索</button>
                </view>
            </view>
        </form>
    </block>
</template>

<script>
// pages/search/bar/index.js
export default {
    data() {
        return {};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.initValidate();
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
        // 搜索
        handleSearch(event) {
            // 提取表单数据
            let formData = event.detail.value; // 传入表单数据，调用验证方法

            let isValid = this.WxValidate.checkForm(formData);

            if (!isValid) {
                let { msg } = this.WxValidate.errorList[0];
                uni.showToast({
                    title: msg,
                    icon: 'none'
                });
                return false;
            }

            uni.navigateTo({
                url: `../list/index?keyword=${formData.keyword}`
            });
        },

        // 初始化表单验证
        initValidate() {
            // 验证字段的规则
            const rules = {
                keyword: {
                    required: true,
                    minlength: 2
                }
            }; // 验证字段的提示信息，若不传则调用默认的信息

            const messages = {
                keyword: {
                    required: '请输入搜索的关键字！'
                }
            }; // 创建实例对象

            this.WxValidate = new WxValidate(rules, messages);
        }
    }
};
</script>
<style>
/* pages/search/bar/index.wxss */
.cu-bar .action {
    width: 20%;
}
</style>
