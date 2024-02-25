const createApiResponse = require('../helper/createApiResponse');
const { IncomeCategory } = require("../model/IncomeCategory");
const { Incomes } = require('../model/Incomes');

exports.createIncomeCategory = async (req, res) => {
	const name = req.body.name;
	const userId = req.user.id;

	const existingCategory = await IncomeCategory.findOne({ name, userId, });

	if (existingCategory) {
		return res.json(createApiResponse(false, null, "Category name already exists. Please choose a different name.", 400))
	}

	const newIncomeCategory = await IncomeCategory.create({ userId, name, });

	res.json(createApiResponse(true, newIncomeCategory, "created...", 201))
}

exports.getIncomeCategory = async (req, res) => {
	const userId = req.user.id;
	const incomeCategoryId = req.params.id;

	if (incomeCategoryId) {
		const income = await IncomeCategory.findOne({ _id: incomeCategoryId });

		if (!income) {
			return res.json(createApiResponse(false, null, "Income not found for the given incomeCategoryId", 400))
		}
		return res.json(createApiResponse(true, income, "", 200))
	}

	const categories = await IncomeCategory.find({ userId });

    const categoryIds = categories.map(category => category._id);

    const totalIncomesMap = {};

    for (const categoryId of categoryIds) {
        const incomeForCategory = await Incomes.find({ userId: userId, incomeCategoryId: categoryId });

        const totalIncome = incomeForCategory.reduce((total, income) => total + income.incomeAmount, 0);

        totalIncomesMap[categoryId] = totalIncome;
    }

    const categoriesWithTotalIncomes = categories.map(category => ({
        ...category.toJSON(),
        totalIncome: totalIncomesMap[category._id] || 0 
    }));

    res.status(200).json(createApiResponse(true, categoriesWithTotalIncomes, "", 200));
}

exports.editIncomeCategory = async (req, res) => {
	const { incomeCategoryId, name } = req.body;
	const userId = req.user.id;

	const existingIncomeCategory = await IncomeCategory.findById(incomeCategoryId);

	if (!existingIncomeCategory) {
		return res.json(createApiResponse(false, null, "Income category not found.", 400))
	}

	if (existingIncomeCategory.name === name) {
		return res.status(200).json(createApiResponse(false, null, "Please choose a different name.", 400))
	}

	const isExistingCategory = await IncomeCategory.findOne({ userId, name })

	if (isExistingCategory) {
		return res.status(200).json(createApiResponse(false, null, "Entered name matches existing category. Please choose a different name.", 400))
	}

	existingIncomeCategory.name = name;
	await existingIncomeCategory.save();

	return res.status(200).json(createApiResponse(true, existingIncomeCategory, "edited...", 200))
}

exports.deleteIncomeCategory = async (req, res) => {
	const userId = req.user.id;
	const { incomeCategoryId } = req.body;

	const existingIncomeCategory = await IncomeCategory.findById(incomeCategoryId);

	if (!existingIncomeCategory) {
		return res.json(createApiResponse(false, null, "Income category not found.", 400))
	}

	const existingIncome = await Incomes.find({ userId, incomeCategoryId })

	if (existingIncome && existingIncome.length > 0) {
		return res.json(createApiResponse(false, null, 'Cannot delete. Associated income exist.', 400))
	}

	await IncomeCategory.deleteOne({ _id: incomeCategoryId });

	res.json(createApiResponse(true, null, "deleted...", 204))
}


