"use strict";
import { Model } from "sequelize";
enum Role {
  "admin",
  "user",
}
interface userInterface {
  id: Number;
  name: String;
  email: string;
  password: string;
  bannedAt: Date;
  role: Role;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class user extends Model<userInterface> implements userInterface {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: Number;
    name!: string;
    email!: string;
    password!: string;
    bannedAt!: Date;
    role!: Role;
    static associate(models: any) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      bannedAt: DataTypes.DATE,
      role: { type: DataTypes.ENUM, values: ["admin", "user"] },
    },
    {
      sequelize,
      modelName: "user",
      timestamps: false,
    }
  );
  return user;
};
