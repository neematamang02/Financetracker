import express from "express";
import mongoose from "mongoose";
import Expense from "../Models/Expense.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Budget from "../Models/Budget.js";
const reportRouter = express.Router();

reportRouter.get("/monthly/:yearMonth", authMiddleware, async (req, res) => {
  const ym = req.params.yearMonth; // YYYY-MM
  const [year, month] = ym.split("-").map(Number);
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);
  const userId = mongoose.Types.ObjectId(req.user.id);

  const agg = await Expense.aggregate([
    { $match: { user_id: userId, date: { $gte: start, $lt: end } } },
    { $group: { _id: "$type", total: { $sum: "$amount" } } },
  ]);
  const totals = agg.reduce(
    (acc, cur) => ({ ...acc, [cur._id]: cur.total }),
    {}
  );

  const budgets = await Budget.find({ user_id: req.user.id, month: ym });
  const totalBudget = budgets.reduce((s, b) => s + b.amount, 0);

  const income = totals.income || 0;
  const expense = totals.expense || 0;
  const savings = income - expense;
  const unspent = totalBudget - expense;

  res.json({ income, expense, savings, totalBudget, unspent, budgets });
});

export default reportRouter;
