const { NOT_NULL, HAD_EXISTS, PASSWORD_ERROR, UNAUTHORIZATION, UNPERMISSION } = require("../constants/error-type")
const userService = require('../service/user.service')
const PerService = require('../service/permission.server')
const md5Password = require("../utils/handlePassword")
const fs = require('fs')
const jwt = require('jsonwebtoken')

const verifyLogin = async (ctx, next) => {
  const {name, password} = ctx.request.body
  
  //判断账号密码不为空
  if (!name || !password) {
    const error = new Error(NOT_NULL)
    return ctx.app.emit('error', error, ctx)
  }
  //判断用户是否存在
  const result = await userService.getUserByName(name)
  const user = result[0]
  if(!user) {
    const error = new Error(HAD_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  
  //判断密码是否正确（查数据库判断是否一致）
  if(md5Password(password) !== user.password) {
    const error = new Error(PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  const publicKey = fs.readFileSync('src/app/keys/public.key')
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(UNAUTHORIZATION)
    ctx.app.emit('error', error,ctx)
  }
}
const verifyPermission = async (ctx, next) => {
  const {id} = ctx.user
  const objKey= Object.keys(ctx.params)[0]
  const tableName = objKey.replace('Id', '')
  const sourceId = ctx.params[objKey]
  const permission = await PerService.getPermissionById(tableName, id, sourceId)
  if (permission) {
    const error = new Error(UNPERMISSION)
    return ctx.app.emit('error', error, ctx) 
  }
  await next()
} 
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission 
}