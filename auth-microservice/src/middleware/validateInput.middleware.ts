import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { errorResponse } from "../utils/response.utils";

export function ValidateInput(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData;
      next();
    } catch (error) {
      console.error("Invalid input", error);
      res.status(400).json(errorResponse("Invalid input"));
    }
  };
}
