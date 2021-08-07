// 导入中间件
const { list, info, add, update, remove, auth } = require('../controller/role.controller');
/**
 * verifyAuth：验证token
 * verifyPermission: 验证权限
 */
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');
const { checkData, authAndMenu } = require('../middleware/role.middleware');

module.exports = Router => {
  const roleRouter = new Router({ prefix: '/role'});

  // 获取角色列表
  roleRouter.get('/list', verifyAuth, verifyPermission, list);

  // 根据角色id查询对应信息
  roleRouter.get('/:id', verifyAuth, verifyPermission, info);

  // 添加角色
  roleRouter.post('/add', verifyAuth, verifyPermission, checkData, add);

  // 修改角色信息
  roleRouter.put('/update/:id', verifyAuth, verifyPermission, checkData, update);

  // 删除角色
  roleRouter.delete('/delete/:id', verifyAuth, verifyPermission, remove);

  // 角色授权或修改角色权限
  roleRouter.put('/auth/:id', verifyAuth, verifyPermission, authAndMenu, auth);

  return roleRouter;
}