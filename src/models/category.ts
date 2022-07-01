"use strict";
import { Model } from "sequelize";
interface categoryInterface {
  id: Number;
  name: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class category extends Model<categoryInterface> implements categoryInterface {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: Number;
    name!: string;
    static associate(models: any) {
      // define association here
    }
  }
  category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, unique: true },
    },
    {
      sequelize,
      modelName: "category",
      timestamps: false,
    }
  );
  return category;
};
