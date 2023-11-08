var express = require('express');
const router = express.Router();
const authController = require("../controller/authController")

router.route('/login')
    .get(authController.loginForm)
    .post(authController.loginMember)
router.route('/register')
    .get(authController.registerForm)
    .post(authController.register)


module.exports = router