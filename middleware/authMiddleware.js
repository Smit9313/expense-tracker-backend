const JWT = require('jsonwebtoken')
const createApiResponse = require('../helper/createApiResponse')
// const { JWT_SECRET } = process.env
// const userModel = require('../models/user')
// const db = require('../models/index')

// Protected  routes
exports.requireSignIn = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decode = JWT.verify(
        req.headers.authorization,
        "ABC"
      )
      req.user = decode
      next()
    } else {
      res.status(401).json(createApiResponse(false, [], "UnAuthorized", 401))
    }
  } catch (error) {
    console.log(error)
    res.status(401).json(createApiResponse(false, error, "UnAuthorized", 401))
  }
}
