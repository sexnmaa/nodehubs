const { NOT_NULL, IS_EXISTS, HAD_EXISTS, PASSWORD_ERROR, UNAUTHORIZATION, UNPERMISSION } = require("../constants/error-type");


const errorHandler = (error, ctx) => {
  let status
  switch (error.message) {
    case NOT_NULL:
      status = 404
      break;
    case IS_EXISTS: 
      status = 409
      break;
    case HAD_EXISTS:  
      status = 400
      break;
    case PASSWORD_ERROR: 
      status = 400
      break;
    case UNAUTHORIZATION:
      status = 401
      break;
    case UNPERMISSION:
      status = 401
      break;
    default:
      status = 404
      error.message = '404 NOT FOUND'
      break;
  }
  ctx.status = status
  ctx.body = error.message
}

module.exports = {
  errorHandler
}