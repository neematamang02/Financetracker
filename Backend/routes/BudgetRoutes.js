const express = require("express");
const nodemailer = require("nodemailer");
const Expense = require("../Models/Expense");
const User = require("../Models/User");
const authMiddleware = require("../middleware/authMiddleware");
const { from } = require("json2csv/JSON2CSVTransform");
const router = express.Router();
router.get("/budget-warning-email", authMiddleware, async (req, res) => {
  const { user_id } = req.query;
  try {
    const user = await User.findById(user_id);
    const totalExpenses = await Expense.aggregrate([
      { $match: { user_id: user._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const spent = totalExpenses.length > 0 ? totalExpenses[0].total : 0;
    const remaining = user.monthlyIncome - spent;
    if (remaining <= 1000) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Budget Alert",
        text: `Warning: You have less than $${remaining} left in your budget!`,
      };
      await transporter.sendMail(mailOptions);
    }
    res.json({ message: "Email sent if budget is low." });
  } catch (error) {
    res.status(500).json({ message: "Error sending budget email" });
  }
});

module.exports = router;
