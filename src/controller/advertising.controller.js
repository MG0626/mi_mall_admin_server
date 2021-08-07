// 导入数据库
const service = require('../service/advertising.service');
// 错误常量 
const errorTypes = require('../app/error-types');

class AdvertisingController{
  // 获取首页推广列表
  async list(ctx){
    // 查询数据
    const result = await service.list();
    // 返回数据
    ctx.body = result;
  }

  // 修改状态
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

  // 添加首页推广
  async add(ctx){
    // 获取数据
    const { url, goods_id } = ctx.request.body;
    // 判断是否为空
    if (!url || !goods_id  || url.trim() === '' || goods_id.toString().trim() === '') {
      const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
      return ctx.app.emit('error', error, ctx);
    }
    const result = await service.add(url, goods_id);
    
    ctx.status = 201;
    ctx.body = result;
  }

  // 修改首页推广信息
  async update(ctx){
    // 获取id
    const { id } = ctx.params;
    // 获取修改的内容
    const { url, goods_id } = ctx.request.body;
    // 判断是否为空
    if (!url || !goods_id  || url.trim() === '' || goods_id.toString().trim() === '') {
      const error = new Error(errorTypes.INCOMPLETE_PARAMETERS);
      return ctx.app.emit('error', error, ctx);
    }
    const result = await service.update(id, url, goods_id);
    ctx.body = result;
  }

  // 删除首页推广信息
  async remove(ctx){
    // 获取id
    const { id } = ctx.params;
    const result = await service.remove(id);
    ctx.body = result;
  }
}

module.exports = new AdvertisingController();