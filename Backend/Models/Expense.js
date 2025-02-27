const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    store: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
