import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Budget from "../models/Budget.js";

const budgetRouter = express.Router();
// GET all budgets for a user, sorted by month desc
budgetRouter.get("/user/:userId", authMiddleware, async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    const list = await Budget.find({ user_id: req.params.userId }).sort({
      month: -1,
    });
    res.json(list);
  } catch (err) {
    console.error("Error fetching budgets:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE a new budget
budgetRouter.post("/", authMiddleware, async (req, res) => {
  const { category, amount, month } = req.body;
  try {
    const bud = new Budget({
      user_id: req.user.id,
      category,
      amount,
      month,
    });
    const saved = await bud.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving budget:", err);
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an existing budget
budgetRouter.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Budget.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      (({ category, amount, month }) => ({ category, amount, month }))(
        req.body
      ),
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error("Error updating budget:", err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE all budgets for a user
budgetRouter.delete("/user/:userId", authMiddleware, async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    await Budget.deleteMany({ user_id: req.params.userId });
    res.json({ message: "All budgets deleted" });
  } catch (err) {
    console.error("Error bulk-deleting budgets:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a single budget by id
budgetRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Budget.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Error deleting budget:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default budgetRouter;
