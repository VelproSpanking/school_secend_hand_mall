<template>
	<view class="home">
		
			<form @submit="handleSearch">
			    <view class="cu-bar search bg-white">
			        <view class="search-form round">
			            <text class="cuIcon-search" ></text>
			            <input type="text" name="keyword" placeholder="搜索宝贝" confirm-type="search" />
			        </view>
			        <view class="action">
			            <button form-type="submit" class="cu-btn bg-green shadow-blur round">搜索</button>
			        </view>
			    </view>
			</form>
		
		<swiper class="swiper" indicator-dots :autoplay="true" :interval="2000" circular>
			<view></view>
		  <swiper-item v-for="item in swipers" :key="item.id">
		    <image :src="item.img"></image>
		  </swiper-item>
		</swiper>
		<!-- //导航区域 -->
		<view class="nav">
					<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="navItemClick(item.path)">
						<view :class="item.icon"></view>
						<text>{{item.title}}</text>
					</view>
		</view>
		<!-- //推荐商品 -->
		<view class="hot_goods">
			<view class="tit">推荐商品</view>
			  <goods-list :goods="goods"></goods-list>
			  <view class="isOver" v-if="flag">--------不可以在往下划拉了--------</view>
			</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	import WxValidate from '../../utils/WxValidate.js'
	import {  lunbo ,hotGoods,Goods} from '../../api/index.js'
	export default {
		components: {"goods-list":goodsList},
		data() {
			return {
				swipers: [],
				keyword:"",
				goods: [],
				pageindex:1,
				flag:false,
				navs: [
									{
										icon: 'iconfont icon-ziyuan',
										title: '求购商品',
										path: '/pages/add_detail/buying/list'
									},
									{
										icon: 'iconfont icon-guanyuwomen',
										title: '寻物启事',
										path: '/pages/add_detail/Foundnotice/list'
									},
									{
										icon: 'iconfont icon-tupian',
										title: '失物招领',
										path: '/pages/add_detail/Lostandfound/list'
									},
									// {
									// 	icon: 'iconfont icon-shipin',
									// 	title: '跑腿',
									// 	path: '/pages/videos/videos'
									// },
									// // {
									// 	icon: 'iconfont icon-shipin',
									// 	title: '跑腿',
									// 	path: '/pages/videos/videos'
									// },
									// {
									// 	icon: 'iconfont icon-shipin',
									// 	title: '跑腿',
									// 	path: '/pages/videos/videos'
									// }
								]
			}
		},
		onLoad() {
			this.getSwipers();
			this.getGoodsList();
			this.initValidate();
			
		},
		
		onReachBottom(){
			if(this.goods.message==""||this.goods.message==null){
				return this.flag=true
			}
			console.log("到底了");
			this.pageindex++;
			this.getGoodsList()
		},
		methods: {
			navItemClick(path){
				uni.navigateTo({
					url: path
				});
			},
			handleSearch(event) {
			    // 提取表单数据
			    let formData = event.detail.value; // 传入表单数据，调用验证方法
			
			    let isValid = this.WxValidate.checkForm(formData);
			
			    if (!isValid) {
			        let { msg } = this.WxValidate.errorList[0];
			        uni.showToast({
			            title: msg,
			            icon: 'none'
			        });
			        return false;
			    }
			
			    uni.navigateTo({
			        //url: `../../pageA/search/list/index?keyword=${formData.keyword}`
					url: `../list/index?keyword=${formData.keyword}`
			    });
			},
			initValidate() {
			    // 验证字段的规则
			    const rules = {
			        keyword: {
			            required: true,
			            minlength: 2
			        }
			    }; // 验证字段的提示信息，若不传则调用默认的信息
			
			    const messages = {
			        keyword: {
			            required: '请输入搜索的关键字！'
			        }
			    }; // 创建实例对象
			
			    this.WxValidate = new WxValidate(rules, messages);
			},


		  
		  //获取商品列表数据
		  // async getGoodsList(){
			 //  let { data } = await hotGoods.hotGoods({
			 //  });
			 //  if (data) {
			 //      this.setData({
			 //          goods: [...data]
			 //      });
			 //  }
		  // },
		  
		  async getGoodsList(){
		  			  let { data } = await Goods.all({
		  			  });
		  			  if (data) {
		  			      this.setData({
		  			          goods: [...data]
		  			      });
		  			  }
		  },
		  async getSwipers(){ 
		      let { data } = await lunbo.lunbo({
		      });
			  if (data) {
			      this.setData({
			          swipers: [...data]
			      });
			  }
		  },
		  
	   }
	}
</script>

<style lang="scss">
	.home{
		swiper{
			width: 750rpx;
			height: 380rpx;
			image{
				height: 100%;
				width: 100%;
			}
		}
				.nav {
					display: flex;
					margin: 0 auto; 
					text-align: center;
					.nav_item {
						width: 25%;
						text-align: center;
						view{
							width: 120rpx;
							height: 120rpx;
							background:#ff0000;
							border-radius: 60rpx;
							margin: 10px auto;
							line-height: 120rpx;
							color: #fff;
							font-size: 50rpx;
						}
						.icon-tupian{
							font-size: 45rpx;
						}
						text{
							font-size: 30rpx;
						}
					}
				}
		.hot_goods{
			background: #eeee;
			overflow: hidden;
			margin-top: 10px;
			.tit{
				height: 50rpx;
				line-height: 50rpx;
				color: #b50e03;
				text-align: center;
				letter-spacing: 20px;
				background: #fff;
				margin: 7px 0;
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
