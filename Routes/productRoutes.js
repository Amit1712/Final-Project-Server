require("../data/database");

const express = require("express");
const productModel = require("../Models/product");
const router = express.Router();

router.get("/", (req, res) => {
  productModel.find({}, (err, products) => {
    err
      ? res.status(500).send("Error: " + err)
      : res.status(200).send(products);
  });
});

router.get("/:id", (req, res) => {
  productModel.findOne({ _id: req.params.id }, (err, product) => {
    err ? res.status(500).send("Error: " + err) : res.status(200).send(product);
  });
});

router.get("/cid/:catId", (req, res) => {
  productModel.find({ catID: req.params.catId }, (err, products) => {
    err
      ? res.status(500).send("Error: " + err)
      : res.status(200).send(products);
  });
});

router.get("/:cid/:mat", (req, res) => {
  productModel.find(
    { material: req.params.mat, catID: req.params.cid },
    (err, products) => {
      err
        ? res.status(500).send("Error: " + err)
        : res.status(200).send(products);
    }
  );
});

router.post("/add", (req, res) => {
  const product = new productModel(req.body);
  product.save().then(() => {
    res.send("Successfuly Added Product");
  });
});

router.delete("/:id", (req, res) => {
  productModel.findByIdAndDelete(req.params.id, (err, result) => {
    err
      ? res.status(500).send("Error: " + err)
      : res.send("Successfuly Removed Product");
  });
});

router.put("/:id", (req, res) => {
  productModel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, result) => {
      err
        ? res.status(500).send("Error: " + err)
        : res.send("Successfuly Updated Product");
    }
  );
});
module.exports = router;
