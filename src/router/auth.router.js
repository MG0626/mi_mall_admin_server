// 导入中间件
const {
  login
} = require('../controller/auth.controller');

// 导入做其他验证的中间件
const { handlePassword } = require('../middleware/user.middleware');
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware');

module.exports = Router => {
  const authRouter = new Router();

  authRouter.post('/login', verifyLogin, handlePassword, login);
  authRouter.get('/test', verifyAuth)

  return authRouter;
}
