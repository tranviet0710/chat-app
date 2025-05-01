import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
