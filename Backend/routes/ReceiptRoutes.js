const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const Receipt = require("../Models/Receipt");
const middleware = require("../middleware/authMiddleware");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
