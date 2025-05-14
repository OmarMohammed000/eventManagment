import { DataTypes } from "sequelize";

const EventImages = (sequelize) => {
  return sequelize.define(
    "EventImages",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image_location: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "events",
          key: "id"
        },
        onDelete: 'CASCADE'
      }
    },
    {
      tableName: "events_images",
      underscored: true,
      timestamps: false
    }
  );
};
export default EventImages;