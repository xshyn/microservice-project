const { getChannel } = require("./channel");

async function consume(queueName, handler = null) {
  const channel = await getChannel();
  await channel.assertQueue(queueName);
  return new Promise((resolve) => {
    channel.consume(queueName, async (msg) => {
      const data = JSON.parse(msg.content.toString());
      channel.ack(msg);
      if (handler) {
        resolve(await handler(data));
      }
      resolve(data);
    });
  });
}

module.exports = { consume };
