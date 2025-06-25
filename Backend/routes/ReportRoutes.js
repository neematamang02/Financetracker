import express from "express";
import PDFDocument from "pdfkit";
import authMiddleware from "../middleware/authMiddleware.js";
import Expense from "../Models/Expense.js";
import User from "../Models/User.js";

const router = express.Router();

// GET /api/reports/pdf?from=YYYY-MM-DD&to=YYYY-MM-DD&include=income,expense,saving
router.get("/pdf", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { from, to, include = "" } = req.query;
    const inc = include.split(",");

    // Parse dates
    const start = new Date(from);
    const end = new Date(to);
    end.setHours(23, 59, 59);

    // 1) Fetch expenses + incomes
    const entries = await Expense.find({
      user_id: userId,
      date: { $gte: start, $lte: end },
    });

    // 2) Aggregate sums
    const totals = { income: 0, expense: 0 };
    entries.forEach((e) => {
      if (e.type === "income") totals.income += e.amount;
      else if (e.type === "expense") totals.expense += e.amount;
    });
    const savings = totals.income - totals.expense;

    // 3) Build PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="report_${from}_${to}.pdf"`
    );

    const doc = new PDFDocument({ margin: 30 });
    doc.pipe(res);

    // Header
    doc.fontSize(20).text("MoneyMate Report", { align: "center" }).moveDown();

    doc
      .fontSize(12)
      .text(`User: ${req.user.id}`, { align: "left" })
      .text(`Period: ${from} → ${to}`)
      .moveDown();

    // Summary cards
    if (inc.includes("income")) {
      doc
        .fontSize(14)
        .fillColor("green")
        .text(`Total Income: ₹${totals.income.toLocaleString()}`);
    }
    if (inc.includes("expense")) {
      doc
        .fontSize(14)
        .fillColor("red")
        .text(`Total Expense: ₹${totals.expense.toLocaleString()}`);
    }
    if (inc.includes("saving")) {
      doc
        .fontSize(14)
        .fillColor("blue")
        .text(`Net Savings: ₹${savings.toLocaleString()}`);
    }
    doc.fillColor("black").moveDown();

    // Table header
    doc
      .fontSize(12)
      .text("Date", 50)
      .text("Type", 150)
      .text("Category", 250)
      .text("Amount", 350)
      .moveDown(0.5);

    // Table rows
    entries.forEach((e) => {
      if (!inc.includes(e.type)) return;
      doc
        .fontSize(10)
        .text(e.date.toISOString().slice(0, 10), 50)
        .text(e.type, 150)
        .text(e.category || "-", 250)
        .text(`₹${e.amount.toLocaleString()}`, 350);
    });

    doc.end();
  } catch (err) {
    console.error("Report PDF error:", err);
    res.status(500).json({ message: "Failed to generate report" });
  }
});

export default router;
