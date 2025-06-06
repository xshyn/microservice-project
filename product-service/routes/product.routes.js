const { Router } = require("express");
const { isAuthenticated } = require("../../isAuthenticated");
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
