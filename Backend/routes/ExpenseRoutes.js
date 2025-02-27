const express = require("express");
const Expense = require("../Models/Expense");
const authMiddleware = require("../middleware/authMiddleware");
const { route } = require("./authRoutes");

const router = express.Router();
router.post("/add", authMiddleware, async (req, res) => {
  const { user_id, amount, category, store, date } = req.body;
  try {
    const expense = new Expense({ user_id, amount, category, store, date });
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense" });
  }
});

router.get("/user/:user_id", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user_id: req.params.user_id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
});
router.get("/filter", authMiddleware, async (req, res) => {
  const { user_id, startDate, endDate, category, store, minAmount, maxAmount } =
    req.query;
  let query = { user_id };
  if (startDate && endDate)
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  if (category) query.category = category;
  if (store) query.store = store;
  if (minAmount && maxAmount)
    query.amount = { $gte: parseFloat(minAmount), $lte: parseFloat(maxAmount) };

  try {
    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching filtered expenses" });
  }
});
module.exports = router;
