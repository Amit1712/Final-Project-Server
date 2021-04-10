const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  FName: String,
  LName: String,
  address: String,
  address2: String,
  country: String,
  email: String,
  newsLetter: Boolean,
  password: String,
  terms: Boolean,
  zipcode: String,
  type: String,
});

module.exports = mongoose.model("users", userSchema);
