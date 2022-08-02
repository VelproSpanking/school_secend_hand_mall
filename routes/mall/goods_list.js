//推荐商品
const express = require('express');
const router = express.Router();
let db = require('../../config/mysql');
router.get('/', function (req, res) {
    let pageindex = req.query.pageindex
    if (!pageindex) {
      pageindex = 1;
    }
    let pagesize = 10
    let skipcount = (pageindex - 1) * pagesize
    //const sql = `select * from goods_list limit ${skipcount},${pagesize}`
    const sql = `select * from goods_list`
    db.query(sql, (err, data) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        res.send({
            data:data,
            code:200,
        })
    })
})
module.exports = router;