const mongoose = require('mongoose')

const app = require('./app')

const port = process.env.port || 3000;
app.listen(port , ()=>{
    console.log('listening at port '+port)
})
// const dbpath = 'mongodb://localhost:27017/Nodejs'
mongoose.connect('mongodb+srv://tayyab:tayyab@123@cluster0.wzfwv.mongodb.net/nodejs', 
{useNewUrlParser: true ,useCreateIndex:true,useFindAndModify:false}).then(() => {
console.log("Connected to Database");
}).catch((err) => {  
    console.log("Not Connected to Database ERROR! ", err);
});
