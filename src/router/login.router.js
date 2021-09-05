const {
  login,
  success
} = require('../controller/login.controller')
const Router = require('koa-router')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')

const loginRouter = new Router()

loginRouter.post('/login', verifyLogin, login)
loginRouter.get('/test', verifyAuth, success)

module.exports = loginRouter