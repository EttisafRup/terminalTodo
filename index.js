require("dotenv").config();
console.clear();

// => EXPRESS INITIALIZATION
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./controller/user.controller"); // => userRouter
const errorHandler = require("./middlewares/errorHandler"); // => Error Handler

// => MongoDB Connection Establishion
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connection was Successfully established!"))
  .catch((err) => console.log(err));

app.use(userRouter);
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is Running on http://localhost:${process.env.PORT}`);
});

app.use(errorHandler);
