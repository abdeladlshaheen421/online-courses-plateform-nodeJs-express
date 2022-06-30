import { Application } from "express";

export const adminRouter = (app: Application): void => {
  app.route("/admin");
};
