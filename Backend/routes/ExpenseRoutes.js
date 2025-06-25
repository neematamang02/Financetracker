import express from "express";
import Expense from "../Models/Expense.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { parseAndCategorizeText } from "../utils/parseTransactions.js";

const router = express.Router();

// GET /api/expenses/user/:user_id
router.get("/user/:user_id", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user_id: req.params.user_id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching expenses" });
  }
});

// GET /api/expenses/filter
router.get("/filter", authMiddleware, async (req, res) => {
  try {
    const {
      user_id,
      startDate,
      endDate,
      category,
      store,
      minAmount,
      maxAmount,
    } = req.query;
    if (!user_id || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing filter parameters" });
    }
    const query = { user_id };
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    if (category) query.category = category;
    if (store) query.store = store;
    if (minAmount != null && maxAmount != null) {
      query.amount = {
        $gte: Number.parseFloat(minAmount),
        $lte: Number.parseFloat(maxAmount),
      };
    }
    const results = await Expense.find(query).sort({ date: -1 });
    return res.json(results);
  } catch (err) {
    console.error("Filter failed:", err);
    return res
      .status(500)
      .json({ message: "Error fetching filtered expenses" });
  }
});

// POST /api/expenses
router.post("/", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { type, category, store, amount, date } = req.body;
    const obj = {
      user_id,
      type,
      store,
      amount,
      date: date ? new Date(date) : Date.now(),
      ...(type === "expense" && { category }),
    };
    const expense = new Expense(obj);
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Add failed:", err);
    res.status(500).json({ message: err.message });
  }
});

// Enhanced POST /api/expenses/parse with AI integration
router.post("/parse", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { text } = req.body;
    if (!text?.trim())
      return res.status(400).json({ message: "No text provided" });

    // Use enhanced AI parsing
    const parseResult = await parseAndCategorizeText(text);
    const docs = parseResult.records.map((tx) => ({ ...tx, user_id }));

    if (docs.length === 0) {
      return res.status(400).json({
        message:
          "No valid transactions found in the text. Please check your input format.",
      });
    }

    const saved = await Expense.insertMany(docs);
    res.status(201).json({
      transactions: saved,
      correctedText: parseResult.correctedText,
      count: saved.length,
    });
  } catch (err) {
    console.error("Enhanced parse failed:", err);
    res.status(500).json({ message: "Failed to parse transactions" });
  }
});

// POST /api/expenses/bulk
router.post("/bulk", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { transactions } = req.body;
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return res.status(400).json({
        message: "Request must include a non-empty transactions array.",
      });
    }
    const docsToInsert = transactions.map((tx, idx) => {
      const { type, amount, category, store, date } = tx;
      if (!type || !["expense", "income"].includes(type)) {
        throw new Error(`Invalid or missing type at index ${idx}.`);
      }
      if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error(`Invalid amount at index ${idx}. Must be a number.`);
      }
      if (!store || typeof store !== "string") {
        throw new Error(
          `Missing or invalid store/description at index ${idx}.`
        );
      }
      if (!date) throw new Error(`Missing date at index ${idx}.`);
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime()))
        throw new Error(`Invalid date format at index ${idx}.`);
      if (type === "expense" && (!category || typeof category !== "string")) {
        throw new Error(
          `Missing or invalid category for expense at index ${idx}.`
        );
      }
      return {
        user_id,
        type,
        amount,
        store,
        date: parsedDate,
        ...(type === "expense" && { category }),
      };
    });
    const inserted = await Expense.insertMany(docsToInsert);
    return res.status(201).json(inserted);
  } catch (err) {
    console.error("Bulk insert failed:", err);
    if (err.message && err.message.startsWith("Invalid")) {
      return res.status(400).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: "Failed to insert bulk transactions." });
  }
});

// DELETE /api/expenses/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
});

export default router;
