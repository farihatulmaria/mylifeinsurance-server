const express = require('express');
const { send } = require('process');
const emailController = require('../Controllers/email.controllers');
const router = express.Router();

router.route("/sendEmail").post(emailController.sendEmail)

module.exports = router;