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
}