// 导入jwt
const jwt = require('jsonwebtoken');
// 数据库模块
const service = require('../service/auth.service');
// 错误常量 
const errorTypes = require('../app/error-types');
//导入私钥
const { PRIVATE_KEY } = require('../app/config');

class authController {
  async login(ctx, next) {
    // 获取用户名和密码
    const user = ctx.request.body;
    // 获取对应用户信息
    const result = await service.getUserInfo(user);
    // 如果没有数据返回，则说明密码错误
    if (result.length === 0) {
      const error = new Error(errorTypes.PASSWORD_ERROR);
      return ctx.app.emit('error', error, ctx);
    }

    // 颁发token
    const { id, name, email } = result[0];
    const token = jwt.sign({ id, name, email }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 过期时间
      algorithm: 'RS256'
    });

    // 返回数据
    ctx.body = {
      ...result[0],
      token
    };
  }
}

module.exports = new authController();
