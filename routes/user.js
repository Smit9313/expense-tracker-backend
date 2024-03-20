const express = require("express");

const authController = require("../controller/user");
const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { loginRateLimit } = require('../middleware/rateLimit');
const { requireSignIn } = require('../middleware/authMiddleware');


const router = express.Router();

router.post("/login", loginRateLimit, asyncRouteHandler(authController.login))
router.post("/register", asyncRouteHandler(authController.register));
router.get("/", requireSignIn, asyncRouteHandler(authController.user))

module.exports = router;
