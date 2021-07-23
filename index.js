require("dotenv").config();
const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const pins = require("./src/pins/pins.router");
const users = require("./src/user/users.router");
const boards = require("./src/boards/boards.router");
const payments = require("./src/payments/payments.router");
const auth = require("./src/auth/auth.router");
const mongoose = require("mongoose");

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(process.env.DB_HOST, options, () => {
  console.log("Mongo ready to accept queries");
});

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by Nuclio");

app.use("/pins", pins);
app.use("/users", users);
app.use("/boards", boards);
app.use("/payments", payments);
app.use("/auth", auth);

const start = async () => {
  try {
    app.listen(5001, () => {
      console.log(`REST API on http://localhost:5001/`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
