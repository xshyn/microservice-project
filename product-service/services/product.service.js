async function createProductService(name, desc, price) {
  const product = new ProductModel({ name, desc, price });
  await product.save();
  return product;
}
async function buyProductService(productIds, userEmail) {
  const products = await ProductModel.find({ _id: { $in: productIds } });
  const result = await createOrder({
    products,
    userEmail,
  });
  return result;
}

module.exports = {
  createProductService,
  buyProductService,
};
