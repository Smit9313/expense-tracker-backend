const { Expenses } = require("../model/Expenses")
const createApiResponse = require('../helper/createApiResponse');
const { Notifications } = require('../model/Notification');

exports.createNotification = async (req, res) => {
	const { detail, notificationDate } = req.body;
	const userId = req.user.id;

	const newNotification = await Notifications.create({
		userId,
		detail,
		isRead: false,
		notificationDate
	});

	res.json(createApiResponse(true, newNotification, "created...", 201))
};

exports.getNotification = async (req, res) => {
	const userId = req.user.id
	const notificationId = req.params.id;

	if (notificationId) {
		const notification = await Notifications.findOne({ _id: notificationId });

		if (!notification) {
			return res.json(createApiResponse(false, [], "data not found", 404))
		}

		return res.json(createApiResponse(true, notification, "success...", 200))
	}

	const notifications = await Notifications.find({ userId })

	res.status(200).json(createApiResponse(true, notifications, "success...", 200))
};

exports.editNotification = async (req, res) => {
	const { detail, notificationsDate, isRead } = req.body;
    const notificationId = req.params.id

	const existingNotification = await Notifications.findById(notificationId);
	if (!existingNotification) {
		return res.json(createApiResponse(false, [], "data not found", 404))
	}

	existingNotification.detail = detail;
	existingNotification.notificationsDate = notificationsDate;
	existingNotification.isRead = isRead;

	await existingNotification.save();

	res.status(200).json(createApiResponse(true, existingNotification, "edited...", 201))
};

exports.deleteNotification = async (req, res) => {
	const notificationId = req.params.id;

	const existingNotification = await Notifications.findById(notificationId);
	if (!existingNotification) {
		return res.json(createApiResponse(false, [], "data not found", 404))
	}

	await Notifications.deleteOne({ _id: notificationId });

	res.json(createApiResponse(true, [], "deleted...", 204))
};