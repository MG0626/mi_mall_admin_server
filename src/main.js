// 导入app
const app = require('./app');

// 导入数据库
require('./app/db');

// 导入config
const config = require('./app/config');

// 启动服务
app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功~`);
})