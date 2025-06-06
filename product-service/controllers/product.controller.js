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
    const result = await buyProductService(productIds, req.user.email);
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { createProduct, buyProduct };
