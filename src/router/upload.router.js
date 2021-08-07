// 导入中间件
const {
  addAvatar,
  addGoodsImages,
  addGoodsDescImages,
  addAdvertisingImage
} = require('../controller/upload.controller');

/**
 * verifyAuth：验证token
 * verifyPermission: 验证权限
 */
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');

// 其他用途的中间件
const { fileHandle, fileReName } = require('../middleware/upload.middleware');

module.exports = Router => {
  const uploadRouter = new Router({ prefix: '/upload'});

  // 头像上传
  uploadRouter.post('/avatar', verifyAuth, fileHandle, fileReName, addAvatar);

  // 商品图片上传
  uploadRouter.post('/images', verifyAuth, fileHandle, fileReName, addGoodsImages);

  // 商品描述图片上传
  uploadRouter.post('/desc/images', verifyAuth, fileHandle, fileReName, addGoodsDescImages);

  // 首页推广图片上传
  uploadRouter.post('/advertising/image', verifyAuth, fileHandle, fileReName, addAdvertisingImage);

  return uploadRouter;
}