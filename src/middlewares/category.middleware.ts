import { body, param } from "express-validator";
import { Op } from "sequelize";
import db from "../models";

export const isCategory = async (categoryId: Number) => {
  const category = await db.category.findOne({ where: { id: categoryId } });
  return category ? Promise.resolve() : Promise.reject();
};

export const isName = async (name: string) => {
  const category = await db.category.findOne({ where: { name: { [Op.like]: name } } });
  return category ? Promise.reject() : Promise.resolve();
};

export const validateData = [
  body("name")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("please enter a valid category name")
    .bail()
    .custom(isName)
    .withMessage("category name is already exist"),
];

export const isValidCategoryId = param("categoryId")
  .custom(isCategory)
  .withMessage("Sorry Can't find this category");
