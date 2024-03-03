const express = require("express");

const { createExpenseCategory, getExpenseCategory, editExpenseCategory, deleteExpenseCategory } = require('../controller/expenseCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler');
const { createExpCategoryMiddleware } = require("../middleware/validation/validation");

const router = express.Router();

router.get("/getExpenseCategory/:id?", asyncRouteHandler(getExpenseCategory))
router.post('/createExpenseCategory',createExpCategoryMiddleware, asyncRouteHandler(createExpenseCategory))
router.patch('/editExpenseCategory/:id',createExpCategoryMiddleware, asyncRouteHandler(editExpenseCategory))
router.delete('/deleteExpenseCategory/:id', asyncRouteHandler(deleteExpenseCategory))

module.exports = router;
