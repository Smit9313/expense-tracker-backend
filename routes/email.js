const express = require("express");

const { verifyTokenController } = require('../controller/email')

const router = express.Router();

router.get('/:email',verifyTokenController)

module.exports = router;