import { ValidationError, validationResult } from "express-validator";
import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userType, Role } from "../controllers/user.controller";

dotenv.config();
const {JWT_SECRET} = process.env;
export const validateMiddleware = (req: Request) => {
  const errorFormatter = ({
    location,
    msg,
    param,
    value,
    nestedErrors,
  }: ValidationError) => {
    return `${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);

  return result;
};


export const isAuthenticatedAdmin = (req:Request, res:Response, next:NextFunction) => {
  try{
      const authHeader:string = <string>req.headers.authorization
      const token:string =authHeader.split(' ')[1]
      const adminData : userType = <userType>jwt.verify(token,<string>JWT_SECRET)
      if(adminData.role=Role.admin){
        next();
        return;
      }
      else{
        return res.status(401).json({error:'Access Denied , error with Token'})
      }
  }catch(error){
      return res.status(401).json({error:'Access Denied , error with Token'})
  }
}


export const isAuthenticatedUser = (req:Request, res:Response, next:NextFunction) => {
  try{
      const authHeader:string = <string>req.headers.authorization
      const token:string =authHeader.split(' ')[1]
      const adminData : userType = <userType>jwt.verify(token,<string>JWT_SECRET)
      if(adminData.role=Role.user){
        next();
        return;
      }
      else{
        return res.status(401).json({error:'Access Denied , error with Token'})
      }
  }catch(error){
      return res.status(401).json({error:'Access Denied , error with Token'})
  }
}
