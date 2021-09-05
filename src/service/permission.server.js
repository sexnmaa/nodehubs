const connection = require('../app/database')


class permissionService {
  async getPermissionById(tableName, id, sourceId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [sourceId, id])
    return result.length === 0
  }
  async changeMoment(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }
  async removeMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
}

module.exports = new permissionService