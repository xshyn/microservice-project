const ProductModel = require("../model/product.model");
const { consume } = require("../rabbitmq/consumer");

async function createProductService(name, desc, price) {
  const product = new ProductModel({ name, desc, price });
  await product.save();
  return product;
}
async function buyProductService(productIds) {
  const products = await ProductModel.find({ _id: { $in: productIds } });
  return products;
}

module.exports = {
  createProductService,
  buyProductService,
};
