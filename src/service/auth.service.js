// 数据库连接池
const connection = require('../app/db');

class AuthService {
  // 查询用户是否存在
  async getUserByName(name) {
    const statement = `SELECT name, email, avatar, is_status FROM users WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  // 根据用户名和密码查询对应用户
  async getUserInfo(user) {
    const { name, password } = user;
    const statement = `SELECT id, name, email, avatar, role_id FROM users WHERE name = ? AND password = ?;`;
    const [result] = await connection.execute(statement, [name, password]);

    return result;
  }

  // 根据id查询对应导航栏菜单
  async getMenus(id) {
    const statement = `
      SELECT 
        u.id,
        u.name,
        u.role_id,
        r.role_name,
        r.menu
      FROM users u
      LEFT JOIN roles r
      ON u.role_id = r.id
      WHERE u.id = ?;
    `;
    const [[result]] = await connection.execute(statement, [id]);
    return result;
  }

  // 根据地址查询权限id
  async getPermissionId(path, type) {
    let newPath = path;
    const index = path.indexOf('?');
    // 有问号时说明带有query参，不可能携带id，没有则需要
    if (index === -1) {
      for (let str of path) {
        // 判断是否有数字出现，有就说明为id，替换为字符串':id'
        if (!isNaN(Number.parseInt(str))) {
          const i = path.indexOf(str);
          newPath = path.replace(path.slice(i), ':id');
          break;
        }
      }
    } else {
      // 有问号出现?时，需要截取
      newPath = path.slice(0, index);
    }
    const statement = `
      SELECT 
        *
      FROM permission
      WHERE path LIKE '%${newPath}%' AND type = ?
    `;
    const [[result]] = await connection.execute(statement, [type]);
    return result;
  }

  //查询权限id,是否属于角色的权限
  async getRolePermission(role_id, permission_id) {
    const statement = `
      SELECT 
        authority
      FROM roles
      WHERE id = ?
    `;
    const [[{authority}]] = await connection.execute(statement, [ role_id ]);
    const getId = (node, arr) => {
      // 判断有没有children作为递归出口，已知第三级没有children
      if (!node.children) {
        // 保存id
        return arr.push(node.id);
      }

      // 存在children，继续
      node.children.forEach( v => {
        getId(v, arr);
      })
    }
    // 获取所有id
    const idArr = [];
    getId({ children: authority }, idArr);

    // 判断当前权限id，是否存在于数组中，并返回新数组，数组有值则说明存在
    return idArr.filter(v => v === permission_id);
  }
}

module.exports = new AuthService();
