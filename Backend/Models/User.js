import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    monthlyIncome: { type: Number, default: 0 },
    total_expense: { type: Number, default: 0 },
    profileImage: { type: String, default: "" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
