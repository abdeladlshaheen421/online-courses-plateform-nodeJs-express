import { Application, Request, Response, NextFunction } from "express";
import { login, register, userType } from "../controllers/user.controller";
import {
  validateRegister,
  isDefinedUser,
} from "../middlewares/user.middleware";
import { matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import { validateMiddleware } from "../middlewares/general.middleware";
const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });

  try {
    const newUser: userType = <userType>matchedData(req);
    await register(newUser);
    res.status(201).json({ success: "user is Created Successfully" });
  } catch (err) {
    next(err);
  }
};

const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });
  try {
    const loginData: userType = <userType>matchedData(req);
    const verified: Object = await login(loginData);
    if (verified) res.status(200).json({ verified });
    else res.status(401).json({ password: "please enter a correct password" });
  } catch (err) {
    next(err);
  }
};

export const userRouter = (app: Application) => {
  app.route("/user/register").post(validateRegister, registerHandler);
  app.route("/user/login").post(isDefinedUser, loginHandler);
};
