var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const cors = require('cors')

let index = require('./routes/index');

let order = require('./routes/mall/order');
let user = require('./routes/mall/user');
let address = require('./routes/mall/address');
let goods = require('./routes/mall/goods');
let cart = require('./routes/mall/cart');
let userUpload = require('./routes/mall/upload');
let PCCT = require('./routes/mall/PCCT');
let collection = require('./routes/mall/collection');
let lunbo=require('./routes/mall/lunbo');
let hotGoods=require('./routes/mall/goods_list')
let addLdle=require('./routes/mall/addldle')
let buys=require('./routes/mall/buys')
let runner=require('./routes/mall/runner')
let lostandfounds = require('./routes/mall/lostandfound');
let foundnotices = require('./routes/mall/foundnotice');

let role = require('./routes/admin/role');
let buy = require('./routes/admin/buy');
let runners = require('./routes/admin/runner');
let menu = require('./routes/admin/menu');
let admin = require('./routes/admin/admin');
let category = require('./routes/admin/category');
let adminGoods = require('./routes/admin/goods');
let adminUpload = require('./routes/admin/upload');
let adminOrder = require('./routes/admin/order');
let icon = require('./routes/admin/icon');
let lostandfound = require('./routes/admin/lostandfound');
let foundnotice = require('./routes/admin/foundnotice');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/public',express.static(path.join(__dirname,'public')))
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置跨域资源分享CORS
app.use(cors());

//使用中间件验证token合法性
app.use(expressJwt({ secret: 'secret' }).unless({
  path: ['/', '/api/user/token', '/api/admin/register', '/api/admin/login'] //除了这些地址，其他的URL都需要验证
}));

app.use('/', index);

app.use('/api/address', address);
app.use('/api/user', user);
app.use('/api/goods', goods);
app.use('/api/cart', cart);
app.use('/api/order', order);
app.use('/api/upload', userUpload);
app.use('/api/pcct', PCCT);
app.use('/api/collection', collection);
app.use('/api/lunbo',lunbo)
app.use('/api/goodsList',hotGoods)
app.use('/api/addldle',addLdle)
app.use('/api/buys',buys)
app.use('/api/runner',runner)
app.use('/api/lostandfound', lostandfounds);
app.use('/api/foundnotice', foundnotices);

app.use('/api/role', role);
app.use('/api/admin/runner', runners);
app.use('/api/admin/buy', buy);
app.use('/api/menu', menu);
app.use('/api/admin', admin);
app.use('/api/category', category);
app.use('/api/admin/goods', adminGoods);
app.use('/api/upload', adminUpload);
app.use('/api/admin/order', adminOrder);
app.use('/api/admin/icon', icon);
app.use('/api/admin/lostandfound', lostandfound);
app.use('/api/admin/foundnotice', foundnotice);

// 处理401错误
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      status: false,
      ...err,
    });
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
