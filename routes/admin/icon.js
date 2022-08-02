const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');

/**
 * @api {get} /api/admin/icon/list 获取所有element图标
 * @apiDescription 获取系统中的element图标，具备分页功能。
 * @apiName AdminIcon
 * @apiGroup admin Icon
 * @apiPermission admin
 * 
 * @apiParam {Number} [pageSize] 一个页有多少个商品,默认4个;
 * @apiParam {Number} [pageIndex] 第几页,默认1;
 *
 * @apiSuccess {Object[]} icons 图标数组.
 * @apiSuccess {Number} total 图标总数.
 * 
 * @apiSampleRequest /api/admin/icon/list
 */
router.get('/list', function(req, res) {
	let { pageSize = 20, pageIndex = 1 } = req.query;
	let size = parseInt(pageSize);
	let count = size * (pageIndex - 1);
	let sql = `SELECT SQL_CALC_FOUND_ROWS * FROM ICON LIMIT ? OFFSET ?;SELECT FOUND_ROWS() as total;`;
	db.query(sql, [size, count], function(results) {
		// 获取成功
		res.json({
			status: true,
			msg: "获取成功！",
			icons: results[0],
			...results[1][0],
		});
	});
});

module.exports = router;
