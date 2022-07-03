import {
  isValidCategoryId,
  validateData,
} from "./../middlewares/category.middleware";
import { Application, Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import {
  show,
  index,
  create,
  categoryType,
  update,
  destroy,
} from "../controllers/category.controller";
import {
  validateMiddleware,
  isAuthenticatedAdmin,
} from "../middlewares/general.middleware";
const indexHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await index();
    res.status(200).json({ categories });
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
    const newCategory: categoryType = <categoryType>matchedData(req);
    await create(newCategory);
    res.status(201).json({ success: "new Category Created Successfully" });
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
    const categoryId = Number(req.params.categoryId);
    const category = <categoryType>await show(categoryId);
    res.status(200).json({ category });
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
    const categoryId = Number(req.params.categoryId);
    const updatedData: categoryType = <categoryType>matchedData(req);
    await update(categoryId, updatedData);
    res.status(200).json({ success: "Category is updated Successfully" });
  } catch (err) {
    next(err + " ");
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
    const categoryId: Number = Number(req.params.categoryId);
    await destroy(categoryId);
    res.status(200).json({ success: "Category is deleted Successfully" });
  } catch (err) {
    next(err);
  }
};
export const categoryRouter = (app: Application): void => {
  app
    .route("/categories")
    .get(indexHandler)
    .post(isAuthenticatedAdmin, validateData, createHandler);
  app
    .route("/categories/:categoryId")
    .all(isValidCategoryId)
    .get(showHandler)
    .put(isAuthenticatedAdmin, validateData, updateHandler)
    .delete(isAuthenticatedAdmin, destroyHandler);
};
