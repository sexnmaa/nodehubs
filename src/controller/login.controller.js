const jwt = require('jsonwebtoken')
const fs = require('fs')

class loginController {
  async login(ctx, next) {
    const { id, name } = ctx.user
    const secretKey = fs.readFileSync('src/app/keys/private.key')
    console.log(secretKey);
    const token = jwt.sign({ id, name }, secretKey, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    })
    ctx.body = {
      id,
      name,
      token
    }
  }
  async success(ctx, next) {
    ctx.body = '授权成功~'
  }
}


module.exports = new loginController