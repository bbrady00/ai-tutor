import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
