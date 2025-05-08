// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

// import authRoutes from "./routes/authRoutes.js";
// import expenseRoutes from "./routes/ExpenseRoutes.js";
// import budgetRoutes from "./routes/BudgetRoutes.js";
// import exportRoutes from "./routes/ExportRoutes.js";
// import receiptRoutes from "./routes/ReceiptRoutes.js";
// import aiRoutes from "./routes/AiRoutes.js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // __dirname helper
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection failed", err));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/budget", budgetRoutes);
// app.use("/api/export", exportRoutes);
// app.use("/api/receipt", receiptRoutes);
// app.use("/api/ai", aiRoutes);

// // Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Health check
// app.get("/", (req, res) => res.send("Backend is running..."));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );
// backend/index.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import budgetRoutes from "./routes/BudgetRoutes.js";
import exportRoutes from "./routes/ExportRoutes.js";
import receiptRoutes from "./routes/ReceiptRoutes.js";
import aiRoutes from "./routes/AiRoutes.js";
import router from "./routes/ExpenseRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
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
app.use("/api/budget", budgetRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/receipt", receiptRoutes);
app.use("/api/ai", aiRoutes);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check
app.get("/", (req, res) => res.send("Backend is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
