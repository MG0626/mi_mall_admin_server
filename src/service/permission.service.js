// 导入数据库连接池
const connection = require('../app/db');

class PermissionService {
  // 获取权限列表
  async list() {
    const statement = `
      SELECT 
        one.id,
        one.name,
        one.path,
        one.type,
        one.parent_name,
        one.parent_id,
        one.enable,
        one.level,
        one.createAt create_time,
        one.updateAt update_time,
        CASE WHEN two.parent_id IS NULL THEN null ELSE JSON_ARRAYAGG(
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
        ) END children
      FROM permission one
      LEFT JOIN
      (SELECT 
        p.id,
        p.name,
        p.path,
        p.type,
        p.parent_name,
        p.parent_id,
        p.enable,
        p.level, 
        p.createAt,
        p.updateAt,
        CASE WHEN per.parent_id IS NULL THEN null ELSE JSON_ARRAYAGG(
          JSON_OBJECT(
          'id', per.id,
          'name', per.name,
          'path', per.path,
          'type', per.type,
          'parent_name', per.parent_name,
          'parent_id', per.parent_id,
          'enable', per.enable,
          'level', per.level,
          'create_time', per.createAt,
          'update_time', per.updateAt
          )
        ) END as children
      FROM permission p
      LEFT JOIN permission per
      ON p.id = per.parent_id
      WHERE p.level = 1
      GROUP BY p.id, per.parent_id) two
      ON one.id = two.parent_id
      WHERE one.level = 0
      GROUP BY one.id, two.parent_id;
    `;
    const [result] = await connection.execute(statement);
    result.forEach(v1 => {
      v1.enable = v1.enable === 1;
      v1.children && v1.children.forEach(v2 => {
        v2.enable = v2.enable === 1;
        v2.children && v2.children.forEach(v3 => {
          v3.enable = v3.enable === 1;
        })
      })
    });
    
    return result;
  }

  // 添加权限
  async add(info) {
    // 获取权限信息
    const { name, path, type, parent_id, enable, level } = info;
    let parent_name = '/';
    // parent_id等于0时，代表要创建第一级权限，不需要查询父级，默认为'/'
    if (parent_id !== 0) {
      // 根据父级id查询名称
      const statement1 = `SELECT name FROM permission WHERE id = ?;`;
      const [[obj]] = await connection.execute(statement1, [ parent_id ]);
      parent_name = obj.name;
    }
    // 添加
    const statement2 = `
      INSERT INTO permission (
        name,
        path,
        type,
        parent_name,
        parent_id,
        enable,
        level
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const [result] = await connection.execute(statement2, [
      name,
      path,
      type,
      parent_name,
      parent_id,
      enable,
      level,
    ]);
    return result;
  }
  // 根据id查询权限信息
  async info(id) {
    const statement = ` SELECT * FROM permission WHERE id = ?;`;
    const [[result]] = await connection.execute(statement, [id]);
    return result;
  }

  // 修改权限信息
  async update(id, info) {
    // 获取权限信息
    const { name, path, type, parent_id, level, enable } = info;
    let parent_name = '/';
    // parent_id等于0时，代表要创建第一级权限，不需要查询父级，默认为'/'
    if (parent_id !== 0) {
      // 根据父级id查询名称
      const statement = `SELECT name FROM permission WHERE id = ?;`;
      const [[obj]] = await connection.execute(statement, [ parent_id ]);
      parent_name = obj.name;
    }
    
    const statement2 = `
      UPDATE 
        permission 
      SET 
        name = ?, 
        path = ?, 
        type = ?, 
        parent_name = ?, 
        parent_id =  ?, 
        enable = ?, 
        level = ?  
      WHERE id = ?;`;

    const [result] = await connection.execute(statement2, [name, path, type, parent_name, parent_id, enable, level, id]);

    // 修改权限的所有子项数据
    const statement3 = `
      UPDATE 
        permission 
      SET 
        parent_name = ?
      WHERE parent_id = ?;
    `;
    await connection.execute(statement3, [name, id]);

    return result;
  }

  // 修改权限状态
  async modify(id, enable){
    // 获取权限id有关联的所有数据
    const statement1 = `
      SELECT 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', one.id,
            'name', one.name,
            'path', one.path,
            'type', one.type,
            'parent_name', one.parent_name,
            'parent_id', one.parent_id,
            'enable', one.enable,
            'level', one.level,
            'create_time', one.createAt,
            'update_time', one.updateAt,
            'children', (
              SELECT 
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
                    'update_time', two.updateAt
                  )
                ) children
              FROM permission two
              WHERE two.parent_id = one.id
              GROUP BY two.id = one.id
            )
          )
        ) children
      FROM permission one
      WHERE one.parent_id = ?
      GROUP BY one.id = ?
    `;
    const [ [res] ] = await connection.execute(statement1, [id, id]);
    // 获取所有的id
    const idArr = [+id];
    if (res) {
      res.children.forEach(v => {
        idArr.push(v.id);
        if (v.children) {
          v.children.forEach(v2 => {
            idArr.push(v2.id);
          })
        }
      });
    }
    let str = '';
    let arr = [];
    idArr.forEach(v => {
      str += ` WHEN ${v} THEN ${enable}`;
      arr.push('?');
    });
    const statement2 = `
      UPDATE permission 
      SET enable = CASE id
        ${str}
      END
      WHERE id IN (${arr.toString()});
    `;
    const [result] = await connection.execute(statement2, [...idArr]);
    return result;
  }

  // 删除权限
  async remove(id){
    const statement = `DELETE FROM permission WHERE id = ? OR parent_id = ?;`;
    const [result] = await connection.execute(statement, [id, id]);
    return result;
  }
}

module.exports = new PermissionService();
