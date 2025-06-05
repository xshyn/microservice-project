const express = require("express");
const { orderRouter } = require("./routes/order");
require("dotenv").config();

const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(orderRouter);

app.use((req, res, next) => {
  return res.json({ error: "Not Found" });
});
app.use((err, req, res, next) => {
  return res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`order service is running on port ${PORT}`);
});
