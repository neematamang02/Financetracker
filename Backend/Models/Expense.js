import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["expense", "income"],
      required: true,
      default: "expense",
    },
    amount: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: function () {
        return this.type === "expense";
      },
    },
    store: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
