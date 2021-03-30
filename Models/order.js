const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  time: String,
  productIDs: Array,
  address: String,
  userID: String,
  shippingMethod: String,
  totalPrice: Number,
  quantity: Number,
});

module.exports = mongoose.model("orders", orderSchema);
