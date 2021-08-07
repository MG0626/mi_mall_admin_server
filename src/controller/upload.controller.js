// 导入上传模块
/**
 * uploadAvatar: 头像上传
 * uploadImages: 商品图片上传
 * uploadDescImages: 商品描述图片上传 
 * uploadAdvertisingImage: 首页推广图片上传
 */
const { uploadAvatar, uploadImages, uploadDescImages, uploadAdvertisingImage } = require('../app/txCos');

class UploadController {
  // 上传头像
  async addAvatar(ctx){
    // 获取用户上传的文件
    const file = ctx.req.file;
    // 上传腾讯云对象存储
    const result = await uploadAvatar(file);
    ctx.body = result;
  }

  // 添加商品图片
  async addGoodsImages(ctx){
    // 获取用户上传的文件
    const file = ctx.req.file;
    // 获取文件夹名
    const { parentName } = ctx.query;
    // 上传腾讯云对象存储
    const result = await uploadImages(file, parentName);
    ctx.body = result;
  }

  // 添加商品描述的图片
  async addGoodsDescImages(ctx){
    // 获取用户上传的文件
    const file = ctx.req.file;
    // 获取文件夹名
    const { parentName } = ctx.query;
    // 上传腾讯云对象存储
    const result = await uploadDescImages(file, parentName);
    ctx.body = result;
  }

  // 首页推广图片上传
  async addAdvertisingImage(ctx){
    // 获取用户上传的文件
    const file = ctx.req.file;
    // 上传腾讯云对象存储
    const result = await uploadAdvertisingImage(file);
    ctx.body = result;
  }
}

module.exports = new UploadController();