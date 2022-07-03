import { body, param } from "express-validator";
import db from "../models";

// create and update validation middleware
export const validateData = [
  body("name")
    .isAlpha("en-US", { ignore: [" ", "-", "_"] })
    .withMessage("please enter a valid course name"),
  body("description")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("please enter a valid description"),
  body("points").isInt({ min: 0 }).withMessage("please enter a valid points"),
];

// function to check if course exist or notFound
const isCourse = async (courseId: Number) => {
  const course = await db.course.findByPk(courseId);
  return course ? Promise.resolve() : Promise.reject();
};

// function to check if category exist or notFound
const isCategory = async (categoryId: Number) => {
  const category = await db.category.findByPk(categoryId);
  return category ? Promise.resolve() : Promise.reject();
};

// validate is that the course exist or not
export const isValidCourseId = param("courseId")
  .custom(isCourse)
  .withMessage("Sorry Can't find This Course");

// validate add or remove category to course middleware
export const validateCourseCategory = [
  body("courseId")
    .isInt({ min: 1 })
    .withMessage("please enter a valid course id")
    .bail()
    .custom(isCourse)
    .withMessage("This course doesn't exist"),
  body("categoryId")
    .isInt({ min: 1 })
    .withMessage("please enter a valid category id")
    .bail()
    .custom(isCategory)
    .withMessage("This Category doesn't exist"),
];
