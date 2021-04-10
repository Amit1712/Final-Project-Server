const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL_ADDR}`,
    pass: `${process.env.EMAIL_PASS}`,
  },
});

router.post("/", (req, res) => {
  const { to } = req.body;
  const mailOptions = {
    to: to,
    subject: "Thank you for reaching out!",
    html: `<h1>Thank you!</h1><h3>We really appreciate your email, thank you for contacting us!</h3>`,
    from: `${process.env.EMAIL_ADDR}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

router.post("/order", (req, res) => {
  const { email } = req.body.user;
  const mailOptions = {
    to: email,
    subject: "Thank you for your order!",
    html: `<h1>Order Received!</h1>
    <h3>Your order has been received and acknowledged!</h3>
    <h3>We will send a receipt and details to your mail shortly!</h3>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

router.post("/register", (req, res) => {
  const { email, FName } = req.body;
  const mailOptions = {
    to: email,
    subject: "Thank you for joining our club!",
    html: `<h1>Welcome ${FName}!</h1>
    <h3>Thank you for signing up and joining our club!</h3>
    <h3>Please confirm your email address for full access, click <a>here</a> to confirm!</h3>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});
module.exports = router;
