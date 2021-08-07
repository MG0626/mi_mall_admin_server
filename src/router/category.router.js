// 导入中间件
const { list, add, update, status, remove } = require('../controller/category.controller.js');
/**
 * verifyAuth：验证token
 * verifyPermission: 验证权限
 */
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');

module.exports = Router => {
  const categoryRouter = new Router({ prefix: '/category' });

  // 获取分类列表
  categoryRouter.get('/list', verifyAuth, verifyPermission, list);

  // 添加分类 
  categoryRouter.post('/add', verifyAuth, verifyPermission, add);

  // 修改分类名称
  categoryRouter.put('/update/:id', verifyAuth, verifyPermission, update);

  // 修改分类状态
  categoryRouter.put('/status/:id', verifyAuth, verifyPermission, status);

  // 删除分类
  categoryRouter.delete('/delete/:id', verifyAuth, verifyPermission, remove);

  return categoryRouter;
}