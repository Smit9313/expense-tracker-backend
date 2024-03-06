const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const { requireSignIn } = require('./middleware/authMiddleware');
const { PORT, MONGO_URL } = require('./helper/config');
// routes
const userRoutes = require("./routes/user");
const expenseCategoryRoutes = require("./routes/expenseCategory");
const incomeCategoryRoutes = require("./routes/incomeCategory");
const expenses = require("./routes/expenses")
const incomes = require("./routes/incomes")
const totalUserData = require('./routes/totalUserData')

const app = express();
console.log("Swagat nahi karoge hamara !!!!!");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Database connected...");
}

// Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/user", userRoutes);
app.use("/expenseCategory", requireSignIn, expenseCategoryRoutes)
app.use("/incomeCategory", requireSignIn, incomeCategoryRoutes)
app.use("/expense", requireSignIn, expenses)
app.use("/income", requireSignIn, incomes)
app.use('/total', requireSignIn, totalUserData)

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
