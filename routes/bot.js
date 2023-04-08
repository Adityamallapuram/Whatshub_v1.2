const router = require('express').Router()
const con = require('../config/config')
const bcrypt = require('bcrypt')
const { isuser, checkbot } = require('../middlewares/user')
const moment = require('moment')
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

// adding one 
router.post('/add_one', isuser, checkbot, (req, res) => {
    var sql = `SELECT * FROM bot_campaign WHERE uid = '${req.decode.uid}'`
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.json({
                msg: "Db query error"
            })
            return
        } else {
            if (result.length > 0) {
                res.json({
                    msg: "You have already a bot running Please logout the session from your whstapp app"
                })
                return
            } else {
                var sql2 = `INSERT INTO bot_campaign (reply, uid) VALUES ('${JSON.stringify(req.body.reply)}', '${req.decode.uid}') `
                con.query(sql2, (err, results) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            msg: "Db query error"
                        })
                        return
                    } else {
                        const client = new Client({
                            puppeteer: {
                                headless: true,
                                args: ['--no-sandbox',
                                    '--disable-setuid-sandbox',
                                    '--disable-extensions',
                                    '--disable-dev-shm-usage',
                                    '--disable-accelerated-2d-canvas',
                                    '--no-first-run',
                                    '--no-zygote',
                                    '--single-process', // <- this one doesn't works in Windows
                                    '--disable-gpu'
                                ]
                            }
                        });

                        client.on('qr', (qr) => {
                            const sql = `UPDATE bot_campaign SET qr_code = '${qr}' WHERE uid = '${req.decode.uid}'`

                            con.query(sql, (err, result) => {
                                if (err) {
                                    return { err: err, msg: "Db query error" }
                                } else {
                                    console.log("added qr")
                                    return
                                }
                            })

                            res.json({
                                msg: "QR Generated",
                                success: true,
                                qr: qr
                            })
                        });

                        client.on('ready', () => {
                            con.query(`UPDATE bot_campaign SET login_status = '1' WHERE uid = '${req.decode.uid}'`)
                        });

                        client.on('message', message => {
                            req.body.reply.map((i) => {
                                if (message.body === i.in) {
                                    message.reply(i.out)
                                }
                            })
                        });


                        client.on('auth_failure', () => {
                            con.query(`DELETE FROM bot_campaign WHERE uid = '${req.decode.uid}' `)

                            setTimeout(() => {
                                client.destroy()
                            }, 2000);
                        })

                        client.on('disconnected', () => {
                            con.query(`DELETE FROM bot_campaign WHERE uid = '${req.decode.uid}' `)
                            console.log('closing')
                            setTimeout(() => {
                                client.destroy()
                            }, 2000);
                        })

                        client.initialize()
                    }
                })
            }
        }
    })
})


// get one by uid 
router.get('/get_one', isuser, (req, res) => {
    var sql = `SELECT * FROM bot_campaign WHERE uid = '${req.decode.uid}' `
    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                msg: "Db query error"
            })
            console.log(err)
            return
        } else {
            res.json({
                success: true,
                data: result[0]
            })
        }
    })
})

module.exports = router