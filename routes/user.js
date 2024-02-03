const express = require("express");

const authController = require("../controller/auth");
const asyncRouteHandler = require("../helper/asyncRouteHandler");

const router = express.Router();

router.post("/login",
	asyncRouteHandler(authController.login))

router.post("/register",
	asyncRouteHandler(authController.register));

module.exports = router;
