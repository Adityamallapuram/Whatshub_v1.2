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

// adding one 
router.post('/add', isvalid, async (req, res) => {
    const name = req.body.name
    const message_limit = req.body.message_limit
    const cost = req.body.cost

    if (!name || !message_limit || !cost) {
        return res.json({ msg: "Please send all required fileds" })
    }

    try {
        con.query(`INSERT INTO plan (name, message_limit, cost) VALUES ('${name}', '${message_limit}', '${cost}')`, (er, result) => {
            if (er) {
                res.json({
                    msg: "DB query error",
                    err: er
                })
                console.log(er)
                return
            } else {
                return res.json({
                    success: true,
                    msg: "New plan has been added"
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

// deleting one 
router.post('/delete', isvalid, (req, res) => {
    if (!req.body.id) {
        return res.json({
            msg: "Please provide id"
        })
    }
    var sql = `DELETE FROM plan WHERE id = '${req.body.id}'`
    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                msg: "DB querry error",
                err: err
            })
            console.log(err)
            return
        } else {
            res.json({
                msg: "Plan has been deleted",
                success: true
            })
        }
    })
})

// get all plans 
router.get('/get', (req, res) => {
    var sql = `SELECT * from plan`
    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                err: err,
                msg: "Database query error"
            })
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