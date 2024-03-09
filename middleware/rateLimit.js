const { rateLimit } = require("express-rate-limit");
const createApiResponse = require('../helper/createApiResponse');

exports.loginRateLimit = rateLimit({
	windowMs: 3 * 60 * 60 * 1000,
	max: 3,
	// standardHeaders: true,
	legacyHeaders: false,
	// skipSuccessfulRequests: true,
	message: createApiResponse(false, null,'You can only make 3 requests every hour.')
})
