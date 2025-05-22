// import mongoose from "mongoose";

// const BudgetSchema = new mongoose.Schema(
//   {
//     user_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//       enum: [
//         "Food",
//         "Transport",
//         "Shopping",
//         "Utilities",
//         "Health",
//         "Entertainment",
//         "Others",
//       ],
//     },
//     amount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     month: {
//       type: String,
//       required: true,
//       // Format: YYYY-MM
//       match: /^\d{4}-(0[1-9]|1[0-2])$/,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Budget", BudgetSchema);

import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    month: {
      type: String,
      required: true,
      match: /^\d{4}-(0[1-9]|1[0-2])$/,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Budget", BudgetSchema);
