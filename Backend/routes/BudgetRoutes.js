// // routes/budgetRoutes.js
// import express from "express";
// import Budget from "../Models/Budget.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // GET all budgets for a specific user
// router.get("/user/:userId", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     const budgets = await Budget.find({ user_id: req.params.userId }).sort({
//       month: -1,
//     });
//     res.json(budgets);
//   } catch (err) {
//     console.error("Error fetching budgets:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // POST create a new budget
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { category, amount, month } = req.body;
//     const user_id = req.user.id;
//     const budget = new Budget({ user_id, category, amount, month });
//     const saved = await budget.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error("Error creating budget:", err);
//     res.status(400).json({ message: err.message });
//   }
// });

// // PUT update an existing budget
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const update = (({ category, amount, month }) => ({
//       category,
//       amount,
//       month,
//     }))(req.body);
//     const budget = await Budget.findOneAndUpdate(
//       { _id: id, user_id: req.user.id },
//       update,
//       { new: true, runValidators: true }
//     );
//     if (!budget) return res.status(404).json({ message: "Budget not found" });
//     res.json(budget);
//   } catch (err) {
//     console.error("Error updating budget:", err);
//     res.status(400).json({ message: err.message });
//   }
// });

// // DELETE a budget
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Budget.findOneAndDelete({
//       _id: id,
//       user_id: req.user.id,
//     });
//     if (!deleted) return res.status(404).json({ message: "Budget not found" });
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting budget:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
// routes/budgetRoutes.js
import express from "express";
import Budget from "../models/Budget.js";
import authMiddleware from "../middleware/authMiddleware.js";

const budgetRouter = express.Router();

budgetRouter.get("/user/:userId", authMiddleware, async (req, res) => {
  if (req.user.id !== req.params.userId) return res.status(403).end();
  const list = await Budget.find({ user_id: req.params.userId }).sort({
    month: -1,
  });
  res.json(list);
});

budgetRouter.post("/", authMiddleware, async (req, res) => {
  const { category, amount, month } = req.body;
  const bud = new Budget({ user_id: req.user.id, category, amount, month });
  const saved = await bud.save();
  res.status(201).json(saved);
});

budgetRouter.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Budget.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user.id },
    (({ category, amount, month }) => ({ category, amount, month }))(req.body),
    { new: true }
  );
  if (!updated) return res.status(404).end();
  res.json(updated);
});

budgetRouter.delete("/:id", authMiddleware, async (req, res) => {
  const deleted = await Budget.findOneAndDelete({
    _id: req.params.id,
    user_id: req.user.id,
  });
  if (!deleted) return res.status(404).end();
  res.json({ message: "Deleted" });
});

export default budgetRouter;
