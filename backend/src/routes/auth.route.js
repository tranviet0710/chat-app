import express from "express";
import {
  login,
  logout,
  profile,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/profile", protectedRoute, profile);
router.post("/update-profile", protectedRoute, updateProfile);
export default router;
