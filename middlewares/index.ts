import { Request, Response, NextFunction } from "express";
import type { AuthPayload } from "../dto/Auth.dto.js";
import { ValidateSignature } from "../utility/PasswordUtility.js";

/* 🔹 Extend Express Request */
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const payload = await ValidateSignature(token);

    if (!payload) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = payload; // ✅ THIS FIXES YOUR ISSUE
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
