const express = require("express");

const { totalTransactions, verifyTokenController } = require('../controller/totalUserData')
const asyncRouteHandler = require("../helper/asyncRouteHandler");

const router = express.Router();

router.get('/totaltransactions', asyncRouteHandler(totalTransactions))

module.exports = router;