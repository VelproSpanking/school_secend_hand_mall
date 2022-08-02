import app from '../../utils/ajax.js'; // 获取所有收藏的商品

let lunbo = (data) => app.get('/lunbo', data); // 添加商品至我的收藏



export default {
    data() {
        return {};
    },
    lunbo,
};
