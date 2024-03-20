const { required } = require('joi');
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	detail: {
		type: String,
		required: true
	},
	isRead: {
		type: Boolean,
		required: true
	},
	notificationDate: {
		type: Date,
		required: true
	}
})

exports.Notifications = mongoose.model("Notifications", NotificationSchema)
