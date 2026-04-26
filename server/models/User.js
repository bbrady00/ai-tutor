import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  targetLamguage: { type: String, default: "German" },
  level: { type: String, default: "Beginner" },
  vocab: [String],
});

export default mongoose.model("User", userSchema);
