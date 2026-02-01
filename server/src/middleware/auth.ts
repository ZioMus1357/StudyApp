import { Request, Response, NextFunction } from "express";
import { verifyAccess } from "../utils/jwt";

export const authenticate = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccess(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};


export const authorize = (roles: string[]) => (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (!roles.includes((req.user as any).role)) return res.status(403).json({ message: "Forbidden" });
  next();
};
