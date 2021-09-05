const connection = require('../app/database')

class commentService {
  async postComment(momentId, content, user_id) {
    const statement = `INSERT INTO comment (moment_id , content , user_id) VALUES (?, ?, ?);`
    const [result] = await connection.execute(statement, [momentId, content, user_id])
    return result
  }
  async replyComment(momentId, content, id, commentId) {
    const statement = `INSERT INTO comment (moment_id , content , user_id, comment_id) VALUES (?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [momentId, content, id, commentId])
    return result
  }
  async changeComment(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, commentId])
    return result
  }
  async removeComment(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`
    const [result] = await connection.execute(statement, [commentId])
    return result
  }
}

module.exports = new commentService()