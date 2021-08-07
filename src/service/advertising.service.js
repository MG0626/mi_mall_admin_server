// 导入连接池
const connection = require('../app/db');

class AdvertisingService{
  async list(){
    const statement = `
      SELECT 
        hp.*,
        g.name goods_name,
        g.category_id
      FROM home_promotion hp
      LEFT JOIN goods g
      ON hp.goods_id = g.id;
    `;
    const [result] = await connection.execute(statement);
    // 格式化状态值为布尔值
    result.forEach(v => {
      v.is_status = v.is_status === 1;
    })
    return result;
  }

  // 修改状态
  async editStatus(id, is_status){
    const statement = `
      UPDATE home_promotion 
      SET 
        is_status = ?
      WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [Number(is_status), id]);
    return result;
  }

  // 添加推广
  async add(url, id){
    const statement = ` INSERT INTO home_promotion(url, goods_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [url, id]);
    return result;
  }

  // 修改首页推广信息
  async update( id, url, goods_id){
    const statement = ` UPDATE home_promotion SET url = ?, goods_id = ? WHERE id = ?; `;
    const [result] = await connection.execute(statement, [url, goods_id, id]);
    return result;
  }

  // 删除首页推广信息
  async remove(id){
    const statement = `DELETE FROM home_promotion WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
}

module.exports = new AdvertisingService();

