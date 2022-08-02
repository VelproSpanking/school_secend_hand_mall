import app from '../../utils/ajax'; // 获取子级分类

let addLdle = (data) => app.get('/addLdle', data);

export default {
    data() {
        return {};
    },
    addLdle
};
