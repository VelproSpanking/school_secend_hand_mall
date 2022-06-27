<template>
	<block>
		<view class="cu-list goods">
			<view class="cu-item bg-white" v-for="(item, index) in list" :key="item.id">				
					<navigator :url="'../../add_detail/Foundnotice/detail?id=' + item.id">
						<view class="cu-avatar photo radius lg" :style="'background-image:url(' + item.img+');'">
						</view>
					</navigator>
					<view class="text-black padding-bottom-xl">
						丢失物品：{{ item.name }}
					</view>
					<view class="hide" name="id">
						{{ item.id }}
					</view>
				<view class="flex align-end">
					<view class="action text-xl flex align-center">
					    <navigator class="margin-lr-lg" :url="'../../add_detail/Foundnotice/edit?id=' + item.id">
					        <text class="cuIcon-write text-orange"></text>
					    </navigator>
					    <text :data-id="item.id" :data-index="index" @tap="removeHandle" class="cuIcon-close text-grey"></text>
					</view>
				</view>
			</view>
		</view>
	</block>
</template>

<script>
	// pages/goods/list/index.js
	import {
		User
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
			async loadList() {
				let {
					list
				} = await User.foundnotice({});
				if (list) {
					this.setData({
						list: [...list]
					});
				}
			},

			removeHandle({
				target: {
					dataset: {
						id,
						index
					}
				}
			}) {
				uni.showModal({
					title: '确认',
			  content: '确定要删除这个订单吗？',
					success: async ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							let {
								status,
								msg
							} = await User.cat_off_foundnotice(id);

							if (status) {
								uni.showToast({
									title: msg,
									icon: 'none'
								}); // 更新视图
								this.loadList();

							}
						}
					}
				});
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
		padding-left: 30rpx;
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

	.goods .hide {
		display: none;
	}

	.goods .edit {
		margin-left: 150rpx;
	}
</style>
