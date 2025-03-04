import express from "express";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import Expense from "../Models/Expense.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/export/csv", authMiddleware, async (req, res) => {
  const { user_id } = req.query;

  try {
    const expenses = await Expense.find({ user_id });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="expenses.pdf"');

    const doc = new PDFDocument();
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

export default router;
