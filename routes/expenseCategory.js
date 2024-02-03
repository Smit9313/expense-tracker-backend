const express = require("express");

const { createExpenseCategory, getExpenseCategory, editExpenseCategory, deleteExpenseCategory } = require('../controller/expenseCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler')

const router = express.Router();

router.post("/getExpenseCategory", asyncRouteHandler(getExpenseCategory))
router.post('/createExpenseCategory', asyncRouteHandler(createExpenseCategory))
router.post('/editExpenseCategory', asyncRouteHandler(editExpenseCategory))
router.post('/deleteExpenseCategory', asyncRouteHandler(deleteExpenseCategory))

module.exports = router;
