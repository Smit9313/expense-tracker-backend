const express = require("express");

const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { getIncomes, createIncome, editIncome, deleteIncome } = require('../controller/incomes');


const router = express.Router();

router.post("/getIncomes", asyncRouteHandler(getIncomes))
router.post("/createIncome", asyncRouteHandler(createIncome))
router.post("/editIncome", asyncRouteHandler(editIncome))
router.post("/deleteIncome", asyncRouteHandler(deleteIncome))

module.exports = router;