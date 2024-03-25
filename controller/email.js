const createApiResponse = require('../helper/createApiResponse');
const { User } = require('../model/User');
const { SECRET } = require('../helper/config');
const path = require('path');
const jwt = require("jsonwebtoken");


exports.verifyTokenController = async (req, res) => {
  const token = req.params.token;
  if (!token) {
    return res.render(path.join(__dirname, '../views/verificationResponse'), {
      success: false,
      message: 'Token is not provided',
    });
  }

  const decode = jwt.verify(token, SECRET);
  const user = await User.findOne({ email: decode.email });
  if (!user) {
    return res.render(path.join(__dirname, '../views/verificationResponse'), {
      success: false,
      message: 'Email verification failed, Link is invalid',
    });
  }

  user.isVerify = true;
  await user.save();
  return res.render(path.join(__dirname, '../views/verificationResponse'), {
    success: true,
    message: 'Email verified successful',
  });
} 
