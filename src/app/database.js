const mysql = require('mysql2')

const connection = mysql.createPool({
  host: 'localhost',
  port: '3306',
  database: 'coderhub',
  user: 'root',
  password: '20000125fff',  
})

connection.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log('数据库连接失败'); 
    } else {
      console.log('数据库连接成功');
    }
  })
})

module.exports = connection.promise()