const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');
//失物招领
//查看详情
router.get("/detail", function (req, res) {
    let { id } = req.query;
    let sql = `SELECT  * FROM buy  WHERE id = ?;`
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
		`SELECT  id,name,address,person_connect,person_wechat,img,DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') AS create_time,DATE_FORMAT(time,'%Y-%m-%d %H:%i:%s') AS time FROM foundnotice WHERE 1=1`
	db.query(sql, [], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			list: results,
		});
	});
});



module.exports = router;
