const nodeMailer = require('nodemailer');


const sendEmail = async options =>{
const transporter =  nodeMailer.createTransport({
    host:process.env.Email_HOST,
    port:process.env.PORT,
    secure: false,
    auth:{
        user: process.env.EMAIL_USER,
        password:process.EMAIL_PASSWORD
    }
});
    const mailOption = {
        from:'<tayyabjamil777@gmail.com>',
        to:options.email, 
        subject:options.subject,
        // text:options.message
    }
    await transporter.sendMail(mailOption)
  
}
module.exports= sendEmail;
