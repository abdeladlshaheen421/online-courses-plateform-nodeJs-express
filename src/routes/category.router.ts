import { Application } from "express";

export const categoryRouter = (app: Application): void => {
  app.route("/categories").get().post();
  app.route("/categories/:categoryId").get().put().delete();
};
