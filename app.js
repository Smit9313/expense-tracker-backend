const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const { requireSignIn } = require('./middleware/authMiddleware');
const { PORT, MONGO_URL } = require('./helper/config');
// routes
const userRoutes = require("./routes/user");
const verify = require("./routes/email")
const expenseCategoryRoutes = require("./routes/expenseCategory");
const incomeCategoryRoutes = require("./routes/incomeCategory");
const expenses = require("./routes/expenses")
const incomes = require("./routes/incomes")
const totalUserData = require('./routes/totalUserData');
const notification = require('./routes/notifications');
const imageUploadRoute = require('./routes/imageUpload')

//googleauth
const passport = require('passport')
const cookieSession = require('cookie-session')
const passportStrategy = require('./middleware/passport')
const passportRoutes = require('./routes/passportRoutes')

const app = express();
const upload = multer();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Database connected...");
}

app.use("/user", userRoutes)
app.use('/verify', verify)
app.use("/expenseCategory", requireSignIn, expenseCategoryRoutes)
app.use("/incomeCategory", requireSignIn, incomeCategoryRoutes)
app.use("/expense", requireSignIn, expenses)
app.use("/income", requireSignIn, incomes)
app.use('/total', requireSignIn, totalUserData)
app.use('/notification', requireSignIn, notification)
app.use('/image-upload', upload.single('image'), imageUploadRoute)

app.use(
  cookieSession({
    name: "session",
    keys: ["somesessionkey"],
    maxAge: 24 * 60 * 60 * 100,
  })
)
app.use(passport.initialize())
app.use(passport.session())

//only for passport verification or else it will be frontend url
app.use('/auth', passportRoutes)

app.use(function (err, req, res, next) {
  const status = err.statusCode || 400
  const message = err.message
  const data = err.data
  res.status(status).json({
    message,
    data
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
