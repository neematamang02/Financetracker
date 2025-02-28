const express = require("express");
const Expense = require("../Models/Expense");
const User = require("../Models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/spending-suggestions", authMiddleware, async (req, res) => {
  const { user_id } = req.query;
  try {
    const user = await User.findById(user_id);
    const expenses = await Expense.find(user_id);
    const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const remaining = user.monthlyIncome - totalSpent;
    let suggestion =
      totalSpent > user.monthlyIncome
        ? "You have exceeded your budget! Consider tracking expenses more carefully."
        : "Your spending is within a healthy range.";

    res.json({ suggestion });
  } catch (error) {
    res.status(500).json({ message: "Error analyzing spending" });
  }
});
module.exports = router;
