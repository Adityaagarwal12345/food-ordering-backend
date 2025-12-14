import { Request, Response, NextFunction } from "express";
import { FindVendor } from "./AdminControllers.js";
import type { VandorLoginInput } from "../dto/Vandor.dto.js";
import { ValidatePassword } from "../utility/PasswordUtility.js";

export const VandorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as VandorLoginInput;

    const existingVandor = await FindVendor(undefined, email);

    if (!existingVandor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const validPassword = await ValidatePassword(
      password,
      existingVandor.password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      _id: existingVandor._id,
      email: existingVandor.email,
      name: existingVandor.name,
      ownerName: existingVandor.ownerName,
      serviceAvailable: existingVandor.serviceAvailable
    });
  } catch (error) {
    next(error);
  }
};
