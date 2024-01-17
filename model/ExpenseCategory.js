const mongoose = require("mongoose");

const ExpenseCategorySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Reference to the User model
		required: true,
	  },
	name: String
});

exports.ExpenseCategory = mongoose.model("ExpenseCategory", ExpenseCategorySchema);
