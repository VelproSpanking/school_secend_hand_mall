<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">寄件人姓名</view>
					<input class="uni-input" name="start_people" :value="form.start_people" placeholder="请输入姓名" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">寄件人电话</view>
					<input class="uni-input" name="start_tel" :value="form.start_tel" placeholder="请输入寄件人电话" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">寄件物品</view>
					<input class="uni-input" name="name"  :value="form.name" placeholder="请输入寄件物品分类" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">寄件地址</view>
					<input class="uni-input" name="start_address" :value="form.start_address" placeholder="请输入寄件地址" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">配送金额</view>
					<input class="uni-input" name="price" :value="form.price" placeholder="请输入配送金额" />
				</view>
				<view class="uni-form-item uni-column">
                <view class="title">订单截止时间</view>
					<uni-section title="请输入订单截止时间" type="line" name="dead_time" :value="form.dead_time" ></uni-section>
							<view class="example-body">
								<uni-datetime-picker v-model="single" />
							</view>
                   </view>
				<view class="uni-form-item uni-column">
					<view class="title">收件人姓名</view>
					<input class="uni-input" name="end_people" :value="form.end_people" placeholder="请输入收件人姓名" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">收件人电话</view>
					<input class="uni-input" name="end_tel"  :value="form.end_tel" placeholder="请输入收件人电话" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">收件地址</view>
					<input class="uni-input" name="end_address" :value="form.end_address" placeholder="请输入收件地址" />
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
		runner,
	} from '../../../api/index.js';
	export default {
		data() {
			return {
				form:{
					dead_time:'',
					end_address:'',
					end_people:'',
					end_tel:'',
					name:'',
					price:'',
					start_address:'',
					start_people:'',
					start_tel:'',
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
            	} = await runner.detail({
            		id
            	});
            	if (status) {
            		this.setData({
            			form: list[0],
						single1:list[0].dead_time

						
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
				} = await runner.insert({
					...formData,
					dead_time:this.single
				});
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
