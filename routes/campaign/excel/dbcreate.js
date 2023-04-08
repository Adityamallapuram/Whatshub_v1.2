const con = require('../../../config/config')
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const moment = require('moment')

function mainFun({ unique_id, body, req, res }) {

    return new Promise(async (resolve, reject) => {
        try {

            const db = await createdb()

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
                        '--disable-gpu']
                }
            });

            client.on('qr', async (qr) => {
                const sql = `UPDATE campaign SET qr_code = '${qr}' WHERE unique_id = '${unique_id}'`

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
                    qr: qr,
                    unique_id: unique_id
                })
            });

            client.on('auth_failure', () => {
                setTimeout(() => {
                    client.destroy()
                }, 2000);
            })

            function createdb() {
                return new Promise(async (resolve, reject) => {
                    var sql = `INSERT into campaign (unique_id, uid, total_msg) VALUES ('${unique_id}', '${req.decode.uid}',  '${req.body.excel_array.length}' )`

                    con.query(sql, (err, result) => {
                        if (err) {
                            return { err: err, msg: "Db query error" }
                        } else {
                            resolve({ msg: "database created" })
                            return
                        }
                    })
                })
            }


            function sendSingleMsg(code, num, msg, media) {

                return new Promise(async (resolve, reject) => {
                    const number = num;
                    const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
                    const final_number = `${code}${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India

                    const number_details = await client.getNumberId(final_number); // get mobile number details

                    // console.log({ number_details: number_details })

                    if (number_details) {

                        if (media) {
                            const sendMessageData = await client.sendMessage(number_details._serialized, media, { caption: msg })
                            console.log("msg sent")
                        } else {
                            const sendMessageData = await client.sendMessage(number_details._serialized, msg)
                            console.log("msg sent no media")
                        }

                        resolve({ msg: 'yes' })
                        return

                    } else {
                        console.log(final_number, "Mobile number is not registered");
                        resolve({ msg: 'no' })
                    }
                })
            }

            function mappingNumbers({ media }) {

                let i = 0
                let sent = 0
                return new Promise((resolve, reject) => {
                    var timer = setInterval(async () => {
                        const count = await sendSingleMsg(
                            body.excel_array[i].numbers.toString().slice(0, 2),
                            body.excel_array[i].numbers.toString().substring(2),
                            body.sending_msg.replace("{var_one}",
                                body.excel_array[i].var_one).replace("{var_two}", body.excel_array[i].var_two),
                            media,
                            client
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

                    }, parseInt(body.delay_in_sec) * 1000)
                })
            }


            function msgupdate({ left_msg, resp }) {
                return new Promise((resolve, reject) => {
                    var sql = `UPDATE campaign SET status = 'Completed', sent_msg = '${resp.sent}' WHERE unique_id = '${unique_id}' `

                    con.query(sql, async (err, result) => {
                        if (err) {
                            console.log(err)
                            return
                        } else {
                            setTimeout(async () => {
                                await client.logout()
                            }, 10000);
                            con.query(`UPDATE user SET left_msg = '${left_msg}', qr_bulk = 'NULL' WHERE uid = '${req.decode.uid}' `, (req, res) => {
                                if (err) {
                                    console.log(err)
                                    return
                                } else {
                                    console.log("user left messages updated")
                                    resolve()
                                }
                            })

                        }
                    })
                })
            }

            client.on('ready', async () => {

                con.query(`UPDATE campaign SET login_status = '1' WHERE unique_id = '${unique_id}'`)

                let media = false
                if (body.media_url && body.with_media) {
                    media = await MessageMedia.fromUrl(body.media_url)
                } else {
                    media = false
                }

                // sending msg 
                const resp = await mappingNumbers({ media, body })

                var left_msg = req.user_data.left_msg - resp.sent

                // updating database 
                await msgupdate({ left_msg, resp })
                resolve()
                console.log("Task done")
            });

            client.initialize()


        } catch (err) {
            console.log(err)
        }
    })

}

exports.mainFun = mainFun

