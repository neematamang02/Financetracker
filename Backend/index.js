require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("Mongo db connection Failed", err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/ExpenseRoutes"));
app.use("/api/budget", require("./routes/BudgetRoutes"));
app.use("/api/export", require("./routes/ExportRoutes"));
app.use("/api/receipt", require("./routes/ReceiptRoutes"));
app.use("/api/ai", require("./routes/AiRoutes"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
