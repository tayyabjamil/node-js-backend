const User = require("../models.js/user")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const mailgun = require("mailgun-js");

const DOMAIN = 'sandbox887a56e308e749a5b63b97b37c53f092.mailgun.org'
const mg = mailgun({ apiKey: 'adad21bb96143ddc02fbd5867b2db20d-2fbe671d-6133ae2c', domain: DOMAIN })
exports.login = async (req, res) => {
    try {
        // const {email} = req.body
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send("Email not found")
        } else {

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    let payload = { subject: user._id };
                    const token = jwt.sign(payload, "secretKey")
                
res.cookie('jwt',token,{
    // expires: new Date(Data.now() + process.env.COOKIE*24*60*60*1000 ),
    httpOnly:true

})
res.status(201).json({ token })
                }
                else {
                    return res.status(401).json({
                        message: "Auth Password failed",
                    });

                }
            })
        }
    } catch (error) {
        res.status(404).json({
            error
        })

    }
}
exports.verifyAndAccount = async (req, res) => {
    const token = req.params.token
    if (token) {
        jwt.verify(token, 'accountactivatekey123', function (err, decodedToken) {
            if (err) {
                res.status(401).json({
                    message: "err in verifying "
                })
            } else { 
              
               const { username, email, password } = decodedToken;
               let newUser = new User({username, email, password })
               newUser.save((err, user) => {
                        if (err) {
                            res.status(401).json({
                                message: "error"
                            })
                        }
                        else {
                            res.status(201).json({
                                message: newUser
                            })
                        }
                    })
                }
    })
    }
}
exports.updatePassword = async (req,res)=>{
    const user = await User.findById(req.params.id)
if(user){
    user.password = req.body.password
    await user.save();
    res.status(201).json({
        message:"password updated"
    })
}else{
    res.status(404).json({
        message:"user not found"
    })
}

}
exports.signUp = async (req, res) => {
    try {
        // const user = await User.create(req.body)
      const user = req.body
        const { username, email, password } = req.body
        let payload = { subject: user._id };
        const token = jwt.sign({ username, email, password }, 'accountactivatekey123', { expiresIn: '20m' })

        const data = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: req.body.email,
            subject: 'Hello',
            text: 'Testing some Mailgun awesomness!',
            html: `
            <h2>Click here to activate your account</h2>
        <a>http://localhost:3000/api/users/activate/${token}</a>
            `
        };
        mg.messages().send(data, function (error, body) {
            if (error) {
                console.log(error)
            } else {
                res.status(201).json({
                    message: "email has been send kindly activate your account"
                })
            }
        });
        // res.status(201).json({
        //     user,
        //     token

        // })

    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}
exports.patchApiUsers = (req, res) => {
    res.status(200).send("patch all data")
}

exports.deleteApiUsers = (req, res) => {
    res.status(200).send("delete all data")
}
