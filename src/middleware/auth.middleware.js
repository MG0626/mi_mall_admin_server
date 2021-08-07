// 导入jwt
const jwt = require('jsonwebtoken');
//导入公钥
const { PUBLIC_KEY } = require('../app/config');

// 数据库模块
const service = require('../service/auth.service');

// 错误常量 
const errorTypes = require('../app/error-types');

// 验证登录
const verifyLogin = async (ctx, next) => {
  // 获取用户名和密码
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
      }
      const error = new Error(type);
      return ctx.app.emit('error', error, ctx);
    }
  }
  // 判断用户是否存在
  const result = await service.getUserByName(user.name);
  if (result.length === 0) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXIST);
    return ctx.app.emit('error', error, ctx);
  }
  // 获取用户状态
  const state = result[0].is_status;
  // 如果状态为0，则是用户已停用
  if (state === 0) {
    const error = new Error(errorTypes.USER_HAS_BEEN_DEACTIVATED);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
}

// 验证token
const verifyAuth = async (ctx, next) => {
  // 从headers获取到token
  let authorization, token;
  // 同时判断是否有token
  try {
    authorization = ctx.headers.authorization;
    token = authorization.replace('Bearer ', '');
  } catch (err) {
    const error = new Error(errorTypes.TOKEN_MUST_BE_PROVIDED);
    return ctx.app.emit('error', error, ctx);
  }
  
  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result;
  } catch (err) {
    let type;
    console.log(err.message);
    switch (err.message) {
      case 'invalid token':
        type = errorTypes.INVALID_TOKEN;
        break;
      case 'jwt expired':
        type = errorTypes.TOKEN_EXPIRED;
        break;
    }
    const error = new Error(type);
    // 发送错误
    return ctx.app.emit('error', error, ctx);
  }
  
  // 没有问题就进入下一个中间件
  await next();
}

// 验证角色是否有权限访问对应接口
const verifyPermission = async (ctx, next) => {
  // 获取角色id
  const { role_id } = ctx.user;
  // 获取当前请求的路径和请求方式
  const path = ctx.request.url;
  const type = ctx.method.toLocaleLowerCase();
  // 查询路径对应的权限id
  const { id: permission_id, enable } = await service.getPermissionId(path, type);
  // 如果enable为0，则说明接口被停用
  if (enable === 0) {
    const error = new Error(errorTypes.INTERFACE_IS_DISABLED);
    return ctx.app.emit('error', error, ctx);
  }
  // 查询权限id,是否属于角色的权限
  const arr = await service.getRolePermission(role_id, permission_id);
  // 判断如果查询结果的数组length不为0，则说明有权限访问
  if (arr.length === 0) {
    const error = new Error(errorTypes.NO_PERMISSION_TO_ACCESS);
    return ctx.app.emit('error', error, ctx);
  }

  // 没有问题就进入下一个中间件
  await next();
}



module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}