const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: String,
    desc: String,
    price: Number,
  },
  { versionKey: false }
);

const ProductModel = model("Product", ProductSchema);

module.exports = ProductModel;
