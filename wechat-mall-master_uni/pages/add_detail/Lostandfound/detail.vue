<template>
    <!-- pages/goods/detail/index.wxml -->
    <view>
        <swiper class="screen-swiper" indicator-dots>
            <swiper-item class="swiper-item" >
                <image mode="aspectFill" :src="goods.img"></image>
            </swiper-item>
        </swiper>
        <!-- 名称 -->
		<view class="goods-card padding-lg bg-white">
		   <view class="text-black text-lg padding-bottom-lg"> 拾到物品名称:{{ goods.name }}</view>
		<!-- </view>
		<view class="goods-card padding-lg bg-white"> -->
		    <view class="text-black text-lg padding-bottom-lg">拾到物品地点:{{ goods.address }}</view>
		<!-- </view>
		<view class="goods-card padding-lg bg-white"> -->
			    <view class="text-black text-lg padding-bottom-lg">拾到物品时间：{{ goods.lost_time }}</view>
		<!-- </view>
		<view class="goods-card padding-lg bg-white"> -->
		   <view class="text-black text-lg padding-bottom-lg">联系人: {{ goods.person_connect }}</view>
		</view>

        <view class="cu-bar bg-white tabbar border shop">
            <view data-action="AddCart" @tap="openWechat(goods)" class="bg-orange submit">联系人微信</view>
        </view>
        
    </view>
</template>

<script>
// pages/goods/detail/index.js
import { lostandfounds } from '../../../api/index.js';
export default {
    data() {
        return {
            id: 0,
            num: 1,
            goods: {
                isCollected: false,
                slider: [],
                name: '',
                price: '',
                detail: '',
                img_md: '',
				telphone:'',
				wechat:'',
            },
            specs: [
                {
                    id: 1,
                    name: '白色',
                    price: 65
                },
                {
                    id: 2,
                    name: '蓝色',
                    price: 65
                }
            ],
            chosedIndex: '',
            isModalShow: false,
            action: '' //操作：加入购物车/立即购买
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
        // 打开规格Modal
      openWechat(goods){
	    uni.showModal({
	    	title:'微信',
			content:goods.wechat
	    })
     },

        // 加载详情
        async loadDetail() {
            let { id } = this;
            let { status, list } = await lostandfounds.detail({
                id
            });

            if (status) {
                this.setData({
                    goods: list
                });
				//this.goods.time=this.list.time.slice(0,19).replace(/[T]/g,' ');
				//console.log(this.goods.time)
				console.log(this.list.time);
            }
        }
    }
};
</script>
<style>
/* pages/goods/detail/index.wxss */

page {
    padding-bottom: 100rpx;
}

.screen-swiper {
    height: 750rpx;
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
</style>
