const { Expenses } = require("../model/Expenses")
const { ExpenseCategory } = require("../model/ExpenseCategory")
const { User } = require("../model/User")

exports.createExpense = async (req, res) => {
	const { expenseCategoryId, expenseDetails, expenseAmount, expenseDate } = req.body;
	const userId = req.user.id;
	// Validate that userId and expenseCategoryId exist and correspond to existing users and categories
	// This validation should be adapted based on your specific user and category validation logic
	// For simplicity, it assumes that a user and category with the provided IDs exist
	const existingUser = await User.findById(userId);
	const existingCategory = await ExpenseCategory.findById(expenseCategoryId);
	if (!existingUser || !existingCategory) {
		return res.status(404).json({ error: 'User or Expense Category not found' });
	}

	// Create a new expense
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
	// Validate that userId exists and corresponds to an existing user
	const existingUser = await User.findById(userId);
	if (!existingUser) {
		return res.status(404).json({ error: 'User not found' });
	}

	// Retrieve all expenses for the user
	const expenses = await Expenses.find({ userId }).populate('expenseCategoryId', 'name');

	res.status(200).json(expenses);

};

exports.editExpense = async (req, res) => {
	const { expenseId, expenseCategoryId, expenseDetails, expenseAmount, expenseDate } = req.body;

	// Validate that the expenseId exists and corresponds to an existing expense
	const existingExpense = await Expenses.findById(expenseId);
	if (!existingExpense) {
		return res.status(404).json({ error: 'Expense not found' });
	}

	// Update the expense details
	existingExpense.expenseCategoryId = expenseCategoryId;
	existingExpense.expenseDetails = expenseDetails;
	existingExpense.expenseAmount = expenseAmount;
	existingExpense.expenseDate = expenseDate;

	await existingExpense.save();

	res.status(200).json(existingExpense);
};

exports.deleteExpense = async (req, res) => {
	  const { expenseId } = req.body;
  
	  // Validate that the expenseId exists and corresponds to an existing expense
	  const existingExpense = await Expenses.findById(expenseId);
	  if (!existingExpense) {
		return res.status(404).json({ error: 'Expense not found' });
	  }
  
	  // Remove the expense
	  await Expenses.deleteOne({ _id: expenseId });
  
	  res.status(204).end();
  };