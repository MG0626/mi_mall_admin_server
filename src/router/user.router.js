// 导入中间件
const { create } = require('../controller/user.controller');
// 导入做其他验证的中间件
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware');

module.exports = Router => {
  // 创建路由对象
  const userRouter = new Router({ prefix: '/users' });

  userRouter.post('/', verifyUser, handlePassword, create);

  return userRouter;
}