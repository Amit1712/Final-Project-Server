require("../data/database");

const express = require("express");
const articleModel = require("../Models/article");
const router = express.Router();

router.get("/", (req, res) => {
  articleModel.find({}, (err, articles) => {
    err
      ? res.status(500).send("Error: " + err)
      : res.status(200).send(articles);
  });
});

router.get("/post/:id", (req, res) => {
  articleModel.findOne({ _id: req.params.id }, (err, article) => {
    err ? res.status(500).send("Error: " + err) : res.status(200).send(article);
  });
});

module.exports = router;
