const { getChannel } = require("./channel");

async function consume(queueName, handler) {
  const channel = await getChannel();
  await channel.assertQueue(queueName);
  channel.consume(queueName, async (msg) => {
    const data = JSON.parse(msg.content.toString());
    await handler(data);
    channel.ack(msg);
  });
}

module.exports = { consume };
