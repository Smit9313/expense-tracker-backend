const express = require("express");
const { createIncomeCategory, getIncomeCategory, editIncomeCategory, deleteIncomeCategory } = require('../controller/incomeCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler')

const router = express.Router();

router.post('/getIncomeCategory', asyncRouteHandler(getIncomeCategory))
router.post('/createIncomeCategory', asyncRouteHandler(createIncomeCategory))
router.post('/editIncomeCategory', asyncRouteHandler(editIncomeCategory))
router.post('/deleteIncomeCategory', asyncRouteHandler(deleteIncomeCategory))

module.exports = router;