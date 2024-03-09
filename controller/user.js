  const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../model/User");
const createApiResponse = require('../helper/createApiResponse');
const { SECRET } = require('../helper/config');
const { sendVerificationEmail } = require("../helper/email");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json(createApiResponse(false, null, "Email already exists", 409))
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json(createApiResponse(true, newUser, "User registered successfully", 201));

  await sendVerificationEmail(email)
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json(createApiResponse(false, null, "User not found.", 404))
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json(createApiResponse(false, null, "Invalid credentials.", 401))
    }

    const token = jwt.sign({ username: user.username, id: user.id }, SECRET, {
      expiresIn: "48h",
    });

    res.json(createApiResponse(true, {token: token}, "login successfully.", 200))
};

