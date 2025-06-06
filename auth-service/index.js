const express = require("express");
const { authRouter } = require("./routes/auth.routes");
const {
  notFoundController,
  errorController,
} = require("./controllers/error.controller");
require("./config/mongoose.config");
require("dotenv").config();

const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.use(notFoundController);
app.use(errorController);

app.listen(PORT, () => {
  console.log(`auth service is running on port ${PORT}`);
});
