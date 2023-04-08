const mysql = require('mysql2')
const con = mysql.createPool({
    connectionLimit: 500,
    host: process.env.DBHOST,
    port: 3306,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    charset: 'utf8mb4'
})


con.getConnection((err) => {
    if (err) {
        console.log({
            err: err,
            msg: "Database connected error"
        })
        return
    } else {
        console.log('Database has been connected')
    }
})

module.exports = con