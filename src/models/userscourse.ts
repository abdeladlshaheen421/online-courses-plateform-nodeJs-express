"use strict";
import { Model } from "sequelize";
interface usersCourseInterface {
  id: Number;
  userId: Number;
  courseId: Number;
  progress: Number;
  finishesAt: Date;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class usersCourse
    extends Model<usersCourseInterface>
    implements usersCourseInterface
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: Number;
    userId!: Number;
    courseId!: Number;
    progress!: Number;
    finishesAt!: Date;
    static associate(models: any) {
      // define association here
    }
  }
  usersCourse.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
        onDelete: "cascade",
      },
      progress: { type: DataTypes.INTEGER },
      finishesAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "usersCourse",
      timestamps: false,
    }
  );
  return usersCourse;
};
