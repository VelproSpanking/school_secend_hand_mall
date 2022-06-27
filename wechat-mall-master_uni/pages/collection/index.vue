<template>
	<view class="goods_list">
		<navigator :url="'../goods/detail/index?id=' + item.goods_id" class="goods_item" v-for="item in list" :key="item.id" @click="navigator(item.id)">
			<image :src="item.img_md"></image>
			<view class="price">
				<text>￥{{item.price}}</text>
				<text>￥{{item.marketPrice}}</text>
			</view>
			<view class="name">
				{{item.name}}
			</view>
		</navigator>
	</view>
</template>

<script>
import {Collection } from '../../api/index.js';
	export default {
		data(){
			return{
				list:[]
			}
		},
		onLoad: function ({ id }) {
		    this.setData({
		        id
		    });
		    this.loadList();
		},
		methods: {		
			async loadList(){
			let { data } = await Collection.list({
				});
						  if (data) {
						      this.setData({
						          list: [...data]
						      });
						  }
			},
		}
	}
</script>

<style lang="scss">
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
			height: 600rpx;
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
				padding-bottom: 15rpx;
				padding-top: 10rpx;
			}
		}
	}
</style>
