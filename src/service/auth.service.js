// 数据库连接池
const connection = require('../app/db');

class AuthService {
  // 查询用户是否存在
  async getUserByName(name) {
    const statement = `SELECT name, email, avatar FROM users WHERE name = ?;`;
    const [ result ] = await connection.execute(statement, [name]);
    return result;
  }
  // 根据用户名和密码查询对应用户
  async getUserInfo(user){
    const { name, password } = user;
    const statement = `SELECT id, name, email, avatar FROM users WHERE name = ? AND password = ?;`;
    const [result] = await connection.execute(statement, [name, password]);

    return result;
  }
}

module.exports = new AuthService();