const User = require('../models.js/user')
const sendEmail = require('../email')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const mailgun = require("mailgun-js");
const crypto = require("crypto")
const DOMAIN = 'sandbox887a56e308e749a5b63b97b37c53f092.mailgun.org'
const mg = mailgun({ apiKey: 'adad21bb96143ddc02fbd5867b2db20d-2fbe671d-6133ae2c', domain: DOMAIN })
exports.ristrictsTo = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.body.role)){
            return res.status(401).json({
                message:"You are not authorized"
            })
        }
        else{
            next();
        }
    }
}
exports.resetPassword = async(req,res)=>{
    const hashedToken = crypto
    .createHash('sha256')
.update(req.params.token)
.digest('hex')
    const user = await User.findOne(
        {passwordResetToken : hashedToken,
        passwordResetExpires:{$gt:Date.now()}}
        )
if(!user){
  return res.status(401).json({
        status: 'invalid',
        message: "Token expired or wrong authtication"
    })
}else{
    user.password=req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save();
    let payload = { subject: user._id };
    const token = jwt.sign(payload, "secretKey")
    res.status(201).json({ token })
}
}
exports.forgetPassword = async (req,res,next)=>{
    const user = await User.findOne({email : req.body.email})
if(!user){
  return res.status(404).json({
        status: 'invalid',
        message: "Email NOt found "
    })
}
const restToken = user.createPaswordRestToken();
await user.save({validateBeforeSave:false});
const resetUrl = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${restToken}`
// const message = `forget password reset password at url ${resetUrl}`
try {
       const data = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: req.body.email,
            subject: 'Hello',
            text: 'Testing some Mailgun awesomness!',
            html: `
            <h2>Click here to RESET your pASSWORD</h2>
        <a>${resetUrl}</a>
            `
        };
        mg.messages().send(data, function (error, body) {
            if (error) {
                // console.log(error)
            } else {
                res.status(201).json({
                    message: "email has been send kindly RESET your account"
                })
            }
        });
        
} catch (error) {
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined;
await user.save({validateBeforeSave:false});
return res.status(500).json({
    error:error
})   
}
}
