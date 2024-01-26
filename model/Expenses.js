const mongoose = require("mongoose");

const ExpensesSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	expenseCategoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ExpenseCategory',
		required: true
	},
	expenseDetails: {
		type: String,
		required: true	
	},
	expenseAmount: {
		type: Number,
		required: true
	},
	expenseDate: {
		type: Date,
		required: true
	}
})

exports.Expenses = mongoose.model("Expenses", ExpensesSchema)