import express from "express";
import Goal from "../Models/Savinggoal.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Saving from "../Models/Savinggoal.js";

const router = express.Router();

// GET /api/goals
router.get("/", authMiddleware, async (req, res) => {
  const goals = await Goal.find({ user_id: req.user.id }).sort("deadline");
  res.json(goals);
});

// POST /api/goals
router.post("/", authMiddleware, async (req, res) => {
  const { name, target, deadline } = req.body;
  const goal = new Goal({ user_id: req.user.id, name, target, deadline });
  await goal.save();
  res.status(201).json(goal);
});

// PUT /api/goals/:id/save
router.put("/:id/save", authMiddleware, async (req, res) => {
  const { amount } = req.body;
  const goal = await Goal.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!goal) return res.status(404).json({ message: "Goal not found" });

  // Prevent over‑saving
  const newSaved = Math.min(goal.savedAmount + amount, goal.target);
  goal.savedAmount = newSaved;
  await goal.save();
  res.json(goal);
});

// DELETE /api/goals/:id/delete
router.delete("/:id/delete", authMiddleware, async (req, res) => {
  try {
    const deleted = await Goal.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: "Goal not found" });
    res.json({ message: "Deleted successfully", goal: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
});

export default router;
