// 用户名是必须的
const NAME_IS_REQUIRED = "name_is_required";
// 密码是必须的
const PASSWORD_IS_REQUIRED = "password_is_required";
// 邮箱是必须的
const EMAIL_IS_REQUIRED = "email_is_required";
// 邮箱格式不正确
const INCORRECT_MAILBOX_FORMAT = "incorrect_mailbox_format";
// 用户已存在
const USER_ALREADY_EXISTS = "user_already_exists";
// 用户不存在
const USER_DOES_NOT_EXIST = 'user_does_not_exist';
// 密码错误
const PASSWORD_ERROR = "password_error";
// 没有token
const TOKEN_MUST_BE_PROVIDED = "token_must_be_provided"
// 无效token
const INVALID_TOKEN = "invalid_token";
// token已过期
const TOKEN_EXPIRED = "token_expired";
// 文件未上传
const FILE_NOT_UPLOADED = "file_not_uploaded";
// 请求没有携带数据
const NO_DATA = "no_data";
// 参数不完全
const INCOMPLETE_PARAMETERS = "incomplete_parameters";
// 参数不能为空
const PARAMETER_CANNOT_BE_EMPTY = "parameter_cannot_be_empty";
// 参数不合法
const INVALID_PARAMETER = "invalid_parameter";
// 没有权限访问
const NO_PERMISSION_TO_ACCESS = "no_permission_to_access";
// 用户已停用
const USER_HAS_BEEN_DEACTIVATED = "user_has_been_deactivated";
// 接口已停用
const INTERFACE_IS_DISABLED = "interface_is_disabled";


module.exports = {
  NAME_IS_REQUIRED,
  PASSWORD_IS_REQUIRED,
  EMAIL_IS_REQUIRED,
  INCORRECT_MAILBOX_FORMAT,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXIST,
  PASSWORD_ERROR,
  TOKEN_MUST_BE_PROVIDED,
  INVALID_TOKEN,
  TOKEN_EXPIRED,
  FILE_NOT_UPLOADED,
  NO_DATA,
  INCOMPLETE_PARAMETERS,
  PARAMETER_CANNOT_BE_EMPTY,
  INVALID_PARAMETER,
  NO_PERMISSION_TO_ACCESS,
  USER_HAS_BEEN_DEACTIVATED,
  INTERFACE_IS_DISABLED
}