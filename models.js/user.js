const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
 var userSchema = mongoose.Schema({
  
    username:{
       type: String,
       required:[true,'must add username']
    },
    email:{
        type: String,
        required:[true,'must add user email ']
     },
     password:{
        type: String,
        required:[true,'must add user Password']
     },
     
    confirmPassword:{
        type: String,
        // required:[true,'must add password confirm '],
        validate:{
        validator:function(el){
            return  el === this.password
        },
        message:"passwords are not same"
    },
},
    startDates:{
        type:Date,
        default:Date.now()
    },
role:{
    type:String,
    enum:['admin','user'],
    default:'user'
}
,
passwordResetToken:String,
passwordResetExpires:Date
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    return next();
    else{
        this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined;
    }
});
userSchema.methods.createPaswordRestToken = function(){
const resetToken = crypto.randomBytes(32).toString('hex')//creating token for sending to emial

this.passwordResetToken = crypto
.createHash('sha256')
.update(resetToken)
.digest('hex')
console.log({resetToken},this.passwordResetToken)
this.passwordResetExpires = Date.now()+10*60*1000
return resetToken ; 
}
module.exports = mongoose.model('user',userSchema);