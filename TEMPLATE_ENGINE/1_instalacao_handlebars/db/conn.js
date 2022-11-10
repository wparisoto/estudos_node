const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'wagner',
    password: '124617wp',
    database: 'quotes',
})

module.exports = pool