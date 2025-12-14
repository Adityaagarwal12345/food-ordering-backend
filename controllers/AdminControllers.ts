import type { Request, Response, NextFunction } from "express";
import type { CreateVandorInput } from "../dto/Vandor.dto.js";
import { Vendor } from "../models/index.js";
import { GenerateSalt, GeneratePassword } from "../utility/PasswordUtility.js";

export const FindVendor = async (
  id?: string,
  email?: string
) => {
  if (email) {
    return await Vendor.findOne({ email });
  }
  if (id) {
    return await Vendor.findById(id);
  }
  return null;
};

export const CreateVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      address,
      pincode,
      foodType,
      email,
      password,
      ownerName,
      phone
    } = req.body as CreateVandorInput;

    const existingVandor = await FindVendor(undefined, email);

    if (existingVandor) {
      return res
        .status(409)
        .json({ message: "Vendor already exists with this email" });
    }

    const salt = await GenerateSalt();
    const hashedPassword = await GeneratePassword(password, salt);

    const createdVandor = await Vendor.create({
      name,
      address,
      pincode,
      foodType,
      email,
      password: hashedPassword,
      salt,
      ownerName,
      phone,
      rating: 0,
      serviceAvailable: false,
      coverImages: []
    });

    return res.status(201).json(createdVandor);
  } catch (error) {
    next(error);
  }
};

export const GetVandors = async (
  req: Request,
  res: Response
) => {
  const vendors = await Vendor.find();
  res.json(vendors);
};

export const GetVandorById = async (
  req: Request,
  res: Response
) => {
  const vendor = await Vendor.findById(req.params.id);
  res.json(vendor);
};
