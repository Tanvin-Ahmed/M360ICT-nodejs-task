import { NextFunction, Request, Response } from "express";
import { constantVariables } from "../config/variables";
import JWT from "jsonwebtoken";

export const userAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the token from the request headers
    const authHeader = req.headers.authorization as string;

    if (!authHeader) {
      return res.status(401).json({ error: true, message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: true, message: "Token missing" });
    }

    // Verify the token
    JWT.verify(token, constantVariables.jwt_secret!, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ error: true, message: "Invalid or expired token" });
      }

      next();
    });
  } catch (error: any) {
    res.status(500).json({ message: "Authorization error", error: true });
  }
};
