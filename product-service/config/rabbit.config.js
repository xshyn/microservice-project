const amqp = require("amqplib");

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
async function createOrder(data) {
  try {
    const channel = await createQueue("ORDER");
    await sendToQueue("ORDER", data);
    await createQueue("PRODUCT");
    return new Promise((resolve) => {
      channel.consume("PRODUCT", (data) => {
        const result = JSON.parse(data.content.toString());
        channel.ack(data);
        resolve(result);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connectToChannel,
  returnChannel,
  sendToQueue,
  createQueue,
  createOrder,
};
