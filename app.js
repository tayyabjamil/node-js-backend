const express = require('express')
const app = express()
const rateLimit = require("express-rate-limit")

const morgan = require('morgan')
app.use(morgan('dev'))
app.use(express.json())
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const tourRouter = require('./routes/tour')
const userRouter = require('./routes/user')
const reviewsRouter = require('./routes/reviews')
// app.use((req,res,next)=>{
//     console.log("middle ware calling")
//     next();  
// })
app.use(mongoSanitize());
app.use(xss());
 const limiter = rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:"too many request try again in an hour"
})
app.use('/api',limiter)
app.use('/api/users',userRouter)
app.use('/api/tours',tourRouter)
app.use('/api/reviews',reviewsRouter)
module.exports = app;