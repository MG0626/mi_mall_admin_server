const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

// 获取公钥和私钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../utils/keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../utils/keys/public.key'));

// 导出
module.exports = {
  // http服务端口
  APP_PORT,
  // 数据库配置
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;