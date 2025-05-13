import { DataTypes } from "sequelize";

const Tag = (sequelize) => {
  return sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "tags",
      timestamps: false,
    }
  );
};
export default Tag;