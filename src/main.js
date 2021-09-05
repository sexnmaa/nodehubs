const app  = require('./app/index')
const config = require('./app/config')
require('./app/database')

app.listen(config.APP_PORT, () => {
  console.log('port 8000 is started!');
})