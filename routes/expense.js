const express = require("express");
const { createExpenseCategory, getExpenseCategory, editExpenseCategoryHandler, deleteExpenseCategory } = require('../controller/expense');
const asyncRouteHandler = require('../helper/asyncRouteHandler')

const router = express.Router();

router.get("/expenseCategory", asyncRouteHandler(getExpenseCategory))
router.post('/expenseCategory', asyncRouteHandler(createExpenseCategory))
router.patch('/expenseCategory', asyncRouteHandler(editExpenseCategoryHandler))
router.delete('/expenseCategory', asyncRouteHandler(deleteExpenseCategory))

module.exports = router;