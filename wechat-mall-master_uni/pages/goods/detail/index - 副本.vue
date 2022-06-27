<template>
    <!-- pages/goods/detail/index.wxml -->
    <view>
        <swiper class="screen-swiper" indicator-dots>
            <swiper-item class="swiper-item" v-for="(item, index) in goods.slider" :key="index">
                <image mode="aspectFill" :src="item"></image>
            </swiper-item>
        </swiper>
        <!-- 名称 -->
        <view class="goods-card padding-lg bg-white">
            <view class="text-black text-lg padding-bottom-lg">{{ goods.name }}</view>
            <view class="flex justify-between">
                <view class="flex align-center text-red">
                    <image class="icon margin-right-sm" src="/static/static/icons/icon-database.png"></image>
                    <text class="text-xs">积分抵扣：</text>
                    <text class="text-sm">21.8</text>
                </view>
                <view class="flex align-center">
                    <text class="cu-tag round bg-red margin-right-sm">到手价</text>
                    <text class="text-black text-lg">￥{{ goods.price }}</text>
                </view>
            </view>
            <view class="flex align-center text-red text-xs">
                <image class="icon margin-right-sm" src="/static/static/icons/icon-money.png"></image>
                <text>赚</text>
                <text class="text-sm margin-right-lg">￥13.9</text>
                <text class="text-grey">佣金比例：</text>
                <text class="text-grey">15.00%</text>
            </view>
        </view>
        <!-- 详情 -->
        <view class="cu-bar bg-white margin-top-sm">
            <view class="content text-black">— 商品详情 —</view>
        </view>
        <!-- 富文本 -->
        <rich-text :nodes="goods.detail"></rich-text>
        <!-- 底部bar -->
        <view class="cu-bar bg-white tabbar border shop">
            <view class="action">
                <view class="cuIcon-service text-green"></view>
                客服
            </view>
            <view @tap="handleCollect" class="action text-orange">
                <view :class="goods.isCollected ? 'cuIcon-favorfill' : 'cuIcon-favor'"></view>
                收藏
            </view>
            <navigator url="../../cart/index" class="action" open-type="switchTab">
                <view class="cuIcon-cart">
                    <view class="cu-tag badge">9</view>
                </view>
                购物车
            </navigator>
            <view data-action="AddCart" @tap="openSpecsModal" class="bg-orange submit">加入购物车</view>
            <view data-action="Purchase" @tap="openSpecsModal" class="bg-red submit">立即购买</view>
        </view>
        <!-- 弹层 -->
        <view :class="'cu-modal text-left bottom-modal ' + (isModalShow ? 'show' : '') + ' '">
            <view class="cu-dialog bg-white">
                <view class="flex justify-between padding">
                    <view class="goods flex align-end">
                        <image class="photo" :src="goods.img_md"></image>
                        <view class="info padding-left">
                            <view class="text-red">
                                <text>价格：</text>
                                <text class="text-price">{{ goods.price }}</text>
                            </view>
                            <view class="padding-top-xs text-sm text-grey">请选择规格属性</view>
                        </view>
                    </view>
                    <view class="action" @tap="closeSpecsModal">
                        <text class="cuIcon-close"></text>
                    </view>
                </view>
                <view class="padding-xl">
                    <!-- 规格 -->
                    <view class="specs">
                        <view class="title">尺寸</view>
                        <view class="flex margin-tb-sm">
                            <view
                                :data-index="index"
                                @tap="handleChoseSpecs"
                                :class="'cu-btn round margin-right ' + (chosedIndex == index ? 'line-red' : 'line-grey')"
                                size="mini"
                                v-for="(item, index) in specs"
                                :key="item.id"
                            >
                                {{ item.name }}
                            </view>
                        </view>
                    </view>
                    <!-- 数量 -->
                    <view class="specs">
                        <view class="title">数量</view>
                        <view class="padding-tb flex align-center text-center">
                            <button @tap="handleDecrease" class="cu-btn line-gray" size="mini">-</button>
                            <view class="count basis-xs solids-top solids-bottom">{{ num }}</view>
                            <button @tap="handleIncrease" class="cu-btn line-gray" size="mini">+</button>
                        </view>
                    </view>
                    <!-- 按钮 -->
                    <view class="padding-tb">
                        <button @tap="handleAddCart" v-if="action != 'Purchase'" class="cu-btn bg-red lg">加入购物车</button>
                        <button @tap="handlePurchase" v-if="action != 'AddCart'" class="cu-btn bg-red lg">立即购买</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/goods/detail/index.js
import { Goods, Collection, Cart } from '../../../api/index.js';
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
                img_md: ''
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
        // 收藏商品
        async handleCollect() {
            let {
                goods: { isCollected },
                id
            } = this;

            if (isCollected) {
                let { status } = await Collection.remove(id);

                if (status) {
                    uni.showToast({
                        title: '取消收藏成功！',
                        icon: 'none'
                    });
                    this.setData({
                        'goods.isCollected': false
                    });
                }
            } else {
                let { status } = await Collection.add({
                    id
                });

                if (status) {
                    uni.showToast({
                        title: '收藏成功！',
                        icon: 'none'
                    });
                    this.setData({
                        'goods.isCollected': true
                    });
                }
            }
        },

        // 加入购物车
        async handleAddCart() {
            let { id, num } = this;
            let { status } = await Cart.add({
                id,
                num
            });

            if (status) {
                uni.showToast({
                    title: '添加成功！',
                    icon: 'none'
                });
                this.closeSpecsModal();
            }
        },

        // 立即购买
        handlePurchase() {
            this.closeSpecsModal();
        },

        // 打开规格Modal
        openSpecsModal(e) {
            this.setData({
                isModalShow: true,
                action: e.target.dataset.action
            });
        },

        // 关闭规格Modal
        closeSpecsModal() {
            this.setData({
                isModalShow: false
            });
        },

        // 规格选择
        handleChoseSpecs(e) {
            this.setData({
                chosedIndex: e.target.dataset.index
            });
        },

        // 数量增加
        handleIncrease() {
            let { num } = this;

            if (num >= 10) {
                return;
            }

            this.setData({
                num: num + 1
            });
        },

        // 数量减少
        handleDecrease() {
            let { num } = this;

            if (num == 1) {
                return;
            }

            this.setData({
                num: num - 1
            });
        },

        // 加载详情
        async loadDetail() {
            let { id } = this;
            let { status, data } = await Goods.detail({
                id
            });

            if (status) {
                data.slider = data.slider.split(',');
                this.setData({
                    goods: data
                });
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
