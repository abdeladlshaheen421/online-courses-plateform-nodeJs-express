"use strict";
const { Model } = require("sequelize");
interface courseCategoryInterface {
  id: Number;
  courseId: Number;
  categoryId: Number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class courseCategory
    extends Model<courseCategoryInterface>
    implements courseCategoryInterface
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: Number;
    courseId!: Number;
    categoryId!: Number;
    static associate(models: any) {
      // define association here
    }
  }
  courseCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
        },
        onDelete: "cascade",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
        },
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "courseCategory",
      timestamps: false,
    }
  );
  return courseCategory;
};
