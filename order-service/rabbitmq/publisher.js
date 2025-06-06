const { getChannel } = require("./channel");

async function publishToQueue(queue, message) {
  const channel = await getChannel();
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}

module.exports = {
  publishToQueue,
};
