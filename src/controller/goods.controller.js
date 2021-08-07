// 导入数据库模块
const service = require('../service/goods.service');
// 错误常量 
const errorTypes = require('../app/error-types');

class GoodsController{
  // 获取商品列表
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

  // 获取按分类分组的商品列表树
  async listTree(ctx){
    const result = await service.getListTree();
    ctx.body = result;
  }

  // 添加商品
  async add(ctx){
    // 获取数据
    const info = ctx.request.body;
    const result = await service.add(info);
    ctx.status = 201;
    ctx.body = result;
  }
  // 修改商品信息
  async update(ctx){
    // 获取id
    const { id } = ctx.params;
    // 获取数据
    const info = ctx.request.body;
    
    const result = await service.update(id, info);
    ctx.body = result;
  }

  // 修改商品状态
  async status(ctx) {
    // 获取id
    const { id } = ctx.params;
    // 获取状态
    const { is_status } = ctx.request.body;

    const result = await service.status(id, is_status);
    ctx.body = result;
  }
  // 删除商品
  async remove(ctx){
    // 获取id
    const { id } = ctx.params;
    const result = await service.remove(id);
    ctx.body = result;
  }
}

module.exports = new GoodsController();