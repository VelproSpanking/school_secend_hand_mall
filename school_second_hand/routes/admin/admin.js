const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');
// JSON Web Token
const jwt = require("jsonwebtoken");
/**
 * @apiDefine SuccessResponse
 * @apiSuccess { Boolean } status 请求状态.
 * @apiSuccess { String } msg 请求结果信息.
 * @apiSuccess { Object } data 请求结果信息.
 * @apiSuccess { String } data.token 返回的token.
 * @apiSuccess { String } data.id 账户id.
 * @apiSuccess { String } data.role 账户角色id.
 *
 * @apiSuccessExample { json } 200返回的JSON:
 *  HTTP / 1.1 200 OK
 *  {
 *      "status": true,
 *      "msg": "成功",
 *      "data":{
 *          "id":5,
 *          "role":3,
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiIxIiwiaWF0IjoxNTU3MzM1Mzk3LCJleHAiOjE1NTczNDI1OTd9.vnauDCSHdDXaZyvTjNOz0ezpiO-UACbG-oHg_v76URE"
 *      }
 *  }
 */

/**
 * @api {post} /api/admin/register 管理员注册
 * @apiDescription 注册成功，默认角色为运营人员，默认生成头像地址："/images/avatar/default.jpg"， 返回token, 请在头部headers中设置Authorization: `Bearer ${token}`,所有请求都必须携带token;
 * @apiName AdminRegister
 * @apiGroup admin User
 * @apiPermission admin
 *
 * @apiParam { String } username 账户名.
 * @apiParam { String } password 密码.
 * @apiParam { String } fullname 姓名.
 * @apiParam { String } sex 性别.
 * @apiParam { String } tel 手机号码.
 *
 * @apiUse SuccessResponse
 *
 * @apiSampleRequest /api/admin/register
 */
router.post('/register', function (req, res) {
    let { username, password, fullname, sex, tel } = req.body;
    // 查询账户是否存在
    let sql = `SELECT * FROM ADMIN WHERE username = ?`
    db.query(sql, [username], function (results) {
        if (results.length) {
            res.json({
                status: false,
                msg: "账号已经存在！"
            });
            return false;
        }
        let { pool } = db;
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.beginTransaction(function (err) {
                if (err) throw err;
                let sql =
                    `INSERT INTO ADMIN (username,password,fullname,sex,tel,create_time) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP())`;
                connection.query(sql, [username, password, fullname, sex, tel], function (error, results, fields) {
                    let { insertId, affectedRows } = results;
                    if (error || affectedRows <= 0) {
                        return connection.rollback(function () {
                            throw error || `${affectedRows} rows changed!`;
                        });
                    }
                    let sql = `INSERT INTO admin_role (admin_id,role_id) VALUES (?,3)`;
                    connection.query(sql, [insertId], function (error, results, fields) {
                        if (error) {
                            return connection.rollback(function () {
                                throw error;
                            });
                        }
                        connection.commit(function (err) {
                            if (err) {
                                return connection.rollback(function () {
                                    throw err;
                                });
                            }
                        });
                        let payload = {
                            id: insertId,
                            username,
                            role: 3,
                        };
                        // 生成token
                        let token = jwt.sign(payload, 'secret', { expiresIn: '4h' });
                        // 存储成功
                        res.json({
                            status: true,
                            msg: "注册成功！",
                            data: {
                                token,
                                id: insertId,
                                role: 3
                            }
                        });
                    });

                });
            });
        });
    });
});

/**
 * @api {post} /api/admin/login 管理员登录
 * @apiDescription 登录成功， 返回token, 请在头部headers中设置Authorization: `Bearer ${token}`, 所有请求都必须携带token;
 * @apiName AdminLogin
 * @apiGroup admin User
 * @apiPermission admin
 *
 * @apiParam {String} username 账户名.
 * @apiParam {String} password 密码.
 *
 * @apiUse SuccessResponse
 *
 * @apiSampleRequest /api/admin/login
 */

router.post('/login', function (req, res) {
    let { username, password } = req.body;
    let sql =
        `SELECT a.*,r.id AS role FROM ADMIN a LEFT JOIN admin_role ar ON a.id = ar.admin_id LEFT JOIN role r ON r.id = ar.role_id  WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], function (results) {
        // 账号密码错误
        if (!results.length) {
            res.json({
                status: false,
                msg: "账号或者密码错误！"
            });
            return false;
        }
        let { id, role } = results[0];
        // 更新登陆时间，登陆次数
        let sql = `UPDATE ADMIN SET login_count = login_count + 1 WHERE id = ?;`
        db.query(sql, [id], function (response) {
            if (response.affectedRows > 0) {
                // 登录成功
                let payload = {
                    id,
                    username,
                    role,
                };
                // 生成token
                let token = jwt.sign(payload, 'secret', { expiresIn: '4h' });
                res.json({
                    status: true,
                    msg: "登录成功！",
                    data: {
                        token,
                        id,
                        role,
                    }
                });
            }
        });

    });
});
/**
 * @api {get} /api/admin/list 获取管理员列表
 * @apiName AdminList
 * @apiGroup admin User
 * @apiPermission admin
 *
 * @apiSampleRequest /api/admin/list
 */
router.get("/list", function (req, res) {
    //查询账户数据
    let sql =
        `SELECT a.id,a.username,a.fullname,a.email,a.sex,a.avatar,a.tel,DATE_FORMAT(a.login_time,'%Y-%m-%d %H:%i:%s') AS login_time,a.login_count,r.role_name,r.id AS role FROM ADMIN AS a LEFT JOIN admin_role AS ar ON a.id = ar.admin_id LEFT JOIN role AS r ON r.id = ar.role_id ORDER BY a.id`;
    db.query(sql, [], function (results) {
        // 获取成功
        res.json({
            status: true,
            msg: "获取成功！",
            data: results
        });
    })
});
/**
 * @api {delete} /api/admin/:id 删除管理员
 * @apiName DeleteAdmin
 * @apiGroup admin User
 * @apiPermission admin
 *
 * @apiExample {js} 参数示例:
 * /api/admin/3
 *
 * @apiParam {Number} id 账户id.
 *
 * @apiSampleRequest /api/admin
 */
router.delete('/:id', function (req, res) {
    let { id } = req.params;
    let sql = `DELETE FROM admin WHERE id = ?;DELETE FROM admin_role WHERE admin_id = ?;`
    db.query(sql, [id, id], function (results) {
        // 获取成功
        res.json({
            status: true,
            msg: "删除成功！",
        });
    })
});
/**
 * @api {get} /api/admin 获取管理员个人资料
 * @apiName AdminInfo
 * @apiGroup admin User
 * @apiPermission admin
 *
 * @apiParam {Number} id 账户id.
 *
 * @apiSampleRequest /api/admin
 */
router.get("/", function (req, res) {
    let { id } = req.query;
    //查询账户数据
    let sql =
        `SELECT a.id,a.username,a.fullname,a.email,a.sex,a.avatar,a.tel,r.role_name,r.id AS role FROM ADMIN AS a LEFT JOIN admin_role AS ar ON a.id = ar.admin_id LEFT JOIN role AS r ON r.id = ar.role_id WHERE a.id = ?`;
    db.query(sql, [id], function (results) {
        if (!results.length) {
            res.json({
                status: false,
                msg: "获取失败！"
            });
            return false;
        }
        // 获取成功
        res.json({
            status: true,
            msg: "获取成功！",
            data: results[0]
        });
    })
});
/**
 * @api { put } /api/admin/ 更新管理员个人资料
 * @apiDescription 只有超级管理员才有权限修改用户角色，普通管理员无权限更改角色。
 * @apiName UpdateInfo
 * @apiGroup admin User
 * @apiPermission 超级管理员
 *
 * @apiParam {Number} id 账户id.
 * @apiParam {String} fullname 姓名.
 * @apiParam {String} sex 性别.
 * @apiParam {String} avatar 头像.
 * @apiParam { String } tel 手机号码.
 * @apiParam { String } email 邮箱地址.
 * @apiParam { String } role 账户角色id.
 *
 * @apiSampleRequest /api/admin
 */
router.put("/", function (req, res) {
    let { id, fullname, sex, avatar, tel, email, role } = req.body;
    let sql = `UPDATE admin SET fullname = ?,sex = ?,avatar = ?,tel = ?,email = ? WHERE id = ?;
    UPDATE admin_role SET role_id = ? WHERE admin_id = ?`;
    db.query(sql, [fullname, sex, avatar, tel, email, id, role, id], function (results) {
        res.json({
            status: true,
            msg: "修改成功！"
        });
    });
});

/**
 * @api { put } /api/admin/account 修改本账户信息
 * @apiDescription 管理员自行修改本账户信息，但是无权限分配角色。
 * @apiName UpdateAccount
 * @apiGroup admin User
 * @apiPermission admin
 *
 * @apiParam { String } fullname 姓名.
 * @apiParam { String } sex 性别.
 * @apiParam { String } avatar 头像.
 * @apiParam { String } tel 手机号码.
 * @apiParam { String } email 邮箱地址.
 *
 * @apiSampleRequest /api/admin/account
 */
router.put("/account/", function (req, res) {
    let { id } = req.user;
    let { fullname, sex, avatar, tel, email } = req.body;
    let sql = `UPDATE admin SET fullname = ?,sex = ?,avatar = ?,tel = ?,email = ? WHERE id = ?`;
    db.query(sql, [fullname, sex, avatar, tel, email, id], function (results) {
        if (!results.affectedRows) {
            res.json({
                status: false,
                msg: "修改失败！"
            });
            return;
        }
        res.json({
            status: true,
            msg: "修改成功！"
        });
    });
});

module.exports = router;
