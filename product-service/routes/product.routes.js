const { Router } = require("express");
const { isAuthenticated } = require("../../isAuthenticated");
const ProductModel = require("../model/product.model");
const { createOrder } = require("../config/rabbit.config");
const {
  createProduct,
  buyProduct,
} = require("../controllers/product.controller");
require("../config/mongoose.config");

const router = Router();

router.post("/create", createProduct);
router.post("/buy", isAuthenticated, buyProduct);

module.exports = {
  productRouter: router,
};
