const router = require('express').Router()
const con = require('../config/config')
const bcrypt = require('bcrypt')
const { isvalid, isuser } = require('../middlewares/user')
const moment = require('moment')

// send one 
router.post('/add', isuser, (req, res) => {
    var sql = `INSERT INTO ping (message, user_email, uid) VALUES ('${req.body.message}', '${req.decode.email}', '${req.decode.uid}') `

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
                msg: "Your message has been sent",
                success: true
            })
        }
    })

})

// get messages 
router.get('/get_all', isvalid, (req, res) => {
    var sql = `SELECT * FROM ping`
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
                data: result,
                success: true
            })
        }
    })
})

// send respond 
router.post('/respond', isvalid, (req, res) => {
    var sql = `UPDATE ping SET admin_response = '${req.body.admin_response}' WHERE id = '${req.body.id}' `
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
                msg: "You response has been set",
                success: true
            })
        }
    })
})

// delete one by admin 
router.post('/delete', isvalid, (req, res) => {
    var sql = `DELETE FROM ping WHERE id = '${req.body.id}'`
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
                msg: "This ping has been deleted",
                success: true
            })
        }
    })
})

// my msg 
router.get('/my_message', isuser, (req, res) => {
    var sql = `SELECT * FROM ping WHERE uid = '${req.decode.uid}'`
    con.query(sql, (err, result) => {
        if (err) {
            res.json({ msg: "Server error" })
            console.log(err)
            return
        } else {
            res.json({
                success: true,
                data: result
            })
        }
    })
})

module.exports = router