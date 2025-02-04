import express from "express";
import { ChatMessage } from "../models/index.js";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    const botReply = aiResponse.choices[0].message.content;
    const newChat = await ChatMessage.create({
      message,
      aiResponse: botReply,
    });

    res
      .status(200)
      .json({ message: newChat.message, aiResponse: newChat.aiResponse });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Something went wrong with AI processing." });
  }
});

export default router;
