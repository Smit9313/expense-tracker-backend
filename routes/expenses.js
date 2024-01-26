const express = require("express");
const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { createExpense, getExpenses, editExpense, deleteExpense } = require('../controller/expenses');

const router = express.Router();

router.get("/getExpenses", asyncRouteHandler(getExpenses))
router.post("/createExpense", asyncRouteHandler(createExpense))
router.patch("/editExpense", asyncRouteHandler(editExpense))
router.delete("/deleteExpense", asyncRouteHandler(deleteExpense))

module.exports = router;
