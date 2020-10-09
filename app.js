const express = require('express')
const app = express()


const morgan = require('morgan')
app.use(morgan('dev'))
app.use(express.json())

const tourRouter = require('./routes/tour')
const userRouter = require('./routes/user')
// app.use((req,res,next)=>{
//     console.log("middle ware calling")
//     next();  
// })



app.use('/api/users',userRouter)
app.use('/api/tours',tourRouter)
module.exports = app;