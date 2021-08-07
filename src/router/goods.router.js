// 导入中间件
const { list, listTree, add, update, status, remove } = require('../controller/goods.controller.js');
/**
 * verifyAuth：验证token
 * verifyPermission: 验证权限
 * checkData: 检查是否为空，是否缺少必须项
 * checkStatus: 判断状态值是否合法
 */
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');
const { checkStatus, checkData } = require('../middleware/goods.middleware');

module.exports  = Router => {
  const goodsRouter = new Router({ prefix: '/goods' });

  // 获取商品列表
  goodsRouter.get('/list', verifyAuth, verifyPermission, list);
  // 获取按分类分组的商品列表树
  goodsRouter.get('/list/tree', verifyAuth, verifyPermission, listTree);
  // 添加商品
  goodsRouter.post('/add', verifyAuth, verifyPermission, checkData, add);
  // 修改商品信息
  goodsRouter.put('/update/:id', verifyAuth, verifyPermission, checkData, update);
  // 修改商品状态
  goodsRouter.put('/status/:id', verifyAuth, verifyPermission, checkStatus, status);
  // 删除商品
  goodsRouter.delete('/delete/:id', verifyAuth, verifyPermission, remove);

  return goodsRouter;
}