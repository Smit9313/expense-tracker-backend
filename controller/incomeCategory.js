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
	const incomeCategoryId = req.body.incomeCategoryId;

	if (incomeCategoryId) {
		const income = await IncomeCategory.findOne({ _id: incomeCategoryId });

		if (!income) {
			return res.json(createApiResponse(false, null, "Income not found for the given incomeCategoryId", 400))
		}
		return res.json(createApiResponse(true, income, "", 200))
	}

	const categories = await IncomeCategory.find({ userId });
	res.status(200).json(createApiResponse(true, categories, "", 200))
}

exports.editIncomeCategory = async (req, res) => {
	const { incomeCategoryId, name } = req.body;

	const existingIncomeCategory = await IncomeCategory.findById(incomeCategoryId);

	if (!existingIncomeCategory) {
		return res.json(createApiResponse(false, null, "Income category not found.", 400))
	}

	existingIncomeCategory.name = name;
	await existingIncomeCategory.save();

	res.status(200).json(createApiResponse(true, existingIncomeCategory, "", 200))
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

	res.status(204).json(createApiResponse(true, null, "deleted successfully", 204))
}


