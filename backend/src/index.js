import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  console.log("Press Ctrl + C to stop the server!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(cors());
app.use("/api/auth", authRoutes);
