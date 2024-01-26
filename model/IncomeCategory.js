const mongoose = require("mongoose");

const IncomeCategorySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Reference to the User model
		required: true,
	  },
	name: String
});

exports.IncomeCategory = mongoose.model("IncomeCategory", IncomeCategorySchema);
