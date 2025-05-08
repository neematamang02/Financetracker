// // backend/routes/transactionRoutes.js
// import express from "express";
// import Expense from "../Models/Expense.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import { parseAndCategorize } from "../utils/parseTransactions.js";

// const router = express.Router();

// // POST /api/transactions/parse
// // Parses free‑form text, categorizes each “<amount> on <keyword>”,
// // saves them to MongoDB, and returns the saved records.
// router.post("/parse", authMiddleware, async (req, res) => {
//   try {
//     const user_id = req.user.id;
//     const { text } = req.body;
//     if (!text) return res.status(400).json({ message: "No text provided" });

//     // 1. Parse & categorize
//     const parsed = parseAndCategorize(text);

//     // 2. Attach user_id and save
//     const docs = parsed.map((tx) => ({ ...tx, user_id }));
//     const saved = await Expense.insertMany(docs);

//     res.status(201).json(saved);
//   } catch (err) {
//     console.error("Error in /transactions/parse:", err);
//     res.status(500).json({ message: "Failed to parse transactions" });
//   }
// });

// export default router;
// backend/routes/expenseRoutes.js
import express from "express";
import Expense from "../Models/Expense.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { parseAndCategorize } from "../utils/parseTransactions.js";

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

// POST /api/expenses/parse
router.post("/parse", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "No text provided" });

    const parsed = parseAndCategorize(text);
    const docs = parsed.map((tx) => ({ ...tx, user_id }));
    const saved = await Expense.insertMany(docs);

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to parse transactions" });
  }
});

export default router;
