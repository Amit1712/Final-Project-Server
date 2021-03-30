require("../data/database");

const express = require("express");
const productModel = require("../Models/product");
const router = express.Router();

router.get("/:keyword", (req, res) => {
  productModel.find(
    { desc: { $regex: req.params.keyword, $options: "i" } },
    (err, products) => {
      err
        ? res.status(500).send("Error: " + err)
        : res.status(200).send(products);
    }
  );
});

module.exports = router;
