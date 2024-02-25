const express = require("express");

const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { createExpense, getExpenses, editExpense, deleteExpense } = require('../controller/expenses');

const router = express.Router();

router.get("/getExpenses/:id?", asyncRouteHandler(getExpenses))
router.post("/createExpense", asyncRouteHandler(createExpense))
router.patch("/editExpense/:id?", asyncRouteHandler(editExpense))
router.delete("/deleteExpense/:id?", asyncRouteHandler(deleteExpense))

module.exports = router;
