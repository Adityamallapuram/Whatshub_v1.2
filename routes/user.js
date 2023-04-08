const router = require('express').Router()
const con = require('../config/config')
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { isuser, isvalid, checkmsg } = require('../middlewares/user')
const moment = require('moment')
const randomstring = require('randomstring')
const nodemailer = require('nodemailer');

// login user 
router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ msg: "All fields are required." })
    return
  }
  try {

    con.query(`SELECT * FROM user WHERE email = '${req.body.email.toLowerCase()}' `, (err, result) => {
      if (err) {
        res.json({
          success: false,
          msg: "Database query error",
          err: err
        })
        return
      } else {
        if (result.length > 0) {

          bcrypt.compare(req.body.password, result[0].password)
            .then((pass) => {

              if (!pass) {
                return res.json({ success: false, msg: "Wrong credentials" })
              }

              const jsontoken = sign({ uid: result[0].uid, email: result[0].email, role: 'user', password: result[0].password }, process.env.JWTKEY, {
              })
              res.json({
                success: true,
                msg: "Login success",
                token: jsontoken
              })
              return
            }).catch((err) => {
              res.json({
                success: false,
                msg: "Server error"
              })
            })

        } else {
          res.json({
            success: false,
            msg: "Invalid Credentials"
          })
        }
      }
    })

  } catch (err) {
    res.json({ err: err, msg: "Server error" })
  }
})

// get user details by token 
router.get('/get_user_by_token', isuser, (req, res) => {
  var sql = `SELECT * FROM user WHERE uid ='${req.decode.uid}'`
  con.query(sql, (err, result) => {
    if (err) {
      res.json({
        msg: "DB querry error",
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

// update user 
router.post('/admin_user_update', isvalid, (req, res) => {

  // generating hash password 
  bcrypt.hash(req.body.new_password || "123", 10).then((hash_password) => {

    var check = `SELECT * FROM user WHERE email = '${req.body.email}' `

    if (req.body.new_password) {
      console.log("password changed")
      var sql = `UPDATE user SET name = '${req.body.name}', email = '${req.body.email.toLowerCase()}', mobile = '${req.body.mobile}', password = '${hash_password}', active = '${req.body.active}' WHERE uid = '${req.body.uid}' `
    } else {
      var sql = `UPDATE user SET name = '${req.body.name}', email = '${req.body.email.toLowerCase()}', mobile = '${req.body.mobile}', active = '${req.body.active}' WHERE uid = '${req.body.uid}'  `
    }

    con.query(check, (er, resp) => {
      if (er) {
        res.json({
          msg: "DB query error",
          err: er
        })
        console.log(er)
        return
      } else {
        if (resp[0] && resp[0].uid !== req.body.uid) {
          return res.json({
            msg: "This email is already set by another user"
          })
        } else {
          con.query(sql, (err, result) => {
            if (err) {
              res.json({
                msg: "DB query error yo",
                err: err
              })
              console.log(er)
              return
            } else {
              res.json({
                msg: "User has been updated",
                success: true
              })
            }
          })
        }
      }
    })


  }).catch((errr) => {
    res.json({
      msg: "Server error",
      err: errr
    })
    console.log(errr)
  })

})

// adding media 
router.post('/add_media', isuser, (req, res) => {
  try {
    if (req.files) {
      if (req.files.file !== undefined) {
        const file = req.files.file
        const filename = ("" + Math.random()).substring(2, 7) + Date.now() + file.name
        file.mv(`${__dirname}/../client/public/user-media/${filename}`, err => {
          if (err) {
            console.log(err)
            return res.json({ err })
          }
        })
        console.log(filename)
        res.json({
          filename: filename,
          success: true
        })
      }
    }

  } catch (err) {
    res.json({ err: err, msg: "Server error" })
    console.log(err)
  }
})

// update plan by admin 
router.post('/admin_plan_update', (req, res) => {

  if (!req.body.plan || !req.body.uid) {
    return res.json({
      msg: "Please provide a plan"
    })
  }

  var sql = `UPDATE user SET plan = '${req.body.plan}', left_msg='${JSON.parse(req.body.plan).message_limit}' WHERE uid = '${req.body.uid}' `
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({
        msg: "Db query error",
        err: err
      })
    } else {
      res.json({
        success: true,
        msg: "Plan has been updated"
      })
    }
  })
})


// get campaign by token 
router.get('/get_campaign', isuser, (req, res) => {
  var sql = `SELECT * FROM campaign WHERE uid = '${req.decode.uid}' `
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
        data: result
      })
    }
  })
})

// del campaign by user 
router.post('/delete_campaign', isuser, (req, res) => {

  var sql = `DELETE FROM campaign WHERE id = '${req.body.id}' `
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
        msg: "Campaign has been deleted",
        success: true
      })
    }
  })
})

// update user by user 
router.post('/update', isuser, async (req, res) => {
  //  find ext 
  function getUser() {
    return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM user WHERE email = '${req.body.email}' `, (err, result) => {
        if (err) {
          return reject()
        } else {
          resolve(result[0])
        }
      })
    })
  }

  const findext = await getUser()


  if (findext) {
    if (findext.uid !== req.decode.uid) {
      return res.json({
        msg: "This email is already assigned to another account."
      })
    }
  }

  if (req.body.new_password) {
    const hashpassword = await bcrypt.hash(req.body.new_password, 10)
    req.body.password = hashpassword
  }

  con.query(`UPDATE user SET email='${req.body.email}', password='${req.body.password}', name='${req.body.name}' WHERE uid = '${req.decode.uid}' `, (err, result) => {
    if (err) {
      res.json({ msg: "DB query error" })
      console.log(err)
      return
    } else {
      res.json({
        msg: "User has been updated",
        success: true
      })
    }
  })

})

// update admin profile 
router.post('/change_admin_pw', isvalid, async (req, res) => {
  if (!req.body.email) {
    return res.json({ msg: "Email is required" })
  }

  if (req.body.new_password) {
    const hashpassword = await bcrypt.hash(req.body.new_password, 10)
    var sql = `UPDATE admin SET email = '${req.body.email}', password = '${hashpassword}' `
  } else {
    var sql = `UPDATE admin SET email = '${req.body.email}' `
  }
  con.query(sql, (err, result) => {
    if (err) {
      res.json({ msg: "Db query error" })
      console.log(err)
      return
    } else {
      res.json({
        success: true,
        msg: "Profile updated"
      })
    }
  })

})

// get admin email 
router.get('/get_admin_email', isvalid, (req, res) => {
  var sql = `SELECT * FROM admin`
  con.query(sql, (err, result) => {
    if (err) {
      res.json({ msg: "Db query error" })
      console.log(err)
      return
    } else {
      res.json({ email: result[0].email, success: true })
    }
  })
})

// get admin dashboard 
router.get('/get_admin_dashboard', isvalid, (req, res) => {
  var sql = `SELECT * FROM ping WHERE admin_response = ''`
  var sql1 = `SELECT * FROM user`
  var sql2 = `SELECT * FROM orders`
  var sql3 = `SELECT * FROM plan`

  con.query(sql, (err, ping) => {
    if (err) {
      res.json({ msg: "Db query error" })
      console.log(err)
      return
    } else {
      con.query(sql1, (errr, user) => {
        con.query(sql2, (errrr, orders) => {
          con.query(sql3, (errrrr, plan) => {
            res.json({
              success: true,
              ping: ping.length,
              user: user.length,
              orders: orders.length,
              plan: plan.length
            })
          })
        })
      })
    }
  })

})

// get user dashboard 
router.get('/get_user_dashboard', isuser, (req, res) => {
  var sql = `SELECT * FROM campaign WHERE uid = '${req.decode.uid}' `
  var sql1 = `SELECT * FROM bot_campaign WHERE uid = '${req.decode.uid}'`

  con.query(sql, (err, campaign) => {
    if (err) {
      res.json({
        msg: "DB query error"
      })
      console.log(err)
      return
    } else {
      con.query(sql1, (errr, bot_campaign) => {
        res.json({
          success: true,
          campaign: campaign.length,
          bot_campaign: bot_campaign.length > 0 ? true : false
        })
      })
    }
  })
})


// get bot by admin for user 
router.post('/get_bot_from_admin', isvalid, (req, res) => {
  if (!req.body.uid) {
    res.json({
      msg: "Uid is required"
    })
    return
  }
  var sql = `SELECT * FROM bot_campaign WHERE uid = '${req.body.uid}' `
  con.query(sql, (err, result) => {
    if (err) {
      res.json({ msg: "Db query error" })
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

// kill bot by admin 
router.post('/kill_bot_by_admin', isvalid, (req, res) => {
  if (!req.body.uid) {
    return res.json({
      msg: "Uid is required"
    })
  }
  var sql = `DELETE FROM bot_campaign WHERE uid = '${req.body.uid}' `
  con.query(sql, (err, result) => {
    if (err) {
      res.json({ msg: "Db query error" })
      console.log(err)
      return
    } else {
      res.json({
        msg: "Bot has been killed",
        success: true
      })
    }
  })
})


// signup user 
router.post('/signup_user', async (req, res) => {
  const name = req.body.name
  const email = req.body.email.toLowerCase()
  const mobile = req.body.mobile
  const password = req.body.password

  if (!name || !mobile || !email || !password) {
    return res.json({
      msg: "All fields are required"
    })
  }

  function getUser() {
    return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM user WHERE email = '${req.body.email}' `, (err, result) => {
        if (err) {
          return reject()
        } else {
          resolve(result[0])
        }
      })
    })
  }

  const finduser = await getUser()

  if (finduser) {
    console.log(finduser)
    return res.json({
      msg: "This email is already registered with us."
    })
  }

  const hashpass = await bcrypt.hash(password, 10)
  const uid = randomstring.generate() + Date.now()
  var sql = `INSERT INTO user (name, email, password, mobile, uid) VALUES ('${name}','${email}','${hashpass}','${mobile}','${uid}') `
  con.query(sql, (err, result) => {
    if (err) {
      res.json({ msg: "Db query error" })
      console.log(err)
      return
    } else {
      res.json({
        msg: "Signup Success!",
        success: true
      })
    }
  })
})


// sending recovery link 
router.post('/send_recovery_link_user', async (req, res) => {
  const email = req.body.email
  function getUser() {
    return new Promise((resolve, reject) => {
      var sql = `SELECT * FROM user WHERE email = '${email}'`
      con.query(sql, (err, result) => {
        if (err) {
          return reject()
        } else {
          resolve(result[0])
        }
      })
    })
  }

  function getWeb() {
    return new Promise((resolve, reject) => {
      var sql = `SELECT * FROM web`
      con.query(sql, (err, result) => {
        if (err) {
          return reject()
        } else {
          resolve(result[0])
        }
      })
    })
  }

  const webdata = await getWeb()

  const findemail = await getUser()
  if (!findemail) {
    return res.json({ msg: "We have sent a recovery link, If this email is associated with an account.", success: false })
  }
  const jsontoken = sign({ role: 'user', old_email: findemail.email, email: email, time: moment(new Date()), password: findemail.password }, process.env.JWTKEY, {
  })

  // let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: `${webdata.smtp_host}`,
    port: `${webdata.smtp_port}`,
    secure: webdata.smtp_port === 465 ? true : false, // true for 465, false for other ports
    auth: {
      user: `${webdata.smtp_email}`, // generated ethereal user
      pass: `${webdata.smtp_password}`, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${webdata.app_name} <${webdata.smtp_email}>`, // sender address
    to: findemail.email, // list of receivers
    subject: "Password Recover", // Subject line
    html: `<html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                      <title>Simple Transactional Email</title>
                      <style>
                        /* -------------------------------------
                            GLOBAL RESETS
                        ------------------------------------- */
        
                        /*All the styling goes here*/
        
                        img {
                          border: none;
                          -ms-interpolation-mode: bicubic;
                          max-width: 100%; 
                        }
        
                        body {
                          background-color: #f6f6f6;
                          font-family: sans-serif;
                          -webkit-font-smoothing: antialiased;
                          font-size: 14px;
                          line-height: 1.4;
                          margin: 0;
                          padding: 0;
                          -ms-text-size-adjust: 100%;
                          -webkit-text-size-adjust: 100%; 
                        }
        
                        table {
                          border-collapse: separate;
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          width: 100%; }
                          table td {
                            font-family: sans-serif;
                            font-size: 14px;
                            vertical-align: top; 
                        }
        
                        /* -------------------------------------
                            BODY & CONTAINER
                        ------------------------------------- */
        
                        .body {
                          background-color: #f6f6f6;
                          width: 100%; 
                        }
        
                        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                        .container {
                          display: block;
                          margin: 0 auto !important;
                          /* makes it centered */
                          max-width: 580px;
                          padding: 10px;
                          width: 580px; 
                        }
        
                        /* This should also be a block element, so that it will fill 100% of the .container */
                        .content {
                          box-sizing: border-box;
                          display: block;
                          margin: 0 auto;
                          max-width: 580px;
                          padding: 10px; 
                        }
        
                        /* -------------------------------------
                            HEADER, FOOTER, MAIN
                        ------------------------------------- */
                        .main {
                          background: #ffffff;
                          border-radius: 3px;
                          width: 100%; 
                        }
        
                        .wrapper {
                          box-sizing: border-box;
                          padding: 20px; 
                        }
        
                        .content-block {
                          padding-bottom: 10px;
                          padding-top: 10px;
                        }
        
                        .footer {
                          clear: both;
                          margin-top: 10px;
                          text-align: center;
                          width: 100%; 
                        }
                          .footer td,
                          .footer p,
                          .footer span,
                          .footer a {
                            color: #999999;
                            font-size: 12px;
                            text-align: center; 
                        }
        
                        /* -------------------------------------
                            TYPOGRAPHY
                        ------------------------------------- */
                        h1,
                        h2,
                        h3,
                        h4 {
                          color: #000000;
                          font-family: sans-serif;
                          font-weight: 400;
                          line-height: 1.4;
                          margin: 0;
                          margin-bottom: 30px; 
                        }
        
                        h1 {
                          font-size: 35px;
                          font-weight: 300;
                          text-align: center;
                          text-transform: capitalize; 
                        }
        
                        p,
                        ul,
                        ol {
                          font-family: sans-serif;
                          font-size: 14px;
                          font-weight: normal;
                          margin: 0;
                          margin-bottom: 15px; 
                        }
                          p li,
                          ul li,
                          ol li {
                            list-style-position: inside;
                            margin-left: 5px; 
                        }
        
                        a {
                          color: #3498db;
                          text-decoration: underline; 
                        }
        
                        /* -------------------------------------
                            BUTTONS
                        ------------------------------------- */
                        .btn {
                          box-sizing: border-box;
                          width: 100%; }
                          .btn > tbody > tr > td {
                            padding-bottom: 15px; }
                          .btn table {
                            width: auto; 
                        }
                          .btn table td {
                            background-color: #ffffff;
                            border-radius: 5px;
                            text-align: center; 
                        }
                          .btn a {
                            background-color: #ffffff;
                            border: solid 1px #3498db;
                            border-radius: 5px;
                            box-sizing: border-box;
                            color: #3498db;
                            cursor: pointer;
                            display: inline-block;
                            font-size: 14px;
                            font-weight: bold;
                            margin: 0;
                            padding: 12px 25px;
                            text-decoration: none;
                            text-transform: capitalize; 
                        }
        
                        .btn-primary table td {
                          background-color: #3498db; 
                        }
        
                        .btn-primary a {
                          background-color: #3498db;
                          border-color: #3498db;
                          color: #ffffff; 
                        }
        
                        /* -------------------------------------
                            OTHER STYLES THAT MIGHT BE USEFUL
                        ------------------------------------- */
                        .last {
                          margin-bottom: 0; 
                        }
        
                        .first {
                          margin-top: 0; 
                        }
        
                        .align-center {
                          text-align: center; 
                        }
        
                        .align-right {
                          text-align: right; 
                        }
        
                        .align-left {
                          text-align: left; 
                        }
        
                        .clear {
                          clear: both; 
                        }
        
                        .mt0 {
                          margin-top: 0; 
                        }
        
                        .mb0 {
                          margin-bottom: 0; 
                        }
        
                        .preheader {
                          color: transparent;
                          display: none;
                          height: 0;
                          max-height: 0;
                          max-width: 0;
                          opacity: 0;
                          overflow: hidden;
                          mso-hide: all;
                          visibility: hidden;
                          width: 0; 
                        }
        
                        .powered-by a {
                          text-decoration: none; 
                        }
        
                        hr {
                          border: 0;
                          border-bottom: 1px solid #f6f6f6;
                          margin: 20px 0; 
                        }
        
                        /* -------------------------------------
                            RESPONSIVE AND MOBILE FRIENDLY STYLES
                        ------------------------------------- */
                        @media only screen and (max-width: 620px) {
                          table.body h1 {
                            font-size: 28px !important;
                            margin-bottom: 10px !important; 
                          }
                          table.body p,
                          table.body ul,
                          table.body ol,
                          table.body td,
                          table.body span,
                          table.body a {
                            font-size: 16px !important; 
                          }
                          table.body .wrapper,
                          table.body .article {
                            padding: 10px !important; 
                          }
                          table.body .content {
                            padding: 0 !important; 
                          }
                          table.body .container {
                            padding: 0 !important;
                            width: 100% !important; 
                          }
                          table.body .main {
                            border-left-width: 0 !important;
                            border-radius: 0 !important;
                            border-right-width: 0 !important; 
                          }
                          table.body .btn table {
                            width: 100% !important; 
                          }
                          table.body .btn a {
                            width: 100% !important; 
                          }
                          table.body .img-responsive {
                            height: auto !important;
                            max-width: 100% !important;
                            width: auto !important; 
                          }
                        }
        
                        /* -------------------------------------
                            PRESERVE THESE STYLES IN THE HEAD
                        ------------------------------------- */
                        @media all {
                          .ExternalClass {
                            width: 100%; 
                          }
                          .ExternalClass,
                          .ExternalClass p,
                          .ExternalClass span,
                          .ExternalClass font,
                          .ExternalClass td,
                          .ExternalClass div {
                            line-height: 100%; 
                          }
                          .apple-link a {
                            color: inherit !important;
                            font-family: inherit !important;
                            font-size: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                            text-decoration: none !important; 
                          }
                          #MessageViewBody a {
                            color: inherit;
                            text-decoration: none;
                            font-size: inherit;
                            font-family: inherit;
                            font-weight: inherit;
                            line-height: inherit;
                          }
                          .btn-primary table td:hover {
                            background-color: #34495e !important; 
                          }
                          .btn-primary a:hover {
                            background-color: #34495e !important;
                            border-color: #34495e !important; 
                          } 
                        }
        
                      </style>
                    </head>
                    <body>
                      <span class="preheader">This is password recovery email from ${webdata.app_name}.</span>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                        <tr>
                          <td>&nbsp;</td>
                          <td class="container">
                            <div class="content">
        
                              <!-- START CENTERED WHITE CONTAINER -->
                              <table role="presentation" class="main">
        
                                <!-- START MAIN CONTENT AREA -->
                                <tr>
                                  <td class="wrapper">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td>
                                          <p>Hi there,</p>
                                          <p>Please click below button to recover your password.</p>
                                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                            <tbody>
                                              <tr>
                                                <td align="left">
                                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                    <tbody>
                                                      <tr>
                                                        <td> <a style="cursor: pointer;" href=${req.headers.host + "/recovery-user/" + jsontoken} target="_blank">Click Here</a> </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <p>If the above button is not working please copy and paste this url link to your browser tab!</p>
                                          <p>${req.headers.host + "/recovery-user/" + jsontoken}</p>
                                          <p style="font-weight:bold" >Good luck!</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
        
                              <!-- END MAIN CONTENT AREA -->
                              </table>
                              <!-- END CENTERED WHITE CONTAINER -->
        
                              <!-- START FOOTER -->
                              <div class="footer">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td class="content-block powered-by">
                                      Powered by <a href=${req.headers.host}>${webdata.app_name}</a>.
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!-- END FOOTER -->
        
                            </div>
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      </table>
                    </body>
                  </html>`, // html body
  });

  res.json({ msg: "We have sent a recovery link, If this email is associated with Admin.", success: true, info: info, previewurl: nodemailer.getTestMessageUrl(info) })

})

// sending recovery link 
router.post('/send_recovery_link_admin', async (req, res) => {
  const email = req.body.email
  function getUser() {
    return new Promise((resolve, reject) => {
      var sql = `SELECT * FROM admin WHERE email = '${email}'`
      con.query(sql, (err, result) => {
        if (err) {
          return reject()
        } else {
          resolve(result[0])
        }
      })
    })
  }

  function getWeb() {
    return new Promise((resolve, reject) => {
      var sql = `SELECT * FROM web`
      con.query(sql, (err, result) => {
        if (err) {
          return reject()
        } else {
          resolve(result[0])
        }
      })
    })
  }

  const webdata = await getWeb()

  const findemail = await getUser()
  if (!findemail) {
    return res.json({ msg: "We have sent a recovery link, If this email is associated with an account.", success: false })
  }
  const jsontoken = sign({ role: 'admin', old_email: findemail.email, email: email, time: moment(new Date()), password: findemail.password }, process.env.JWTKEY, {
  })

  // let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: `${webdata.smtp_host}`,
    port: `${webdata.smtp_port}`,
    secure: webdata.smtp_port === 465 ? true : false, // true for 465, false for other ports
    auth: {
      user: `${webdata.smtp_email}`, // generated ethereal user
      pass: `${webdata.smtp_password}`, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${webdata.app_name} <${webdata.smtp_email}>`, // sender address
    to: findemail.email, // list of receivers
    subject: "Password Recover", // Subject line
    html: `<html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                      <title>Simple Transactional Email</title>
                      <style>
                        /* -------------------------------------
                            GLOBAL RESETS
                        ------------------------------------- */
        
                        /*All the styling goes here*/
        
                        img {
                          border: none;
                          -ms-interpolation-mode: bicubic;
                          max-width: 100%; 
                        }
        
                        body {
                          background-color: #f6f6f6;
                          font-family: sans-serif;
                          -webkit-font-smoothing: antialiased;
                          font-size: 14px;
                          line-height: 1.4;
                          margin: 0;
                          padding: 0;
                          -ms-text-size-adjust: 100%;
                          -webkit-text-size-adjust: 100%; 
                        }
        
                        table {
                          border-collapse: separate;
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          width: 100%; }
                          table td {
                            font-family: sans-serif;
                            font-size: 14px;
                            vertical-align: top; 
                        }
        
                        /* -------------------------------------
                            BODY & CONTAINER
                        ------------------------------------- */
        
                        .body {
                          background-color: #f6f6f6;
                          width: 100%; 
                        }
        
                        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                        .container {
                          display: block;
                          margin: 0 auto !important;
                          /* makes it centered */
                          max-width: 580px;
                          padding: 10px;
                          width: 580px; 
                        }
        
                        /* This should also be a block element, so that it will fill 100% of the .container */
                        .content {
                          box-sizing: border-box;
                          display: block;
                          margin: 0 auto;
                          max-width: 580px;
                          padding: 10px; 
                        }
        
                        /* -------------------------------------
                            HEADER, FOOTER, MAIN
                        ------------------------------------- */
                        .main {
                          background: #ffffff;
                          border-radius: 3px;
                          width: 100%; 
                        }
        
                        .wrapper {
                          box-sizing: border-box;
                          padding: 20px; 
                        }
        
                        .content-block {
                          padding-bottom: 10px;
                          padding-top: 10px;
                        }
        
                        .footer {
                          clear: both;
                          margin-top: 10px;
                          text-align: center;
                          width: 100%; 
                        }
                          .footer td,
                          .footer p,
                          .footer span,
                          .footer a {
                            color: #999999;
                            font-size: 12px;
                            text-align: center; 
                        }
        
                        /* -------------------------------------
                            TYPOGRAPHY
                        ------------------------------------- */
                        h1,
                        h2,
                        h3,
                        h4 {
                          color: #000000;
                          font-family: sans-serif;
                          font-weight: 400;
                          line-height: 1.4;
                          margin: 0;
                          margin-bottom: 30px; 
                        }
        
                        h1 {
                          font-size: 35px;
                          font-weight: 300;
                          text-align: center;
                          text-transform: capitalize; 
                        }
        
                        p,
                        ul,
                        ol {
                          font-family: sans-serif;
                          font-size: 14px;
                          font-weight: normal;
                          margin: 0;
                          margin-bottom: 15px; 
                        }
                          p li,
                          ul li,
                          ol li {
                            list-style-position: inside;
                            margin-left: 5px; 
                        }
        
                        a {
                          color: #3498db;
                          text-decoration: underline; 
                        }
        
                        /* -------------------------------------
                            BUTTONS
                        ------------------------------------- */
                        .btn {
                          box-sizing: border-box;
                          width: 100%; }
                          .btn > tbody > tr > td {
                            padding-bottom: 15px; }
                          .btn table {
                            width: auto; 
                        }
                          .btn table td {
                            background-color: #ffffff;
                            border-radius: 5px;
                            text-align: center; 
                        }
                          .btn a {
                            background-color: #ffffff;
                            border: solid 1px #3498db;
                            border-radius: 5px;
                            box-sizing: border-box;
                            color: #3498db;
                            cursor: pointer;
                            display: inline-block;
                            font-size: 14px;
                            font-weight: bold;
                            margin: 0;
                            padding: 12px 25px;
                            text-decoration: none;
                            text-transform: capitalize; 
                        }
        
                        .btn-primary table td {
                          background-color: #3498db; 
                        }
        
                        .btn-primary a {
                          background-color: #3498db;
                          border-color: #3498db;
                          color: #ffffff; 
                        }
        
                        /* -------------------------------------
                            OTHER STYLES THAT MIGHT BE USEFUL
                        ------------------------------------- */
                        .last {
                          margin-bottom: 0; 
                        }
        
                        .first {
                          margin-top: 0; 
                        }
        
                        .align-center {
                          text-align: center; 
                        }
        
                        .align-right {
                          text-align: right; 
                        }
        
                        .align-left {
                          text-align: left; 
                        }
        
                        .clear {
                          clear: both; 
                        }
        
                        .mt0 {
                          margin-top: 0; 
                        }
        
                        .mb0 {
                          margin-bottom: 0; 
                        }
        
                        .preheader {
                          color: transparent;
                          display: none;
                          height: 0;
                          max-height: 0;
                          max-width: 0;
                          opacity: 0;
                          overflow: hidden;
                          mso-hide: all;
                          visibility: hidden;
                          width: 0; 
                        }
        
                        .powered-by a {
                          text-decoration: none; 
                        }
        
                        hr {
                          border: 0;
                          border-bottom: 1px solid #f6f6f6;
                          margin: 20px 0; 
                        }
        
                        /* -------------------------------------
                            RESPONSIVE AND MOBILE FRIENDLY STYLES
                        ------------------------------------- */
                        @media only screen and (max-width: 620px) {
                          table.body h1 {
                            font-size: 28px !important;
                            margin-bottom: 10px !important; 
                          }
                          table.body p,
                          table.body ul,
                          table.body ol,
                          table.body td,
                          table.body span,
                          table.body a {
                            font-size: 16px !important; 
                          }
                          table.body .wrapper,
                          table.body .article {
                            padding: 10px !important; 
                          }
                          table.body .content {
                            padding: 0 !important; 
                          }
                          table.body .container {
                            padding: 0 !important;
                            width: 100% !important; 
                          }
                          table.body .main {
                            border-left-width: 0 !important;
                            border-radius: 0 !important;
                            border-right-width: 0 !important; 
                          }
                          table.body .btn table {
                            width: 100% !important; 
                          }
                          table.body .btn a {
                            width: 100% !important; 
                          }
                          table.body .img-responsive {
                            height: auto !important;
                            max-width: 100% !important;
                            width: auto !important; 
                          }
                        }
        
                        /* -------------------------------------
                            PRESERVE THESE STYLES IN THE HEAD
                        ------------------------------------- */
                        @media all {
                          .ExternalClass {
                            width: 100%; 
                          }
                          .ExternalClass,
                          .ExternalClass p,
                          .ExternalClass span,
                          .ExternalClass font,
                          .ExternalClass td,
                          .ExternalClass div {
                            line-height: 100%; 
                          }
                          .apple-link a {
                            color: inherit !important;
                            font-family: inherit !important;
                            font-size: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                            text-decoration: none !important; 
                          }
                          #MessageViewBody a {
                            color: inherit;
                            text-decoration: none;
                            font-size: inherit;
                            font-family: inherit;
                            font-weight: inherit;
                            line-height: inherit;
                          }
                          .btn-primary table td:hover {
                            background-color: #34495e !important; 
                          }
                          .btn-primary a:hover {
                            background-color: #34495e !important;
                            border-color: #34495e !important; 
                          } 
                        }
        
                      </style>
                    </head>
                    <body>
                      <span class="preheader">This is password recovery email from ${webdata.app_name}.</span>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                        <tr>
                          <td>&nbsp;</td>
                          <td class="container">
                            <div class="content">
        
                              <!-- START CENTERED WHITE CONTAINER -->
                              <table role="presentation" class="main">
        
                                <!-- START MAIN CONTENT AREA -->
                                <tr>
                                  <td class="wrapper">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td>
                                          <p>Hi there,</p>
                                          <p>Please click below button to recover your password.</p>
                                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                            <tbody>
                                              <tr>
                                                <td align="left">
                                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                    <tbody>
                                                      <tr>
                                                        <td> <a style="cursor: pointer;" href=${req.headers.host + "/recovery-user/" + jsontoken} target="_blank">Click Here</a> </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <p>If the above button is not working please copy and paste this url link to your browser tab!</p>
                                          <p>${req.headers.host + "/recovery-admin/" + jsontoken}</p>
                                          <p style="font-weight:bold" >Good luck!</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
        
                              <!-- END MAIN CONTENT AREA -->
                              </table>
                              <!-- END CENTERED WHITE CONTAINER -->
        
                              <!-- START FOOTER -->
                              <div class="footer">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td class="content-block powered-by">
                                      Powered by <a href=${req.headers.host}>${webdata.app_name}</a>.
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!-- END FOOTER -->
        
                            </div>
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      </table>
                    </body>
                  </html>`, // html body
  });

  res.json({ msg: "We have sent a recovery link, If this email is associated with Admin.", success: true, info: info, previewurl: nodemailer.getTestMessageUrl(info) })

})

// password recover set user 
router.post('/modify_user', isuser, async (req, res) => {
  try {

    if (!req.body.password) {
      return res.json({ success: false, msg: "No input provided" })
    }

    if (moment(req.decode.time).diff(moment(new Date()), 'hours') > 1) {
      return res.json({ success: false, msg: "Token expired" })
    }

    const hashpassword = await bcrypt.hash(req.body.password, 10)

    con.query(`UPDATE user SET password='${hashpassword}' WHERE email = '${req.decode.old_email}' `, (err, result) => {
      if (err) {
        res.json({
          msg: "DB query error",
          err: err
        })
        console.log(err)
        return
      } else {
        res.json({ success: true, msg: "User has been updated", data: result })
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

// password recover set admin 
router.post('/modify_admin', isvalid, async (req, res) => {
  try {

    if (!req.body.password) {
      return res.json({ success: false, msg: "No input provided" })
    }

    if (moment(req.decode.time).diff(moment(new Date()), 'hours') > 1) {
      return res.json({ success: false, msg: "Token expired" })
    }

    const hashpassword = await bcrypt.hash(req.body.password, 10)

    con.query(`UPDATE admin SET password='${hashpassword}' WHERE email = '${req.decode.old_email}' `, (err, result) => {
      if (err) {
        res.json({
          msg: "DB query error",
          err: err
        })
        console.log(err)
        return
      } else {
        res.json({ success: true, msg: "Admin has been updated", data: result })
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

router.get('/get_admin_by_token', isvalid, (req, res) => {
  res.json({
    success: true
  })
})

// delete user 
router.post('/delete_user', isvalid, (req, res) => {
  if (!req.body.uid) {
    return res.json({
      msg: "Uid to be provided"
    })
  }
  con.query(`DELETE FROM user WHERE uid = '${req.body.uid}' `, (err, result) => {
    if (err) {
      res.json({
        msg: "DB query error"
      })
      console.log(err)
      return
    } else {
      res.json({
        success: true,
        msg: "User has been deleted"
      })
    }
  })
})

// direct login 
router.post("/direct_login", isvalid, async (req, res) => {
  try {

    function getUser() {
      return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM user WHERE uid = '${req.body.uid}' `, (err, result) => {
          if (err) {
            return reject()
          } else {
            resolve(result[0])
          }
        })
      })
    }

    const user = await getUser()

    const jsontoken = sign({ uid: user.uid, email: user.email, role: 'user', password: user.password }, process.env.JWTKEY, {
    })
    res.json({
      success: true,
      token: jsontoken
    })

  } catch (err) {
    console.log(err)
    res.json({ msg: "Server error", err: err })
  }
})

module.exports = router
