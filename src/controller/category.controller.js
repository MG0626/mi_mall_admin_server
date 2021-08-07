// 导入数据库模块
const service = require('../service/category.service');
// 错误常量 
const errorTypes = require('../app/error-types');

class CategoryController{
  // 获取分类列表
  async list(ctx){
    const result = await service.list();
    ctx.body = result;
  }
  // 添加分类
  async add(ctx){
    // 获取新分类的信息
    const { name } = ctx.request.body;
    // 判断名字是否存在或为空
    if (!name || name.trim() === '') {
      const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
      return ctx.app.emit('error', error, ctx);
    }
    const result = await service.add(name);
    ctx.status = 201;
    ctx.body = result;
  }
  // 修改分类名称
  async update(ctx){
    // 获取id
    const { id } = ctx.params;
    // 获取新的名称或状态
    const { name } = ctx.request.body;
    // 参数必须传
    if (!name) {
      const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
      return ctx.app.emit('error', error, ctx);
    }

    const result = await service.update(id, name);

    ctx.body = result;
  }
  // 修改分类状态
  async status(ctx){
    // 获取id
    const { id } = ctx.params;
    // 获取新的状态
    const { is_status } = ctx.request.body;
    // 参数必须传
    if (is_status === undefined || is_status === null) {
      const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
      return ctx.app.emit('error', error, ctx);
    }
    const result = await service.editStatus(id, is_status);

    ctx.body = result;
  }
  
  // 删除分类
  async remove(ctx){
    // 获取id
    const { id } = ctx.params;
    const result = await service.remove(id);
    ctx.body = result;
  }
}

module.exports = new CategoryController();