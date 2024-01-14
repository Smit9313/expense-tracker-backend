const express = require("express");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/user");
const app = express();

app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://SmitDudhat:u0JrW6Xpi0dqIoYr@cluster0.60mptun.mongodb.net/expense_tracker");
  console.log("Database connected...");
}

app.use("/user", UserRoutes);

app.listen(8080, () => {
	console.log("Server is running on port 8080.");
});