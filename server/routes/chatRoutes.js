import express from "express";
import { chatWithTutor } from "../controllers/chatController";
import {
  generatePractice,
  evaluatePractice,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatWithTutor);
router.get("/practice", generatePractice);
router.post("/practice", evaluatePractice);

export default router;
