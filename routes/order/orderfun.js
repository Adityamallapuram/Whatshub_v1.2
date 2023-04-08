
const con = require('../../config/config')

function getweb() {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM web`
        con.query(sql, (err, result) => {
            if (err) {
                reject()
            } else {
                resolve(result[0])
            }
        })
    })
}

exports.getweb = getweb


function updatemsg({ req, plan }) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM user WHERE uid = '${req.decode.uid}' `, (err, result) => {
            if (err) {
                return reject()
            } else {

                con.query(`UPDATE user SET left_msg = '${plan.message_limit}', plan = '${JSON.stringify(plan)}' WHERE uid = '${req.decode.uid}' `, (err, result) => {
                    if (err) {
                        return reject()
                    } else {
                        resolve(result[0])
                    }
                })

            }
        })
    })
}

exports.updatemsg = updatemsg

function ordergen({ req, msgg, type }) {
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO orders (user_data, transaction, order_type) VALUES ('${JSON.stringify(req.decode)}', '${JSON.stringify(msgg)}', '${type}') `
        con.query(sql, (err, result) => {
            if (err) {
                return reject()
            } else {
                resolve()
            }
        })
    })
}

exports.ordergen = ordergen