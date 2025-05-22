// import express from "express";
// import { Parser } from "json2csv";
// import PDFDocument from "pdfkit";
// import Expense from "../Models/Expense.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/export/csv", authMiddleware, async (req, res) => {
//   const { user_id } = req.query;

//   try {
//     const expenses = await Expense.find({ user_id });

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", 'attachment; filename="expenses.pdf"');

//     const doc = new PDFDocument();
//     doc.pipe(res);
//     doc.fontSize(16).text("Expense Report", { align: "center" });
//     doc.moveDown();

//     expenses.forEach((exp) => {
//       doc.fontSize(12).text(`Date: ${exp.date}`);
//       doc.text(`Category: ${exp.category}`);
//       doc.text(`Store: ${exp.store}`);
//       doc.text(`Amount: $${exp.amount}`);
//       doc.moveDown();
//     });

//     doc.end();
//   } catch (error) {
//     res.status(500).json({ message: "Error exporting PDF" });
//   }
// });

// export default router;
import express from "express";
import mongoose from "mongoose";
import Expense from "../Models/Expense.js";
import Budget from "../models/Budget.js";
import authMiddleware from "../middleware/authMiddleware.js";

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
