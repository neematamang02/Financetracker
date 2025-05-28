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

    // Must have user_id + dates
    if (!user_id || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing filter parameters" });
    }

    // Build query object
    const query = { user_id };
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
    if (category) query.category = category;
    if (store) query.store = store;
    if (minAmount != null && maxAmount != null) {
      query.amount = {
        $gte: parseFloat(minAmount),
        $lte: parseFloat(maxAmount),
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
    // grab the type too
    const { type, category, store, amount, date } = req.body;

    // build your new object conditionally
    const obj = {
      user_id,
      type, // must match your schema
      store,
      amount,
      date: date ? new Date(date) : Date.now(),
      // only include category when it exists (i.e. expense)
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

router.post("/parse", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { text } = req.body;
    if (!text?.trim())
      return res.status(400).json({ message: "No text provided" });

    const parsed = parseAndCategorizeText(text);
    const docs = parsed.map((tx) => ({ ...tx, user_id }));
    const saved = await Expense.insertMany(docs);
    res.status(201).json(saved);
  } catch (err) {
    console.error("Parse failed:", err);
    res.status(500).json({ message: "Failed to parse transactions" });
  }
});

// DELETE /api/expenses/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id, // make sure users can only delete their own
    });
    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
});

export default router;
