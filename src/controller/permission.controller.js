// 数据库模块
const service = require('../service/permission.service');

// 错误常量 
const errorTypes = require('../app/error-types');

class PermissionController{
  // 获取权限列表
  async list(ctx){
    // 获取列表
    const result = await service.list();
    ctx.body = result;
  }

  // 添加权限
  async add(ctx){
    // 获取权限信息
    const info = ctx.request.body;

    // // 保存到数据库
    const result = await service.add(info);
    ctx.status = 201;
    ctx.body = result;
  }

  // 根据权限id查询其信息
  async info(ctx){
    // 获取id
    const { id } = ctx.params;
    // 查询
    const result = await service.info(id);

    ctx.body = result;
  }

  // 修改权限信息
  async update(ctx){
    // 获取id
    const { id } = ctx.params;
    // 获取修改的信息
    const info = ctx.request.body;
    
    // 修改
    const result = await service.update(id, info);
    
    ctx.body = result;
  }

  // 修改权限状态
  async modifyStatus(ctx){
    // 获取id
    const { id } = ctx.params;
    // 获取最新状态
    const { enable } = ctx.request.body;
    // 判断是否传值
    if (!enable && enable !== 0) {
      const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
      return ctx.app.emit('error', error, ctx);
    }
    
    // 判断是否为空
    if (enable.toString().trim() === '') {
      const error = new Error(errorTypes.PARAMETER_CANNOT_BE_EMPTY);
      return ctx.app.emit('error', error, ctx);
    }
    
    const result = await service.modify(id, enable);

    ctx.body = result;
  }

  // 删除权限
  async remove(ctx){
    // 获取id
    const { id } = ctx.params;

    const result = await service.remove(id);

    ctx.body = result;
  }
}

module.exports = new PermissionController();