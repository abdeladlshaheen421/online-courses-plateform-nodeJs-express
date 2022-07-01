import { body, param } from "express-validator";
import db from "../models";
export const validateData = [
  body("name")
    .isAlpha("en-US", { ignore: [" ", "-", "_"] })
    .withMessage("please enter a valid course name"),
  body("description")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("please enter a valid description"),
  body("points").isInt({ min: 0 }).withMessage("please enter a valid points"),
];


const isCourse = async (courseId: Number) => {
  const course = await db.course.findByPk(courseId);
  return course ? Promise.resolve() : Promise.reject();
};
export const isValidCourseId = param("courseId")
  .custom(isCourse)
  .withMessage("Sorry Can't find This Course");
