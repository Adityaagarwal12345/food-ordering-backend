import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import { APP_SECRET } from "../config/index.js";
import { VandorLoginInput, VandorPayload } from "../dto/Vandor.dto.js";
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


export const GenerateSignature = async (payload:VandorPayload ): Promise<string> => {
  const signature = jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  return signature; 

}