const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageUrl: String,
    extractedText: String,
    amount: Number,
    category: String,
    store: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receipt", ReceiptSchema);
