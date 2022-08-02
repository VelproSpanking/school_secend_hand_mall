const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');
const fs = require('fs')
const multer=require('multer')//文件上传中间件
let addldle1=multer({dest:'./public/uploads/',}).array('img_url',9)



router.post("/",addldle1 ,function (req, res) {
    let files=req.files     
            for(let i in files) {
                res.set({'content-type': 'application/json; charset=utf-8'});
                let file = files[i]
                fs.renameSync('./public/uploads/'+ file.filename, './public/uploads/'+ file.originalname);
                let {title,category,sell_price,market_price,wechat,telphone,description}= req.body;
                const img_url = 'http://localhost:3003/public/uploads/' + file.originalname;
                let sql=`insert into goods_list(title,category,sell_price,market_price,wechat,telphone,description,img_url,create_time) values(?,?,?,?,?,?,?,?,?)`;
                let sqlArr=[title,category,sell_price,market_price,wechat,telphone,description,img_url,(new Date()).valueOf()];
                db.query(sql, sqlArr,
                    (err, results) => {           
                    if (err) return res.send({ 'code': 500, 'message': err.message });
                    if (results.affectedRows !== 1) return res.send({ "code": 400, 'message': "添加失败" })
                    res.send({ 'code': 200, 'message': "添加成功啦！" });
                })
            }
});
module.exports = router;
