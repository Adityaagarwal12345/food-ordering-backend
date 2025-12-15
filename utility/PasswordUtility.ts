import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config/index.js";
import type { VandorPayload } from "../dto/Vandor.dto.js";

// 🔐 PASSWORD UTILS
export const GenerateSalt = async (): Promise<string> => {
  return await bcrypt.genSalt(10);
};

export const GeneratePassword = async (
  password: string,
  salt: string
): Promise<string> => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

// 🔑 JWT UTILS
export const GenerateSignature = async (
  payload: VandorPayload
): Promise<string> => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
};

export const ValidateSignature = async (
  token: string
): Promise<VandorPayload | null> => {
  try {
    const payload = jwt.verify(token, APP_SECRET) as VandorPayload;
    return payload;
  } catch (error) {
    console.error("JWT validation failed");
    return null;
  }
};
