<template>
	<view>

		<view class="uni-padding-wrap uni-common-mt">
			<form enctype="multipart/form-data" @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">标题</view>
					<input class="uni-input" name="name" placeholder="输入宝贝名称等" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								一级分类
							</view>
							<view class="uni-list-cell-db">
								<picker @change="handleCateChange" name="cate_1st" :value="index" :range="array"
									range-key="name">
									<view class="uni-input">{{array[index].name}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>

				<view class="uni-form-item uni-column">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								二级分类
							</view>
							<view class="uni-list-cell-db">
								<picker @change="handleCateChange1" name="cate_2nd" :value="index1" :range="array1"
									range-key="name">
									<view class="uni-input">{{array1[index1].name}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>


				<view class="uni-form-item uni-column">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								三级分类
							</view>
							<view class="uni-list-cell-db">
								<picker @change="handleCateChange2" name="cate_3rd" :value="index2" :range="array2"
									range-key="name">
									<view class="uni-input">{{array2[index2].name}}</view>
								</picker>
							</view>

						</view>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">价格</view>
					<input class="uni-input" name="price" placeholder="输入宝贝卖价" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">原价</view>
					<input class="uni-input" name="marketPrice" placeholder="输入宝贝原价(大致价格)(元)" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">微信</view>
					<input class="uni-input" name="wechat" placeholder="输入您的微信号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">手机</view>
					<input class="uni-input" name="telphone" placeholder="输入您的手机号" />
				</view>
				<view class="uni-form-item uni-column">
					<textarea @blur="bindTextAreaBlur" auto-height placeholder="详细描述您的宝贝详情信息等" name="detail" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="imageA">
						<image src="../../../static/img/tabbar/add.png" @tap="chooseImage"
							style="width: 300rpx;height: 300rpx;margin: 0 26rpx;"></image>
						<image v-for="(item,index) in imgArr" :src="item" name="imgArr"
							style="width: 300rpx;height: 300rpx;margin: 0 26rpx;">
						</image>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="button">
						<button form-type="submit">Submit</button>
						<button type="default" form-type="reset">Reset</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	import graceChecker from "../../../common/graceChecker.js"
	import {
		addLdle,
		Goods,
		Category
	} from '../../../api/index.js';
	export default {
		data() {
			return {
				imgArr: [],
				array: [],
				index: 0,
				array1: [],
				index1: 0,
				array2: [],
				index2: 0,
				arraylist1_id: {},
				arraylist2_id: {},
				shuzu: 0,
				shuzu1: 0,
				shuzu2: 0
			}
		},
		methods: {
			onLoad() {
				this.handleCate()
			},
			async handleCate(e) {
				let {
					data,
				} = await Category.subCate({
					pId: 1
				});
				if (data) {
					this.setData({
						array: [...data]
					});
				}
				for (let i in "array") {
					this.arraylist_id = this.array[0].id
				}

			},
			async handleCateChange(e) {
				this.shuzu = parseInt(e.detail.value) + parseInt(this.arraylist_id)
				let {
					data,
				} = await Category.subCate({
					pId: this.shuzu
				});
				if (data) {
					this.setData({
						array1: [...data]
					});
				}
				for (let i in "array1") {
					this.arraylist1_id = this.array1[0].id
				}
				this.index = e.detail.value
			},
			async handleCateChange1(e) {
				this.shuzu1 = parseInt(e.detail.value) + parseInt(this.arraylist1_id)
				let {
					data,
				} = await Category.subCate({
					pId: this.shuzu1
				});
				if (data) {
					this.setData({
						array2: [...data]
					});
				}
				for (let i in "array2") {
					this.arraylist2_id = this.array2[0].id
				}
				this.index1 = e.detail.value
			},
			handleCateChange2: function(e) {
				this.index2 = e.detail.value
				this.shuzu2 = parseInt(e.detail.value) + parseInt(this.arraylist2_id)
			},
			chooseImage() {
				let that = this;
				uni.chooseImage({
					count: 9,
					sizeType: ['original'],
					sourceType: ['album'],
					success: function(res) {
						if (that.imgArr.length === 0) {
							that.imgArr = res.tempFilePaths;
							console.log(JSON.stringify(res.tempFilePaths));
							console.log(that.imgArr);
						} else if (that.imgArr.length <= 9) {
							that.imgArr = that.imgArr.concat(res.tempFilePaths)
						}
					}
				})
			},
			bindTextAreaBlur: function(e) {
				console.log(e.detail.value)
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [{
						name: "nickname",
						checkType: "string",
						checkRule: "1,30",
						errorMsg: "标题应为1-30个字符"
					},
					{
						name: "price",
						checkType: "int",
						checkRule: "0,10000000",
						errorMsg: "您输入的价格有误"
					},
					{
						name: "original_price",
						checkType: "int",
						checkRule: "0,10000000",
						errorMsg: "您输入的原价格有误"
					},
					{
						name: "wechat",
						checkType: "notnull",
						checkRule: "0",
						errorMsg: "输入您的微信号"
					},
					{
						name: "telphone",
						checkType: "phoneno",
						checkRule: "1,11",
						errorMsg: "您输入的手机号有误"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				console.log("formData", formData);
				//var checkRes = graceChecker.check(formData, rule);
				// if (checkRes) {
				let that = this
				if (that.imgArr.length === 0) {
					uni.showToast({
						title: "图片不能为空",
					})
				}
				let token = uni.getStorageSync('token'); // 设置头部信息header
				let headerConfig = {
					Authorization: `Bearer ${token}`
				};
				for (let i = 0; i < that.imgArr.length; i++) {
					uni.uploadFile({
						url: "http://127.0.0.1:3003/api/goods", //仅为示例，非真实的接口地址
						filePath: that.imgArr[i],
						name: 'slider',
						header: {
							...headerConfig
						},
						formData: {
							...formData,
							cate_1st: this.shuzu,
							cate_2nd: this.shuzu1,
							cate_3rd: this.shuzu2,
							vir_1st: this.index,
							vir_2nd: this.index1,
							vir_3rd: this.index2
						},
						success: (res) => {
							this.formReset(e)
							this.imgArr = "",
								this.name = "",
								this.price = "",
								this.marketPrice = "",
								this.category = "",
								this.wechat = "",
								this.telphone = "",
								uni.switchTab({
									url: '/pages/index/index'
								});
						},
					})
				}

				// uni.request({
				// 	url: 'http://127.0.0.1:3007/api/addldle',
				// 	// header: {
				// 	// 	'content-type': "multipart/form-data;boundary='----------'+Date.new()"
				// 	// },
				// 	data: {
				// 		...formData,
				// 		user_id: user_id_setStorage,
				// 	},
				// 	method: 'POST',
				// 	success: (res) => {
				// 		console.log(res.data);
				// 		if (res.data.code !== 200) {
				// 			uni.showToast({
				// 				icon: 'error',
				// 				title: '添加失败'
				// 			})
				// 			return;
				// 		}
				// 	},
				// })
				uni.showToast({
					title: "验证通过!",
					icon: "none"
				});
				// } else {
				// 	uni.showToast({
				// 		title: graceChecker.error,
				// 		icon: "none"
				// 	});
				// }
			},
			formReset: function(e) {
				this.imgArr = "",
					this.name = "",
					this.price = "",
					this.marketPrice = "",
					this.category = "",
					this.wechat = "",
					this.telphone = "",
					console.log('清空数据')
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.uni-form-item .imageA {

		width: 100rpx;
		height: 100rpx;

	}

	.button {
		position: relative;
		top: 120px;
	}
</style>
