<template>
    <block>
        <view class="cu-list goods">
			
            <navigator :url="'detail?id=' + item.id" class="cu-item bg-white" v-for="(item, index) in list" :key="item.id">
                <view class="cu-avatar photo radius lg" :style="'background-image:url(' + item.img + ');'"></view>

                <view class="content">
                    <view class="text-black padding-bottom-xl">
                        丢失物品：{{ item.name }}
                    </view>
                    <!-- <view class="text-black padding-bottom-xl">
                        丢失时间：{{ item.time }}
                    </view>
					<view class="text-black padding-bottom-xl">
					    丢失地点：{{ item.address }}
					</view>
					<view class="text-black padding-bottom-xl">
					    联系人微信：{{ item.person_wechat }}
					</view>
					<view class="text-black padding-bottom-xl">
					    联系人：{{ item.person_connect }}
					</view> -->
                </view>
            </navigator>
        </view>
    </block>
</template>

<script>
// pages/goods/list/index.js
import { noticefounds } from '../../../api/index.js';
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

    /**
     * 页面上拉触底事件的处理函数
     */

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        // 获取商品列表
			async loadList() {
				let {
					list
				} = await noticefounds.list({});
				if (list) {
					this.setData({
						list: [...list]
					});
					
				}
			},
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
