import { Application } from "express";
import {
  index,
  show,
  update,
  destroy,
  create,
  courseType,
  courseCategories,
  addCategory,
  removeCategory,
} from "../controllers/course.controller";
import { matchedData } from "express-validator";
import {
  isValidCourseId,
  validateData,
  validateCourseCategory,
} from "../middlewares/course.middlware";
import {
  validateMiddleware,
  isAuthenticatedAdmin,
} from "../middlewares/general.middleware";
import { Request, Response, NextFunction } from "express";

const indexHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const courses: courseType[] = await index();
    res.status(200).json({ courses });
  } catch (err) {
    next(err);
  }
};

const showHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });
  try {
    const courseId = Number(req.params.courseId);
    const course = await show(courseId);
    res.status(200).json({ course });
  } catch (err) {
    next(err);
  }
};
const createHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });
  try {
    const newCourse: courseType = <courseType>matchedData(req);
    await create(newCourse);
    res.status(201).json({ success: "new Course created Successfully" });
  } catch (err) {
    next(err);
  }
};
const updateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });
  try {
    const courseId = Number(req.params.courseId);
    const updatedCourse: courseType = <courseType>matchedData(req);
    await update(courseId, updatedCourse);
    res.status(200).json({ success: "course is updated Successfully" });
  } catch (err) {
    next(err);
  }
};
const destroyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });
  try {
    const courseId = Number(req.params.courseId);
    await destroy(courseId);
    res.status(200).json({ sucess: "course is deleted successfully" });
  } catch (err) {
    next(err);
  }
};
const getCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });

  try {
    const courseId = Number(req.params.courseId);
    const categories = await courseCategories(courseId);
    res.status(200).json({ categories });
  } catch (err) {
    next(err as string);
  }
};
const addCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });

  try {
    const data = matchedData(req);
    const result = await addCategory(data.courseId, data.categoryId);
    if (result) {
      res
        .status(200)
        .json({ succes: "category is added successfully to course" });
    } else {
      res.status(422).json({ fail: "can't add same category twice to course" });
    }
  } catch (err) {
    next(err);
  }
};
const removeCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });

  try {
    const data = matchedData(req);
    const result = await removeCategory(data.courseId, data.categoryId);
    if (result) {
      res
        .status(200)
        .json({ succes: "category is deleted Successfully from course" });
    } else {
      res.status(422).json({ fail: "category is not defined in this course" });
    }
  } catch (err) {
    next(err);
  }
};
export const courseRouter = (app: Application): void => {
  app
    .route("/courses")
    .get(indexHandler)
    .post(isAuthenticatedAdmin, validateData, createHandler);

  app
    .route("/courses/:courseId")
    .all(isValidCourseId)
    .get(showHandler)
    .put(isAuthenticatedAdmin, validateData, updateHandler)
    .delete(isAuthenticatedAdmin, destroyHandler);

  app
    .route("/course/categories/:courseId")
    .get(isValidCourseId, getCategoriesHandler);

  app
    .route("/course/category")
    .post(isAuthenticatedAdmin, validateCourseCategory, addCategoryHandler)
    .delete(isAuthenticatedAdmin, validateCourseCategory, removeCategoryHandler);

};
