const express = require("express");

const { createIncomeCategory, getIncomeCategory, editIncomeCategory, deleteIncomeCategory } = require('../controller/incomeCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler');
const { createExpCategoryMiddleware } = require("../middleware/validation/validation");

const router = express.Router();

router.get('/:id', asyncRouteHandler(()=>{}))

module.exports = router;