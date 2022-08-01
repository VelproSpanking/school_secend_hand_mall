import axios from 'axios';

//删除商品
const remove = (id, params) => axios.delete(`/api/admin/runner/${id}`, { params });

//所有订单列表
const nolist = (params) => axios.post('/api/admin/runner/nolist', { params });
//商品详情
const detail = (params) => axios.get('/api/admin/buy/detail', { params });

//已经完成订单列表
const finished = (params) => axios.post('/api/admin/runner/runner/list/finished', { params });

//未完成订单列表
const unfinished = (params) => axios.post('/api/admin/runner/runner/list/unfinished', { params });
export default {

    remove,

    nolist,
    detail,
    finished,
    unfinished

}