import { use } from "react";
import { DataTypes } from "sequelize";

const userEvents = (sequelize) => {
  return sequelize.define(
    "UserEvents",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "User",
          key: "id",
        },
      },
      eventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Event",
          key: "id",
        },
      },
    },
    {
      tableName: "user_events",
      timestamps: false,
    }
  );
};
