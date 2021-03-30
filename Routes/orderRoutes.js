require("../data/database");

const express = require("express");
const orderModel = require("../Models/order");
const router = express.Router();

router.get("/", (req, res) => {
  orderModel.find({}, (err, orders) => {
    err ? res.status(500).send("Error: " + err) : res.status(200).send(orders);
  });
});

router.post("/", (req, res) => {
  const order = new orderModel({ ...req.body });
  order.save().then(() => {
    res.send("Successfully processed order!");
  });
});

module.exports = router;
