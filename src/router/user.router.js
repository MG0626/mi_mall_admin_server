// 导入中间件
const { create, list, modifyStatus, update, deleteUser, assignRoles, info } = require('../controller/user.controller');
// 导入做其他验证的中间件
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware');
/**
 * verifyAuth：验证token
 * verifyPermission: 验证权限
 */
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');

module.exports = Router => {
  // 创建路由对象
  const userRouter = new Router({ prefix: '/users' });

  // 注册用户
  userRouter.post('/', verifyUser, handlePassword, create);
  // 添加用户
  userRouter.post('/add', verifyAuth, verifyPermission, verifyUser, handlePassword, create);
  // 用户列表
  userRouter.get('/list', verifyAuth, verifyPermission, list);

  // 更新用户状态
  userRouter.put('/status/:id', verifyAuth, verifyPermission, modifyStatus);

  // 修改用户信息
  userRouter.put('/update/:id', verifyAuth, verifyPermission, update);

  // 删除用户
  userRouter.delete('/delete/:id', verifyAuth, verifyPermission, deleteUser);

  // 分配用户角色
  userRouter.put('/:id/role', verifyAuth, verifyPermission, assignRoles);

  // 根据用户id查询对应数据
  userRouter.get('/:id', verifyAuth, verifyPermission, info)


  return userRouter;
}