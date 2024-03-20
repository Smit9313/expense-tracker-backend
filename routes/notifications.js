const express = require("express");

const asyncRouteHandler = require("../helper/asyncRouteHandler");
const { editNotification, createNotification, getNotification, deleteNotification } = require('../controller/notifications');

const router = express.Router();

router.get("/:id?", asyncRouteHandler(getNotification))
router.post("/", asyncRouteHandler(createNotification))
router.patch("/:id",asyncRouteHandler(editNotification))
router.delete("/:id", asyncRouteHandler(deleteNotification))

module.exports = router;
