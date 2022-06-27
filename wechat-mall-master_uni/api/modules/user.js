import app from '../../utils/ajax.js'; 

let token = (data) => app.post('/user/token', data); // 获取token

let info = (data) => app.put('/user/info', data);//上传微信用户信息

let list = (data) => app.post('/user/ldle/list', data);//获取用户个人上传闲置商品列表

let cat_off=(id, data) => app.delete(`/user/ldle/${id}`,  data);//删除用户个人上传闲置商品列表

let buying = (data) => app.post('/user/buy/list', data);//获取用户个人上传求购商品列表

let cat_off_buy=(id, data) => app.delete(`/user/buy/${id}`,  data);//删除用户个人上传求购商品列表

let runner=(data)=>app.post('/user/runner/list',data)//获取用户个人上传跑腿列表

let cat_off_runner=(id, data) => app.delete(`/user/runner/${id}`,  data);//删除用户个人上传跑腿列表

let runner_order=(data)=>app.post('/user/runner_order/list',data)//获取用户个人抢单列表

let cat_off_runner_order=(id, data) => app.delete(`/user/runner_order/${id}`,  data);//删除用户个人抢单跑腿列表

let logout=(data)=>app.post('/user/logout',data)//退出登录

let lostandfound=(data)=>app.post('/user/lostandfound/list',data)//获取用户个人上传跑腿列表

let cat_off_lostandfound=(id, data) => app.delete(`/user/lostandfound/${id}`,  data);//删除用户个人上传跑腿列表

let foundnotice=(data)=>app.post('/user/foundnotice/list',data)//获取用户个人上传跑腿列表

let cat_off_foundnotice=(id, data) => app.delete(`/user/foundnotice/${id}`,  data);//删除用户个人上传跑腿列表
export default {
    data() {
        return {};
    },
	logout,
    token,
    info,
	list,
	cat_off,
	buying,
	cat_off_buy,
	runner,
	cat_off_runner,
	runner_order,
	cat_off_runner_order,
	lostandfound,
	cat_off_lostandfound,
	foundnotice,
	cat_off_foundnotice
};
