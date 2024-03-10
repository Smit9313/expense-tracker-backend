const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  SECRET: process.env.SECRET,
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_MAIL: process.env.SMTP_MAIL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL
};
