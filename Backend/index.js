import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/ExpenseRoutes.js";
import budgetRoutes from "./routes/BudgetRoutes.js";
import exportRoutes from "./routes/ExportRoutes.js";
import receiptRoutes from "./routes/ReceiptRoutes.js";
import aiRoutes from "./routes/AiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection failed", err));

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/receipt", receiptRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
