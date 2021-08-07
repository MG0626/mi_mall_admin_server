// 导入中间件
const {
  login,
  menus
} = require('../controller/auth.controller');

// 导入做其他验证的中间件
const { handlePassword } = require('../middleware/user.middleware');
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware');

module.exports = Router => {
  const authRouter = new Router();

  // 用户登录
  authRouter.post('/login', verifyLogin, handlePassword, login);

  // 获取导航栏菜单
  authRouter.get('/menus/:id', verifyAuth, menus)

  return authRouter;
}
