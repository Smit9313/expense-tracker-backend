const createApiResponse = require('../helper/createApiResponse');
const { ExpenseCategory } = require("../model/ExpenseCategory");

exports.createExpenseCategory = async (req, res) => {
	const name = req.body.name;
	const userId = req.user.id;

	const existingCategory = await ExpenseCategory.findOne({ name, userId, });

	if (existingCategory) {
		return res.json(createApiResponse(false, null, "Category name already exists. Please choose a different name.", 400))
	}

	const newExpenseCategory = await ExpenseCategory.create({ userId, name });

	res.json(createApiResponse(true, newExpenseCategory, "created...", 201))
}

exports.getExpenseCategory = async (req, res) => {
	const userId = req.user.id;
	const expenseCategoryId = req.body.expenseCategoryId;

	if (expenseCategoryId) {
		const expense = await ExpenseCategory.findOne({ _id: expenseCategoryId });

		if (!expense) {
			return res.json(createApiResponse(false, null, "Expense not found for the given expenseCategoryId", 400))
		}
		return res.json(createApiResponse(true, expense, "", 200))
	}

	const categories = await ExpenseCategory.find({ userId });
	res.status(200).json(createApiResponse(true, categories, "", 200))
}

exports.editExpenseCategory = async (req, res) => {
	const { expenseCategoryId, name } = req.body;

	const existingExpenseCategory = await ExpenseCategory.findById(expenseCategoryId);

	if (!existingExpenseCategory) {
		return res.json(createApiResponse(false, null, "Expense category not found.", 400))
	}

	existingExpenseCategory.name = name;
	await existingExpenseCategory.save();

	res.status(200).json(createApiResponse(true, existingExpenseCategory, "", 200))
}

exports.deleteExpenseCategory = async (req, res) => {
	const { expenseCategoryId } = req.body;

	const existingExpenseCategory = await ExpenseCategory.findById(expenseCategoryId);

	if (!existingExpenseCategory) {
		return res.json(createApiResponse(false, null, "Expense category not found.", 400))
	}

	await ExpenseCategory.deleteOne({ _id: expenseCategoryId });

	res.status(204).json(createApiResponse(true, null, "deleted successfully", 204))
}
