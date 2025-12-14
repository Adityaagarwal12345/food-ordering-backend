import { Request, Response, NextFunction } from "express";
import { FindVendor } from "./AdminControllers.js";
import type { VandorLoginInput } from "../dto/Vandor.dto.js";
import { GenerateSignature,ValidatePassword } from "../utility/PasswordUtility.js";


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

    // ✅ Generate JWT
    const token = await GenerateSignature({
      _id: existingVandor._id.toString(),
      email: existingVandor.email,
      foodType: existingVandor.foodType,
      name: existingVandor.name
    });

    return res.status(200).json({
      token,
      vendor: {
        _id: existingVandor._id,
        email: existingVandor.email,
        name: existingVandor.name,
        ownerName: existingVandor.ownerName,
        serviceAvailable: existingVandor.serviceAvailable
      }
    });
  } catch (error) {
    next(error);
  }
};

//its provide vandor profile details
export const GetVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandorId = req.params.id;

    const existingVandor = await FindVendor(vandorId);
    if (!existingVandor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    return res.status(200).json(existingVandor);
  } catch (error) {
    next(error);
  }
};

export const UpdateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandorId = req.params.id;
    const updateData = req.body;
    const existingVandor = await FindVendor(vandorId);
    if (!existingVandor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    Object.assign(existingVandor, updateData);
    const updatedVandor = await existingVandor.save();
    return res.status(200).json(updatedVandor);
  } catch (error) {
    next(error);
  }
};
export const UpdateVandorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandorId = req.params.id;
    const { serviceAvailable } = req.body;
    const existingVandor = await FindVendor(vandorId);
    if (!existingVandor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    existingVandor.serviceAvailable = serviceAvailable;
    const updatedVandor = await existingVandor.save();
    return res.status(200).json(updatedVandor);
  } catch (error) {
    next(error);
  }
};