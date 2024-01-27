const mongoose = require("mongoose");

const IncomesSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	incomeCategoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'IncomeCategory',
		required: true
	},
	incomeDetails: {
		type: String,
		required: true	
	},
	incomeAmount: {
		type: Number,
		required: true
	},
	incomeDate: {
		type: Date,
		required: true
	}
})

exports.Incomes = mongoose.model("Incomes", IncomesSchema)