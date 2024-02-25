const express = require("express");

const { createIncomeCategory, getIncomeCategory, editIncomeCategory, deleteIncomeCategory } = require('../controller/incomeCategory');
const asyncRouteHandler = require('../helper/asyncRouteHandler')

const router = express.Router();

router.get('/getIncomeCategory/:id?', asyncRouteHandler(getIncomeCategory))
router.post('/createIncomeCategory', asyncRouteHandler(createIncomeCategory))
router.patch('/editIncomeCategory/:id?', asyncRouteHandler(editIncomeCategory))
router.delete('/deleteIncomeCategory/:id?', asyncRouteHandler(deleteIncomeCategory))

module.exports = router;