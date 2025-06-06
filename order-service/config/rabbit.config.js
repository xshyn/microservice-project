const amqp = require("amqplib");
const OrderModel = require("../model/order.model");

let channel;

async function connectToChannel() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    return channel;
  } catch (error) {
    console.log(error);
  }
}

async function returnChannel() {
  return !channel ? await connectToChannel() : channel;
}

async function createQueue(queueName) {
  const channel = await returnChannel();
  await channel.assertQueue(queueName);
  return channel;
}

async function sendToQueue(queueName, data) {
  try {
    const channel = await createQueue(queueName);
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error);
  }
}
async function startCreateOrderService() {
  const channel = await createQueue("ORDER");
  channel.consume("ORDER", async (data) => {
    const { products, userEmail } = JSON.parse(data.content.toString());
    const order = new OrderModel({
      products,
      userEmail,
      totalPrice: products.reduce((acc, curr) => acc + curr.price, 0),
    });
    await order.save();
    channel.ack(data);
    await sendToQueue("PRODUCT", {
      message: "order created",
      order,
    });
  });
}

module.exports = {
  connectToChannel,
  returnChannel,
  sendToQueue,
  createQueue,
  startCreateOrderService,
};
