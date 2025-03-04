import express from "express";
import Expense from "../Models/Expense.js";
import User from "../Models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/spending-suggestions", authMiddleware, async (req, res) => {
  const { user_id } = req.query;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fix: Corrected query `{ user_id }` should be `{ user_id: user_id }`
    const expenses = await Expense.find({ user_id });

    const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const remaining = user.monthlyIncome - totalSpent;

    let suggestion =
      totalSpent > user.monthlyIncome
        ? "You have exceeded your budget! Consider tracking expenses more carefully."
        : "Your spending is within a healthy range.";

    res.json({ suggestion, totalSpent, remaining });
  } catch (error) {
    console.error("Error analyzing spending:", error);
    res.status(500).json({ message: "Error analyzing spending" });
  }
});

export default router;
