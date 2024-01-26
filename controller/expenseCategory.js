const { ExpenseCategory } = require("../model/ExpenseCategory");

exports.createExpenseCategory = async (req, res) => {
	const name = req.body.name;
	const userId = req.user.id;
	const newExpenseCategory = await ExpenseCategory.create({
		userId,
		name,
	});
	res.status(201).json(newExpenseCategory);
}

exports.getExpenseCategory = async (req, res) => {
	const userId = req.user.id;

	// Retrieve all expense categories for the user
	const categories = await ExpenseCategory.find({ userId });
	res.status(200).json(categories);
}

exports.editExpenseCategoryHandler = async (req, res) => {
	const { expenseCategoryId, name } = req.body;

	const existingExpenseCategory = await ExpenseCategory.findById(expenseCategoryId);
	// Update the expense category's name
	existingExpenseCategory.name = name;
	await existingExpenseCategory.save();

	res.status(200).json(existingExpenseCategory);
}

exports.deleteExpenseCategory = async (req, res) => {
	const { expenseCategoryId } = req.body;

	const existingExpenseCategory = await ExpenseCategory.findById(expenseCategoryId);
    if (!existingExpenseCategory) {
      return res.status(404).json({ error: 'Expense category not found' });
    }

	await ExpenseCategory.deleteOne({ _id: expenseCategoryId });

	res.status(204).json({message: 'deleted successfully'});
}
	