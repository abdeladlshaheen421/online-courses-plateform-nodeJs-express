import { body } from "express-validator";
import db from "../models";

const isEmail = async (email: string) => {
  const user = await db.user.findOne({ where: { email } });
  return user ? Promise.reject() : Promise.resolve();
};
const isUser = async (email: string) => {
  const user = await db.user.findOne({ where: { email } });
  return user ? Promise.resolve() : Promise.reject();
};

export const isDefinedUser = [
  body("email")
    .isEmail()
    .withMessage("please enter a valid email")
    .bail()
    .custom(isUser)
    .withMessage("This credential Not Found"),
  body("password")
    .isStrongPassword()
    .withMessage("please enter a valid password"),
];

export const validateRegister = [
  body("name")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("please enter a valid user name"),
  body("email")
    .isEmail()
    .withMessage("please enter a valid email address")
    .bail()
    .custom(isEmail)
    .withMessage("this email already exist"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "password should contain special char and at least one number with small and capital letters with at least 8 char"
    ),
];
