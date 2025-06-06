const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  products: {
    type: [Schema.Types.ObjectId],
  },
  userEmail: String,
  totalPrice: Number,
});

const OrderModel = model("Order", OrderSchema);

module.exports = OrderModel;
