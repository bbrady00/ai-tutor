import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  targetLanguage: { type: String, default: "German" },
  level: { type: String, default: "Beginner" },
  weaknesses: [String],
  commonMistakes: [
    {
      original: String,
      correction: String,
    },
  ],
});

export default mongoose.model("User", userSchema);
