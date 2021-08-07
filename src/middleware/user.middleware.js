// 数据库模块
const service = require('../service/user.service');

// 错误常量 
const errorTypes = require('../app/error-types');

// 导入加密函数
const md5password = require('../utils/password-handle');

// 验证用户信息是否为空
const verifyUser = async (ctx, next) => {
  // 获取用户信息
  const user = ctx.request.body;
  // 判断是否为空，并且发出对应的错误信息
  for(let key of Object.keys(user)){
    // trim()去除字符串首尾空格
    if (!user[key].trim()) {
      let type;
      switch(key){
        case 'name':
          type = errorTypes.NAME_IS_REQUIRED;
          break;
        case 'password':
          type = errorTypes.PASSWORD_IS_REQUIRED;
          break;
        case 'email':
          type = errorTypes.EMAIL_IS_REQUIRED;
          break;
      }
      const error = new Error(type);
      return ctx.app.emit('error', error, ctx);
    }
  }
  // 判断邮箱格式是否正确
  // 邮箱正则表达式
  const reg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
  if (!reg.test(user.email)) {
    const error = new Error(errorTypes.INCORRECT_MAILBOX_FORMAT);
    return ctx.app.emit('error', error, ctx);
  }
  // 判断信息是否被注册过
  //查询用户名或邮箱有没有被注册过
  const result = await service.getByName(user);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  // 没有问题就进入下一个中间件
  // 使用await的原因是，下一个中间件有异步函数，不用的话，不会等下一个中间件异步结束就返回到最前面的中间件
  await next();
}

// 加密密码
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}

module.exports = {
  verifyUser,
  handlePassword
}