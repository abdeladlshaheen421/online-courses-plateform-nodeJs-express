import { Application, Request, Response, NextFunction } from "express";
import { register, userType } from "../controllers/user.controller";
import { validateRegister } from "../middlewares/user.middleware";
import { matchedData } from "express-validator";
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

const loginHandler = (req: Request, res: Response, next: NextFunction) => {};

export const userRouter = (app: Application) => {
  app.route("/user/register").post(validateRegister, registerHandler);
  app.route("/user/login").post(loginHandler);
};
