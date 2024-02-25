const express = require("express");

const { totalTransactions } = require('../controller/user')
const asyncRouteHandler = require("../helper/asyncRouteHandler");

const router = express.Router();

router.get('/totaltransactions', asyncRouteHandler(totalTransactions))

module.exports = router;