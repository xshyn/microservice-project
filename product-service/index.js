const express = require("express");
const { productRouter } = require("./routes/product");
require("dotenv").config();

const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRouter);

app.use((req, res, next) => {
  return res.status(404).json({ error: "Not Found" });
});
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`product service is running on port ${PORT}`);
});
