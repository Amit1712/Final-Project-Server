const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
  author: String,
  src: String,
  title: String,
  content: String,
});

module.exports = mongoose.model("articles", articleSchema);
