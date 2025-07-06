import { NextFunction, Request, Response } from "express";

export function PageNotFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
}

export function InternalServerError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error,
  });
}
