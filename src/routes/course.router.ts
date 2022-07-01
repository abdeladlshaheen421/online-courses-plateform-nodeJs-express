import { Application } from "express";

export const courseRouter = (app: Application): void => {
  app.route("/courses").get().post();
  app.route("/courses/:courseId").get().put().delete();
};
