const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isVerify:{
    type:Boolean,
    default:false,
  }
});

exports.User = mongoose.model("User", UserSchema);
