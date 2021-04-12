require("../data/database");

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/user");
const router = express.Router();

router.get("/", (req, res) => {
  userModel.find({}, (err, users) => {
    err ? res.status(500).send("Error: " + err) : res.status(200).send(users);
  });
});

//user login
router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password || req.body.password.length < 8) {
    res.status(400).send("MISSING REQUIRED FIELDS!");
    return;
  }
  const user = await userModel
    .findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(500).send("Error: " + err);
        return;
      } else {
        return;
      }
    })
    .exec();
  if (!user) {
    res.status(400).send("LOGIN FAILED");
    return;
  }
  const extraHash = "@qFw$jp^7#6iY&uX3%MPEBP#2E#0";
  const userPass = (extraHash + req.body.password).toLowerCase();
  bcrypt.compare(userPass, user.password, (err, result) => {
    if (result) {
      let payload = { subject: user._id };
      let token = jwt.sign(payload, "secretKey");
      user.password = "";
      res.status(200).send({
        message: "LOGIN SUCCESSFUL",
        token: token,
        user: user,
      });
    } else {
      res.status(400).send("LOGIN FAILED!");
      return;
    }
  });
});

//user registration - regular user - type 2
router.post("/signup", async (req, res) => {
  try {
    if (
      !req.body.FName ||
      !req.body.LName ||
      !req.body.email ||
      !req.body.password ||
      !req.body.address ||
      !req.body.country ||
      !req.body.zipcode ||
      !req.body.terms ||
      !req.body.type ||
      req.body.type != 2 ||
      req.body.password.length < 8
    ) {
      res.status(400).send("MISSING REQUIRED FIELDS!");
      return;
    }
    if (!req.body.email.includes("@")) {
      res.status(400).send("INVALID EMAIL");
      return;
    }
    const user = await userModel
      .findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          res.status(500).send("Error:" + err);
          return;
        }
        if (user) {
          res.status(400).send("USER ALREADY REGISTERED");
          return;
        }
      })
      .exec();
    if (user) {
      return;
    }
    const extraHash = "@qFw$jp^7#6iY&uX3%MPEBP#2E#0";
    const userPass = (extraHash + req.body.password).toLowerCase();
    bcrypt.hash(userPass, 10, (err, hash) => {
      const user = new userModel({ ...req.body, password: hash });
      user.save((err, user) => {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secretKey");
        res
          .status(200)
          .send({ message: "Successfuly added user!", token: token });
      });
    });
  } catch (err) {
    console.log("Error: " + err);
  }
});

//user registration - guest - type 3
router.post("/guest", async (req, res) => {
  try {
    if (
      !req.body.FName ||
      !req.body.LName ||
      !req.body.email ||
      !req.body.address ||
      !req.body.country ||
      !req.body.zipcode ||
      !req.body.terms ||
      !req.body.type ||
      req.body.password ||
      req.body.type != 3
    ) {
      res.status(400).send("MISSING REQUIRED FIELDS!");
      return;
    }
    if (!req.body.email.includes("@")) {
      res.status(400).send("INVALID EMAIL");
      return;
    }
    const user = await userModel
      .findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          res.status(500).send("Error:" + err);
          return;
        }
        if (user) {
          res.status(400).send("USER ALREADY REGISTERED");
          return;
        }
      })
      .exec();
    if (user) {
      return;
    }
    const newUser = new userModel({ ...req.body });
    newUser.save((err, user) => {
      user.password = "";
      res.status(200).send({
        message: "Successfuly added user!",
        user: user,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const userData = { ...req.body };
    //save password does not work
    {
      /*
  if (userData.password) {
    if (userData.password.length < 8) {
      res.status(400).send("MISSING REQUIRED FIELDS");
      return;
    }
    const extraHash = "@qFw$jp^7#6iY&uX3%MPEBP#2E#0";
    const userPass = (extraHash + userData.password).toLowerCase();
    bcrypt.hash(userPass, 10, (err, hash) => {
      userData.password = hash;
    });
  }
  */
    }
    const user = await userModel
      .findByIdAndUpdate(userData._id, { $set: userData }, (err, result) => {
        if (err) {
          res.status(400).send("Error: " + err);
        }
      })
      .exec();
    if (user) {
      let payload = { subject: user._id };
      let token = jwt.sign(payload, "secretKey");
      user.password = "";
      res.status(200).send({ user: user, token: token });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
