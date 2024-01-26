const express = require("express");
const { createExpenseCategory, getExpenseCategory, editExpenseCategory, deleteExpenseCategory } = require('../controller/expenseCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler')

const router = express.Router();

router.get("/getExpenseCategory", asyncRouteHandler(getExpenseCategory))
router.post('/createExpenseCategory', asyncRouteHandler(createExpenseCategory))
router.patch('/editExpenseCategory', asyncRouteHandler(editExpenseCategory))
router.delete('/deleteExpenseCategory', asyncRouteHandler(deleteExpenseCategory))

module.exports = router;
