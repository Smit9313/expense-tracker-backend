const express = require("express");

const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { getIncomes, createIncome, editIncome, deleteIncome } = require('../controller/incomes');
const { createIncomeMiddleware } = require("../middleware/validation/validation");

const router = express.Router();

router.get("/:id?", asyncRouteHandler(getIncomes))
router.post("/",createIncomeMiddleware, asyncRouteHandler(createIncome))
router.patch("/:id",createIncomeMiddleware, asyncRouteHandler(editIncome))
router.delete("/:id", asyncRouteHandler(deleteIncome))

module.exports = router;