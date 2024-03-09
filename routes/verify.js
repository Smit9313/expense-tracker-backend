const express = require("express");

const { verifyTokenController } = require('../controller/totalUserData')

const router = express.Router();

router.get('/:email',verifyTokenController)

module.exports = router;