import { DataTypes } from "sequelize";

const userEvents = (sequelize) => {
  return sequelize.define(
    "UserEvents",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "User",
          key: "id",
        },
      },
      event_id: {
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
export default userEvents;