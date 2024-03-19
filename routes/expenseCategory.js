const express = require("express");

const { createExpenseCategory, getExpenseCategory, editExpenseCategory, deleteExpenseCategory } = require('../controller/expenseCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler');
const { createExpCategoryMiddleware } = require("../middleware/validation/validation");

const router = express.Router();

router.get("/:id?", asyncRouteHandler(getExpenseCategory))
router.post('/',createExpCategoryMiddleware, asyncRouteHandler(createExpenseCategory))
router.patch('/:id',createExpCategoryMiddleware, asyncRouteHandler(editExpenseCategory))
router.delete('/:id', asyncRouteHandler(deleteExpenseCategory))

module.exports = router;
