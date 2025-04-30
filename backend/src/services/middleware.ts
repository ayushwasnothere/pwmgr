import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.headers["authorization"];

  if (!authToken || !authToken.startsWith("Bearer")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const token = authToken?.split(" ")[1];
  try {
    const decoded = jwt.verify(token || "", String(process.env.JWT_SECRET));
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.locals.user = decoded;
    next();
    return;
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
