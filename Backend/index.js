import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import exportRoutes from "./routes/ExportRoutes.js";
import receiptRoutes from "./routes/ReceiptRoutes.js";
import goalsRouter from "./routes/Goals.js";
import categoryRouter from "./routes/categoryRoutes.js";
import router from "./routes/ExpenseRoutes.js";
import reportRoutes from "./routes/ReportRoutes.js";
import budgetRouter from "./routes/BudgetRoutes.js";

dotenv.config();
const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "https://financetracker-web.onrender.com",
    credentials: true,
  })
);
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed", err));

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/expenses", router);
app.use("/api/categories", categoryRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/reports", reportRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/receipt", receiptRoutes);
app.use("/api/goals", goalsRouter);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check
app.get("/", (req, res) => res.send("Backend is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
