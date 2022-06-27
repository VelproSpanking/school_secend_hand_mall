<template>
	<block>
		<view class="cu-list goods"  v-for="(item, index) in list" :key="item.id">
			<view class="cu-item bg-white">
				<view class="content">
					<view class="text-black padding-bottom-xl">
						寄件物品：{{ item.name }}
					</view>
					<view class="text-black padding-bottom-xl">
						寄件人：{{ item.start_people }}
					</view>
					<view class="text-black padding-bottom-xl">
						寄件人联系方式：{{ item.start_tel }}
					</view>
					<view class="text-black padding-bottom-xl">
						起始地址：{{ item.start_address }}
					</view>
					<view class="text-black padding-bottom-xl">
						收件人：{{ item.end_people }}
					</view>
					<view class="text-black padding-bottom-xl">
						收件人联系方式：{{ item.end_tel }}
					</view>
					<view class="text-black padding-bottom-xl">
						配送地址：{{ item.end_address }}
					</view>
					<view class="text-black padding-bottom-xl">
						配送金额：{{ item.price }}
					</view>
					<view class="text-black padding-bottom-xl">
						截止时间：{{ item.dead_time }}
					</view>
					<view class="hide" name="id">
						{{ item.id }}
					</view>

				</view>
				
			</view>
			<view class="cu-bar bg-white tabbar border shop">
				<view data-action="AddCart" @tap="serviceClick(list)" class="bg-orange submit">点击送达</view>
			</view>
		</view>
	</block>
</template>

<script>
	// pages/goods/list/index.js
	import {
		runner,
		Goods
	} from '../../api/index.js';
	export default {
		data() {
			return {
				list: [],
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
					id
				} = this;
				let {
					list
				} = await runner.detail({
					id
				});
				if (list) {
					this.setData({
						list: [...list]
					});
				}
			},

			serviceClick(list) {
				let {id}=this
				this.id=list.id
				uni.showModal({
					title: '确认',
					content: '是否送达？',
					success: async ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							let {
								status,
								msg
							} = await runner.service({id});
							if (status) {
								uni.switchTab({
									url: '/pages/cart/index'
								});
							}
						}
					}
				});
			},
			// async order() {
			// 	let {
			// 		list
			// 	} = await runner.detail({});
			// 	// if (list) {
			// 	// 	this.setData({
			// 	// 		list: [...list]
			// 	// 	});
			// 	// }
			// },






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
.shop.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
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
