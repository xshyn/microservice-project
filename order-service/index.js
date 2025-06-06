const express = require("express");
const { orderRouter } = require("./routes/order.routes");
require("dotenv").config();
require("./rabbitmq/consumer");

const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/order", orderRouter);

app.use((req, res, next) => {
  return res.status(404).json({ error: "Not Found" });
});
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`order service is running on port ${PORT}`);
});
