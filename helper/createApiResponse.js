function createApiResponse(status, data, message, code) {
	return {
		status: status,
		data: data || null,
		message: message || (status ? "Request successful" : "An error occurred"),
		code: code || (status ? 200 : 500)
	};
}

module.exports = createApiResponse
