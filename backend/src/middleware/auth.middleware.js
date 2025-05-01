import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectedRoute middleware", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
