import app from '../../utils/ajax.js'; // 

let list = (data) => app.get('/goods/list', data); // 获取商品列表

let all = (data) => app.post('/goods/all', data); // 获取商品列表

let detail = (data) => app.get('/goods/detail', data);//商品详情

let insert =(data)=>app.post('goods/insert',data)//加入闲置物品

let modify=(id, data) => app.delete(`/goods/${id}`,  data)//修改

let search =(data)=>app.get('goods/search',data)

export default {
    data() {
        return {};
    },
	all,
    list,
    detail,
	insert,
	modify,
	search
};
