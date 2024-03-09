const createApiResponse = require('../helper/createApiResponse');
const { Incomes } = require('../model/Incomes');
const { Expenses } = require("../model/Expenses");
const { User } = require('../model/User');

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
        res.json(createApiResponse( true,totals,"Total expenses and incomes fetched successfully",200));
} 

exports.verifyTokenController = async (req, res) => {
    try {
      const token = req.params.email

      const user = await User.findOne({ email:token })
  
      if (!user) {
        return res.json(createApiResponse(false,[],"Email verification failed",404))
      }

      user.isVerified = true
      await user.save()
  
      return res.json(createApiResponse(true,user,"Email verified successful",200))
    
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error'
      })
    }
  }
  
