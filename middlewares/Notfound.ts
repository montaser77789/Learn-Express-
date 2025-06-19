import { NextFunction, Request, Response } from "express";

export default class NotfoundMiddleware {
  static handle(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith("/api")) {
      res.status(404).json({
        message: `Route ${req.originalUrl} not found !`,
      });
      return;
    }

    res.status(404).render("notfound", {
      message: "Internal server error !",
    });
  }
}
