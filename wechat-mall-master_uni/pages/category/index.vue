<template>
    <!-- pages/category/index.wxml -->
    <view class="category flex bg-white">
        <!-- 左侧 -->
        <scroll-view scroll-y class="left">
            <view
                :data-i="index"
                :data-id="item.id"
                @tap="handleChange"
                :class="activeIndex == index ? 'item active' : 'item'"
                scroll-with-animation
                v-for="(item, index) in cate_1st"
                :key="item.id"
            >
                {{ item.name }}
            </view>
        </scroll-view>
        <!-- 右侧 -->
        <scroll-view enable-flex scroll-y class="right padding-sm">
            <!-- 轮播图 -->
            <swiper class="screen-swiper round-dot" indicator-dots circular duration="500">
                <swiper-item>
                    <image :src="cate_1st[activeIndex].img" mode="aspectFill"></image>
                </swiper-item>
            </swiper>
            <block v-for="(item, index) in cate_2nd" :key="item.id">
                <!-- 二级分类 -->

                <view class="cu-bar bg-white solid-bottom">
                    <view class="action">
                        <text>{{ item.name }}</text>
                    </view>
                </view>

                <!-- 三级分类 -->

                <view class="subcate flex flex-wrap">
                    <navigator :url="'../goods/list/index?id=' + item.id" class="item text-center padding-top-lg" v-for="(item, index1) in item.cate_3rd" :key="item.id">
                        <image class="cu-avatar xl radius" :src="item.img"></image>

                        <view class="name margin-top-sm text-sm">{{ item.name }}</view>
                    </navigator>
                </view>
            </block>
        </scroll-view>
    </view>
</template>

<script>
// pages/cartergory/index.js
import { Category } from '../../api/index';
export default {
    data() {
        return {
            cate_1st: [],
            cate_2nd: [],
            activeIndex: 0
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: async function (options) {
        let cate_1st = await this.loadSubcate(1);
        this.setData({
            cate_1st
        }); // 获取一级分类的第一项的子分类

        this.loadCate_2nd(cate_1st[0].id);
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
        async handleChange(e) {
            let { i, id } = e.target.dataset;
            this.setData({
                activeIndex: i
            });
            this.loadCate_2nd(id);
        },

        // 加载二级分类、三级分类
        async loadCate_2nd(id) {
            // 获取二级分类
            let cate_2nd = await this.loadSubcate(id); // 获取三级分类
            for (let i = 0; i < cate_2nd.length; i++) {
                const item = cate_2nd[i];
                item.cate_3rd = await this.loadSubcate(item.id);
            }

            this.setData({
                cate_2nd
            });
        },

        // 获取子级分类
        async loadSubcate(id) {
            let { status, data } = await Category.subCate({
                pId: id
            });

            if (status) {
                return data;
            }
        }
    }
};
</script>
<style>
/* pages/category/index.wxss */
.category .left {
    width: 150rpx;
    height: 100vh;
    padding-top: 34rpx;
    border-right: 1rpx solid #ddd;
}

.left .item {
    margin-bottom: 34rpx;
    padding: 6rpx 0rpx;
    border-left: 4rpx solid white;
    color: #101010;
    font-size: 26rpx;
    text-align: center;
}

.left .item.active {
    border-left: 4rpx solid #ff2732;
    color: #ff2732;
}

.category .right {
    width: 600rpx;
    height: 100vh;
}

.category .right .screen-swiper {
    min-height: 200rpx;
}

.category .subcate .item {
    width: 33.33333%;
}
</style>
