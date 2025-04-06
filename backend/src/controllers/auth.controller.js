import { generateToken } from "../lib/utils.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      generateToken(user._id, res);
      return res.status(200).json({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (e) {
    console.log("Error in login controller", e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
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
    console.log("Error in signup controller", e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    console.log("Error in logout controller", e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (e) {
    console.log("Error in profile controller", e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateProfile = async (req, res) => {};
