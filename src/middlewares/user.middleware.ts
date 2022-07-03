import { body } from "express-validator";
import db from "../models";
import { userType, Role } from "../controllers/user.controller";
import dotenv from "dotenv";
dotenv.config();
const isEmail = async (email: string) => {
  const user = await db.user.findOne({ where: { email } });
  return user ? Promise.reject() : Promise.resolve();
};
const isUser = async (email: string) => {
  const user = await db.user.findOne({ where: { email } });
  return user ? Promise.resolve() : Promise.reject();
};
const isBlocked = async (email: string) => {
  const user: userType = await db.user.findOne({ where: { email } });
  return user.bannedAt ? Promise.reject() : Promise.resolve();
};

export const isDefinedUser = [
  body("email")
    .isEmail()
    .withMessage("please enter a valid email")
    .bail()
    .custom(isUser)
    .withMessage("This credential Not Found")
    .bail()
    .custom(isBlocked)
    .withMessage("Sorry, This user is Blocked"),
  body("password")
    .isStrongPassword()
    .withMessage("please enter a valid password"),
];

const checkIsUser = async (id: Number) => {
  const user: userType = await db.user.findByPk(id);
  return user.role == Role.user ? Promise.resolve() : Promise.reject();
};
export const isUserId = [
  body("userId")
    .isInt({ min: 1 })
    .withMessage("please enter valid id")
    .bail()
    .custom(checkIsUser)
    .withMessage("please enter a valid user"),
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
