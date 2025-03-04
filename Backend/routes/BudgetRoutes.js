import express from "express";
import nodemailer from "nodemailer";
import Expense from "../Models/Expense.js";
import User from "../Models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/budget-warning-email", authMiddleware, async (req, res) => {
  const { user_id } = req.query;

  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const totalExpenses = await Expense.aggregate([
      { $match: { user_id: user._id } }, // Fixed typo: `aggregrate` → `aggregate`
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
    console.error(error);
    res.status(500).json({ message: "Error sending budget email" });
  }
});

export default router;
