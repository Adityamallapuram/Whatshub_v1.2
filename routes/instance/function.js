const con = require('../../config/config')

// creating a db using client_id 
function addNewDB(req) {
    return new Promise((resolve) => {
        con.query(`INSERT INTO instance (client_id, uid, status) VALUES (?,?,?)`, [req.body.client_id, req.decode.uid, 'qr generated'], (err) => {
            if (err) throw err
            else {
                console.log("QR added to DB for: ", req.body.client_id)
                resolve(true)
            }
        })
    })
}


// adding log 
function addLog(req) {
    return new Promise((resolve) => {
        con.query(`INSERT INTO send_logs (uid, unique_id ,sender, receiver, message, status) VALUES (?,?,?,?,?,?)`, [
            req.decode.uid, req.body.unique_id, req.body.sender, req.body.receiver, req.body.message, 'done'
        ], (err) => {
            if (err) throw err
            resolve(true)
        })
    })
}

// update status 
function updateLog(status, unique_id) {
    return new Promise((resolve) => {
        console.log({ status })
        con.query(`UPDATE send_logs SET status = ? WHERE unique_id = ?`, [status, unique_id], (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log("updated the status", unique_id, status)
            resolve(true)
        })
    })
}


module.exports = { addNewDB, addLog, updateLog }