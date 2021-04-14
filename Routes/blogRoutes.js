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

router.post("/", (req, res) => {
  const post = new articleModel(req.body);
  post.save().then(() => {
    res.send("Successfuly Added Post");
  });
});

router.put("/:id", (req, res) => {
  articleModel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, result) => {
      err
        ? res.status(500).send("Error: " + err)
        : res.send("Successfuly Updated Post");
    }
  );
});

router.delete("/:id", (req, res) => {
  articleModel.findByIdAndDelete(req.params.id, (err, result) => {
    err
      ? res.status(500).send("Error: " + err)
      : res.send("Successfuly Removed Post");
  });
});
module.exports = router;
