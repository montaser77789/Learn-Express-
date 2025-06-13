import { NextFunction, Request, Response } from "express";

export default class ErrorMiddleware {
  static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith("/api")) {
      res.status(500).json({
        message: "Internal server error !",
        err: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
      });
    }
  }
}
