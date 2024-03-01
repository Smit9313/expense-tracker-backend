const express = require("express");

const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { createExpense, getExpenses, editExpense, deleteExpense } = require('../controller/expenses');
const {createExpenseMiddleware} = require('../middleware/validation/expense')

const router = express.Router();

router.get("/getExpenses/:id?", asyncRouteHandler(getExpenses))
router.post("/createExpense",createExpenseMiddleware, asyncRouteHandler(createExpense))
router.patch("/editExpense/:id?", asyncRouteHandler(editExpense))
router.delete("/deleteExpense/:id?", asyncRouteHandler(deleteExpense))

module.exports = router;
