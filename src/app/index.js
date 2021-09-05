const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const {
  errorHandler
} = require('./error-handler')
const useRoutes = require('../router/index')

const app = new Koa()


app.useRoutes = useRoutes
app.use(bodyParser())
app.useRoutes()

app.on('error', errorHandler)


module.exports = app