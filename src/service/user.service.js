const connection = require('../app/database')

class userService {
  async create(user) {
    console.log(user);
    const { name, password } = user
    // 将user添加到数据库中
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`
    const result = await connection.execute(statement, [name, password])
    return result[0]
  }
  // 根据name查询数据库
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }
}

module.exports = new userService()