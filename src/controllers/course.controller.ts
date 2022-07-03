import { categoryType } from "./category.controller";
import db from "../models";
import { Op } from "sequelize";
export type courseType = {
  id?: Number;
  name: string;
  description: string;
  points: Number;
};
export const index = async (): Promise<courseType[]> => {
  try {
    const courses: courseType[] = await db.course.findAll({});
    return courses;
  } catch (err) {
    throw Error(err as string);
  }
};

export const show = async (courseId: Number): Promise<courseType> => {
  try {
    const course: courseType = await db.course.findByPk(courseId);
    return course;
  } catch (err) {
    throw Error(err as string);
  }
};

export const create = async (course: courseType): Promise<void> => {
  try {
    await db.course.create(course);
  } catch (err) {
    throw Error(err as string);
  }
};

export const update = async (
  courseId: Number,
  updatedData: courseType
): Promise<void> => {
  try {
    await db.course.update(updatedData, { where: { id: courseId } });
  } catch (err) {
    throw Error(err as string);
  }
};

export const destroy = async (courseId: Number): Promise<void> => {
  try {
    await db.course.destroy({ where: { id: courseId } });
  } catch (err) {
    throw Error(err as string);
  }
};

type courseCatType = {
  id: Number;
  courseId: Number;
  categoryId: Number;
};

export const courseCategories = async (
  courseId: Number
): Promise<categoryType[]> => {
  try {
    const courseCategories: courseCatType[] = await db.courseCategory.findAll({
      where: { courseId },
    });
    const categoriesIds = courseCategories.map(
      (category) => category.categoryId
    );
    const categories: categoryType[] = await db.category.findAll({
      where: { id: { [Op.in]: categoriesIds } },
    });
    return categories;
  } catch (err) {
    console.log(err);
    throw Error(err as string);
  }
};

export const addCategory = async (
  courseId: Number,
  categoryId: Number
): Promise<boolean> => {
  try {
    const courseCategory: courseCatType = await db.courseCategory.findOne({
      where: {
        courseId,
        categoryId,
      },
    });
    if (courseCategory) return false;
    await db.courseCategory.create({ courseId, categoryId });
    return true;
  } catch (err) {
    console.log(err);
    throw Error(err as string);
  }
};

export const removeCategory = async (
  courseId: Number,
  categoryId: Number
): Promise<boolean> => {
  try {
    const courseCategory: courseCatType = await db.courseCategory.findOne({
      where: {
        courseId,
        categoryId,
      },
    });
    if (!courseCategory) return false;
    await db.courseCategory.destroy({ where: { courseId, categoryId } });
    return true;
  } catch (err) {
    throw Error(err as string);
  }
};
