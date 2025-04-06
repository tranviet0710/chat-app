import { generateToken } from "../lib/utils.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const login = (req, res) => {};
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  // Implement signup logic here
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName: fullName,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(400).json({ message: "Invalid user data" });
    } else {
      await newUser.save();
      generateToken(newUser._id, res);

      return res.status(201).json({
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });
    }
  } catch (e) {
    console.log("Error in signup", e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = (req, res) => {};
