"use strict";
import { Model } from "sequelize";
interface courseInterface {
  id: Number;
  name: string;
  description: string;
  points: Number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class course extends Model<courseInterface> implements courseInterface {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: Number;
    name!: string;
    description!: string;
    points!: Number;
    static associate(models: any) {
      // define association here
      course.hasMany(models.courseImage);
    }
  }
  course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      points: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "course",
      timestamps: false,
    }
  );
  return course;
};
