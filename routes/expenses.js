const express = require("express");
const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { createExpense, getExpenses, editExpense, deleteExpense } = require('../controller/expenses');

const router = express.Router();

router.post("/getExpenses", asyncRouteHandler(getExpenses))
router.post("/createExpense", asyncRouteHandler(createExpense))
router.post("/editExpense", asyncRouteHandler(editExpense))
router.post("/deleteExpense", asyncRouteHandler(deleteExpense))

module.exports = router;
