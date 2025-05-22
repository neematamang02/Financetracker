import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Category from "../Models/Category.js";

const categoryRouter = express.Router();

async function seedDefaults() {
  const defaults = [
    { name: "Food", icon: "🍔" },
    { name: "Transport", icon: "🚗" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Utilities", icon: "💡" },
    { name: "Health", icon: "💊" },
    { name: "Entertainment", icon: "🎬" },
  ];
  for (const cat of defaults) {
    await Category.updateOne(
      { name: cat.name, isDefault: true },
      { $set: { ...cat, isDefault: true } },
      { upsert: true }
    );
  }
}
seedDefaults().catch(console.error);

// GET categories: defaults + user

categoryRouter.get("/", authMiddleware, async (req, res) => {
  const cats = await Category.find({
    $or: [{ isDefault: true }, { user_id: req.user.id }],
  }).sort({ isDefault: -1, name: 1 });
  res.json(cats);
});

// POST user category
categoryRouter.post("/", authMiddleware, async (req, res) => {
  const { name, icon } = req.body;
  const exists = await Category.findOne({
    name: name.trim(),
    user_id: req.user.id,
  });
  if (exists) return res.status(400).json({ message: "Category exists" });
  const cat = new Category({
    user_id: req.user.id,
    name: name.trim(),
    icon,
    isDefault: false,
  });
  const saved = await cat.save();
  res.status(201).json(saved);
});

// DELETE user category
categoryRouter.delete("/:id", authMiddleware, async (req, res) => {
  const cat = await Category.findById(req.params.id);
  if (!cat) return res.status(404).json({ message: "Not found" });
  if (cat.isDefault || cat.user_id.toString() !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  await cat.remove();
  res.json({ message: "Deleted" });
});

export default categoryRouter;
