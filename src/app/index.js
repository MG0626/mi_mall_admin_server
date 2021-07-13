// 导入koa
const Koa = require('koa');
// 导入插件
const bodyParser = require('koa-bodyparser');
// 导入处理错误信息模块
const errorHandle = require('./error-handle');

// 创建实例对象
const app = new Koa();

// 解析JSON
app.use(bodyParser());
// 导入路由
require('../router')(app);

// 监听错误信息
app.on('error', errorHandle);

module.exports = app;