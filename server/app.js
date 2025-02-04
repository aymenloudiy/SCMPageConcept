import express from "express";
import cors from "cors";
import { sequelize, connectDB } from "./database.js";
import chatbotRoute from "./routes/chatbot.js";
import messagesRoute from "./routes/messages.js";

connectDB();

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use("/api/chatbot", chatbotRoute);
app.use("/api/messages", messagesRoute);

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

let server;
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("Database connected & synced!");
    server = app.listen(port, () =>
      console.log(`Server running on port ${port}`)
    );
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
})();

const gracefulShutdown = async () => {
  console.log("Shutting down server...");
  try {
    if (server) {
      server.close(() => console.log("Express server closed."));
    }
    await sequelize.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error closing server/database:", error);
    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
