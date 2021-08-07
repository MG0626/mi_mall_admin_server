// 导入数据库连接池
const connection = require('../app/db');

class RoleService{
  // 获取角色列表
  async list(query_params, page_number, current_number){
    // 偏移量
    const offset = (page_number - 1) * current_number;
    const arr = [current_number.toString(), offset.toString()];
    const statement = `
      SELECT 
        id, 
        role_name, 
        role_desc, 
        authority, 
        createAt create_time, 
        updateAt update_time 
      FROM roles
      WHERE role_name LIKE '%${query_params}%'
      LIMIT ? OFFSET ?;`;
    const [result] = await connection.execute(statement, arr);
    // 获取总数
    const statement2 = `
      SELECT 
        COUNT(id) total
      FROM roles
      WHERE role_name LIKE '%${query_params}%';
    `;
    const [[result2]] = await connection.execute(statement2);
    return {
      data: result,
      total: result2.total
    };
  }

  // 根据角色id查询对应信息
  async getRoleInfo(id){
    const statement = `
      SELECT 
        id, 
        role_name, 
        role_desc, 
        authority, 
        createAt create_time, 
        updateAt update_time 
      FROM roles 
      WHERE id = ?;`;
    const [[result]] = await connection.execute(statement, [id]);
    return result;
  }

  // 添加角色
  async add(role_name, role_desc){
    const statement = `INSERT INTO roles (role_name, role_desc) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [role_name, role_desc]);
    return result;
  }

  // 修改角色信息
  async update(id, role_name, role_desc){
    const statement = `UPDATE roles SET role_name = ?, role_desc = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [role_name, role_desc, id]);
    return result;
  }

  // 删除角色
  async remove(id){
    const statement = `DELETE FROM roles WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  // 生成新的导航菜单树结构
  async getMenus(authStr){
    const statement = `
      SELECT
        one.id,
        one.name,
        one.path,
        JSON_ARRAYAGG(
          JSON_OBJECT(
          'id', two.id,
          'name', two.name,
          'path', two.path,
          'parent_name', two.parent_name,
          'parent_id', two.parent_id,
          'enable', two.enable,
          'level', two.level
          )
        ) children
      FROM
      (SELECT 
        * 
      FROM permission p
      WHERE FIND_IN_SET(p.id, ?) AND p.level = 0) one
      LEFT JOIN
      (SELECT 
        * 
      FROM permission p
      WHERE FIND_IN_SET(p.id, ?) AND p.level = 1) two
      ON one.id = two.parent_id
      GROUP BY one.id
    `;
    const [result] = await connection.execute(statement, [authStr, authStr]);
    return result;
  }

  // 生成新的权限树
  async getAuthority(authStr){
    const statement = `
      SELECT
        one.id,
        one.name,
        JSON_ARRAYAGG(
          JSON_OBJECT(
          'id', two.id,
          'name', two.name,
          'path', two.path,
          'type', two.type,
          'parent_name', two.parent_name,
          'parent_id', two.parent_id,
          'enable', two.enable,
          'level', two.level,
          'create_time', two.createAt,
          'update_time', two.updateAt,
          'children', two.children
          )
        ) children
      FROM
      (SELECT 
        * 
      FROM permission p
      WHERE FIND_IN_SET(p.id,?) AND p.level = 0) one
      LEFT JOIN
      (SELECT
        two.id,
        two.name,
        two.path,
        two.type,
        two.parent_name,
        two.parent_id,
        two.enable,
        two.level,
        two.createAt,
        two.updateAt,
        JSON_ARRAYAGG(
          JSON_OBJECT(
          'id', three.id,
          'name', three.name,
          'path', three.path,
          'type', three.type,
          'parent_name', three.parent_name,
          'parent_id', three.parent_id,
          'enable', three.enable,
          'level', three.level,
          'create_time', three.createAt,
          'update_time', three.updateAt
          )
        ) children
      FROM
      (SELECT 
        * 
      FROM permission p
      WHERE FIND_IN_SET(p.id,?) AND p.level = 1) two
      LEFT JOIN
      (SELECT 
        * 
      FROM permission p
      WHERE FIND_IN_SET(p.id,?) AND p.level = 2) three
      ON two.id = three.parent_id
      GROUP BY two.id) two
      ON one.id = two.parent_id
      GROUP BY one.id;
    `;
    const [result] = await connection.execute(statement, [authStr, authStr, authStr]);
    return result;
  }

  // 保存权限和导航菜单
  async auth(id, menus, authority){
    const statement = `UPDATE roles SET menu = ?, authority = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [ menus, authority, id]);
    return result;
  }
}

module.exports = new RoleService();