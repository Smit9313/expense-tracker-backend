const express = require("express");

const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { createExpense, getExpenses, editExpense, deleteExpense } = require('../controller/expenses');
const {createExpenseMiddleware} = require('../middleware/validation/validation')

const router = express.Router();

router.get("/:id?", asyncRouteHandler(getExpenses))
router.post("/",createExpenseMiddleware, asyncRouteHandler(createExpense))
router.patch("/:id", asyncRouteHandler(editExpense))
router.delete("/:id", asyncRouteHandler(deleteExpense))

module.exports = router;
