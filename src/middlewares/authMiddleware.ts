import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret: any = process.env.SECRET;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {
    headers: { token },
  } = req;

  if (!token) return res.status(401).json({ message: "user not authenticated" });

  jwt.verify(token, secret, (err, decode) => {
    if (err) return res.status(500).json({ message: "Failed to authenticate token." });
    req.userId = decode.id;
  });

  next();
};
