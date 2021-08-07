// 错误常量 
const errorTypes = require('../app/error-types');

// 查询传递来的数据是否为空，是否缺少某一项
const checkData = async (ctx, next) => {
  // 获取权限信息
  const info = ctx.request.body;
  // info对象的key数组
  const keys = Object.keys(info);
  // 判断是否缺少信息，需要7个数据项
  if(keys.length !== 6) {
    const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
    return ctx.app.emit('error', error, ctx);
  }
  for(let key of keys){
    // 判断是否为空
    if ((typeof info[key] === 'string' && info[key].trim()) === '' || !info[key] && info[key] !== 0) {
      const error = new Error(errorTypes.PARAMETER_CANNOT_BE_EMPTY);
      return ctx.app.emit('error', error, ctx);
    }
  }

  // 没问题
  await next();
}

module.exports = {
  checkData
}