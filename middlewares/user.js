const con = require('../config/config')
const jwt = require('jsonwebtoken')

module.exports = {
    isvalid: async (req, res, next) => {

        const token = req.get('Authorization')
        if (!token) {
            return res.json({
                msg: "No token found",
                token: `Your token: ${token}`,
                logout: true
            })
        }
        try {
            if (token) {
                jwt.verify(token.split(' ')[1], process.env.JWTKEY, (err, decode) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            msg: "Invalid token found",
                            logout: true
                        })
                    } else {

                        con.query(`SELECT * FROM admin WHERE email = '${decode.email}' and password = '${decode.password}'`, (err, result) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: "Database query error",
                                    err: err,
                                    token: token
                                })
                                return
                            } else {
                                if (result.length > 0) {
                                    if (result[0].role === 'admin') {
                                        req.decode = decode
                                        next()
                                    } else {
                                        return res.json({
                                            success: 0,
                                            msg: "Unauthorized token",
                                            token: token,
                                            logout: true,
                                            decode: "decode"
                                        })
                                    }
                                } else {
                                    return res.json({
                                        success: 0,
                                        msg: "Invalid token found",
                                        token: token,
                                        logout: true
                                    })
                                }
                            }
                        })
                    }
                })

            } else {
                return res.json({
                    success: 0,
                    msg: "Access denies! Invalid token found.",
                    logout: true
                })
            }
        } catch (err) {
            console.log(err)
        }
    },

    isuser: async (req, res, next) => {

        const token = req.get('Authorization')
        if (!token) {
            return res.json({
                msg: "No token found",
                token: `Your token: ${token}`,
                logout: true
            })
        }
        try {
            if (token) {
                jwt.verify(token.split(' ')[1], process.env.JWTKEY, (err, decode) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            msg: "Invalid token found",
                            logout: true
                        })
                    } else {

                        con.query(`SELECT * FROM user WHERE email = '${decode.email}' and password = '${decode.password}'`, (err, result) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: "Database query error",
                                    err: err,
                                    token: token
                                })
                                return
                            } else {
                                if (result.length > 0) {
                                    if (result[0].role === 'user') {
                                        req.decode = decode
                                        next()
                                    } else {
                                        return res.json({
                                            success: 0,
                                            msg: "Unauthorized token",
                                            token: token,
                                            logout: true,
                                            decode: decode,
                                            result: result[0]
                                        })
                                    }
                                } else {
                                    return res.json({
                                        success: 0,
                                        msg: "Invalid token found",
                                        token: token,
                                        logout: true
                                    })
                                }
                            }
                        })
                    }
                })

            } else {
                return res.json({
                    success: 0,
                    msg: "Access denies! Invalid token found.",
                    logout: true
                })
            }
        } catch (err) {
            console.log(err)
        }
    },

    isvaliddownload: async (req, res, next) => {

        const token = req.query.token

        if (!token) {
            return res.json({
                msg: "No token found",
                token: `Your token: ${token}`,
                logout: true
            })
        }
        try {
            if (token) {
                jwt.verify(token, process.env.JWTKEY, (err, decode) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            msg: "Invalid token found",
                            logout: true
                        })
                    } else {

                        con.query(`SELECT * FROM admin WHERE email = '${decode.email}' and password = '${decode.password}'`, (err, result) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: "Database query error",
                                    err: err,
                                    token: token
                                })
                                return
                            } else {
                                if (result.length > 0) {
                                    if (result[0].role === 'admin') {
                                        req.decode = decode
                                        next()
                                    } else {
                                        return res.json({
                                            success: 0,
                                            token: token,
                                            logout: true,
                                            decode: decode
                                        })
                                    }
                                } else {
                                    return res.json({
                                        success: 0,
                                        msg: "Invalid token found",
                                        token: token,
                                        logout: true
                                    })
                                }
                            }
                        })
                    }
                })

            } else {
                return res.json({
                    success: 0,
                    msg: "Access denies! Invalid token found.",
                    logout: true
                })
            }
        } catch (err) {
            console.log(err)
        }
    },

    checkmsg: async (req, res, next) => {
        var sql = `SELECT * FROM user WHERE uid = '${req.decode.uid}'`
        con.query(sql, (err, result) => {
            if (err) {
                res.json({ msg: "DB query error" })
            } else {
                // if there is no plan 
                if (!result[0].plan) {
                    return res.json({
                        msg: "Sorry you dont have any plan please get one."
                    })
                } else {
                    if (req.body.type === 'excel') {
                        if (!req.body.excel_array.length) {
                            return res.json({
                                msg: "No messages found to be sent."
                            })
                        }
                        if (result[0].left_msg < req.body.excel_array.length) {
                            return res.json({
                                msg: `You have only ${result[0].left_msg} messages left in your account but you are trying to send ${req.body.excel_array.length} messages.`
                            })
                        }
                    } else {
                        if (!req.body.pasted_string.split(",").length) {
                            return res.json({
                                msg: "No messages found to be sent."
                            })
                        }
                        if (result[0].left_msg < req.body.pasted_string.split(",").length) {
                            return res.json({
                                msg: `You have only ${result[0].left_msg} messages left in your account but you are trying to send ${req.body.pasted_string.split(",").length} messages.`
                            })
                        }
                    }
                    req.user_data = result[0]
                    next()
                }
            }
            return
        })
        // next()
    },

    checkbot: async (req, res, next) => {
        var sql = `SELECT * FROM user WHERE uid = '${req.decode.uid}'`
        con.query(sql, (err, result) => {
            if (err) {
                res.json({ msg: "DB query error" })
            } else {
                // if there is no plan 
                if (!result[0].plan) {
                    return res.json({
                        msg: "Sorry you dont have any plan please get one."
                    })
                } else {
                    if (result[0].left_msg < 100) {
                        return res.json({
                            msg: `You need minimum 100 messages left in your account to use WhatsApp Bot`
                        })
                    }
                    req.user_data = result[0]
                    next()
                }
            }
            return
        })
        // next()
    }

}
