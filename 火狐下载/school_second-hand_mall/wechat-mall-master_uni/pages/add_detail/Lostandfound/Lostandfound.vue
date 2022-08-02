<template>
	<view>
		
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">拾到物品名称</view>
					<input class="uni-input" name="name" placeholder="输入拾到物品名称" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">拾到物品地点</view>
					<input class="uni-input" name="address" placeholder="输入拾到物品地点" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">拾到联系人姓名</view>
					<input class="uni-input" name="person_connect" placeholder="输入联系人姓名" />
				</view>

				<view class="uni-form-item uni-column">
				    <view class="title">物品拾到时间</view>
					<uni-section title="请输入物品拾到时间" type="line" name="lost_time" :value="lost_time" ></uni-section>
							<view class="example-body">
								<uni-datetime-picker v-model="single" />
							</view>
				   
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">联系人微信</view>
					<input class="uni-input" name="wechat" placeholder="输入联系人的微信号" />
				</view>
				
				<!-- <view class="uni-form-item uni-column">
				  
				<textarea @blur="bindTextAreaBlur" name="describe" auto-height placeholder="请详细描述您想要购买的宝贝详情信息"></textarea>
				</view>	 -->	
				<view class="uni-form-item uni-column">
					<view class="imageA">
						<image src="../../../static/img/tabbar/add.png" @tap="chooseImage"
							style="width: 300rpx;height: 300rpx;margin: 0 26rpx;"></image>
						<image v-for="(item,index) in imgArr" :src="item" name="imgArr"
							style="width: 300rpx;height: 300rpx;margin: 0 26rpx;">
						</image>
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">Submit</button>
					<button type="default" form-type="reset">Reset</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	import graceChecker from "../../../common/graceChecker.js"
	import {
		lostandfounds
	} from '../../../api/index.js';
	export default {
		data(){
			return{
				imgArr: [],
				dead_time:'',
				single: '',
			}
		},
		
		methods: {
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
			
			
			formSubmit: function(e) { 
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                //定义表单规则
                var rule = [
                    {name:"name", checkType : "string", checkRule:"1,4",  errorMsg:"姓名应为1-4个字符"},
					{name:"wechat", checkType : "notnull", checkRule:"0",  errorMsg:"输入您的微信号"},
					
                ];
                //进行表单检查
                var formData = e.detail.value;
                var checkRes = graceChecker.check(formData, rule);
                if(checkRes){
                    uni.showToast({title:"验证通过!", icon:"none"});
                }else{
                    uni.showToast({ title: graceChecker.error, icon: "none" });
                }
				
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
						url: "http://127.0.0.1:3003/api/lostandfound", //仅为示例，非真实的接口地址
						filePath: that.imgArr[i],
						name: 'img',
						header: {
							...headerConfig
						},
						formData: {
							...formData,
							lost_time:this.single
							
						},
						success: (res) => {
							this.formReset(e)
							this.imgArr = "",
								// this.name = "",
								// this.price = "",
								// this.marketPrice = "",
								// this.category = "",
								// this.wechat = "",
								// this.telphone = "",
								uni.switchTab({
									url: '/pages/index/index'
								});
						},
					})
				}
			},
			change(e) {
				this.single = e
				console.log('change事件:', this.single = e);
			},
			formReset: function(e) {
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
	.uni-btn-v{
		margin-top: 30rpx;
	}
	.box-image {
				width: 100%;
				height: $uni-img-size-lg;
			}
</style>
