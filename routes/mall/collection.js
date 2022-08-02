const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');

/**
 * @api {post} /api/collection 添加商品至我的收藏
 * @apiName CollectionAdd
 * @apiGroup Collection
 * @apiPermission user
 *
 * @apiParam {Number} id 商品id.
 *
 * @apiSampleRequest /api/collection
 */
router.get("/", function (req, res) {
    let { id } = req.query;   
    let { openid } = req.user;
    let sql = 'INSERT INTO collection ( uid, goods_id ) VALUES (?,?)';
    db.query(sql, [openid, id], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
            data:results
        });
    });
});

/**
 * @api {delete} /api/collection/:id 取消收藏的商品
 * @apiName CollectionRemove
 * @apiGroup Collection
 * @apiPermission user
 *
 * @apiParam {Number} id 商品id.
 *
 * @apiSampleRequest /api/collection
 */
router.delete("/:id", function (req, res) {
    let { id } = req.params;
    let { openid } = req.user;
    let sql = 'DELETE FROM collection WHERE goods_id = ? and uid = ?';
    db.query(sql, [id, openid], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
        });
    });
});

/**
 * @api {get} /api/collection 获取所有收藏的商品
 * @apiName CollectionList
 * @apiGroup Collection
 * @apiPermission user
 *
 * @apiSuccess {Number} id 收藏条目id.
 * @apiSuccess {Number} goods_id 商品id.
 * @apiSuccess {String} name 商品名称.
 * @apiSuccess {String} hotPoint 卖点.
 * @apiSuccess {Number} price 价格.
 * @apiSuccess {Number} marketPrice 市场价格.
 * @apiSuccess {String} img_md 商品图片.
 *
 * @apiSampleRequest /api/collection
 */
router.get("/list", function (req, res) {
    let { openid } = req.user;
    let sql = 'SELECT collection.id,collection.uid, collection.goods_id, goods.name, goods.hotPoint, goods.price, goods.marketPrice, goods.id,goods.img_md FROM collection JOIN goods ON collection.goods_id = goods.id where collection.uid=?';
    debugger
    db.query(sql, [openid], function (results) {
        //成功
        res.json({
            //status: true,
            //msg: "success!",
            data: results,
            //status1:0
        });
    });
});

module.exports = router;
