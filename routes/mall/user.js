const express = require('express');
const router = express.Router();
const request = require('request');
// JSON Web Token
const jwt = require("jsonwebtoken");
// 数据库
let db = require('../../config/mysql');
// 微信小程序
let { appid, appSecret } = require("../../config/wx");
/**
 * @api {post} /api/user/token 换取登录token
 * @apiDescription 微信小程序login之后，获得临时登录凭证code，再使用code换取登录token,请在头部headers中设置Authorization: `Bearer ${token}`,所有请求都必须携带token;
 * @apiName Token
 * @apiGroup User
 * @apiPermission user
 * 
 * @apiParam {String} code 微信临时登录凭证code.
 *
 * @apiSampleRequest /api/user/token
 */
router.post('/token', function(req, res) {
    let { code } = req.body;
    // 请求微信API
    let url =
        `https:/\/\api.weixin.qq.com/\sns/\jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    request(url, function(error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        if (response.statusCode != 200) {
            res.json({
                status: false,
                msg: response.statusMessage
            });
            return;
        }
        let data = JSON.parse(body);
        // 微信api返回错误
        if (data.errcode) {
            res.json({
                status: false,
                msg: data.errmsg
            });
            return;
        }
        // 生成token
        //let token = jwt.sign(data, 'secret');
        let token = jwt.sign(data, 'secret', { expiresIn: '1000000h' });
        // 查询数据库中是否有此openid
        let sql = 'SELECT * FROM user WHERE openid = ?';
        db.query(sql, [data.openid], function(results) {
            // 如果没有此openid，插入新的数据
            if (results.length == 0) {
                let sql = 'INSERT INTO user (openid,session_key) VALUES (?,?)';
                db.query(sql, [data.openid, data.session_key], function(results) {
                    if (results.affectedRows > 0) {
                        res.json({
                            status: true,
                            token: token
                        });
                    }
                });
                return;
            }
            // 如果有此openid，更新session_key的数据
            let sql = 'UPDATE user SET session_key = ? WHERE openid = ?';
            db.query(sql, [data.session_key, data.openid], function(results) {
                if (results.affectedRows > 0) {
                    res.json({
                        status: true,
                        token: token
                    });
                    return;
                }
            });
        });
    });
});
/**
 * @api {put} /api/user/info 上传微信用户信息
 * @apiName userInfoUpload
 * @apiGroup User
 * @apiPermission user
 * 
 * @apiParam { String } nickName 用户昵称.
 * @apiParam { Number } gender 性别.
 * @apiParam { String } avatarUrl 头像.
 * @apiParam { String } country 国家.
 * @apiParam { String } province 省.
 * @apiParam { String } city 市.
 *
 * @apiSampleRequest /api/user/info
 */
router.put("/info", function(req, res) {
    let { nickName, gender, avatarUrl, country, province, city } = req.body;
    let { openid } = req.user;
    let sql = `UPDATE user SET nickname = ?, sex = ?, avatar = ?, country = ?, province = ?, city = ?,login_count = login_count + 1,login_time = CURRENT_TIMESTAMP() WHERE openid = ?`;
    db.query(sql, [nickName, gender, avatarUrl, country, province, city, openid], function(results) {
        if (results.affectedRows) {
            res.json({
                status1: true,
                msg: "存储信息成功！",
            })
        }
    });
});


// //获取用户登录状态
// router.put("/info/status", function(req, res) {
//     let { openid } = req.user;
//     let sql = `UPDATE user SET nickname = ?, sex = ?, avatar = ?, country = ?, province = ?, city = ? WHERE openid = ?`;
//     db.query(sql, [openid], function(results) {
//         if (results.affectedRows) {
//             res.json({
//                 status: true,
//                 msg: "存储信息成功！",
//             })
//         }
//     });
// });




//列出个人用户添加的闲置商品
router.post("/ldle/list", function(req, res) {
	let { openid } = req.user;
	let sql =
		`SELECT  id,name,price,marketPrice,img_md,hotPoint FROM GOODS WHERE uid = ?`
	db.query(sql, [openid], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			list: results,
		});
	});
});



//删除个人用户添加的闲置商品
router.delete("/ldle/:id", function (req, res) {
    let { id } = req.params;
    let sql = `DELETE FROM GOODS WHERE id=?`;
    db.query(sql, [id], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
            data:results
        });
    });
});

//列出个人用户添加的求购商品
router.post("/buy/list", function(req, res) {
    	let { openid } = req.user;
	let sql =
		`SELECT  id,name,wechat,detail,create_time FROM buy WHERE uid=?`
	db.query(sql, [openid], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			list: results,
		});
	});
});

//删除个人用户添加的求购商品
router.delete("/buy/:id", function (req, res) {
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



//列出个人用户添加的跑腿商品
router.post("/runner/list", function(req, res) {
    let { openid } = req.user;
let sql = 
  `select * from runner where id= any ( select runner_id from runner_order where uid=? and service=0) `
db.query(sql, [openid], function(results11, fields) {
                   res.json({
                status: true,
                    msg: "success!",
                    data: results11,

                  });
});
});

//删除个人用户添加跑腿商品
router.delete("/runner/:id", function (req, res) {
let { id } = req.params;
let sql = `DELETE FROM runner WHERE id=?`;
db.query(sql, [id], function (results) {
    //成功
    res.json({
        status: true,
        msg: "success!",
        data:results
    });
});
});

//列出个人用户抢单的跑腿商品
router.post("/runner_order/list", function(req, res) {
    let { openid } = req.user;
let sql =
    'SELECT runner_order.runner_id,runner_order.uid,  runner.name, runner.start_address, runner.end_address, runner.price FROM runner_order JOIN runner ON runner_order.runner_id = runner.id where runner_order.uid=?';
db.query(sql, [openid], function(results, fields) {
    //成功
    res.json({
        status: true,
        msg: "success!",
        list: results,
    });
});
});

//删除个人用户抢单跑腿商品
router.delete("/runner_order/:id", function (req, res) {
let { id } = req.params;
let sql = `DELETE FROM runner_order WHERE runner_id=?`;
db.query(sql, [id], function (results) {
    //成功
    res.json({
        status: true,
        msg: "success!",
        data:results
    });
});
});


//退出登录
router.post("/logout",function(req,res){
    res.clearCookie('user')
    res.send({
        code:200,
        msg:'退出登录'
    })
})


//列出个人失物招领
router.post("/lostandfound/list", function(req, res) {
    let { openid } = req.user;
let sql =
    `SELECT  id,name,address,lost_time,person_connect,wechat,create_time,img,create_name FROM lostandfound WHERE uid=?`
db.query(sql, [openid], function(results, fields) {
    //成功
    res.json({
        status: true,
        msg: "success!",
        list: results,
    });
});
});

//删除个人添加的失物招领
router.delete("/lostandfound/:id", function (req, res) {
    let { id } = req.params;
    let sql = `DELETE FROM lostandfound WHERE id=?`;
    db.query(sql, [id], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
            data:results
        });
    });
});


//列出个人寻物启事
router.post("/foundnotice/list", function(req, res) {
    let { openid } = req.user;
let sql =
    `SELECT  id,name,address,time,person_connect,person_wechat,create_time,img,create_name FROM foundnotice WHERE uid=?`
db.query(sql, [openid], function(results, fields) {
    //成功
    res.json({
        status: true,
        msg: "success!",
        list: results,
    });
});
});

//删除个人添加的寻物启事
router.delete("/foundnotice/:id", function (req, res) {
    let { id } = req.params;
    let sql = `DELETE FROM foundnotice WHERE id=?`;
    db.query(sql, [id], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
            data:results
        });
    });
});
module.exports = router;