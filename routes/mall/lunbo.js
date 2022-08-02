const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');

router.get('/',(req,res)=>{
    let resObj = {
        status: 0, data: [{
            id: 1,
          url: 'http://www.itcast.cn/subject/phoneweb/index.html',
          // img: 'http://www.liulongbin.top:3005/images/lunbo1-min.jpg'
            // img: 'http://www.itcast.cn/subject/webzly/images/1.jpg',
            img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.ifenguo.com%2Fuploads%2Fallimg%2F200508%2F10-20050QA121546.JPG&refer=http%3A%2F%2Fwww.ifenguo.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652622519&t=9f5ca847b9bbf30f434d5c1a1b9efd59'
        }, {
            id: 2,
          url: 'http://www.itcast.cn/subject/phoneweb/index.html',
          // img: 'http://www.liulongbin.top:3005/images/lunbo2-min.jpg'
            // img: 'http://www.itcast.cn/subject/webzly/images/1.2.jpg',
            img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fef5751b90ba0633725eecde84f9a3806d3f08c5f.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652622519&t=c5c16f8b02826af88e4bb5781764114f'
        }, {
            id: 3,
          url: 'http://www.itcast.cn/subject/phoneweb/index.html',
          // img: 'http://www.liulongbin.top:3005/images/lunbo3-min.jpg'
            img: 'http://www.itcast.cn/images/newslide/homepageandphone/20185609105606277.jpg',
            img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017cd755fad1666ac7251df86d1034.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652622519&t=5f82c30f6dd0fa5fcb1bc11d17088276'
        }]
      }
    
      res.end(JSON.stringify(resObj))
})
module.exports = router;