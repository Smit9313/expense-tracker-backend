const createApiResponse = require('../helper/createApiResponse');
const { User } = require('../model/User');
const { SECRET } = require('../helper/config');
const jwt = require("jsonwebtoken");


exports.verifyTokenController = async (req, res) => {
    const token = req.params.token

    if (!token) {
      return res.json(createApiResponse(false, [], "Token is not provided", 400));
  }

    const decode=  jwt.verify(token, SECRET)
    console.log(decode)

      const user = await User.findOne({ email:decode.email })
  
      if (!user) {
        return res.json(createApiResponse(false,[],"Email verification failed, Link is invalid",404))
      }

      user.isVerified = true
      await user.save()
  
      return res.json(createApiResponse(true,user,"Email verified successful",200))
    
} 
