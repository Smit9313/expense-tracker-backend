const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const expenseCategoryRoutes = require("./routes/expenseCategory");
const incomeCategoryRoutes = require("./routes/incomeCategory");
const cors = require('cors');
const { requireSignIn } = require('./middleware/authMiddleware');
const app = express();

app.use(cors());
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://SmitDudhat:u0JrW6Xpi0dqIoYr@cluster0.60mptun.mongodb.net/expense_tracker");
  console.log("Database connected...");
}

app.use("/user", userRoutes);
app.use("/expense", requireSignIn, expenseCategoryRoutes)
app.use("/income", requireSignIn, incomeCategoryRoutes)

// error handler
app.use(function (err, req, res, next) {
  const status = err.statusCode || 400
  const message = err.message
  const data = err.data
  res.status(status).json({
    message,
    data
  })
})

app.listen(8080, () => {
	console.log("Server is running on port 8080.");
});