// 数据库模块
const service = require('../service/user.service');

// 错误常量 
const errorTypes = require('../app/error-types');


class UserController {
  // 添加用户
  async create(ctx){
    const user = ctx.request.body;
    console.log(user);
    const result =  await service.create(user);

    ctx.status = 201;
    ctx.body = result;
  }

  // 用户列表
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

  // 修改用户状态
  async modifyStatus(ctx){
    //获取用户id
    const { id } = ctx.params;
    // 获取修改的状态
    const state = ctx.request.body.is_status;
    // 根据id修改对应用户状态
    const result = await service.status(id, state);

    ctx.body = result;
  }

  // 修改用户信息
  async update(ctx){
    // 用户id
    const { id } = ctx.params;
    // 判断请求有没有携带参数
    if (!Object.keys(ctx.request.body).length) {
      const error = new Error(errorTypes.NO_DATA);
      return ctx.app.emit('error', error, ctx);
    }
    // 获取用户信息
    const { name, avatar, role_id } = ctx.request.body;
    // 保存用户信息
    const result = await service.update(id, name, avatar, role_id);

    ctx.body = result;
  }

  // 删除用户
  async deleteUser(ctx){
    // 获取用户id
    const { id } = ctx.params;
    // 从数据库删除
    const result = await service.deleteUser(id);
    ctx.body = result;
  }

  // 分配用户角色
  async assignRoles(ctx){
    // 获取用户id
    const { id } = ctx.params;
    // 获取分配到的角色id
    const { role_id } = ctx.request.body;
    // 判断请求有没有携带参数
    if (!role_id) {
      const error = new Error(errorTypes.NO_DATA);
      return ctx.app.emit('error', error, ctx);
    }
    const result = await service.modifyRole(id, role_id);

    ctx.body = result;
  }

  // 根据用户id获取对应的信息
  async info(ctx){
    // 获取用户id
    const { id } = ctx.params;

    const result = await service.getUserInfo(id);

    ctx.body = result;
  }
}

module.exports = new UserController();