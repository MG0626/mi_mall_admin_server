// 导入数据库连接池
const connection = require('../app/db');

class UserService {
  async create(user) {
    // role_id默认为2，即测试角色
    const { name, password, email, role_id = 2 } = user;
    console.log(role_id);
    const statement = `INSERT INTO users (name, password, email, role_id) VALUES (?, ?, ?, ?);`

    const [result] = await connection.execute(statement, [ name, password, email, role_id ]);

    return result;

  }

  // 根据用户名或邮箱查询用户
  async getByName(user){
    const { name, email } = user;
    const statement = `SELECT name, email FROM users WHERE name = ? OR email = ?;`
    const [ result ] = await connection.execute(statement, [name, email]);
    return result;
  }

  // 查询用户列表
  async list(query_params = '', page_number, current_number){
    // 偏移量
    const offset = (page_number - 1) * current_number;
    const arr = [current_number.toString(), offset.toString()];
    const statement = `
      SELECT 
        users.id, 
        name, 
        email, 
        avatar,
        is_status, 
        users.createAt create_time, 
        users.updateAt update_time,
        roles.id role_id,
        role_name
      FROM users
      LEFT JOIN roles
      ON users.role_id = roles.id
      WHERE users.name LIKE '%${query_params}%'
      LIMIT ? OFFSET ?
    `;
    const [result] = await connection.execute(statement, arr);
    // 获取总数
    const statement2 = `
      SELECT 
        COUNT(id) total
      FROM users
      WHERE name LIKE '%${query_params}%';
    `;
    const [[result2]] = await connection.execute(statement2);
    // 格式化数据
    result.forEach(v => v.is_status = v.is_status === 1);
    return {
      data: result,
      total: result2.total
    };
  }

  // 修改用户状态
  async status(id, state){
    const statement = `UPDATE users SET is_status = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [state, id]);
    return result;
  }

  // 修改用户信息
  async update(id, name, avatar, role_id){
    console.log(avatar);
    const statement = `UPDATE users SET name = ?, avatar = ?, role_id = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [name, avatar, role_id, id]);
    return result;
  }

  // 删除用户
  async deleteUser(id){
    const statement = `DELETE FROM users WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  // 分配用户新角色
  async modifyRole(id, role_id){
    const statement = `UPDATE users SET role_id = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [role_id, id]);
    return result;
  }

  // 根据id获取对应用户信息
  async getUserInfo(id){
    const statement = `
      SELECT 
        users.id, 
        name, 
        email, 
        avatar, 
        users.createAt create_time, 
        users.updateAt update_time,
        roles.id role_id,
        role_name
      FROM users
      LEFT JOIN roles
      ON users.role_id = roles.id
      WHERE users.id = ?;
    `;
    const [result] = await connection.execute(statement, [id]);
    return result[0];
  }
}

module.exports = new UserService();