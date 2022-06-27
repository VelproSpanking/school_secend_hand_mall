<template>
	<view class="home">
	    <view class="hot_goods">
		  <view class="goods_list">
		  	<navigator :url="'detail?id=' + item.id" class="goods_item" v-for="item in list" :key="item.id">
		  		<view class="price">
					求购：
		  			<text>{{item.name}}</text>
		  		</view>
		  		<view class="name">
					详细描述：
		  			{{item.detail}}
		  		</view>
				<view class="name">
					发布时间：
					{{item.create_time}}
				</view>
		  	</navigator>
		  </view>
		   <view class="isOver" v-if="flag">--------不可以在往下划拉了--------</view>
	    </view>
	</view>
</template>

<script>
	// pages/goods/list/index.js
	import {
		buys
	} from '../../../api/index.js';
	export default {
		data() {
			return {
				list: [],
				id: 0,
			};
		}
		/**
		 * 生命周期函数--监听页面加载
		 */
		,
		onLoad: function({
			id
		}) {
			this.setData({
				id
			});
			this.loadList();
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			// 获取商品列表
			async loadList() {
				let {
					list
				} = await buys.list({});
				if (list) {
					this.setData({
						list: [...list]
					});
					this.goods.create_time=this.list.create_time.slice(0,19).replace(/[T]/g,' ');
				}
			},
		}
	};
</script>
<style lang="scss">
.home{
		.hot_goods{
			background: #eeee;
			overflow: hidden;
			margin-top: 10px;
			.goods_list {
				padding: 0 15rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.goods_item {
					background: #fff;
					width: 355rpx;
					margin: 10rpx 0;
					padding: 15rpx;
					box-sizing: border-box;
					height: 300rpx;
					image{
						width: 80%;
						//height: 150px;
						height: 60%;
						display: block;
						margin: auto;
					}
					.price{
						color: #4CD964;
						font-size: 36rpx;
						margin: 20rpx 0 5rpx 0;
						text:nth-child(2){
							color: #ccc;
							font-size: 28rpx;
							margin-left: 17rpx;
							text-decoration: line-through;
						}
					}
					
					.name {
						font-size: 28rpx;
						line-height: 50rpx;
						// padding-bottom: 15rpx;
						// padding-top: 10rpx;
					}
				}
			}
			.isOver{
				width: 100%;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				font-size: 25rpx;
			}
		}
	}
	
</style>
