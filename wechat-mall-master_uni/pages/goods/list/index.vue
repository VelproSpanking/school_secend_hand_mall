<template>
    <block>
        <!-- pages/goods/list/index.wxml -->
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
            <navigator :url="'../detail/index?id=' + item.id" class="cu-item bg-white" v-for="(item, index) in list" :key="item.id">
                <view class="cu-avatar photo radius lg" :style="'background-image:url(' + item.img_md + ');'"></view>

                <view class="content">
                    <view class="text-black padding-bottom-xl">
                        {{ item.name }}
                    </view>
                    <view class="flex align-end">
                        <view class="text-red margin-right-sm">
                            <text class="text-price text-lg">{{ item.price }}</text>
                        </view>
                        <view class="text-gray">
                            <text class="text-price text-sm">{{ item.marketPrice }}</text>
                        </view>
                    </view>
                </view>
            </navigator>
        </view>
    </block>
</template>

<script>
// pages/goods/list/index.js
import { Goods } from '../../../api/index.js';
export default {
    data() {
        return {
            list: [],
            id: '',
            //分类id
            pageIndex: 1,
            //当前第几页
            isEnd: false //是否无新数据
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function ({ id }) {
        this.setData({
            id
        });
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
        this.setData({
            pageIndex: 1
        });
        this.loadList();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let { isEnd, pageIndex } = this; //无新数据

        if (isEnd) {
            uni.showToast({
                title: '暂无新数据！',
                icon: 'none'
            });
            return;
        }

        this.setData({
            pageIndex: pageIndex + 1
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
            // 当前第几页，分类id
            let { pageIndex, id } = this;
            let { status, goods } = await Goods.list({
                pageIndex,
                pageSize: 6,
                cate_3rd: id
            });

            if (status) {
                // 暂无新数据
                if (goods.length == 0) {
                    uni.showToast({
                        title: '暂无新数据！',
                        icon: 'none'
                    });
                    this.setData({
                        pageIndex: pageIndex - 1,
                        isEnd: true
                    });
                    return;
                } // 下拉刷新

                if (pageIndex == 1) {
                    this.setData({
                        list: goods,
                        isEnd: false
                    });
                    uni.stopPullDownRefresh();
                    return;
                } // pageIndex >= 2 上拉加载

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
/* pages/goods/list/index.wxss */
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
