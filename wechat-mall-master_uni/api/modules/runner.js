import app from '../../utils/ajax.js'; // 

let list = (data) => app.post('/runner/list', data); // 获取商品列表

let detail = (data) => app.get('/runner/detail', data);//商品详情

let insert =(data)=>app.post('/runner/add',data)//加入求购物品

let modify=(id, data) => app.delete(`/runner/${id}`,  data)

let order =(data)=>app.post('/runner/order',data)//点击抢单

let service =(data)=>app.post(`/runner/runner_order`,data)//点击送达
export default {
    data() {
        return {};
    },
    list,
    detail,
	insert,
	modify,
	order,
	service
};
