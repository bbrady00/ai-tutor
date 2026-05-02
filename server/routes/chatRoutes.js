import express from "express";
import { chatWithTutor } from "../controllers/chatController";

const router = express.Router();

router.post("/", chatWithTutor);

export default router;
