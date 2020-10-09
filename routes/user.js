
const express = require('express')

const userController = require('./../controller.js/user')



const router = express.Router();
router.route('/')
.get(userController.getApiUsers)
.post(userController.postApiUsers)
.delete(userController.patchApiUsers)
.patch(userController.deleteApiUsers)

module.exports = router