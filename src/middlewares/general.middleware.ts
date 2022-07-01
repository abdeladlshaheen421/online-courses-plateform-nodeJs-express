import { ValidationError, validationResult } from "express-validator";
import { Request } from "express";
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
