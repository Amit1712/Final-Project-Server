const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: String,
  src: String,
  gen: String,
});

module.exports = mongoose.model("categories", categorySchema);
