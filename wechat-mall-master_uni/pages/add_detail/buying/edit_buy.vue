<template>
	<view>

		<view class="uni-padding-wrap uni-common-mt">
			<form enctype="multipart/form-data" @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">标题</view>
					<input class="uni-input" name="name" :value="form.name" placeholder="输入宝贝名称等" />
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
					<view class="title">微信</view>
					<input class="uni-input" name="wechat"  :value="form.wechat" placeholder="输入您的微信号" />
				</view>
				
				<view class="uni-form-item uni-column">
					<textarea auto-height placeholder="详细描述您的宝贝详情信息等" name="detail" :value="form.detail" />
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
		buys,
		Category
	} from '../../../api/index.js';
	export default {
		data() {
			return {
				form: {
					    id: '',
					    name: '',
					    telphone: '',
					    price: '',
					    wechat: '',
					    slider: [],
						marketPrice:'',
						img_md:''
					},
					 slider: [],
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
			onLoad({
				id
			}) 
			{
				this.handleCate()
				this.loadDetail(id);
			},
			async loadDetail(id) {
				let {
					status,
					list
				} = await buys.detail({
					id
				});
				if (status) {
					this.setData({
						form: list,
						index:list.vir_1st,
						index1:list.vir_2nd,
						index2:list.vir_3rd,
						shuzu2:list.cate_2nd,
						//slider:data.slider
						item:list.slider
					});
				}
				this.handleCateChange(this.index)
				this.handleCateChange1(this.index1)
				  
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
				if(e.detail){
					this.shuzu = parseInt(e.detail.value) + parseInt(this.arraylist_id)
				}else{
					 this.shuzu=this.shuzu+2
				}
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
				if(e.detail){
					this.shuzu1 = parseInt(e.detail.value) + parseInt(this.arraylist1_id)
				}else{
					 this.shuzu1=this.shuzu2
				}
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
			
			async formSubmit(e){
				var formData = e.detail.value;
				
					let {
						list
					} = await buys.insert({
						...formData,
						cate_1st: this.shuzu,
						cate_2nd: this.shuzu1,
						cate_3rd: this.shuzu2,
					});
					if (list) {
						this.setData({
							list: [...list]
						});
					}
					uni.switchTab({
						url: '/pages/index/index'
					});
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
