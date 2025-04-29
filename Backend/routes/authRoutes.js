import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import User from "../Models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

// Helpers for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage configuration to preserve extensions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}`;
    cb(null, name + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith("image/")
      ? cb(null, true)
      : cb(new Error("Only images allowed"), false),
});
// Register
router.post("/register", async (req, res) => {
  const { name, email, password, cpassword, monthlyIncome } = req.body;
  if (password !== cpassword)
    return res.status(400).json({ message: "Passwords do not match" });
  try {
    const hashed = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashed, monthlyIncome }).save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to register user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// Get current user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const u = await User.findById(req.user.id).select(
      "name email monthlyIncome profileImage"
    );
    if (!u) return res.status(404).json({ message: "User not found" });
    res.json(u);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update profile (name, email, password)
router.put("/update", authMiddleware, async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (name) user.name = name;
    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ message: "Email already in use" });
      user.email = email;
    }
    if (currentPassword && newPassword) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match)
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      user.password = await bcrypt.hash(newPassword, 10);
    }
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// Upload profile image
router.post(
  "/upload-image",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const relativePath = `/uploads/${req.file.filename}`;
      const user = await User.findById(req.user.id);
      user.profileImage = relativePath;
      await user.save();
      res.json({ message: "Image uploaded", profileImage: relativePath });
    } catch (err) {
      res.status(500).json({ message: "Failed to upload image" });
    }
  }
);

export default router;
