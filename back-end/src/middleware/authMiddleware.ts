import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) {
    res.status(401).json({ message: "Token missing" });
    return;
  }

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    req.user = user; // gắn user vào req để dùng trong route
    next();
  });
};
