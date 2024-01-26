const express = require("express");
const { createIncomeCategory, getIncomeCategory, editIncomeCategory, deleteIncomeCategory } = require('../controller/incomeCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler')

const router = express.Router();

router.get('/getIncomeCategory', asyncRouteHandler(getIncomeCategory))
router.post('/createIncomeCategory', asyncRouteHandler(createIncomeCategory))
router.patch('/editIncomeCategory', asyncRouteHandler(editIncomeCategory))
router.delete('/deleteIncomeCategory', asyncRouteHandler(deleteIncomeCategory))

module.exports = router;