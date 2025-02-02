import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import chatbotRoute from "./routes/chatbot.js";
import messagesRoute from "./routes/messages.js";

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use("/api/chatbot", chatbotRoute);
app.use("/api/messages", messagesRoute);

app.get("/", (req, res) => {
  res.send({ status: "OK", message: "Server is running" });
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("Database synced!");
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (error) {
    console.error("Unable to start server:", error);
  }
})();

const gracefulShutdown = async () => {
  console.log("Shutting down server...");
  try {
    await sequelize.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error closing database connection:", error);
    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
