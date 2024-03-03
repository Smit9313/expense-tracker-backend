const express = require("express");

const { createIncomeCategory, getIncomeCategory, editIncomeCategory, deleteIncomeCategory } = require('../controller/incomeCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler');
const { createExpCategoryMiddleware } = require("../middleware/validation/validation");

const router = express.Router();

router.get('/getIncomeCategory/:id?', asyncRouteHandler(getIncomeCategory))
router.post('/createIncomeCategory',createExpCategoryMiddleware, asyncRouteHandler(createIncomeCategory))
router.patch('/editIncomeCategory/:id',createExpCategoryMiddleware, asyncRouteHandler(editIncomeCategory))
router.delete('/deleteIncomeCategory/:id', asyncRouteHandler(deleteIncomeCategory))

module.exports = router;