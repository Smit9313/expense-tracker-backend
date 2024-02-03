const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  SECRET: process.env.SECRET,
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL
};
