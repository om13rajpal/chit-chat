import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response.utils";

export async function PageNotFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).json(errorResponse("Page not found"));
}

export async function InternalServerError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json(errorResponse("Internal server error", err));
}
