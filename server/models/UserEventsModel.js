import { DataTypes } from "sequelize";

const UserEvents = (sequelize) => {
  return sequelize.define(
    "UserEvents",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "events",
          key: "id",
        },
        onDelete: 'CASCADE'
      }
    },
    {
      tableName: "user_events",
      timestamps: false // Disable timestamps completely
    }
  );
};

export default UserEvents;