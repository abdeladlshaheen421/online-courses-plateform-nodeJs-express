import db from "../models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const { PASSWORD_PEPPER, SALT_ROUNDS } = process.env;

enum Role {
  "admin",
  "user",
}
export type userType = {
  id?: Number;
  name?: string;
  email: string;
  password: string;
  role?: Role;
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

const encryptPassword = async (password: string): Promise<string> => {
  const hashedPassword: string = await bcrypt.hash(
    password + PASSWORD_PEPPER,
    Number(SALT_ROUNDS)
  );
  return hashedPassword;
};
