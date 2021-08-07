// 导入multer
const Multer = require('koa-multer');
const upload = Multer();
// 导入加密模块
const crypto = require('crypto');

// 错误常量 
const errorTypes = require('../app/error-types');

// 接收上传文件
const fileHandle = upload.single('file');

// 获取上传文件，并重新命名
const fileReName = async (ctx, next) => {
  // 获取文件
  const file = ctx.req.file;
  // 判断是否上传有文件
  if (!file) {
    const error = new Error(errorTypes.FILE_NOT_UPLOADED);
    return ctx.app.emit('error', error, ctx);
  }
  // 获取原始文件名
  const oldName = file.originalname;
  // 获取文件格式
  const format = oldName.slice(oldName.indexOf('.'));

  // 生成新的文件名
  // 当前时间
  const current_date = (new Date()).valueOf().toString();
  // 生成随机数
  const random = Math.random().toString();
  // 生成哈希
  const newName = crypto.createHash('sha1').update(current_date + random).digest('hex');
  // 添加新的文件名
  file.originalname = newName + format;

  await next();
}

module.exports = {
  fileHandle,
  fileReName
}