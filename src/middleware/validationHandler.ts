import Joi from "joi";
import { NextFunction } from "connect";
import { Request, Response } from "express";
import boom from "@hapi/boom";

export const validationHandler = (
  schema: Joi.ObjectSchema | Joi.StringSchema,
  check: string = "body",
  paramName: string = "id"
) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const data = check === "body" ? req.body : req.params[paramName];
    const error = schema.validate(data);
    error.error ? next(boom.badRequest(error.value)) : next();
  };
};
