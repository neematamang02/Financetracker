const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();

const router = express.Router();
router.post("/register", async (req, res) => {
  const { name, email, password, monthlyIncome } = res.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      monthlyIncome,
    });
    await newUser.save();
    res.status(201).json({ meesage: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
});
// Login User

router.post("/login", async (req, res) => {
  const { email, password } = res.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentails" });
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
module.exports = router;
