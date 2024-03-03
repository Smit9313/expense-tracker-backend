const express = require("express");

const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { getIncomes, createIncome, editIncome, deleteIncome } = require('../controller/incomes');
const { createIncomeMiddleware } = require("../middleware/validation/validation");

const router = express.Router();

router.get("/getIncomes/:id?", asyncRouteHandler(getIncomes))
router.post("/createIncome",createIncomeMiddleware, asyncRouteHandler(createIncome))
router.patch("/editIncome/:id",createIncomeMiddleware, asyncRouteHandler(editIncome))
router.delete("/deleteIncome/:id", asyncRouteHandler(deleteIncome))

module.exports = router;