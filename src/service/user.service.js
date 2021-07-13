// 导入数据库连接池
const connection = require('../app/db');

class UserService {
  async create(user) {
    const { name, password, email } = user;
    console.log(user);
    const statement = `INSERT INTO users (name, password, email) VALUES (?, ?, ?);`

    const [result] = await connection.execute(statement, [ name, password, email ]);

    return result;

  }

  // 根据用户名或邮箱查询用户
  async getUserInfo(user){
    const { name, email } = user;
    const statement = `SELECT name, email FROM users WHERE name = ? OR email = ?;`
    const [ result ] = await connection.execute(statement, [name, email]);
    return result;
  }
}

module.exports = new UserService();