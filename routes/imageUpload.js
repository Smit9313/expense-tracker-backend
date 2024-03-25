const express = require("express");

const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { imageUpload } = require('../controller/imageUpload');

const router = express.Router();

router.post("/", asyncRouteHandler(imageUpload))

module.exports = router;
