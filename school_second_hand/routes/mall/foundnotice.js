const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');
//寻物启事
//查看详情
router.get("/detail", function (req, res) {
    let { id } = req.query;
    let sql = `SELECT id,name, address,  person_connect, person_wechat, img, time,DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') AS create_time,DATE_FORMAT(time,'%Y-%m-%d %H:%i:%s') AS time from foundnotice  WHERE id = ?;`
    db.query(sql, [id], function (results) {
        //成功
		res.json({
			status: true,
			msg: "success!",
			list: results[0],
		});
    });
});

//列出全部用户添加的寻物启事
router.post("/list", function(req, res) {
	let sql =
    `SELECT  id,name, address,  person_connect, person_wechat, img, time,DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') AS create_time,DATE_FORMAT(time,'%Y-%m-%d %H:%i:%s') AS time FROM foundnotice WHERE 1=1`
	db.query(sql, [], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			list: results,
		});
	});
});


//添加寻物启事
const fs = require('fs')
const multer=require('multer')//文件上传中间件
let addldle1=multer({dest:'./public/foundnotice/',}).array('img',9)
router.post("/",addldle1 ,function (req, res) {
    let files=req.files     
            for(let i in files) {
                res.set({'content-type': 'application/json; charset=utf-8'});
                let file = files[i]
                fs.renameSync('./public/foundnotice/'+ file.filename, './public/foundnotice/'+ file.originalname);
                let {name, address,  person_connect, person_wechat, time }= req.body;
				let { openid } = req.user;
				const img = 'http://localhost:3003/public/foundnotice/' + file.originalname;
                let sql=`insert into foundnotice(name, address,  person_connect, person_wechat, img,uid, time,create_time) values(?,?,?,?,?,?,?,CURRENT_TIMESTAMP())`;
                let sqlArr=[name, address,  person_connect, person_wechat, img,openid,time ];//,(new Date()).valueOf()
                db.query(sql, sqlArr,
                    (err, results) => {           
                    if (err) return res.send({ 'code': 500, 'message': err.message });
                    if (results.affectedRows !== 1) return res.send({ "code": 400, 'message': "添加失败" })
                    res.send({ 'code': 200, 'message': "添加成功啦！" });
                })
            }
});


module.exports = router;
