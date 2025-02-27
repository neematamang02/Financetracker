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
const Receipt = mongoose.model("Receipt", ReceiptSchema);
export default Receipt;
