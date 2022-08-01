import app from '../../utils/ajax.js'; // 

let list = (data) => app.post('/foundnotice/list', data); // 获取商品列表

let detail = (data) => app.get('/foundnotice/detail', data);//商品详情

let insert =(data)=>app.post('/buys/add',data)//加入求购物品

let modify=(id, data) => app.delete(`/foundnotice/${id}`,  data)

export default {
    data() {
        return {};
    },
    list,
    detail,
	insert,
	modify
};
