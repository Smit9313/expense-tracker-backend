const express = require("express");

const { verifyTokenController } = require('../controller/email')

const router = express.Router();

router.get('/:token',verifyTokenController)

module.exports = router;