import mongoose from "mongoose";

const SavingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  target: { type: Number, required: true },
  deadline: { type: Date, required: true },
  savedAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Saving = mongoose.model("Saving", SavingSchema);
export default Saving;
