// 导入加密模块
const crypto = require('crypto');

const md5password = password => {
  const md5 = crypto.createHash('md5');
  const result =  md5.update(password).digest('hex'); // digest('hex') 获取加密后的字符串，hex是设置返回的结果是16进制
  return result;
}

module.exports = md5password;