import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { PASSWORD_PEPPER, SALT_ROUNDS, JWT_SECRET } = process.env;

enum Role {
  admin = "admin",
  user = "user",
}
export type userType = {
  id?: Number;
  name?: string;
  email: string;
  password: string;
  role?: Role;
};
const encryptPassword = async (password: string): Promise<string> => {
  const hashedPassword: string = await bcrypt.hash(
    password + PASSWORD_PEPPER,
    Number(SALT_ROUNDS)
  );
  return hashedPassword;
};

export const register = async (user: userType): Promise<void> => {
  user.password = await encryptPassword(user.password);
  user.role = Role.user;
  try {
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
      return {token,role:user.role}
    }
    return false;
  } catch (err) {
    throw Error(err as string);
  }
};
