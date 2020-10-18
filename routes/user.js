
const express = require('express')

const userController = require('./../controller.js/user')
const authController = require('./../controller.js/authController')


const router = express.Router();
router.route('/')
.get(userController.login)
.post(userController.signUp)
.delete(userController.patchApiUsers)
.patch(userController.deleteApiUsers)

router.route('/forgetPassword')
.post(authController.forgetPassword)

router.route('/activate/:token')
.post(userController.verifyAndAccount)

router.route('/update/:id')
.post(userController.updatePassword)

router.route('/resetPassword/:token')
.post(authController.resetPassword)

module.exports = router