const { publishToQueue } = require("../rabbitmq/publisher");
const OrderModel = require("../model/order.model");

async function buyProduct(data) {
  const { products, userEmail } = data;
  const order = new OrderModel({
    products,
    userEmail,
    totalPrice: products.reduce((acc, product) => acc + product.price, 0),
  });
  await order.save();
  await publishToQueue("PRODUCT", { message: "order created", order });
}

module.exports = { buyProduct };
