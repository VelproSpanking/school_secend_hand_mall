<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">丢失物品名称</view>
					<input class="uni-input" name="name" :value="form.name" placeholder="输入丢失物品名称" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">丢失物品地点</view>
					<input class="uni-input" name="address" :value="form.address" placeholder="输入丢失物品地点" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">丢失联系人姓名</view>
					<input class="uni-input" name="person_connect" :value="form.person_connect"  placeholder="输入联系人姓名" />
				</view>
		
				<view class="uni-form-item uni-column">
				    <view class="title">物品丢失时间</view>
					<uni-section title="请输入物品丢失时间" type="line" name="time" :value="form.time" ></uni-section>
							<view class="example-body">
								<uni-datetime-picker v-model="single" />
							</view>
				   
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">联系人微信</view>
					<input class="uni-input" name="person_wechat"  :value="form.person_wechat" placeholder="输入联系人的微信号" />
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
		noticefounds,
	} from '../../../api/index.js';
	export default {
		data() {
			return {
				form:{
					time:'',
					person_connect:'',
					address:'',	
					name:'',
					person_wechat:'',
					
				},
				single: '',
				single1:'',
			}
		},
		methods: {
            onLoad({
            	id
            }) 
            {
            	this.loadDetail(id);
            },
            async loadDetail(id) {
            	let {
            		status,
            		list
            	} = await noticefounds.detail({
            		id
            	});
            	if (status) {
            		this.setData({
            			form: list,
						single1:list.time
						//this.single:dead_time,
						
            		});

					this.single=this.single1.slice(0,19).replace(/[T]/g,' ');
            	}
            	  
            },
			
			
			change(e) {
				this.single = e
				console.log('change事件:', this.single = e);
			},
			async formSubmit(e){
				var formData = e.detail.value;				
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [
					{
						name: "start_tel",
						checkType: "phoneno",
						checkRule: "1,11",
						errorMsg: "您输入的手机号有误"
					},
					{
						name: "end_tel",
						checkType: "phoneno",
						checkRule: "1,11",
						errorMsg: "您输入的手机号有误"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
				let {
					list
				} = await noticefounds.insert({
					...formData,
					time:this.single
				});
				if (list) {
					this.setData({
						list: [...list]
					});
				}
				// if (list) {
				// 	this.setData({
				// 		list: [...list]
				// 	});
				// }
				uni.switchTab({
					url: '/pages/index/index'
				})
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
		.example-body {
			background-color: #fff;
			padding: 10px;
		}
</style>
