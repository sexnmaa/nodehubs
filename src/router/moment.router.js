const Router = require('koa-router')
const { create, detail, list, update, remove } = require('../controller/moment.controller')
const { verifyAuth, verifyPermission } = require('../middleware/login.middleware')

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/:id', detail)
momentRouter.get('/', list)
//1.用户已经登录 2.用户有权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

module.exports = momentRouter