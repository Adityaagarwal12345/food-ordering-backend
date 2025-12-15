import type { Request, Response, NextFunction } from "express";
import type { CreateVandorInput } from "../dto/Vandor.dto.js";
import { Vendor } from "../models/index.js";
import { GenerateSalt, GeneratePassword } from "../utility/PasswordUtility.js";
import mongoose from "mongoose";

export const FindVendor = async (
  id?: string,
  email?: string
) => {
  if (email) {
    return await Vendor.findOne({ email });
  }

  if (id) {
    return await Vendor.findById(
      new mongoose.Types.ObjectId(id)
    );
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
  res: Response,
  next:NextFunction
) => {
  const vendors = await Vendor.find();

  if(vendors !==null){
    return res.json(vendors);
  }
  res.json({"message":"vendors data not available"});
};

export const GetVandorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendorId = req.params.id;

    const vendor = await FindVendor(vendorId);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor data not available"
      });
    }

    return res.status(200).json(vendor);
  } catch (error) {
    next(error);
  }
};
