import { Application } from "express";
import {
  index,
  show,
  update,
  destroy,
  create,
  courseType,
} from "../controllers/course.controller";
import { matchedData } from "express-validator";
import { isValidCourseId, validateData } from "../middlewares/course.middlware";
import { validateMiddleware } from "../middlewares/general.middleware";
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

export const courseRouter = (app: Application): void => {
  app.route("/courses").get(indexHandler).post(validateData, createHandler);
  app
    .route("/courses/:courseId")
    .all(isValidCourseId)
    .get(showHandler)
    .put(validateData, updateHandler)
    .delete(destroyHandler);
};
