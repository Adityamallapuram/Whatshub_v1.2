require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')


// middlewares
app.use(cors())
app.use(express.json())
app.use(fileUpload())

// routers 
const adminRouter = require('./routes/admin')
app.use('/api/admin', adminRouter)

const userRouter = require('./routes/user')
app.use('/api/user', userRouter)

const planRouter = require('./routes/plan')
app.use('/api/plan', planRouter)

const webRouter = require('./routes/web')
app.use('/api/web', webRouter)

const pingRouter = require('./routes/ping')
app.use('/api/ping', pingRouter)

const campaignRouter = require('./routes/campaign')
app.use('/api/campaign', campaignRouter)

const botRouter = require('./routes/bot')
app.use('/api/bot', botRouter)

const orderRouter = require('./routes/order')
app.use('/api/order', orderRouter)

const instanceRouter = require('./routes/instance')
app.use('/api/instance', instanceRouter)

// linking client 
const path = require("path");

app.use(express.static(path.resolve(__dirname, "./client/public")));

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/public", "index.html"));
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Postcam api is running on port ${process.env.PORT}`)
})