const router = require('express').Router()
const con = require('../config/config')
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')
const moment = require('moment')
const { isvalid, isvaliddownload } = require('../middlewares/user')
const mysqlDump = require('mysqldump');
const Importer = require('mysql-import');
const path = require('path')
const fs = require('fs')

// login admin 
router.post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({ msg: "All fields are required." })
        return
    }
    try {

        con.query(`SELECT * FROM admin WHERE email = '${req.body.email.toLowerCase()}' `, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Database query error",
                    err: err
                })
                return
            } else {
                if (result.length > 0) {

                    bcrypt.compare(req.body.password, result[0].password)
                        .then((pass) => {

                            if (!pass) {
                                return res.json({ success: false, msg: "Wrong credentials" })
                            }

                            const jsontoken = sign({ uid: result[0].uid, email: result[0].email, role: 'admin', password: result[0].password }, process.env.JWTKEY, {
                            })
                            res.json({
                                success: true,
                                msg: "Login success",
                                token: jsontoken
                            })
                            return
                        }).catch((err) => {
                            res.json({
                                success: false,
                                msg: "Server error"
                            })
                        })

                } else {
                    res.json({
                        success: false,
                        msg: "Invalid Credentials"
                    })
                }
            }
        })

    } catch (err) {
        res.json({ err: err, msg: "Server error" })
    }
})

// get all users 
router.get('/get_all_user', isvalid, async (req, res) => {
    try {
        var sql = `SELECT * from user`

        con.query(sql, (err, result) => {
            if (err) {
                return res.json({
                    msg: "DB query error",
                    err: err
                })
            } else {
                res.json({
                    success: true,
                    data: result
                })
            }
        })
    } catch (err) {
        res.json({
            msg: "Server error",
            err: err
        })
        console.log(err)
    }
})

// getting admin  by token
router.get('/get_admin', isvalid, (req, res) => {
    res.json({
        data: req.decode
    })
})

// changing admin password 
router.post('/change_pw', isvalid, (req, res) => {
    console.log(req.body)

    con.query(`SELECT * FROM admin WHERE role = 'admin' `, (err, result) => {
        if (err) {
            res.json({
                success: false,
                msg: "Database query error",
                err: err
            })
            return
        } else {
            if (result.length > 0) {

                bcrypt.compare(req.body.password, result[0].password)
                    .then((pass) => {

                        if (!pass) {
                            return res.json({ success: false, msg: "Wrong credentials" })
                        }


                        if (req.body.new_password) {

                            if (req.body.new_password.length < 8) {
                                return res.json({
                                    msg: "Please give at least 8 charector length in the new password."
                                })
                            }

                            bcrypt.hash(req.body.new_password, 10).then((hashpassword) => {
                                con.query(`UPDATE admin SET email= '${req.body.email}', password = '${hashpassword}' `, (err, result) => {
                                    if (err) {
                                        return res.json({
                                            msg: "DB query error",
                                            err: err
                                        })
                                    } else {
                                        return res.json({
                                            msg: "Admin credentials has been updated",
                                            logout: true
                                        })
                                    }
                                })
                            })

                        } else {
                            con.query(`UPDATE admin SET email= '${req.body.email}' `, (errr, resultt) => {
                                if (err) {
                                    return res.json({
                                        msg: "DB query error",
                                        err: errr
                                    })
                                } else {
                                    return res.json({
                                        msg: "Admin credentials has been updated",
                                        logout: true
                                    })
                                }
                            })
                        }


                        return
                    }).catch((err) => {
                        res.json({
                            success: false,
                            msg: "Server error"
                        })
                    })

            } else {
                res.json({
                    success: false,
                    msg: "Invalid Credentials"
                })
            }
        }
    })
})

// export db 
router.get('/export_db', isvalid, async (req, res) => {
    const date = moment().format("DD-MMMM-YYYY hh:mm")
    mysqlDump({
        connection: {
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DATABASE,
        },
        dumpToFile: `${__dirname}/../backup/${date}_grace.sql`,
    });
    console.log('file-saved')
    res.json({ msg: "Backup genrated" })
})

// deleting backup file 
router.post('/delete_backup_file', isvalid, async (req, res) => {
    try {
        var filePath = `${__dirname}/../backup/${req.body.file_name}`;
        fs.unlinkSync(filePath);

        res.json({ success: true, msg: "Files has been deleted" })
    } catch (err) {
        console.log(err)
        res.json({ success: false, err: err, msg: "Server error" })
    }
})

// getting db list 
router.get('/backup_files', isvalid, async (req, res) => {
    try {
        const files = fs.readdirSync(`${__dirname}/../backup`)
        const data = files.map(item => {
            const time = fs.statSync(`${__dirname}/../backup/` + item).mtime.getTime()
            return {
                date: moment(time).format('DD-MMMM-YYYY hh:mm'),
                name: item
            }
        })
        res.json({ data: data })
    } catch (err) {
        console.log(err)
        res.json({ success: false, err: err, msg: "Server error" })
    }
})

// downloaing backup 
router.get('/download_backup', isvaliddownload, async (req, res) => {
    try {
        const fileName = req.query.file_name
        res.download(`${__dirname}/../backup/${fileName}`, (err) => {
            if (err) {
                return [res.json({ msg: "Something went wront", name: fileName, err: err }), console.log(err)]
            } else {
                console.log('file saved')
            }
        });
    } catch (error) {

    }
})

module.exports = router