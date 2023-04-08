const router = require('express').Router()
const con = require('../config/config')
const bcrypt = require('bcrypt')
const { isvalid } = require('../middlewares/user')
const mysql = require('mysql')
const Importer = require('mysql-import');
const randomstring = require('randomstring')

// get web settings 
router.get('/get', (req, res) => {
    var sql = `SELECT * FROM web`
    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                msg: "Db query error",
                err: err
            })
            console.log(err)
            return
        } else {
            res.json({
                data: result[0]
            })
        }
    })
})

// update payment 
router.post('/update', isvalid, (req, res) => {
    // var sql = `UPDATE advisor SET name = '${req.body.name}',comment = '${req.body.comment}',user_id = '${req.body.user_id}' WHERE id = ${req.body.id}`
    var sql = `UPDATE web SET rz_is_is_active = '${req.body.rz_is_is_active}', rz_key = '${req.body.rz_key}', 
    rz_id = '${req.body.rz_id}', offline_is_active = '${req.body.offline_is_active}', offline_msg = '${req.body.offline_msg}', 
    paypal_is_active = '${req.body.paypal_is_active}', exchange_rate = '${req.body.exchange_rate}', paypal_client_id = '${req.body.paypal_client_id}',
    paypal_client_secret = '${req.body.paypal_client_secret}'`

    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                msg: "Db query error",
                err: err
            })
            console.log(err)
            return
        } else {
            res.json({
                msg: "Settings has been updated",
                success: true
            })
        }
    })
})

// update smtp 
router.post('/update_smtp', isvalid, (req, res) => {

    var sql = `UPDATE web SET smtp_host = '${req.body.smtp_host}', smtp_port = '${req.body.smtp_port}', smtp_email = '${req.body.smtp_email}', smtp_password = '${req.body.smtp_password}' `

    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                msg: "Db query error",
                err: err
            })
            console.log(err)
            return
        } else {
            res.json({
                msg: "Settings has been updated",
                success: true
            })
        }
    })
})


// udpate web config 
router.post('/update_set', isvalid, (req, res) => {

    if (req.files) {
        if (req.files.file !== undefined) {
            const file = req.files.file
            const filename = ("" + Math.random()).substring(2, 7) + Date.now() + file.name
            file.mv(`${__dirname}/../client/public/images/${filename}`, err => {
                if (err) {
                    console.log(err)
                    return res.json({ err })
                }
            })
            var sql = `UPDATE web SET app_name = '${req.body.app_name}', currency_symbol = '${req.body.currency_symbol}', theme_color = '${req.body.theme_color}', logo = '${filename}' `
        }
    } else {
        var sql = `UPDATE web SET app_name = '${req.body.app_name}', currency_symbol = '${req.body.currency_symbol}', theme_color = '${req.body.theme_color}' `
    }

    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                msg: "Db query error",
                err: err
            })
            console.log(err)
            return
        } else {
            res.json({
                msg: "Settings has been updated",
                success: true
            })
        }
    })

})


// install app 
router.post('/install_app', async (req, res) => {
    const app_name = req.body.app_name
    const currency_symbol = req.body.currency_symbol
    const exchange_rate = req.body.exchange_rate
    const admin_email = req.body.admin_email
    const admin_password = req.body.admin_password

    const mysqlcon = mysql.createPool({
        connectionLimit: 100,
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DATABASE
    })

    mysqlcon.getConnection((err) => {
        if (err) {
            res.json({
                msg: "It seems you database connection credentials are invalid."
            })
            return
        } else {

            mysqlcon.query(`SHOW TABLES FROM ${process.env.DATABASE}`, (err, result) => {
                if (err) {
                    return res.json({
                        msg: "Db query error 01"
                    })
                }
                if (result.length > 0) {
                    return res.json({
                        msg: "It seems this database it not empty. Please choose an empty mysql database"
                    })
                } else {
                    const importer = new Importer({
                        host: process.env.DBHOST,
                        user: process.env.DBUSER,
                        password: process.env.DBPASSWORD,
                        database: process.env.DATABASE
                    });

                    importer.import(`${__dirname}/../db/clean_whatsham.sql`).then(async () => {
                        const hashpassword = await bcrypt.hash(admin_password, 10)
                        const uid = randomstring.generate() + Date.now()
                        mysqlcon.query(`INSERT INTO admin (email, password, role, uid) VALUES ('${admin_email}','${hashpassword}', '${'admin'}','${uid}')`, (err, result) => {
                            if (err) {
                                return res.json({
                                    msg: "DB query error"
                                })
                            } else {
                                mysqlcon.query(`INSERT INTO web (app_name, currency_symbol, exchange_rate) VALUES ('${app_name}','${currency_symbol}','${exchange_rate}') `, (err, result) => {
                                    if (err) {
                                        return res.json({
                                            msg: "DB query error"
                                        })
                                    } else {
                                        res.json({
                                            success: true,
                                            msg: "You app has been installed you are good to go now! redirecting..."
                                        })
                                    }
                                })
                            }
                        })
                    }).catch(err => {
                        console.error(err);
                    })
                }
            })
        }
    })

})


router.get("/all_db", (req, res) => {
    con.query(`SHOW TABLES FROM u687661449_aaa`, (err, result) => {
        res.json(result)
    })
})

module.exports = router