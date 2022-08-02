<template>
    <!-- pages/user/address/list/index.wxml -->
    <view>
        <view class="cu-list menu sm-border padding-sm">
            <view class="cu-item margin-bottom-sm" v-for="(item, index) in list" :key="item.id">
                <view class="content padding-tb-lg">
                    <view class="text-bold">
                        <text>{{ item.name }}</text>
                        <text class="margin-left-lg">{{ item.tel }}</text>
                    </view>
                    <view class="text-sm">{{ item.province }}{{ item.city }}{{ item.county }}{{ item.street }}</view>
                </view>

                <view class="action text-xl flex align-center">
                    <navigator class="margin-lr-lg" :url="'../edit/index?id=' + item.id">
                        <text class="cuIcon-write text-orange"></text>
                    </navigator>
                    <text :data-id="item.id" :data-index="index" @tap="removeHandle" class="cuIcon-close text-grey"></text>
                </view>
            </view>
        </view>
        <!-- 底部 -->
        <view class="cu-bar foot btn-group">
            <button class="cu-btn bg-red round shadow-blur">
                <navigator url="../add/index">新建收货地址</navigator>
            </button>
        </view>
    </view>
</template>

<script>
// pages/user/address/list/index.js
import { Address } from '../../../../api/index.js';
export default {
    data() {
        return {
            list: []
        };
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
    onShow: function () {
        this.loadList();
    },
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
        // 删除地址
        removeHandle({
            target: {
                dataset: { id, index }
            }
        }) 
		{
            uni.showModal({
                title: '确认',
                content: '确定要删除此地址？',
                success: async ({ confirm, cancel }) => {
                    if (confirm) {
                        let { status, msg } = await Address.remove(id);

                        if (status) {
                            uni.showToast({
                                title: msg,
                                icon: 'none'
                            }); // 更新视图

                            this.list.splice(index, 1);
                            this.setData({
                                list: this.list
                            });
                        }
                    }
                }
            });
        },

        // 获取地址列表
        async loadList() {
            let { status, data } = await Address.list();

            if (status) {
                this.setData({
                    list: data
                });
            }
        }
    }
};
</script>
<style>
/* pages/user/address/list/index.wxss */
.cu-bar.foot {
    box-shadow: none;
}
</style>
