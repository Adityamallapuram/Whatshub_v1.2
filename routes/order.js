const router = require('express').Router()
const con = require('../config/config')
const bcrypt = require('bcrypt')
const { isvalid, isuser } = require('../middlewares/user')
const moment = require('moment')
const fetch = require('node-fetch')
const orderfun = require('./order/orderfun')
// const Razorpay = require('razorpay');
const randomstring = require('randomstring')

router.post('/pay_with_rz', isuser, async (req, res) => {
    try {
        const plan = req.body.plan
        const data = await orderfun.getweb()

        const date = new Date
        const memdays = moment(date).add(plan.time_period, 'days')

        var instance = new Razorpay({
            key_id: data.rz_id,
            key_secret: data.rz_key,
        });

        const finalamt = parseInt(req.body.amount) / parseInt(data.exchange_rate) * 80
        const msgg = await instance.payments.capture(req.body.rz_payment_id, Math.round(finalamt) * 100, "INR")

        if (!msgg) {
            res.json({ success: false, msg: "Something went wrong, Try again" })
            return
        }

        const resp = await orderfun.updatemsg({ req, plan })


        await orderfun.ordergen({ req, msgg, type: "Razorpay" })


        res.json({ success: true, data: resp, msg: "Congo!" })

    } catch (err) {
        console.log(err)
        res.json({ msg: "Server error", err: err })
    }
})


// get order paypal 
router.post('/paypal_with_paypal', isuser, async (req, res) => {
    try {
        var order_id = req.body.order_id
        const plan = req.body.plan

        if (!order_id || !plan) {
            return res.json({
                msg: "Order id and plan required"
            })
        }

        const date = new Date
        const memdays = moment(date).add(plan.time_period, 'days')

        const cred = await orderfun.getweb()

        let username = cred.paypal_client_id;
        let password = cred.paypal_client_secret;

        let response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`, 'binary').toString('base64')
            }
        });

        let data = await response.json();

        let resp_order = await fetch(`https://api-m.sandbox.paypal.com/v1/checkout/orders/${order_id}`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + data.access_token
            }
        });
        let order_details = await resp_order.json()

        if (!order_details.status === 'COMPLETED') {
            res.json({ success: false, msg: "Something went wrong with yout payment. Please try again or contact support if your payment deducted" })
            return
        }

        const resp = await orderfun.updatemsg({ req, plan })

        var msgg = order_details
        await orderfun.ordergen({
            req, msgg, type: "Paypal"
        })

        res.json({ success: true, data: resp, msg: "Congo!" })


    } catch (err) {
        console.log(err)
        res.json({
            err: err,
            msg: "Server error"
        })
    }
})

// get all orders admin 
router.get('/get_all_orders_admin', isvalid, (req, res) => {
    var sql = `SELECT * FROM orders`
    con.query(sql, (err, result) => {
        if (err) {
            res.json({ msg: "Db query error" })
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