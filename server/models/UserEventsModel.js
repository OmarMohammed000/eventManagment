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
      },
    },
    {
      tableName: "user_events",
      underscored: true,
      timestamps: true, // Enable timestamps
      createdAt: true, // Enable createdAt
      updatedAt: false // Disable updatedAt if not needed
    }
  );
};

export default UserEvents;