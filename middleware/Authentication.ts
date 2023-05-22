import { NextFunction, Response, Request } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.userId) {
    res.status(402);
    next(new Error("Unauthorized"));
  }
  next();
}
