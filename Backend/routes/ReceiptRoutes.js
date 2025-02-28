const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const Receipt = require("../Models/Receipt");
const middleware = require("../middleware/authMiddleware");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post(
  "/upload-receipt",
  middleware,
  upload.single("receipt"),
  async (req, res) => {
    try {
      const imageBuffer = req.file.buffer;
      const {
        data: { text },
      } = await Tesseract.recognize(imageBuffer, "eng");
      const amountMatch = text.match(/\$?\d+(\.\d{2})?/);
      const amount = amountMatch
        ? parseFloat(amountMatch[0].replace("$", ""))
        : 0;

      const receipt = new Receipt({
        user_id: req.body.user_id,
        extractedText: text,
        amount,
        store: req.body.store || "Unknown",
        category: req.body.category || "Other",
      });
      await receipt.save();
      res.json({ message: "Receipt processed", extractedText: text, amount });
    } catch (error) {
      res.status(500).json({ message: "Error processing receipt" });
    }
  }
);
module.exports = router;
