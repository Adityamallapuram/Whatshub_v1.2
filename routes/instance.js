const router = require('express').Router()
const con = require('../config/config')
const bcrypt = require('bcrypt')
const { isvalid, isuser } = require('../middlewares/user')
const moment = require('moment')
const fetch = require('node-fetch')
const orderfun = require('./order/orderfun')
// const Razorpay = require('razorpay');
const randomstring = require('randomstring')
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const { addNewDB, addLog, updateLog } = require('./instance/function')
const mime = require('mime');

// add an instance 
router.post('/add', isuser, async (req, res) => {
    try {

        await addNewDB(req)

        const client = new Client({
            authStrategy: new LocalAuth({ clientId: req.body.client_id }),
            puppeteer: {
                headless: false,
                args: ['--no-sandbox',
                    '--disable-infobars',
                    '--disable-session-crashed-bubble'
                ]
            }
        });

        client.on('qr', (qr) => {
            const sql = `UPDATE instance SET qr = '${qr}' WHERE client_id = '${req.body.client_id}'`
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
            console.log("qr generated")
            // resolve(qr) 
        });

        client.on('auth_failure', () => {
            console.log('auth fail closing now.')
            setTimeout(() => {
                client.destroy()
            }, 2000);
        })

        client.on('ready', () => {
            console.log('client ready')
            con.query(`UPDATE instance SET status = 'ready', mobile = '${client.info.wid.user}' WHERE client_id = '${req.body.client_id}' `, (err) => {
                if (err) throw err
                else console.log("added ready to db")
            })
            setTimeout(() => {
                console.log("closing now.")
                client.destroy()
            }, 5000);
        });

        client.initialize()

    } catch (err) {
        res.json({ err, msg: "Server error" })
        console.log(err)
    }
})




// get one by uid 
router.post('/get_one', isuser, (req, res) => {
    var sql = `SELECT * FROM instance WHERE client_id = '${req.body.client_id}' `
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


// get all 
router.get('/get_all_token', isuser, async (req, res) => {
    try {
        con.query(`SELECT * FROM instance WHERE uid = '${req.decode.uid}' `, (err, result) => {
            if (err) throw err
            else res.json({ success: true, data: result })
        })

    } catch (err) {
        res.json({ err, msg: "Server error" })
        console.log(err)
    }
})


// del one 
router.post('/del', isuser, async (req, res) => {
    try {
        con.query(`DELETE FROM instance WHERE id = '${req.body.id}' `, (err, result) => {
            if (err) throw err
            else {
                res.json(({ success: true, msg: "your instance was deleted" }))
            }
        })
    } catch (err) {
        res.json({ err, msg: "Server error" })
        console.log(err)
    }
})



// send single message 
router.post('/send_text', isuser, async (req, res) => {
    try {

        res.json({ msg: "Success, check result in history", success: true })

        const client = new Client({
            authStrategy: new LocalAuth({ clientId: req.body.client_id }),
            puppeteer: {
                headless: false,
                args: ['--no-sandbox',
                    '--disable-infobars',
                    '--disable-session-crashed-bubble'
                ]
            }
        });


        client.on('qr', (qr) => {
            console.log('auth fail closing now.')
            setTimeout(() => {
                client.destroy()
            }, 2000);
        });


        client.on('auth_failure', () => {
            console.log('auth fail closing now.')
            setTimeout(() => {
                client.destroy()
            }, 2000);
        })

        client.on('ready', async () => {
            const pUrl = new URL(req.body.media || "https://null.com");
            let mimetype = mime.getType(pUrl);

            await addLog(req)

            if (req.body.media && mimetype) {
                const mediaa = await MessageMedia.fromUrl(req.body.media)
                const number_details = await client.getNumberId(req.body.receiver);
                const sendMessageData = await client.sendMessage(number_details._serialized, mediaa, { caption: req.body.message || "NA" })
                console.log("msg sent with media")

                // await updateLog('sent media message', req.body.unique_id)

                // res.json({msg:"Message sent with media", success: true}) 

                setTimeout(() => {
                    console.log("closing now.")
                    client.destroy()
                }, 5000);

            } else {
                const number_details = await client.getNumberId(req.body.receiver);
                const sendMessageData = await client.sendMessage(number_details._serialized, req.body.message || "NA")
                console.log("msg sent no media")

                // await updateLog('sent text message', req.body.unique_id)

                // res.json({msg:"Message not sent with media", success: true}) 

                setTimeout(() => {
                    console.log("closing now.")
                    client.destroy()
                }, 5000);

            }

        });

        client.initialize()



    } catch (err) {
        res.json({ err, msg: "Server error" })
        console.log(err)
    }
})

// get all logs 
router.get('/get_logs', isuser, async (req, res) => {
    try {
        con.query(`SELECT * FROM send_logs WHERE uid = '${req.decode.uid}' `, (err, result) => {
            if (err) throw err
            else {
                res.json({ success: true, data: result })
            }
        })
    } catch (err) {
        res.json({ err, msg: "Server error" })
        console.log(err)
    }
})

// del one 
router.post('/del_log', isuser, async (req, res) => {
    try {
        con.query(`DELETE FROM send_logs WHERE id = '${req.body.id}' `, (err) => {
            if (err) throw err
            else res.json({ success: true, msg: "Log was deleted" })
        })
    } catch (err) {
        res.json({ err, msg: "Server error" })
        console.log(err)
    }
})

module.exports = router