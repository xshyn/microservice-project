const { Router } = require("express");
const { startCreateOrderService } = require("../config/rabbit.config");
require("../config/mongoose.config");
startCreateOrderService();

const router = Router();

module.exports = {
  orderRouter: router,
};
