// 错误常量 
const errorTypes = require('../app/error-types');

// 判断状态值是否合法
const checkStatus = async (ctx, next) => {
  const { is_status } = ctx.request.body;
  // 判断是否存在
  if ( is_status === undefined || is_status === '') {
    const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
    return ctx.app.emit('error', error, ctx);
  }
  // 判断是否合法
  if (typeof is_status !== 'number' || [0, 1, 2].indexOf(is_status) === -1) {
    const error = new Error(errorTypes.INVALID_PARAMETER);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
}

// 查询传递来的数据是否为空，是否缺少某一项
const checkData = async (ctx, next) => {
  // 获取权限信息
  const info = ctx.request.body;
  // info对象的key数组
  const keys = Object.keys(info);
  // 判断是否缺少信息，需要8个数据项
  if(keys.length !== 9) {
    const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
    return ctx.app.emit('error', error, ctx);
  }
  
  // 判断是否为空
  for(let key of keys){
    // 判断是否为数组
    if (Array.isArray(info[key])) {
      if (info[key].length === 0) {
        // 为空
        const error = new Error(errorTypes.PARAMETER_CANNOT_BE_EMPTY);
        return ctx.app.emit('error', error, ctx);
      }
    }
    // 字符串或数字
    if (info[key]) {
      if (info[key].toString().trim() === '') {
        // 为空
        console.log(key, info[key]);
        const error = new Error(errorTypes.PARAMETER_CANNOT_BE_EMPTY);
        return ctx.app.emit('error', error, ctx);
      }
    }
  }

  // 没问题
  await next();
}

module.exports = {
  checkStatus,
  checkData
}