import { Application, Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import {
  isAuthenticatedAdmin,
  validateMiddleware,
} from "../middlewares/general.middleware";
import { validateRegister } from "../middlewares/user.middleware";
import {
  register,
  userType,
  Role,
} from "../controllers/user.controller";

const createHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });

  try {
    const newUser: userType = <userType>matchedData(req);
    await register(newUser, Role.admin);
    res.status(201).json({ success: "admin is Created Successfully" });
  } catch (err) {
    next(err);
  }
};

export const adminRouter = (app: Application): void => {
  app
    .route("/admin/create")
    .post(isAuthenticatedAdmin, validateRegister, createHandler);
};
