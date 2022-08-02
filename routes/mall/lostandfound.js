const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');
//失物招领
//查看详情
router.get("/detail", function (req, res) {
    let { id } = req.query;
    let sql = `SELECT  id,name,create_name,address,person_connect,wechat,img,DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') AS create_time,DATE_FORMAT(lost_time,'%Y-%m-%d %H:%i:%s') AS lost_time FROM lostandfound  WHERE id = ?;`
    db.query(sql, [id,], function (results) {
        //成功
		res.json({
			status: true,
			msg: "success!",
			list: results[0],
		});
    });
});

//列出全部用户添加的失物招领
router.post("/list", function(req, res) {
	let sql =
    `SELECT  id,name,create_name,address,person_connect,wechat,img,DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') AS create_time,DATE_FORMAT(lost_time,'%Y-%m-%d %H:%i:%s') AS lost_time FROM lostandfound WHERE 1=1`
	db.query(sql, [], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			list: results,
		});
	});
});


//添加失物招领
const fs = require('fs')
const multer=require('multer')//文件上传中间件
let addldle1=multer({dest:'./public/lostandfound/',}).array('img',9)
router.post("/",addldle1 ,function (req, res) {
    let files=req.files     
            for(let i in files) {
                res.set({'content-type': 'application/json; charset=utf-8'});
                let file = files[i]
                fs.renameSync('./public/lostandfound/'+ file.filename, './public/lostandfound/'+ file.originalname);
                let {name, address,  person_connect, wechat, lost_time }= req.body;
				let { openid } = req.user;
				const img = 'http://localhost:3003/public/lostandfound/' + file.originalname;
                let sql=`insert into lostandfound(name, address,  person_connect, wechat, img,uid, lost_time,create_time) values(?,?,?,?,?,?,?,CURRENT_TIMESTAMP())`;
                let sqlArr=[name, address,  person_connect, wechat, img,openid,lost_time ];//,(new Date()).valueOf()
                db.query(sql, sqlArr,
                    (err, results) => {           
                    if (err) return res.send({ 'code': 500, 'message': err.message });
                    if (results.affectedRows !== 1) return res.send({ "code": 400, 'message': "添加失败" })
                    res.send({ 'code': 200, 'message': "添加成功啦！" });
                })
            }
});


module.exports = router;
