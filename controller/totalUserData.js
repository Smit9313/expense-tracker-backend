const createApiResponse = require('../helper/createApiResponse');
const { Incomes } = require('../model/Incomes');
const { Expenses } = require("../model/Expenses")

exports.totalTransactions = async (req,res) => {
        const userId = req.user.id;
        const allExpenses = await Expenses.find({ userId });

        const allIncomes = await Incomes.find({ userId });

        const totalExpense = allExpenses.reduce((total, expense) => total + expense.expenseAmount, 0);

        const totalIncome = allIncomes.reduce((total, income) => total + income.incomeAmount, 0);

        const totals = {
            totalExpense: totalExpense,
            totalIncome: totalIncome
        };
        res.json(createApiResponse( true,totals,"Total expenses and incomes fetched successfully"));
} 
