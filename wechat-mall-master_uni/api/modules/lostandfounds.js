import app from '../../utils/ajax.js'; // 

let list = (data) => app.post('/lostandfound/list', data); // 获取物品列表

let detail = (data) => app.get('/lostandfound/detail', data);//物品详情

let insert =(data)=>app.post('/lostandfound',data)//加入寻物启事

let modify=(id, data) => app.delete(`/lostandfounds/${id}`,  data)

export default {
    data() {
        return {};
    },
    list,
    detail,
	insert,
	modify
};
