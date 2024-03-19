const express = require("express");

const { createIncomeCategory, getIncomeCategory, editIncomeCategory, deleteIncomeCategory } = require('../controller/incomeCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler');
const { createExpCategoryMiddleware } = require("../middleware/validation/validation");

const router = express.Router();

router.get('/:id?', asyncRouteHandler(getIncomeCategory))
router.post('/',createExpCategoryMiddleware, asyncRouteHandler(createIncomeCategory))
router.patch('/:id',createExpCategoryMiddleware, asyncRouteHandler(editIncomeCategory))
router.delete('/:id', asyncRouteHandler(deleteIncomeCategory))

module.exports = router;