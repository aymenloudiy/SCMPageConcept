import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import chatbotRoute from "./routes/chatbot.js";
import messagesRoute from "./routes/messages.js";

const app = express();
const port = process.env.PORT || 8081;

app.use("/api/chatbot", chatbotRoute);
app.use("/api/messages", messagesRoute);

app.get("/", (req, res) => {
  res.send({ status: "OK", message: "Server is running" });
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced!");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Unable to start server:", error);
  }
})();

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  try {
    await sequelize.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error closing database connection:", error);
    process.exit(1);
  }
});
