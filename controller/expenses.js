const { Expenses } = require("../model/Expenses")
const { ExpenseCategory } = require("../model/ExpenseCategory")
const { User } = require("../model/User")

exports.createExpense = async (req, res) => {
	const { expenseCategoryId, expenseDetails, expenseAmount, expenseDate } = req.body;
	const userId = req.user.id;

	const existingUser = await User.findById(userId);
	const existingCategory = await ExpenseCategory.findById(expenseCategoryId);
	if (!existingUser || !existingCategory) {
		return res.status(404).json({ error: 'User or Expense Category not found' });
	}

	const newExpense = await Expenses.create({
		userId,
		expenseCategoryId,
		expenseDetails,
		expenseAmount,
		expenseDate,
	});

	res.status(201).json(newExpense);
};

exports.getExpenses = async (req, res) => {
	const userId = req.user.id
	const expenseId = req.body.expenseId;


	if (expenseId) {
		const expense = await Expenses.findOne({ _id: expenseId });

		if (!expense) {
			return res.status(404).json({ error: 'Expense not found for the given expenseId' });
		}

		return res.status(200).json(expense);
	}

	const expenses = await Expenses.find({ userId }).populate('expenseCategoryId', 'name');

	res.status(200).json(expenses);

};

exports.editExpense = async (req, res) => {
	const { expenseId, expenseCategoryId, expenseDetails, expenseAmount, expenseDate } = req.body;

	
	const existingExpense = await Expenses.findById(expenseId);
	if (!existingExpense) {
		return res.status(404).json({ error: 'Expense not found' });
	}

	existingExpense.expenseCategoryId = expenseCategoryId;
	existingExpense.expenseDetails = expenseDetails;
	existingExpense.expenseAmount = expenseAmount;
	existingExpense.expenseDate = expenseDate;

	await existingExpense.save();

	res.status(200).json(existingExpense);
};

exports.deleteExpense = async (req, res) => {
	  const { expenseId } = req.body;
  
	  const existingExpense = await Expenses.findById(expenseId);
	  if (!existingExpense) {
		return res.status(404).json({ error: 'Expense not found' });
	  }
  
	  await Expenses.deleteOne({ _id: expenseId });
  
	  res.status(204).end();
  };