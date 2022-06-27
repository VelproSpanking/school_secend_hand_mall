import app from '../../utils/ajax.js'; // 获取所有收藏的商品

let hotGoods = (data) => app.get('/goodsList', data); // 添加商品至我的收藏



export default {
    data() {
        return {};
    },
    hotGoods,
};
