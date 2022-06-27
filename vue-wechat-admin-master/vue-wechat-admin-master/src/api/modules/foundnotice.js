import axios from 'axios';

//删除商品
const remove = (id, params) => axios.delete(`/api/admin/runner/buy/${id}`, { params });

//失物招领列表
const list = (params) => axios.post('/api/admin/foundnotice/list', { params });
//商品详情
const detail = (params) => axios.get('/api/admin/buy/detail', { params });

export default {

    remove,

    list,
    detail,
}