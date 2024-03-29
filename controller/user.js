const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../model/User");
const createApiResponse = require('../helper/createApiResponse');
const { SECRET } = require('../helper/config');
const { sendVerificationEmail } = require("../helper/email");

exports.register = async (req, res) => {
  const { username, email, password, profilePic } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json(createApiResponse(false, null, "Email already exists", 409))
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword, isVerify: false, profilePic });
  await newUser.save();

  const token = jwt.sign({ email }, SECRET, {
    expiresIn: "2h",
  });

  res.status(201).json(createApiResponse(true, newUser, "User registered successfully", 201));

  await sendVerificationEmail(email, token)
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json(createApiResponse(false, null, "User not found.", 404))
  }

  if (user.isVerify === false) {
    return res.json(createApiResponse(false, null, "Email is not verified", 401))
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.json(createApiResponse(false, null, "Invalid credentials.", 401))
  }

  const token = jwt.sign({ username: user.username, id: user.id, email: user.email }, SECRET, {
    expiresIn: "48h",
  });

  res.json(createApiResponse(true, { token: token }, "login successfully.", 200))
};

exports.user = async (req, res) => {
  const email = req.user.email;
  const user = await User.findOne({ email }, { password: 0 });
  res.json(createApiResponse(true, user, "success", 200));
}
