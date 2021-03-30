require("../data/database");

const express = require("express");
const categoryModel = require("../Models/category");
const router = express.Router();

router.get("/", (req, res) => {
  categoryModel.find({}, (err, categories) => {
    err
      ? res.status(500).send("Error: " + err)
      : res.status(200).send(categories);
  });
});

router.get("/cat/:id", (req, res) => {
  categoryModel.findOne({ _id: req.params.id }, (err, category) => {
    err
      ? res.status(500).send("Error: " + err)
      : res.status(200).send(category);
  });
});

router.post("/cat/add", (req, res) => {
  const cat = new categoryModel(req.body);
  cat.save().then(() => res.send("Successfuly Added Category"));
});

router.delete("/cat/:id", (req, res) => {
  categoryModel.findByIdAndDelete(req.params.id, (err, result) => {
    err
      ? res.status(500).send("Error: " + err)
      : res.send("Successfuly Removed Category");
  });
});

module.exports = router;
