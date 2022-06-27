<template>
	<block>
		<view class="cu-list goods">
			<view class="cu-item bg-white" v-for="(item, index) in list" :key="item.id">
				<view class="content">
					<view class="text-black padding-bottom-xl">
					寄件物品：{{ item.name }}
					</view>
					<view class="text-black padding-bottom-xl">
					起始地址：{{ item.start_address }}
					</view>
					<view class="text-black padding-bottom-xl">
					配送地址：{{ item.end_address }}
					</view>
					<view class="text-black padding-bottom-xl">
					配送金额：{{ item.price }}
					</view>
					<view class="hide" name="id">
						{{ item.id }}
					</view>
				</view>
				
<!-- 				<navigator class="margin-lr-lg" :url="'../../add_detail/buying/edit_buy?id=' + item.id">
				    <text class="cuIcon-write text-orange"></text>
				</navigator> -->
				
				   <view class="content">
					   <navigator class="cu-tag round bg-red margin-right-sm" :url="'detail?id=' + item.id">
					   <text class="cu-tag round bg-red margin-right-sm" @click="order(item)">						   
						   点击抢单</text>
						   </navigator>
				   </view>
				
			</view>
		</view>
	</block>
</template>

<script>
	// pages/goods/list/index.js
	import {
		runner,Goods
	} from '../../api/index.js';
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
		onShow: function() {
			this.loadList();
		},
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
			onchange(item) {
				this.id = item.id
			},
			// 获取商品列表
			async loadList() {
				let {
					data
				} = await runner.list({});
				if (data) {
					this.setData({
						list: data
					});
				}
			},
			async order(item) {
				this.id=item.id;
				let {id}=this
				let {
					states
				} = await runner.order({id});
				if (data) {
					this.setData({
						data: data
					});
				}
				this.loadList();
			},

		





			// async cate_off(item) {
			//            this.id=item.id
			//   let {id}=this
			// 	let {
			// 		status
			// 	} = await User.cat_off(
			// 		id
			// 	);
			// 	if (status) {
			// 		uni.showToast({
			// 			title: '删除成功',
			// 			duration: 1000
			// 		});
			// 	}
			// },
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
		padding-left: 32rpx;
		border-bottom: 1rpx solid #eee;
	}

	.goods .hide {
		display: none;
	}

	.goods .edit {
		margin-left: 150rpx;
	}
</style>
