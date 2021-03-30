const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  catID: String,
  img: String,
  desc: String,
  price: Number,
  material: Array,
});

module.exports = mongoose.model("products", productSchema);
