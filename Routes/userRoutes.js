require("../data/database");

const express = require("express");
const userModel = require("../Models/user");
const router = express.Router();

router.get("/", (req, res) => {
  userModel.find({}, (err, users) => {
    err ? res.status(500).send("Error: " + err) : res.status(200).send(users);
  });
});

router.post("/add", (req, res) => {
  const user = new userModel({ ...req.body, type: 2 });
  user
    .save()
    .then(() => res.send({ message: "Successfuly added user!", user: user }));
});

router.post("/guest", (req, res) => {
  const user = new userModel({ ...req.body, type: 3 });
  user
    .save()
    .then(() => res.send({ message: "Successfuly added user", user: user }));
});

module.exports = router;
