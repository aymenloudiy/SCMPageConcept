import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import User from "./models/test";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "127.0.0.1",
    dialect: "postgres",
    logging: true,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Tables synchronized successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  } finally {
    await sequelize.close();
  }
};
syncDatabase();
export default { sequelize, connectDB };
