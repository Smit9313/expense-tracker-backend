const { IncomeCategory } = require("../model/IncomeCategory")

exports.createIncomeCategory = async (req, res) => {
	const name = req.body.name;
	const userId = req.user.id;
	const newIncomeCategory = await IncomeCategory.create({
		userId,
		name,
	});
	res.status(201).json(newIncomeCategory);
}

exports.getIncomeCategory = async (req, res) => {
	const userId = req.user.id;

	const categories = await IncomeCategory.find({ userId });
	res.status(200).json(categories);
}

exports.editIncomeCategory = async (req, res) => {
	const { incomeCategoryId, name } = req.body;

	const existingIncomeCategory = await IncomeCategory.findById(incomeCategoryId);

	existingIncomeCategory.name = name;
	await existingIncomeCategory.save();

	res.status(200).json(existingIncomeCategory);
}

exports.deleteIncomeCategory = async (req, res) => {
	const { incomeCategoryId } = req.body;

	const existingIncomeCategory = await IncomeCategory.findById(incomeCategoryId);
    if (!existingIncomeCategory) {
      return res.status(404).json({ error: 'Expense category not found' });
    }

	await IncomeCategory.deleteOne({ _id: incomeCategoryId });

	res.status(204).json({message: 'deleted successfully'});
}
	

