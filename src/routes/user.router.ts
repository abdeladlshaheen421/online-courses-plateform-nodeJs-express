import { Application, Request, Response, NextFunction } from "express";
import {
  login,
  register,
  userType,
  Role,
  index,
  blockUser,
} from "../controllers/user.controller";
import {
  validateRegister,
  isDefinedUser,
  isUserId,
} from "../middlewares/user.middleware";
import { matchedData } from "express-validator";
import {
  isAuthenticatedAdmin,
  validateMiddleware,
  isAuthenticatedUser
} from "../middlewares/general.middleware";

const indexHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await index();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};
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
    await register(newUser, Role.user);
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

const blockUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const validateResult = validateMiddleware(req);
  if (!validateResult.isEmpty())
    return res.status(422).json({ errors: validateResult.array() });
  try {
    const userId: Number = req.body.userId;
    await blockUser(userId);
    res.status(200).json({ sucess: "User is Blocked Successfully" });
  } catch (err) {
    next(err);
  }
};

const registerCourseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const cancelCourseRegistrationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const finishCourseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const getTotalPointsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const userRouter = (app: Application) => {
  app.route("/users").get(isAuthenticatedAdmin, indexHandler);

  app.route("/user/register").post(validateRegister, registerHandler);

  app.route("/user/login").post(isDefinedUser, loginHandler);

  app
    .route("/user/block")
    .post(isAuthenticatedAdmin, isUserId, blockUserHandler);

  app.route("/user/totalpoints").get(isAuthenticatedUser,getTotalPointsHandler);

  app.route("/user/register-course").post(isAuthenticatedUser,registerCourseHandler);

  app.route("/user/cancel-course").delete(isAuthenticatedUser,cancelCourseRegistrationHandler);

  app.route("/user/finish-course").put(isAuthenticatedUser,finishCourseHandler);
};
