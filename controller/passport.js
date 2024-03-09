const createApiResponse = require("../helper/createApiResponse")
const { User } = require("../model/User")


exports.SignInUsingGoogle = async ( profile ) => {
    const {email,family_name,email_verified} = profile._json

//     const existingUser = await User.findOne({email})

//  if (existingUser) {
//     throw {
//         success: false,
//         data: null,
//         message: "Email already exists",
//         status: 409
//     };
//  }
    const newUser = await User.create({username:family_name,email,isVerified:email_verified})

    // return res.json(createApiResponse(true, newUser, "User registered successfully", 201))
}