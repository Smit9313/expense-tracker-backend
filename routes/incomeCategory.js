const express = require("express");
const { createIncomeCategory, getIncomeCategory, editIncomeCategoryHandler, deleteIncomeCategory } = require('../controller/incomeCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler')

const router = express.Router();

router.get("/incomeCategory", asyncRouteHandler(getIncomeCategory))
router.post('/incomeCategory', asyncRouteHandler(createIncomeCategory))
router.patch('/incomeCategory', asyncRouteHandler(editIncomeCategoryHandler))
router.delete('/incomeCategory', asyncRouteHandler(deleteIncomeCategory))

module.exports = router;