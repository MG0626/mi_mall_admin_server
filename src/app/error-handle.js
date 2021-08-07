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
      message = "该用户名或邮箱已经被注册过！";
      break;
    case errorTypes.USER_DOES_NOT_EXIST:
      message = "用户不存在！";
      break;
    case errorTypes.PASSWORD_ERROR:
      message = "密码错误！";
      break;
    case errorTypes.NO_DATA:
      message = "请求没有携带数据！";
      break;
    case errorTypes.INCOMPLETE_PARAMETERS:
      message = "参数不完整！";
      break;
    case errorTypes.PARAMETER_CANNOT_BE_EMPTY:
      message = "参数不能为空！";
      break;
    case errorTypes.INVALID_PARAMETER:
      message = "参数不合法！";
      break;
    case errorTypes.USER_HAS_BEEN_DEACTIVATED:
      message = "该用户已被停用！";
      break;
    case errorTypes.TOKEN_MUST_BE_PROVIDED:
      status = 401;
      message = "没有权限访问！";
      break;
    case errorTypes.INVALID_TOKEN:
      status = 401;
      message = "token是无效的!";
      break;
    case errorTypes.TOKEN_EXPIRED:
      status = 401;
      message = "token已过期!";
      break;
    case errorTypes.FILE_NOT_UPLOADED:
      status = 404;
      message = "请上传文件！"
      break;
    case errorTypes.NO_PERMISSION_TO_ACCESS:
      status = 401;
      message = "该用户没有权限!";
      break;
    case errorTypes.INTERFACE_IS_DISABLED:
      status = 401;
      message = "该接口已停用！";
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
