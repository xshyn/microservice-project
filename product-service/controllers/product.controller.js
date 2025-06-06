const { consume } = require("../rabbitmq/consumer");
const { publishToQueue } = require("../rabbitmq/publisher");
const {
  buyProductService,
  createProductService,
} = require("../services/product.service");

async function createProduct(req, res, next) {
  try {
    const { name, desc, price } = req.body;
    const product = await createProductService(name, desc, price);
    return res.json({ message: "created", product });
  } catch (error) {
    next(error);
  }
}

async function buyProduct(req, res, next) {
  try {
    const { productIds = [] } = req.body;
    const products = await buyProductService(productIds);
    await publishToQueue("ORDER_BUY", {
      products,
      userEmail: req.user.email,
    });
    const result = await consume("PRODUCT");
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { createProduct, buyProduct };
