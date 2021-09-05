const connection = require('../app/database')

class momentService {
  async create(content, id) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
    const result = await connection.execute(statement, [content, id])
  }
  async getMomentDetailByID(id) {
    const statement =
    `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    WHERE m.id = ?;`
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }
  async getMomentList(offset, size) {
    const statement =
    `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) user,
    (SELECT COUNT(*) FROM comment c WHERE c.comment_id = m.id) commentCount
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LIMIT ?, ?;`
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
}

module.exports = new momentService()