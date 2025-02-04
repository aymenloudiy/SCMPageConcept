import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

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

export { DataEntry, ForecastedData, ChatMessage };
