// 导入中间件
const { list, add, info, update, modifyStatus, remove } = require('../controller/permission.controller.js');
/**
 * verifyAuth：验证token
 * verifyPermission: 验证权限
 * checkData: 检查是否为空，是否缺少必须项
 */
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');
const { checkData } = require('../middleware/permission.middleware');

module.exports = Router => {
  // 路由实例对象
  const permissionRouter = new Router({prefix: '/permission'});

  // 获取权限列表
  permissionRouter.get('/list', verifyAuth, verifyPermission, list);

  // 添加权限
  permissionRouter.post('/add', verifyAuth, verifyPermission, checkData, add);

  // 根据权限id查询其信息
  permissionRouter.get('/:id', verifyAuth, verifyPermission, info);

  // 修改权限信息
  permissionRouter.put('/update/:id', verifyAuth, verifyPermission, checkData, update)

  // 修改权限状态
  permissionRouter.put('/status/:id', verifyAuth, verifyPermission, modifyStatus);

  // 删除权限
  permissionRouter.delete('/delete/:id', verifyAuth, verifyPermission, remove)

  return permissionRouter;
}