const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    monthlyIncome: { type: Number, default: 0 },
    total_expense: { type: Number, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
