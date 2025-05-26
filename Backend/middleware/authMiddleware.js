import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied: no token" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Access denied: malformed token header" });
  }

  const token = parts[1];
  console.log("Received token in authMiddleware:", token);
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified successfully:", verified);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
