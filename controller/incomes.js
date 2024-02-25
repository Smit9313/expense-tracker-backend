const { Incomes } = require("../model/Incomes")
const { IncomeCategory } = require("../model/IncomeCategory")
const { User } = require("../model/User");
const createApiResponse = require('../helper/createApiResponse');

exports.createIncome = async (req, res) => {
	const { incomeCategoryId, incomeDetails, incomeAmount, incomeDate } = req.body;
	const userId = req.user.id;

	const existingUser = await User.findById(userId);
	const existingCategory = await IncomeCategory.findById(incomeCategoryId);
	if (!existingUser || !existingCategory) {
		return res.json(createApiResponse(false, [], "User or Income Category not found", 404))
	}

	const newIncome = await Incomes.create({
		userId,
		incomeCategoryId,
		incomeDetails,
		incomeAmount,
		incomeDate,
	});

	res.json(createApiResponse(true, newIncome, "created...", 201))
};

exports.getIncomes = async (req, res) => {
	const userId = req.user.id
	const incomeId = req.params.id;

	if (incomeId) {
		const income = await Incomes.findOne({ _id: incomeId });

		if (!income) {
			return res.json(createApiResponse(false, [], "Income not found for the given incomeId", 404))
		}

		return res.json(createApiResponse(true, income, "Income Found Successfully", 200))
	}

	const incomes = await Incomes.find({ userId }).populate('incomeCategoryId', 'name');

	res.status(200).json(createApiResponse(true, incomes, "", 200))
};

exports.editIncome = async (req, res) => {
	const incomeId = req.params.id
	const {  incomeCategoryId, incomeDetails, incomeAmount, incomeDate } = req.body;

	const existingIncome = await Incomes.findById(incomeId);
	if (!existingIncome) {
		return res.json(createApiResponse(false, [], "Income not found", 404))
	}

	existingIncome.incomeCategoryId = incomeCategoryId;
	existingIncome.incomeDetails = incomeDetails;
	existingIncome.incomeAmount = incomeAmount;
	existingIncome.incomeDate = incomeDate;

	await existingIncome.save();

	res.status(200).json(createApiResponse(true, existingIncome, "edited...", 201))
};

exports.deleteIncome = async (req, res) => {
	const  incomeId  = req.params.id;

	const existingIncome = await Incomes.findById(incomeId);
	if (!existingIncome) {
		return res.json(createApiResponse(false, [], "Income not found", 404))
	}

	await Incomes.deleteOne({ _id: incomeId });

	res.json(createApiResponse(true, [], "deleted...", 204))
};