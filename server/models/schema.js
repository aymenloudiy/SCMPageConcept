import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

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

const DataEntry = sequelize.define("DataEntry", {
  data: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const ForecastedData = sequelize.define("ForecastedData", {
  dataEntryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: DataEntry, key: "id" },
  },
  forecastedData: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const ChatMessage = sequelize.define("ChatMessage", {
  forecastedDataId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: ForecastedData, key: "id" },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  aiResponse: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

DataEntry.hasMany(ForecastedData, { foreignKey: "dataEntryId" });
ForecastedData.belongsTo(DataEntry, { foreignKey: "dataEntryId" });

ForecastedData.hasMany(ChatMessage, { foreignKey: "forecastedDataId" });
ChatMessage.belongsTo(ForecastedData, { foreignKey: "forecastedDataId" });

export { sequelize, DataEntry, ForecastedData, ChatMessage };
