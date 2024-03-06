const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "My API",
		version: "1.0.0",
		description: "My API Description",
	},
	servers: [{
		url: "http://localhost:8080"
	}]
};

const options = {
	swaggerDefinition,
	apis: ["./routes/*.js", "./model/*.js", "./controller/*.js"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;