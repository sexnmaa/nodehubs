const { NOT_NULL, IS_EXISTS } = require("../constants/error-type")
const service = require('../service/user.service')
const md5Password = require("../utils/handlePassword")

const verifyUser = async (ctx, next) => {
  const user = ctx.request.body
  const { name, password } = user
  //判断用户名密码不能为空
  if (!name || !password) {
    const error = new Error(NOT_NULL)
    return ctx.app.emit('error', error, ctx)
  }

  //判断用户名是否已经存在
  const result = await service.getUserByName(name)
  if (result.length) {
    const error = new Error(IS_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

//密码加密
const handlePassword = async (ctx, next) => {
  
  let {password} = ctx.request.body
  ctx.request.body.password = md5Password(password)
  console.log(11);

  await next()
}


module.exports = {
  verifyUser,
  handlePassword
}