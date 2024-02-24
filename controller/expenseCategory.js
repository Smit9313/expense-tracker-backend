const createApiResponse = require('../helper/createApiResponse');
const { ExpenseCategory } = require("../model/ExpenseCategory");
const { Expenses } = require('../model/Expenses');

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

	 const expense = await ExpenseCategory.findOne({ _id: expenseCategoryId });

	 if (!expense) {
		 return res.json(createApiResponse(false, null, "Expense not found for the given expenseCategoryId", 400));
	 }
	
	 const expensesForCategory = await Expenses.find({ expenseCategoryId });
 
	 const totalExpense = expensesForCategory.reduce((total, expense) => total + expense.expenseAmount, 0);
	 
	 const response = {
		 _id: expense._id,
		 userId: expense.userId,
		 name: expense.name,
		 expenseCategoryId: expense._id, 
		 totalExpense: totalExpense,
		 __v: expense.__v 
	 };
 
	 return res.json(createApiResponse(true, response, "", 200));
}

exports.editExpenseCategory = async (req, res) => {
	const { expenseCategoryId, name } = req.body;
	const userId = req.user.id;

	const existingExpenseCategory = await ExpenseCategory.findById(expenseCategoryId);
   
	if (!existingExpenseCategory) {
		return res.json(createApiResponse(false, null, "Expense category not found.", 400))
	}

	if(existingExpenseCategory.name === name){
		return res.status(200).json(createApiResponse(false, null, "Please choose a different name.", 400))
	}

	const isExistingCategory = await ExpenseCategory.findOne({userId, name })
	
	if(isExistingCategory){
	  return res.status(200).json(createApiResponse(false, null, "Entered name matches existing category. Please choose a different name.", 400))
	}

	existingExpenseCategory.name = name;
	await existingExpenseCategory.save();

	return res.status(200).json(createApiResponse(true, existingExpenseCategory, "edited...", 200))
}

exports.deleteExpenseCategory = async (req, res) => {
	const userId = req.user.id;
	const { expenseCategoryId } = req.body;

	const existingExpenseCategory = await ExpenseCategory.findById(expenseCategoryId);

	if (!existingExpenseCategory) {
		return res.json(createApiResponse(false, null, "Expense category not found.", 400))
	}

	const existingExpense = await Expenses.find({userId, expenseCategoryId})

	if(existingExpense && existingExpense.length > 0){
		return res.json(createApiResponse(false, null, 'Cannot delete. Associated expense exist.', 400));
	}

	await ExpenseCategory.deleteOne({ _id: expenseCategoryId });

	res.json(createApiResponse(true, null, "deleted successfully", 204))
}
