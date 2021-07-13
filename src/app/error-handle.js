// 错误常量
const errorTypes = require('../app/error-types');

const errorHandle = (error, ctx) => {
  // 错误状态码，错误信息
  let status = 400, message;

  switch (error.message) {
    case errorTypes.NAME_IS_REQUIRED:
      message = '用户名不能为空！';
      break;
    case errorTypes.PASSWORD_IS_REQUIRED:
      message = '密码不能为空！';
      break;
    case errorTypes.EMAIL_IS_REQUIRED:
      message = '邮箱不能为空！';
      break;
    case errorTypes.INCORRECT_MAILBOX_FORMAT:
      message = '邮箱格式不正确！';
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      message = "用户已存在！"
      break;
    default:
      status = 404;
      message = "NOT FOUND"
  }

  // 设置错误状态码
  ctx.status = status;
  // 返回错误信息
  ctx.body = message;
};

module.exports = errorHandle;
