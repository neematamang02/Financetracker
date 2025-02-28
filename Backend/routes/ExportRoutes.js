const express = require("express");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");
const Expense = require("../Models/Expense");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/export/csv", authMiddleware, async (req, res) => {
  const { user_id } = req.query;
  try {
    const expenses = await Expense.find({ user_id });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="expenses.pdf"');
    doc.pipe(res);
    doc.fontSize(16).text("Expense Report", { align: "center" });
    doc.moveDown();
    expenses.forEach((exp) => {
      doc.fontSize(12).text(`Date: ${exp.date}`);
      doc.text(`Category: ${exp.category}`);
      doc.text(`Store: ${exp.store}`);
      doc.text(`Amount: $${exp.amount}`);
      doc.moveDown();
    });
    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error exporting PDF" });
  }
});

module.exports = router;
