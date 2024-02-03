const express = require("express");
const authController = require("../controller/auth");
const { body, query } = require("express-validator");
const asyncRouteHandler = require("../helper/asyncRouteHandler");

const router = express.Router();

router.post("/login",
	asyncRouteHandler(authController.login))

router.post("/register",
	asyncRouteHandler(authController.register));

router.post("/forgetpassword",
	[
		body("to").trim()
			.notEmpty().withMessage("email is required!!!")
			.isEmail().withMessage("Invalid Email!!!")

	],
	asyncRouteHandler(authController.sendMail));

router.post("/changepassword/:token",
	[
		body("password").trim()
			.notEmpty().withMessage("password is required!!!")
			.isLength({ min: 5 }).withMessage("Invalid password length!!!"),
		body("confirmpassword").trim()
			.custom((value, { req }) => {
				if (value !== req.body.password) {
					throw new Error('Password confirmation does not match password');
				}
				return true;
			}),
	],
	asyncRouteHandler(authController.changePassword));

module.exports = router;
