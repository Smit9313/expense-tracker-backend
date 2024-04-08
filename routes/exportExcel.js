const express = require("express");

const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { createExcelFile } = require('../controller/exportExcel');

const router = express.Router();

router.post("/:id?", asyncRouteHandler(createExcelFile))

module.exports = router;
