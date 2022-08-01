const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');

//查看详情
router.get("/detail", function (req, res) {
    let { id } = req.query;
    //let { openid}=req.user;
    let sql = `SELECT  * FROM runner  WHERE id = ?;`
    db.query(sql, [id], function (results) {

		res.send({
			status: true,
			msg: "success!",
			list: results,
		});
    });
});




//////列出全部用户已经完成添加的跑腿
router.post("/list", function(req, res) {
	let sql =
		`SELECT id FROM runner WHERE 1=1`
	db.query(sql, [], function(results11, fields) {
        let SQL=`select runner_id from runner_order`
        db.query(SQL, [], function (resultss) {
            let one =[]
            results11.forEach((item)=>{
                one.push(item.id)
            })//列出所有runner的id，push进one
            let two =[]
            resultss.forEach((item)=>{
                two.push(item.runner_id)
            })//列出所有runner_order的id，push进two
           var minus = one.filter(function(v){ return two.indexOf(v) == -1 })
           if(minus==null){
                return  res.json({
                    status: true,
                        msg: "没有数据!",
                      });  
           }
                   //let SQLL =`SELECT * FROM runner WHERE id IN('"+ minus1 +"')`mysql拼接node变量
                   let SQLL =`SELECT * FROM runner WHERE id IN (?)`
                //    SELECT * FROM runner WHERE id IN([1])
                       db.query(SQLL, [minus], function (results,error) {
                       res.json({
                    status: true,
                        msg: "success!",
                        data: results,
                        error:error
                      });
                    })


       });

	});
});



// 列出所有用户添加的跑腿订单
router.post('/nolist', function (req, res) {
    //let { name, start_address, end_address, start_people, end_people,start_tel,price, end_tel,dead_time } = req.body;
    //let { openid } = req.user;
    let sql=`select id,name, start_address, end_address, start_people, end_people,start_tel,price, end_tel,dead_time,uid,create_time from runner`;
    //let sqlArr=[name, start_address, end_address, start_people, end_people,start_tel,price, end_tel,dead_time,openid];
    db.query(sql, [], function (results) {
        //db.query(sql, function (results) {
            //成功
            res.json({
                status: true,
                msg: "success!",
                data:results
            });
        //});
    });
});

//添加跑腿
router.post('/add', function (req, res) {
    let { name, start_address, end_address, start_people, end_people,start_tel,price, end_tel,dead_time } = req.body;
    let { openid } = req.user;
    let sql=`insert into runner(name, start_address, end_address, start_people, end_people,start_tel,price, end_tel,dead_time,uid,create_time) values(?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP())`;
    let sqlArr=[name, start_address, end_address, start_people, end_people,start_tel,price, end_tel,dead_time,openid];
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


//点击抢单 service=0的时候是没有点单的
router.post("/order", function (req, res) {
    let { id ,service=0} = req.body;
    let { openid } = req.user;
    let sql = 'INSERT INTO runner_order ( uid, runner_id ,service) VALUES (?,?,?)';
    db.query(sql, [openid, id,service], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
        });
    });
});

//未完成订单//
router.post("/runner/list/unfinished", function(req, res) {
let sql = 
  `select * from runner where id= any ( select runner_id from runner_order where service=0) `
db.query(sql, [], function(results11, fields) {
                   res.json({
                status: true,
                    msg: "success!",
                    data: results11,

                  });
});
});
//已经完成订单
router.post("/runner/list/finished", function(req, res) {
let sql = 
  `select * from runner where id= any ( select runner_id from runner_order where service=1) `
db.query(sql, [], function(results11, fields) {
                   res.json({
                status: true,
                    msg: "success!",
                    data: results11,

                  });
});
});



//点击送达
router.post("/runner_order", function (req, res) {
    let { id,service} = req.body;
    console.log(id);
    let sql =
        `UPDATE runner_order SET service=1 where runner_id=?`;
    db.query(sql, [id,service], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
            data:results
        });
    });
});
//未完成订单
// router.post("/runner_unfinished", function (req, res) {
//     let { id,service} = req.body;
//     console.log(id);
//     let sql =
//         `UPDATE runner_order SET service=1 where runner_id=?`;
//     db.query(sql, [id,service], function (results) {
//         //成功
//         res.json({
//             status: true,
//             msg: "success!",
//             data:results
//         });
//     });
// });

router.delete("/:id", function (req, res) {
    let { id } = req.params;
    let sql = `DELETE FROM runner WHERE id=?`;
    db.query(sql, [id], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
        });
    });
});
module.exports = router;
