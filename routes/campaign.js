const router = require('express').Router()
const con = require('../config/config')
const bcrypt = require('bcrypt')
const { isvalid, isuser, checkmsg } = require('../middlewares/user')
const moment = require('moment')
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const dbcreate = require('./campaign/excel/dbcreate')
const pastemsg = require('./campaign/paste/pastemsg')

// user login 
router.get('/gen_qr', isuser, async (req, res) => {
    try {
        // const client = new Client({
        //     authStrategy: new LocalAuth({ clientId: `${req.decode.uid}_clientID` }),
        //     puppeteer: {
        //         headless: false,
        //         args: ['--no-sandbox',
        //             '--disable-setuid-sandbox',
        //             '--disable-extensions',
        //             '--disable-dev-shm-usage',
        //             '--disable-accelerated-2d-canvas',
        //             '--no-first-run',
        //             '--no-zygote',
        //             '--single-process', // <- this one doesn't works in Windows
        //             '--disable-gpu']
        //     }
        // });

        // client.on('qr', (qr) => {
        //     console.log('QR RECEIVED', qr);
        //     var sql = `UPDATE user SET qr_code_string='${qr}', login_status='QR code generated' WHERE uid = '${req.decode.uid}' `

        //     con.query(sql, (err, result) => {
        //         if (err) {
        //             res.json({
        //                 msg: "Db query error",
        //                 err: err
        //             })
        //             console.log(err)
        //             return
        //         } else {
        //             res.json({
        //                 msg: "QR Generated",
        //                 success: true
        //             })
        //         }
        //     })
        // });

        // client.on('authenticated', (session) => {
        //     var sql = `UPDATE user SET login_status='Login success' WHERE uid = '${req.decode.uid}' `
        //     con.query(sql, (err, result) => {
        //         if (err) {
        //             res.json({
        //                 msg: "Db query error",
        //                 err: err
        //             })
        //             console.log(err)
        //             return
        //         }
        //     })
        //     console.log("auth is done ", req.decode.uid)
        //     setTimeout(() => {
        //         client.destroy().then((res) => console.log(res)).catch((err) => {
        //             console.log({ err: err })
        //         })
        //     }, 5000);
        // });

        // // client.on('ready', () => {
        // //     console.log("client ready and closing browser ", req.decode.uid)
        // //     setTimeout(() => {
        // //         client.destroy().then((res) => console.log(res)).catch((err) => {
        // //             console.log({ err: err })
        // //         })
        // //     }, 5000);
        // // })

        // client.initialize();


        const client = new Client({
            authStrategy: new LocalAuth({ clientId: req.decode.uid }),
            puppeteer: {
                headless: false,
                // args: ['--no-sandbox',
                //     '--disable-setuid-sandbox',
                //     '--disable-extensions',
                //     '--disable-dev-shm-usage',
                //     '--disable-accelerated-2d-canvas',
                //     '--no-first-run',
                //     '--no-zygote',
                //     '--single-process', // <- this one doesn't works in Windows
                //     '--disable-gpu']
            }
        });

        client.on('qr', (qr) => {
            console.log('QR RECEIVED', qr);
        });

        client.on('ready', async () => {

            res.json({
                success: true,
                msg: "Login success"
            })
            setTimeout(async () => {
                await client.destroy()
                console.log('browser closed')
            }, 3000);
        });

        client.initialize()

    } catch (err) {
        console.log(err)
        res.json({
            msg: "Server error! Please check error in console",
            err: err
        })
    }
})

// check auth 
router.get('/check_auth', isuser, async (req, res) => {
    try {
        const client = new Client({
            authStrategy: new LocalAuth({ clientId: req.decode.uid }),
            puppeteer: {
                headless: false,
                args: ['--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-extensions',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process', // <- this one doesn't works in Windows
                    '--disable-gpu']
            }
        });

        client.on('qr', (qr) => {
            console.log('QR RECEIVED', qr);
            var sql = `UPDATE user SET login_status='Logout' WHERE uid = '${req.decode.uid}' `
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
                        login: false
                    })
                    setTimeout(() => {
                        client.destroy().then((res) => console.log(res)).catch((err) => {
                            console.log({ err: err })
                        })
                    }, 5000);
                    return
                }
            })
        });

        client.on('ready', async () => {

            res.json({
                success: true,
                msg: "Login success"
            })
            setTimeout(async () => {
                await client.destroy()
                console.log('browser closed')
            }, 3000);
        });

        client.on('authenticated', async (session) => {
            console.log("auth is done ", req.decode.uid)
            var sql = `UPDATE user SET login_status='Login success' WHERE uid = '${req.decode.uid}' `
            con.query(sql, (err, result) => {
                if (err) {
                    res.json({
                        msg: "Db query error",
                        err: err
                    })
                    console.log(err)
                    setTimeout(() => {
                        client.destroy().then((res) => console.log(res)).catch((err) => {
                            console.log({ err: err })
                        })
                    }, 5000);
                    return
                } else {

                    res.json({
                        login: true,
                        msg: "Login success"
                    })
                    setTimeout(async () => {
                        await client.destroy()
                        console.log('browser closed')
                    }, 3000);
                    return
                }
            })
        });

        client.initialize()

    } catch (err) {
        console.log(err)
        res.json({
            msg: "Server error! Please check error in console",
            err: err
        })
    }
})


// get user qr code 
router.get('/get_qr', isuser, (req, res) => {
    var sql = `SELECT * FROM user WHERE uid = '${req.decode.uid}' `

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
                data: result[0],
                success: true
            })
        }
    })
})


// sending bulk 
router.post('/send_bulk', isuser, checkmsg, (req, res) => {
    const unique_id = moment().unix()
    const body = req.body

    try {

        const client = new Client({
            puppeteer: {
                headless: false,
                args: ['--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-extensions',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process', // <- this one doesn't works in Windows
                    '--disable-gpu']
            }
        });

        client.on('qr', (qr) => {
            console.log('QR RECEIVED', qr);
            var sql = `UPDATE user SET qr_bulk='${qr}' WHERE uid = '${req.decode.uid}'`
            con.query(sql, (err, result) => {
                if (err) {
                    res.json({
                        msg: "Db query error",
                        err: err
                    })
                    return
                } else {
                    res.json({
                        msg: "QR Generated",
                        success: true,
                        qr: qr
                    })
                }
            })
        });

        client.on('auth_failure', () => {
            setTimeout(() => {
                client.destroy()
            }, 2000);
        })

        async function sendMsg(code, num, msg, media) {
            return new Promise(async (resolve, reject) => {
                const number = num;
                const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
                const final_number = `${code}${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India

                const number_details = await client.getNumberId(final_number); // get mobile number details

                // const media = await MessageMedia.fromUrl(body.media_url)

                if (number_details) {

                    // if (media) {
                    //     const sendMessageData = await client.sendMessage(number_details._serialized, media, { caption: msg })
                    // } else {
                    //     const sendMessageData = await client.sendMessage(number_details._serialized, msg)
                    // }

                    console.log({
                        code: code,
                        num: num,
                        msg: msg,
                        media: media
                    })

                    resolve({ msg: 'yes' })
                    return

                } else {
                    console.log(final_number, "Mobile number is not registered");
                    resolve({ msg: 'no' })
                }
            })
        }

        function mappingSending(media) {
            let i = 0
            let sent = 0
            return new Promise((resolve, reject) => {
                var timer = setInterval(async () => {
                    const count = await sendMsg(body.excel_array[i].mobile_number_with_country_code.toString().slice(0, 2),
                        body.excel_array[i].mobile_number_with_country_code.toString().substring(2),
                        body.addType === 'paste' ? body.sending_msg :
                            body.sending_msg.replace("{var_two}", body.excel_array[i].var_two).replace("{var_one}", body.excel_array[i].var_one),
                        media
                    )
                    i += 1

                    if (count.msg === 'yes') {
                        sent += 1
                    }

                    if (body.excel_array.length === i) {
                        clearInterval(timer)
                        resolve({
                            sent: sent
                        })
                    }

                }, body.delay_in_sec * 1000)
            })
        }

        client.on('ready', async () => {
            var sql = `INSERT into campaign (unique_id, uid, status, total_msg) VALUES ('${unique_id}', '${req.decode.uid}', 'Started', '${req.body.excel_array.length}')`
            var sql2 = `UPDATE user SET qr_bulk = NULL WHERE uid = '${req.decode.uid}'`

            con.query(sql, async (err, result) => {
                if (err) {
                    console.log(err)
                    return
                } else {
                    con.query(sql2, async (err, result) => {
                        if (err) {
                            console.log(err)
                            return
                        } else {
                            let media = false
                            if (body.media_url) {
                                media = await MessageMedia.fromUrl(body.media_url)
                            } else {
                                media = false
                            }

                            const res = await mappingSending(media)

                            var left_msg = req.user_data.left_msg - res.sent


                            con.query(`UPDATE campaign SET status = 'Completed', sent_msg = '${res.sent}' WHERE unique_id = '${unique_id}' `, async (err, result) => {
                                if (err) {
                                    console.log(err)
                                    return
                                } else {
                                    setTimeout(async () => {
                                        await client.logout()
                                    }, 10000);
                                    con.query(`UPDATE user SET left_msg = '${left_msg}' WHERE uid = '${req.decode.uid}' `, (req, res) => {
                                        if (err) {
                                            console.log(err)
                                            return
                                        } else {
                                            console.log("user left messages updated")
                                        }
                                    })

                                }
                            })
                        }
                    })
                }
            })
        });

        client.initialize()

    } catch (err) {
        res.json({
            err: err,
            msg: "Server error"
        })
        console.log(err)
    }
})


// send excel msg 
router.post("/send_whstapp", isuser, checkmsg, async (req, res) => {
    const unique_id = moment().unix()
    const body = req.body

    await dbcreate.mainFun({ unique_id, body, req, res })
})

// send paste msg 
router.post("/send_whstapp_paste", isuser, checkmsg, async (req, res) => {
    const unique_id = moment().unix()
    const body = req.body

    await pastemsg.mainFun({ unique_id, body, req, res })
})

// get campaign one 
router.post('/get_one', isuser, (req, res) => {
    const sql = `SELECT * FROM campaign WHERE unique_id = '${req.body.unique_id}' `
    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                msg: "DB query error"
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