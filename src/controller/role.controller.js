// 数据库模块
const service = require('../service/role.service');

// 错误常量 
const errorTypes = require('../app/error-types');

class RoleController{
  // 获取角色列表
  async list(ctx){
    // 获取查询参数，页码，当前显示条数
    const { query_params, page_number, current_number } = ctx.query;
    // 判断是否为空page_number, current_number
    if (!page_number || !current_number) {
      const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
      return ctx.app.emit('error', error, ctx);
    }

    const result = await service.list(query_params, page_number, current_number);
    ctx.body = result;
  }
  // 根据角色id查询对应信息
  async info(ctx){
    // 获取角色id
    const { id } = ctx.params;

    const result = await service.getRoleInfo(id);

    ctx.body = result;
  }
  // 添加角色
  async add(ctx){
    // 获取角色信息
    const { role_name, role_desc } = ctx.request.body;

    const result = await service.add(role_name, role_desc);

    ctx.status = 201;
    ctx.body = result;
  }

  // 修改角色信息
  async update(ctx){
    // 获取角色id
    const { id } = ctx.params;
    // 获取角色信息
    const { role_name, role_desc } = ctx.request.body;

    const result = await service.update(id, role_name, role_desc);

    ctx.body = result;
  }

  // 删除角色
  async remove(ctx){
    // 获取角色id
    const { id } = ctx.params;

    const result = await service.remove(id);

    ctx.body = result;
  }

  // 角色授权
  async auth(ctx){
    // 获取角色id
    const { id } = ctx.params;
    // 获取权限字符串和导航菜单
    const menus =  ctx.menus;
    const authority = ctx.authority;

    const result = await service.auth(id, menus, authority);

    ctx.body = result;
  }
}

module.exports = new RoleController();