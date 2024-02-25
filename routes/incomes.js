const express = require("express");

const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { getIncomes, createIncome, editIncome, deleteIncome } = require('../controller/incomes');


const router = express.Router();

router.get("/getIncomes/:id?", asyncRouteHandler(getIncomes))
router.post("/createIncome", asyncRouteHandler(createIncome))
router.patch("/editIncome/:id?", asyncRouteHandler(editIncome))
router.delete("/deleteIncome/:id?", asyncRouteHandler(deleteIncome))

module.exports = router;