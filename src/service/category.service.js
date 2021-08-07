// 导入数据库连接池
const connection = require('../app/db');

class CategoryService{
  // 获取角色列表
  async list(){
    const statement = `SELECT * FROM category;`;
    const [result] = await connection.execute(statement);
    // 修改状态为布尔值
    result.forEach(v => {
      v.is_status = v.is_status === 1;
    })
    return result;
  }
  // 添加分类
  async add(name){
    const statement = `INSERT INTO category (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  // 修改分类名称
  async update(id, name){
    const statement = `
      UPDATE category 
      SET 
        name = ?
      WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [name, id]);
    return result;
  }
  // 修改分类状态
  async editStatus(id, state){
    const statement = `
      UPDATE category 
      SET 
        is_status = ?
      WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [Number(state), id]);
    return result;
  }

  // 删除分类
  async remove(id){
    const statement = `DELETE FROM category WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
}

module.exports = new CategoryService();