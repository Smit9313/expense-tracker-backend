const { Expenses } = require("../model/Expenses")
const { ExpenseCategory } = require("../model/ExpenseCategory")
const { User } = require("../model/User");
const createApiResponse = require('../helper/createApiResponse');

exports.createExpense = async (req, res) => {
	const { expenseCategoryId, expenseDetails, expenseAmount, expenseDate } = req.body;
	const userId = req.user.id;

	const existingUser = await User.findById(userId);
	const existingCategory = await ExpenseCategory.findById(expenseCategoryId);
	if (!existingUser || !existingCategory) {
		return res.json(createApiResponse(false, [], "User or Expense Category not found", 400))
	}

	const newExpense = await Expenses.create({
		userId,
		expenseCategoryId,
		expenseDetails,
		expenseAmount,
		expenseDate,
	});

	res.json(createApiResponse(true, newExpense, "created...", 201))
};

exports.getExpenses = async (req, res) => {
	const userId = req.user.id
	const expenseId = req.body.expenseId;


	if (expenseId) {
		const expense = await Expenses.findOne({ _id: expenseId });

		if (!expense) {
			return res.json(createApiResponse(false, [], "Expense not found for the given expenseId", 400))
		}

		return res.json(createApiResponse(true, expense, "", 200))
	}

	const expenses = await Expenses.find({ userId }).populate('expenseCategoryId', 'name');

	res.status(200).json(createApiResponse(true, expenses, "", 200))
};

exports.editExpense = async (req, res) => {
	const { expenseId, expenseCategoryId, expenseDetails, expenseAmount, expenseDate } = req.body;


	const existingExpense = await Expenses.findById(expenseId);
	if (!existingExpense) {
		return res.json(createApiResponse(false, [], "Expense not found", 400))
	}

	existingExpense.expenseCategoryId = expenseCategoryId;
	existingExpense.expenseDetails = expenseDetails;
	existingExpense.expenseAmount = expenseAmount;
	existingExpense.expenseDate = expenseDate;

	await existingExpense.save();

	res.status(200).json(createApiResponse(true, existingExpense, "edited...", 200))
};

exports.deleteExpense = async (req, res) => {
	const { expenseId } = req.body;

	const existingExpense = await Expenses.findById(expenseId);
	if (!existingExpense) {
		return res.json(createApiResponse(false, [], "Expense not found", 400))
	}

	await Expenses.deleteOne({ _id: expenseId });

	res.json(createApiResponse(true, [], "deleted...", 200))
};