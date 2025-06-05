const express = require("express");
const { authRouter } = require("./routes/auth");
require("dotenv").config();

const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

app.use((req, res, next) => {
  return res.json({ error: "Not Found" });
});
app.use((err, req, res, next) => {
  return res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`auth service is running on port ${PORT}`);
});
