// import express from "express";
// import Expense from "../Models/Expense.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import { parseAndCategorizeText } from "../utils/parseTransactions.js";

// const router = express.Router();

// // GET /api/expenses/user/:user_id
// router.get("/user/:user_id", authMiddleware, async (req, res) => {
//   try {
//     const expenses = await Expense.find({ user_id: req.params.user_id }).sort({
//       date: -1,
//     });
//     res.json(expenses);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching expenses" });
//   }
// });

// router.get("/filter", authMiddleware, async (req, res) => {
//   try {
//     const {
//       user_id,
//       startDate,
//       endDate,
//       category,
//       store,
//       minAmount,
//       maxAmount,
//     } = req.query;

//     // Must have user_id + dates
//     if (!user_id || !startDate || !endDate) {
//       return res.status(400).json({ message: "Missing filter parameters" });
//     }

//     // Build query object
//     const query = { user_id };
//     query.date = {
//       $gte: new Date(startDate),
//       $lte: new Date(endDate),
//     };
//     if (category) query.category = category;
//     if (store) query.store = store;
//     if (minAmount != null && maxAmount != null) {
//       query.amount = {
//         $gte: parseFloat(minAmount),
//         $lte: parseFloat(maxAmount),
//       };
//     }

//     const results = await Expense.find(query).sort({ date: -1 });
//     return res.json(results);
//   } catch (err) {
//     console.error("Filter failed:", err);
//     return res
//       .status(500)
//       .json({ message: "Error fetching filtered expenses" });
//   }
// });
// // POST /api/expenses
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const user_id = req.user.id;
//     // grab the type too
//     const { type, category, store, amount, date } = req.body;

//     // build your new object conditionally
//     const obj = {
//       user_id,
//       type, // must match your schema
//       store,
//       amount,
//       date: date ? new Date(date) : Date.now(),
//       // only include category when it exists (i.e. expense)
//       ...(type === "expense" && { category }),
//     };

//     const expense = new Expense(obj);
//     const saved = await expense.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error("Add failed:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post("/parse", authMiddleware, async (req, res) => {
//   try {
//     const user_id = req.user.id;
//     const { text } = req.body;
//     if (!text?.trim())
//       return res.status(400).json({ message: "No text provided" });

//     const parsed = parseAndCategorizeText(text);
//     const docs = parsed.map((tx) => ({ ...tx, user_id }));
//     const saved = await Expense.insertMany(docs);
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error("Parse failed:", err);
//     res.status(500).json({ message: "Failed to parse transactions" });
//   }
// });

// // DELETE /api/expenses/:id
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const deleted = await Expense.findOneAndDelete({
//       _id: req.params.id,
//       user_id: req.user.id, // make sure users can only delete their own
//     });
//     if (!deleted) {
//       return res.status(404).json({ message: "Expense not found" });
//     }
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to delete" });
//   }
// });

// export default router;
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

// POST /api/expenses/parse
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

// ─────────────────────────────────────────────────────────────────────────────
// NEW: POST /api/expenses/bulk
//
// Expects req.body:
// {
//   transactions: [
//     { type, amount, category?, store, date },
//     { … },
//   ]
// }
// Attaches user_id from req.user.id, validates each item, then inserts all.
// ─────────────────────────────────────────────────────────────────────────────
router.post("/bulk", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { transactions } = req.body;

    // 1) Basic validation
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return res.status(400).json({
        message: "Request must include a non‐empty transactions array.",
      });
    }

    // 2) Normalize & validate each item, then map into Expense schema shape
    const docsToInsert = transactions.map((tx, idx) => {
      const { type, amount, category, store, date } = tx;

      // a) Check required fields
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
      if (!date) {
        throw new Error(`Missing date at index ${idx}.`);
      }
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date format at index ${idx}.`);
      }

      // b) If it's an expense, category must be provided
      if (type === "expense" && (!category || typeof category !== "string")) {
        throw new Error(
          `Missing or invalid category for expense at index ${idx}.`
        );
      }

      // Build the object exactly as Expense schema expects
      return {
        user_id,
        type,
        amount,
        store,
        date: parsedDate,
        ...(type === "expense" && { category }),
      };
    });

    // 3) Insert all documents at once
    const inserted = await Expense.insertMany(docsToInsert);

    // 4) Return the inserted documents
    return res.status(201).json(inserted);
  } catch (err) {
    console.error("Bulk insert failed:", err);
    // If validation threw an Error, respond 400
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
      user_id: req.user.id, // ensure users can only delete their own
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
