const express = require("express");

const authController = require("../controller/user");
const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { loginRateLimit } = require('../middleware/rateLimit');

const router = express.Router();

router.post("/login", loginRateLimit,
	asyncRouteHandler(authController.login))

router.post("/register",
	asyncRouteHandler(authController.register));

module.exports = router;
