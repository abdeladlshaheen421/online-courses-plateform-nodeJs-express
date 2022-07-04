import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const { PASSWORD_PEPPER, SALT_ROUNDS, JWT_SECRET } = process.env;

export enum Role {
  admin = "admin",
  user = "user",
}
export type userType = {
  id?: Number;
  name?: string;
  email: string;
  password: string;
  role?: Role;
  bannedAt?: Date;
};
const encryptPassword = async (password: string): Promise<string> => {
  const hashedPassword: string = await bcrypt.hash(
    password + PASSWORD_PEPPER,
    Number(SALT_ROUNDS)
  );
  return hashedPassword;
};

export const index = async (): Promise<userType[]> => {
  try {
    const users: userType[] = await db.user.findAll({
      where: { role: { [Op.eq]: "user" } },
    });
    return users;
  } catch (err) {
    throw Error(err as string);
  }
};
export const register = async (user: userType, role: Role): Promise<void> => {
  user.password = await encryptPassword(user.password);
  try {
    user.role = role;
    await db.user.create(user);
  } catch (error) {
    throw Error(error as string);
  }
};

export const login = async (loginUser: userType): Promise<Object | boolean> => {
  try {
    const user: userType = await db.user.findOne({
      where: { email: loginUser.email },
    });
    const result: boolean = await bcrypt.compare(
      loginUser.password + PASSWORD_PEPPER,
      user.password
    );
    if (result) {
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      return { token, role: user.role };
    }
    return false;
  } catch (err) {
    throw Error(err as string);
  }
};

export const blockUser = async (id: Number) => {
  try {
    await db.user.update(
      { bannedAt: new Date().toLocaleDateString() },
      { where: { id } }
    );
  } catch (err) {
    throw Error(err as string);
  }
};

export const registerCourse = async (
  userId: Number,
  courseId: Number
): Promise<boolean> => {
  try {
    const existRegistration = await db.usersCourse.findOne({
      where: {
        userId,
        courseId,
        progress: 0,
      },
    });
    if (!existRegistration) {
      await db.usersCourse.create({ userId, courseId });
      return true;
    }
    return false;
  } catch (err) {
    throw Error(err as string);
  }
};

export const cancelRegistration = async (
  userId: Number,
  courseId: Number
): Promise<boolean> => {
  try {
    const existRegistration = await db.usersCourse.findOne({
      where: {
        userId,
        courseId,
      },
    });
    if (existRegistration && !existRegistration.finishesAt) {
      await db.usersCourse.destroy({ where: { userId, courseId } });
      return true;
    }
    return false;
  } catch (err) {
    throw Error(err as string);
  }
};

export const finishCourse = async (
  userId: Number,
  courseId: Number
): Promise<boolean> => {
  const existRegistration = await db.usersCourse.findOne({
    where: {
      userId,
      courseId,
    },
  });
  if (existRegistration) {
    await db.usersCourse.update(
      { finishesAt: new Date().toLocaleDateString() },
      { where: { userId, courseId } }
    );
    return true;
  }
  return false;
};
