const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');

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

//列出全部用户添加的闲置商品
router.post("/list", function(req, res) {
	let sql =
		`SELECT  id,name,wechat,detail,DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') AS create_time,create_name FROM buy WHERE 1=1`
	db.query(sql, [], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			list: results,
		});
	});
});


//添加求购
router.post('/add', function (req, res) {
    let { cate_1st, cate_2nd, cate_3rd, name,wechat, detail,vir_1st, vir_2nd,vir_3rd} = req.body;
    let { openid } = req.user;
    let sql=`insert into buy(cate_1st, cate_2nd, cate_3rd, name, wechat,uid,detail,vir_1st, vir_2nd,vir_3rd,create_time) values(?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP())`;
    let sqlArr=[cate_1st, cate_2nd, cate_3rd, name, wechat,openid,detail,vir_1st, vir_2nd,vir_3rd];
    db.query(sql, sqlArr, function (results) {
        db.query(sql, function (results) {
            //成功
            res.json({
                status: true,
                msg: "success!"
            });
        });
    });
});


router.delete("/:id", function (req, res) {
    let { id } = req.params;
    let sql = `DELETE FROM buy WHERE id=?`;
    db.query(sql, [id], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
            data:results
        });
    });
});






// //更改求购物品
// router.put("/:id", function (req, res) {
//     let { id } = req.params;
//     let { cate_1st, cate_2nd, cate_3rd, name,price, marketPrice, img_md, slider, detail,  } = req.body;
//     let sql =
//         `UPDATE GOODS SET cate_1st=?,cate_2nd=?,cate_3rd=?,name=?price=?,marketPrice=?,img_md=?,slider=?,detail=?,update_time = CURRENT_TIMESTAMP() WHERE id=?`;
//     db.query(sql, [cate_1st, cate_2nd, cate_3rd, name,  price, marketPrice,  
//          img_md, slider, detail,  id
//     ], function (results) {
//         //成功
//         res.json({
//             status: true,
//             msg: "success!",
//             data: results[0]
//         });
//     });
// });
module.exports = router;
