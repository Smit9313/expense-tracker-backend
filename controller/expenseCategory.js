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
    const expenseCategoryId = req.params.id;

    if (expenseCategoryId) {
        const expense = await ExpenseCategory.findOne({ _id: expenseCategoryId });
        if (!expense) {
            return res.json(createApiResponse(false, null, "Expense not found for the given expenseCategoryId", 400));
        }
        return res.json(createApiResponse(true, expense, "", 200));
    }

    const categories = await ExpenseCategory.find({ userId });

    const categoryIds = categories.map(category => category._id);

    const totalExpensesMap = {};

    for (const categoryId of categoryIds) {
        const expensesForCategory = await Expenses.find({ userId: userId, expenseCategoryId: categoryId });

        const totalExpense = expensesForCategory.reduce((total, expense) => total + expense.expenseAmount, 0);

        totalExpensesMap[categoryId] = totalExpense;
    }

    const categoriesWithTotalExpenses = categories.map(category => ({
        ...category.toJSON(),
        totalExpense: totalExpensesMap[category._id] || 0 
    }));

    res.status(200).json(createApiResponse(true, categoriesWithTotalExpenses, "", 200));
};

exports.editExpenseCategory = async (req, res) => {
	const { name } = req.body;
	const expenseCategoryId = req.params.id

	const existingExpenseCategory = await ExpenseCategory.findById(expenseCategoryId);
   
	if (!existingExpenseCategory) {
		return res.json(createApiResponse(false, null, "Expense category not found.", 400))
	}

	const checkExistingName = await ExpenseCategory.findOne({name})
    if(!checkExistingName){	
	  existingExpenseCategory.name = name;
	  await existingExpenseCategory.save();

	  return res.status(200).json(createApiResponse(true, existingExpenseCategory, "edited...", 200))
	}
	res.status(400).json(createApiResponse(false,null,"Expense Category name was unchanged",400))

}

exports.deleteExpenseCategory = async (req, res) => {
	const userId = req.user.id;
	const expenseCategoryId  = req.params.id;

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
