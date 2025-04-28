// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import nodemailer from "nodemailer";
// import User from "../Models/User.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// dotenv.config();

// const router = express.Router();

// // Register User
// router.post("/register", async (req, res) => {
//   const { name, email, password, cpassword, monthlyIncome } = req.body;
//   if (password !== cpassword) {
//     return res.status(400).json({ message: "Passwords do not match" });
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       monthlyIncome,
//     });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to register user" });
//   }
// });

// // Login User
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" }); // Fixed typo in "credentials"

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed" });
//   }
// });
// // Google Register / Login Endpoint
// router.post("/google/callback", async (req, res) => {
//   const { token } = req.body; // Google ID token from client
//   try {
//     // Verify the Google ID token
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const { email, name, sub } = payload; // `sub` is a unique identifier for the user
//     let user = await User.findOne({ email });
//     if (!user) {
//       // Create a new user if not found
//       user = await new User({
//         name,
//         email,
//         password: sub, // or generate a random password
//         monthlyIncome: 0, // Set a default or request additional info later
//       }).save();
//     }
//     // Generate JWT for the user
//     const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     res.status(200).json({
//       token: jwtToken,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error("Google authentication error:", error);
//     res.status(500).json({ message: "Google authentication failed" });
//   }
// });
// //logged in user
// router.get("/me", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select(
//       "name email monthlyIncome"
//     );
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "server error" });
//   }
// });

// // Logout user
// router.get("/logout", async (req, res) => {
//   res.status(200).json({
//     message: "Logout endpoint hit. Remove token from client storage.",
//   });
// });

// //forget password
// router.post("/requestpasswordreset", async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: "No account with that email" });

//     // Secret is your JWT_SECRET plus the user’s current hash, so any password-change invalidates old tokens
//     const secret = process.env.JWT_SECRET + user.password;
//     const payload = { id: user._id, email: user.email };
//     const token = jwt.sign(payload, secret, { expiresIn: "1h" });

//     // Build reset link pointing to your frontend ResetPassword page
//     const resetLink = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`;``

//     // Configure Nodemailer
//     // const transporter = nodemailer.createTransport({
//     //   service: "Gmail",
//     //   auth: {
//     //     user: process.env.EMAIL_USER,
//     //     pass: process.env.EMAIL_PASS,
//     //   },
//     // });
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false, // Use STARTTLS
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Your Password Reset Link",
//       html: `
//         <p>You requested a password reset. Click <a href="${resetLink}">here</a> to set a new password.</p>
//         <p>This link expires in 1 hour.</p>
//       `,
//     });

//     return res.json({ message: "Password reset email sent" });
//   } catch (err) {
//     console.error("Error in requestpasswordreset:", err.message, err.stack);
//     return res.status(500).json({ message: "Error sending reset email" });
//   }
// });

// //
// // 2️⃣ Actually reset the password
// //
// router.post("/resetpassword/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   const { password, cpassword } = req.body;
//   if (password !== cpassword)
//     return res.status(400).json({ message: "Passwords do not match" });

//   try {
//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: "Invalid link or user" });

//     const secret = process.env.JWT_SECRET + user.password;
//     // Verify the token is still valid
//     jwt.verify(token, secret);

//     // Hash & store the new password
//     const hashed = await bcrypt.hash(password, 10);
//     user.password = hashed;
//     await user.save();

//     return res.json({ message: "Password has been reset" });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ message: "Invalid or expired token" });
//   }
// });

// export default router;
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../Models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

dotenv.config();

const passwordResetTokens = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});
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

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    passwordResetTokens[token] = { userId: user._id, timestamp: Date.now() };

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Link",
      html: `
        <p>Click the following link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send reset email" });
      }
      console.log("Email sent:", info.response);
      res.json({
        message: "Password reset link has been sent to your email",
      });
    });
  } catch (error) {
    console.error("Error during forgot password process:", error);
    res.status(500).json({ message: "Forgot password failed" });
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const tokenData = passwordResetTokens[token];
  if (!tokenData || Date.now() - tokenData.timestamp > 3600000) {
    return res.status(400).json({ message: "Token is invalid or expired" });
  }

  try {
    const user = await User.findById(tokenData.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    delete passwordResetTokens[token];
    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "Password reset failed" });
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
