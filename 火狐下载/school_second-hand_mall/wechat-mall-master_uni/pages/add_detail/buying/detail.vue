<template>
    <!-- pages/goods/detail/index.wxml -->
    <view>
        </swiper>
        <!-- 名称 -->
        <view class="goods-card padding-lg bg-white">
            求购名称:<view class="text-black text-lg padding-bottom-lg">{{ goods.name }}</view>
        </view>
		<view class="goods-card padding-lg bg-white">发布时间：
			    <view class="text-black text-lg padding-bottom-lg">{{ goods.create_time }}</view>
		</view>
        <!-- 详情 -->
        <view class="cu-bar bg-white margin-top-sm">
            <view class="content text-black">— 求购详情 —</view>
        </view>
        <!-- 富文本 -->求购描述
        <rich-text :nodes="goods.detail"></rich-text>

        <!-- 底部bar -->
        <view class="cu-bar bg-white tabbar border shop">
            <view data-action="AddCart" @tap="openWechat(goods)" class="bg-orange submit">微信</view>
        </view>
		    </view>
</template>

<script>
// pages/goods/detail/index.js
import { buys} from '../../../api/index.js';
export default {
    data() {
        return {
            id: 0,
            goods: {
                name: '',
                price: '',
                detail: '',
                img_md: '',
				telphone:'',
				wechat:'',
            },
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function ({ id }) {
        this.setData({
            id
        });
        this.loadDetail();
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
      openWechat(goods){
	    uni.showModal({
	    	title:'微信',
			content:goods.wechat
	    })
     },
    // 加载详情
        async loadDetail() {
            let { id } = this;
            let { status, list } = await buys.detail({
                id
            });
            if (status) {
                this.setData({
                    goods: list
                });
				this.goods.create_time=this.list.create_time.slice(0,19).replace(/[T]/g,' ');
            }
        },
    }
};
</script>
<style>
/* pages/goods/detail/index.wxss */

page {
    padding-bottom: 100rpx;
}


.shop.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}

.goods-card .icon {
    width: 20rpx;
    height: 20rpx;
}

.bottom-modal .goods .photo {
    width: 200rpx;
    height: 200rpx;
}

.bottom-modal .specs .count {
    line-height: 64rpx;
}

.bottom-modal button:not([size='mini']) {
    width: 100%;
}
.time{
	float: right;
}
</style>
