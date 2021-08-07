// 中间件
const { list, status, add, update, remove } = require("../controller/advertising.controller");
/**
 * verifyAuth：验证token
 * verifyPermission: 验证权限
 */
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");

module.exports = Router => {
  const advertisingRouter = new Router({ prefix: '/advertising' });
  
  // 获取首页推广列表
  advertisingRouter.get('/list', verifyAuth, verifyPermission, list);

  // 修改状态
  advertisingRouter.put('/status/:id', verifyAuth, verifyPermission, status);

  // 添加首页推广
  advertisingRouter.post('/add', verifyAuth, verifyPermission, add);
  
  // 修改首页推广信息
  advertisingRouter.put('/update/:id', verifyAuth, verifyPermission, update);

  // 删除首页推广信息
  advertisingRouter.delete('/delete/:id', verifyAuth, verifyPermission, remove);



  return advertisingRouter;

}