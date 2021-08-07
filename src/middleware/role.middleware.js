// 数据库模块
const service = require('../service/role.service');
// 错误常量 
const errorTypes = require('../app/error-types');

// 查询传递来的数据是否为空，是否缺少某一项
const checkData = async (ctx, next) => {
  // 获取角色信息
  const { role_name, role_desc } = ctx.request.body;
  // 判断是否传值
  if (role_name === undefined || role_desc === undefined) {
    const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
    return ctx.app.emit('error', error, ctx);
  }
  // 判断是否为空
  if (role_name.trim() === '' || role_desc.trim() === '') {
    const error = new Error(errorTypes.PARAMETER_CANNOT_BE_EMPTY);
    return ctx.app.emit('error', error, ctx);
  }
  // 没问题
  await next();
}

// 生成新的导航菜单
const authAndMenu = async (ctx, next) => {
  // 权限数组
  const auth_arr = ctx.request.body.auth_arr;
  // 把数组转化为字符串，以逗号分割
  const authStr = auth_arr.toString();
  // 生成新的导航菜单 
  const menus = await service.getMenus(authStr);
  // 生成新的权限树
  const authority = await service.getAuthority(authStr);
  // 保存到ctx上
  ctx.menus = menus;
  ctx.authority = authority;
  await next();
}

module.exports = {
  checkData,
  authAndMenu
}