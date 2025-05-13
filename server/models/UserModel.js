import { DataTypes } from "sequelize";

const User = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
};

export default User;