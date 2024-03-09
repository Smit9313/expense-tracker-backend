const { User } = require('../model/User');

exports.verifyTokenController = async (req, res) => {
      const token = req.params.email

      const user = await User.findOne({ email:token })
  
      if (!user) {
        return res.json(createApiResponse(false,[],"Email verification failed",404))
      }

      user.isVerified = true
      await user.save()
  
      return res.json(createApiResponse(true,user,"Email verified successful",200))
    
} 
