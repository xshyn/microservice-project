// src/rabbitmq/channel.js
const amqp = require("amqplib");

let channel = null;

async function connect() {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
  return channel;
}

async function getChannel() {
  return channel || (await connect());
}

module.exports = { connect, getChannel };
