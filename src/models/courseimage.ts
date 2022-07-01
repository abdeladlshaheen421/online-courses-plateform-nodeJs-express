"use strict";
import { Model } from "sequelize";
interface courseImageInterface {
  id: Number;
  name: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class courseImage
    extends Model<courseImageInterface>
    implements courseImageInterface
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: Number;
    name!: string;
    static associate(models: any) {
      // define association here
      courseImage.belongsTo(models.course, {
        foreignKey: "courseId",
      });
    }
  }
  courseImage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "courseImage",
      timestamps: false,
    }
  );
  return courseImage;
};
