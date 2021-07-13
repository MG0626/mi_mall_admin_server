// 导入路由
const Router = require('koa-router');
const fs = require('fs');

module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    // 当文件不是index.js时
    if (file !== 'index.js') {
      // 注册路由
      const router = require(`./${file}`)(Router);
      app.use(router.routes());
      app.use(router.allowedMethods());
    }
  })
}