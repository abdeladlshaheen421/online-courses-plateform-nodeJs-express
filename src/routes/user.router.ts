import { Application } from "express";
export const userRouter = (app: Application) => {
  app.route("/user");
};
