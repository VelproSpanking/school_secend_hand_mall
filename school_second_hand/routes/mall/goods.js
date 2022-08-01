const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');

/**
 * @api {get} /api/goods/list 获取商品列表
 * @apiDescription 具备搜索、分页功能，3个分类id参数至多能传1个，默认按照商品创建时间升序排序
 * @apiName GoodsList 获取商品列表
 * @apiGroup Goods
 * @apiPermission user
 *
 * @apiParam {Number} [pageSize=4] 一个页有多少个商品;
 * @apiParam {Number} [pageIndex=1] 第几页;
 * @apiParam {Number} [cate_1st] 一级分类id;
 * @apiParam {Number} [cate_2nd] 二级分类id;
 * @apiParam {Number} [cate_3rd] 三级分类id;
 * @apiParam {String} [keyword] 搜索关键词;
 * @apiParam {String="ASC","DESC"} [sortByPrice] 按照价格排序，从小到大-ASC,从大到小-DESC;
 *
 * @apiSuccess {Object[]} goods 商品数组.
 * @apiSuccess {Number} total 商品总数.
 *
 * @apiSampleRequest /api/goods/list
 */
router.get("/list", function(req, res) {
	let { pageSize = 4, pageIndex = 1, cate_1st, cate_2nd, cate_3rd, keyword, sortByPrice } = req.query;
	//拼接SQL
	let size = parseInt(pageSize);
	let count = size * (pageIndex - 1);
	let sql =
		`SELECT SQL_CALC_FOUND_ROWS id,name,price,marketPrice,img_md,hotPoint,DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') AS create_time FROM GOODS WHERE 1 = 1`
	if (cate_1st) {
		sql += ` AND cate_1st = ${cate_1st}`;
	}
	if (cate_2nd) {
		sql += ` AND cate_2nd = ${cate_2nd}`;
	}
	if (cate_3rd) {
		sql += ` AND cate_3rd = ${cate_3rd}`;
	}
	if (keyword) {
		sql += ` AND name LIKE '%${keyword}%'`;
	}
	if (sortByPrice) {
		sql += ` ORDER BY price ${sortByPrice}`;
	} else {
		sql += ` ORDER BY create_time DESC`;
	}
	sql += ` LIMIT ${count},${size};SELECT FOUND_ROWS() as total;`
    //sql += ` LIMIT ${count},${size};`
    
	db.query(sql, [], function(results, fields) {
        //成功
		res.json({
			status: true,
			msg: "success!",
			goods: results[0],
			...results[1][0],
        });        
	});
});






/**
 * @api {get} /api/goods/detail 获取商品详情
 * @apiName GoodsDetail
 * @apiGroup Goods
 * @apiPermission user
 *
 * @apiParam {Number} id 商品id;
 *
 * @apiSampleRequest /api/goods/detail
 */
router.get("/detail", function (req, res) {
    let { id } = req.query;
    let { openid } = req.user;
    let sql = `
	SELECT id,cate_1st,cate_2nd,cate_3rd,name, price, hotPoint, marketPrice, discount, img_md, slider, telphone,wechat,detail,vir_1st,vir_2nd,vir_3rd FROM GOODS WHERE id = ?;
	SELECT * FROM collection WHERE goods_id = ? AND uid = ?;
	`
    db.query(sql, [id, id, openid], function (results) {
        if (results[1].length) {
            results[0][0].isCollected = true;
        } else {
            results[0][0].isCollected = false;
        }
        //成功
        res.json({
            status: true,
            msg: "success!",
            data: results[0][0]
        });
    });
});

// * @apiParam {Number} cate_1st 一级分类id;
// * @apiParam {Number} cate_2nd 二级分类id;
// * @apiParam {Number} cate_3rd 三级分类id，无此分类，id = 0;
// * @apiParam {String} name 商品名称;
// * @apiParam {String} [hotPoint] 商品热点描述;
// * @apiParam {Number} price 商品价格;
// * @apiParam {Number} marketPrice 市场价;
// * @apiParam {Number} cost 成本价;
// * @apiParam {Number} discount 折扣如：75%;
// * @apiParam {Number} inventory 商品库存;
// * @apiParam {String} articleNo 商品货号;
// * @apiParam {String} img_lg 商品主图-720;
// * @apiParam {String} img_md 商品主图-360;
// * @apiParam {String} slider 商品轮播图片，例：slider:'src1,src2,src3';
// * @apiParam {String} [brand] 商品品牌;
// * @apiParam {String} detail 商品详情,一般存储为HTML代码;

const fs = require('fs')
const multer=require('multer')//文件上传中间件
let addldle1=multer({dest:'./public/uploads/',}).array('slider',9)
router.post("/",addldle1 ,function (req, res) {
    let files=req.files     
            for(let i in files) {
                res.set({'content-type': 'application/json; charset=utf-8'});
                let file = files[i]
                fs.renameSync('./public/uploads/'+ file.filename, './public/uploads/'+ file.originalname);
                let {cate_1st, cate_2nd, cate_3rd, name, price, marketPrice, detail,wechat,telphone,vir_1st,vir_2nd,vir_3rd}= req.body;
				let { openid } = req.user;
                const slider = 'http://localhost:3003/public/uploads/' + file.originalname;
				const img_md = 'http://localhost:3003/public/uploads/' + file.originalname;
                let sql=`insert into goods(cate_1st, cate_2nd, cate_3rd, name, price, marketPrice,slider,img_md, detail,wechat,telphone,uid,vir_1st,vir_2nd,vir_3rd,create_time) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP())`;
                let sqlArr=[cate_1st, cate_2nd, cate_3rd, name, price, marketPrice,slider, img_md,detail,wechat,telphone,openid,vir_1st,vir_2nd,vir_3rd];//,(new Date()).valueOf()
                db.query(sql, sqlArr,
                    (err, results) => {           
                    if (err) return res.send({ 'code': 500, 'message': err.message });
                    if (results.affectedRows !== 1) return res.send({ "code": 400, 'message': "添加失败" })
                    res.send({ 'code': 200, 'message': "添加成功啦！" });
                })
            }
});

//更改闲置物品
router.put("/:id", function (req, res) {
    let { id } = req.params;
    let { cate_1st, cate_2nd, cate_3rd, name,price, marketPrice, img_md, slider, detail,  } = req.body;
    let sql =
        `UPDATE GOODS SET cate_1st=?,cate_2nd=?,cate_3rd=?,name=?price=?,marketPrice=?,img_md=?,slider=?,detail=?,update_time = CURRENT_TIMESTAMP() WHERE id=?`;
    db.query(sql, [cate_1st, cate_2nd, cate_3rd, name,  price, marketPrice,  
         img_md, slider, detail,  id
    ], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
            data: results[0]
        });
    });
});

//搜索功能
router.get("/search", function (req, res) {
    let { name } = req.body;
    let sql = `
	SELECT id,name,price,marketPrice,img_md,hotPoint,DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') AS create_time FROM GOODS where name like?
	`
    db.query(sql, [name], function (results) {
        
        //成功
        res.json({
            status: true,
            msg: "success!",
            data: results[0]
        });
    });
});


//所有物品
router.post('/all', function (req, res) {
    //const sql = `select * from goods_list limit ${skipcount},${pagesize}`
    const sql = `select * from GOODS`
    // db.query(sql, (err, data) => {
    //     // 1. 执行 SQL 语句失败
    //     if (err) return res.cc(err)
    //     res.send({
    //         data:data,
    //         code:200,
    //     })
    // })

    db.query(sql, [], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			data: results,
		});
	});
})
module.exports = router;
