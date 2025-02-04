import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import "./models/schema.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synchronized successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

export { sequelize, connectDB, syncDatabase };
