<template>
    <block>
        <!-- pages/search/list/index.wxml -->
        <!-- 筛选bar -->
<!--        <scroll-view scroll-x class="bg-white nav">
            <view class="flex text-center">
                <view class="cu-item flex-sub text-orange cur">综合</view>
                <view class="cu-item flex-sub">销量</view>
                <view class="cu-item flex-sub">新品</view>
                <view class="cu-item flex-sub">价格</view>
            </view>
        </scroll-view> -->
        <!-- 列表数据 -->
        <view class="cu-list goods">
            <navigator :url="'../goods/detail/index?id=' + item.id" class="cu-item bg-white" v-for="(item, index) in list" :key="item.id">
                <image class="cu-avatar photo radius lg" :src="host + item.img_md"></image>

                <view class="content">
                    <view class="text-black padding-bottom-xl">
                        {{ item.name }}
                    </view>
                    <view class="flex align-end">
                        <view class="text-red margin-right-sm">
                            <text class="text-price text-lg">{{ item.price }}</text>
                        </view>
                        <view class="text-gray">
                            <text class="text-price text-sm">280</text>
                        </view>
                    </view>
                </view>
            </navigator>
        </view>
    </block>
</template>

<script>
// pages/search/list/index.js
import { Goods } from '../../api/index.js';
export default {
    data() {
        return {
            list: [],
            currentIndex: 1,

            //当前第几页
            sort: '',

            //是否无新数据
            isEnd: false,

            goods: [],
            host: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.loadList();
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
    onPullDownRefresh: function () {
        this.loadList(1);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        //无新数据
        if (this.isEnd) {
            uni.showToast({
                title: '暂无新数据！',
                icon: 'none'
            });
            return;
        }

        this.setData({
            currentIndex: ++this.currentIndex
        });
        this.loadList();
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        // 获取商品列表
        async loadList() {
            // 当前第几页
            let i = this.currentIndex;
            let { status, goods } = await Goods.list({
                pageIndex: i,
                pageSize: 5
            });

            if (status) {
                // 暂无新数据
                if (goods.length == 0) {
                    uni.showToast({
                        title: '暂无新数据！',
                        icon: 'none'
                    });
                    this.setData({
                        currentIndex: i - 1,
                        isEnd: true
                    });
                    return;
                } // 下拉刷新

                if (i == 1) {
                    this.setData({
                        list: goods
                    });
                    uni.stopPullDownRefresh();
                    return;
                } // i >= 2 上拉加载

                let { list } = this;
                this.setData({
                    list: [...list, ...goods]
                });
                uni.stopPullDownRefresh();
            }
        }
    }
};
</script>
<style>
/* pages/search/list/index.wxss */
.goods .cu-item {
    display: flex;
    padding-top: 35rpx;
}

.goods .photo {
    width: 201rpx;
    height: 190rpx;
    margin: 0 26rpx;
}

.goods .content {
    width: 466rpx;
    padding-bottom: 32rpx;
    border-bottom: 1rpx solid #eee;
}
</style>
