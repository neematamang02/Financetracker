import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password, cpassword, monthlyIncome } = req.body;
  if (password !== cpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      monthlyIncome,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" }); // Fixed typo in "credentials"

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
// Google Register / Login Endpoint
router.post("/google/callback", async (req, res) => {
  const { token } = req.body; // Google ID token from client
  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, sub } = payload; // `sub` is a unique identifier for the user
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if not found
      user = await new User({
        name,
        email,
        password: sub, // or generate a random password
        monthlyIncome: 0, // Set a default or request additional info later
      }).save();
    }
    // Generate JWT for the user
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      token: jwtToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Google authentication error:", error);
    res.status(500).json({ message: "Google authentication failed" });
  }
});
//logged in user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email monthlyIncome"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

// Logout user
router.get("/logout", async (req, res) => {
  res.status(200).json({
    message: "Logout endpoint hit. Remove token from client storage.",
  });
});

export default router;
