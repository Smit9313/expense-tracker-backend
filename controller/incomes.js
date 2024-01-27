const { Incomes } = require("../model/Incomes")
const { IncomeCategory } = require("../model/IncomeCategory")
const { User } = require("../model/User")

exports.createIncome = async (req, res) => {
	const { incomeCategoryId, incomeDetails, incomeAmount, incomeDate } = req.body;
	const userId = req.user.id;

	const existingUser = await User.findById(userId);
	const existingCategory = await IncomeCategory.findById(incomeCategoryId);
	if (!existingUser || !existingCategory) {
		return res.status(404).json({ error: 'User or Income Category not found' });
	}

	const newIncome = await Incomes.create({
		userId,
		incomeCategoryId,
		incomeDetails,
		incomeAmount,
		incomeDate,
	});

	res.status(201).json(newIncome);
};

exports.getIncomes = async (req, res) => {
	const userId = req.user.id

	const existingUser = await User.findById(userId);
	if (!existingUser) {
		return res.status(404).json({ error: 'User not found' });
	}

	const incomes = await Incomes.find({ userId }).populate('incomeCategoryId', 'name');

	res.status(200).json(incomes);

};

exports.editIncome = async (req, res) => {
	const { incomeId, incomeCategoryId, incomeDetails, incomeAmount, incomeDate } = req.body;

	const existingIncome = await Incomes.findById(incomeId);
	if (!existingIncome) {
		return res.status(404).json({ error: 'Income not found' });
	}

	existingIncome.incomeCategoryId = incomeCategoryId;
	existingIncome.incomeDetails = incomeDetails;
	existingIncome.incomeAmount = incomeAmount;
	existingIncome.incomeDate = incomeDate;

	await existingIncome.save();

	res.status(200).json(existingIncome);
};

exports.deleteIncome = async (req, res) => {
	  const { incomeId } = req.body;
  
	  const existingIncome = await Incomes.findById(incomeId);
	  if (!existingIncome) {
		return res.status(404).json({ error: 'Income not found' });
	  }
  
	  await Incomes.deleteOne({ _id: incomeId });
  
	  res.status(204).end();
  };