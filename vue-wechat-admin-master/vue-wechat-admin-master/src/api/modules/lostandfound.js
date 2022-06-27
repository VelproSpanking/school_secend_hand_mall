import axios from 'axios';

//删除商品
const remove = (id, params) => axios.delete(`/api/admin/runner/buy/${id}`, { params });

//;寻物启事列表
const list = (params) => axios.post('/api/admin/lostandfound/list', { params });
//商品详情
const detail = (params) => axios.get('/api/admin/buy/detail', { params });

export default {

    remove,

    list,
    detail,
}