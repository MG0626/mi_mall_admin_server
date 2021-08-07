// 导入数据库连接池
const connection = require('../app/db');

class GoodsService{
  // 查询商品列表
  async list(query_params = '', page_number, current_number){
    // 偏移量
    const offset = (page_number - 1) * current_number;
    const arr = [current_number.toString(), offset.toString()];
    const statement = `
      SELECT 
        g.*,
        c.name category_name
      FROM goods g
      LEFT JOIN category c
      ON g.category_id = c.id
      WHERE g.name LIKE '%${query_params}%'
      LIMIT ? OFFSET ?
    `;
    const [result] = await connection.execute(statement, arr);
    // 获取总数
    const statement2 = `
      SELECT 
        COUNT(id) total
      FROM goods
      WHERE name LIKE '%${query_params}%';
    `;
    const [[result2]] = await connection.execute(statement2);
    return {
      total: result2.total,
      goods: result
    };
  }

  // 获取按分类分组的商品列表树
  async getListTree(){
    console.log('result');
    const statement = `
      SELECT
        c.id,
        c.name,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', g.id,
            'name', g.name
          )
        ) children
      FROM goods g
      LEFT JOIN category c
      ON g.category_id = c.id
      GROUP BY c.id;
    `;
    const [result] = await connection.execute(statement);
    return result;
  }

  // 添加商品
  async add(info){
    const { name, price, versions, inventory, colors, detail, cover, imgArr, category_id } = info;
    const statement = `
      INSERT INTO goods (
        name, 
        price, 
        versions, 
        inventory, 
        colors, 
        detail, 
        cover,
        imgArr,
        category_id
      ) 
      VALUES (?,?,?,?,?,?,?,?,?);
    `;
    const [result] = await connection.execute(statement, [name, price, versions, inventory, colors, detail, cover, imgArr, category_id]);
    return result;
  }

  // 修改商品信息
  async update(id, info){
    const { name, price, versions, inventory, colors, detail, category_id, cover, imgArr } = info;
    const arr = [name, price, versions, inventory, colors, detail, cover, imgArr, category_id];
    const statement = `
      UPDATE goods 
      SET 
        name = ?, 
        price = ?, 
        versions = ?, 
        inventory = ?, 
        colors = ?, 
        detail = ?,
        cover = ?,
        imgArr = ?, 
        category_id = ? 
      WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [...arr, id]);
    return result;
  }

  // 修改商品状态
  async status(id, is_status){
    const statement = `UPDATE goods SET is_status = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [is_status, id]);
    return result;
  }

  // 删除商品
  async remove(id){
    const statement = `DELETE FROM goods WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
}

module.exports = new GoodsService();