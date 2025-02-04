import dotenv from "dotenv";
import { sequelize } from "./models/schema.js";

dotenv.config();

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Tables synchronized successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

export { sequelize, connectDB, syncDatabase };
