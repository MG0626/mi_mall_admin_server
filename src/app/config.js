const dotenv = require('dotenv');

dotenv.config();

// 导出
module.exports = {
  // http服务端口
  APP_PORT,
  // 数据库配置
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;