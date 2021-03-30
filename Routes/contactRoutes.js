const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.MAIL_USER}`,
    pass: `${process.env.MAIL_PASS}`,
  },
});

router.post("/", (req, res) => {
  const { to } = req.body;
  const mailOptions = {
    to: to,
    subject: "Thank you for reaching out!",
    text: "We really appreciate your email, thank you for contacting us!",
    from: "ogamitctaffi@gmail.com",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = router;
