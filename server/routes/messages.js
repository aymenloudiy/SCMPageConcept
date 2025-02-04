import express from "express";
import { ChatMessage } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const messages = await ChatMessage.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Fetch Messages Error:", error);
    res.status(500).json({ error: "Failed to retrieve messages." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const chatMessage = await ChatMessage.findByPk(req.params.id);

    if (!chatMessage) {
      return res.status(404).json({ error: "Chat message not found." });
    }

    res.status(200).json(chatMessage);
  } catch (error) {
    console.error("Fetch Single Message Error:", error);
    res.status(500).json({ error: "Failed to retrieve message." });
  }
});

export default router;
