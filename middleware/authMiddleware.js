const JWT = require('jsonwebtoken')
// const { JWT_SECRET } = process.env
// const userModel = require('../models/user')
// const db = require('../models/index')

// Protected  routes
exports.requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      "ABC"
    )
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
    res.json(error)
    res.status(401).json(createApiResponse(false,error, "UnAuthorized",401))
	// console.log("hello")
  }
}
