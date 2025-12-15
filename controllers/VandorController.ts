import { Request, Response, NextFunction } from "express";
import { FindVendor } from "./AdminControllers.js";
import type { VandorLoginInput } from "../dto/Vandor.dto.js";
import { GenerateSignature,ValidatePassword } from "../utility/PasswordUtility.js";
import type { EditVandorInput } from "../dto/Vandor.dto.js";
import { Food } from "../models/Food.js";
import type { CreateFoodInput } from "../dto/Food.dto.js";

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
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const existingVendor = await FindVendor(user._id);

  if (!existingVendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  return res.status(200).json(existingVendor);
};



export const UpdateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodType, name, address, phone } =
      req.body as EditVandorInput;

    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const existingVandor = await FindVendor(user._id);

    if (!existingVandor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Update only provided fields
    existingVandor.name = name ?? existingVandor.name;
    existingVandor.address = address ?? existingVandor.address;
    existingVandor.phone = phone ?? existingVandor.phone;
    existingVandor.foodType = foodType ?? existingVandor.foodType;

    const updatedVandor = await existingVandor.save();

    return res.status(200).json(updatedVandor);
  } catch (error) {
    next(error);
  }
};

export const UpdateVandorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => { const user = req.user;

    
     
    if(user){

       const vendor = await FindVendor(user._id);

       if(vendor !== null){

        const files = req.files as Express.Multer.File[]|undefined;
        const images = files?files.map((file) => file.filename):[];

            vendor.coverImages.push(...images);  

            const result = await vendor.save();
            return res.json(result);
       }

    }
    return res.status(400).json({ message: "Unable to add food" });

};
export const UpdateVandorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { serviceAvailable } = req.body;

    const existingVandor = await FindVendor(user._id);

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

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
    console.log("REQ BODY =>", req.body);
    console.log("REQ FILES =>", req.files);
    const user = req.user;

    const { name, description, category, foodType, readyTime, price } = <CreateFoodInput>req.body;
     
    if(user){

       const vendor = await FindVendor(user._id);

       if(vendor !== null){

        const files = req.files as Express.Multer.File[]|undefined;
        const images = files?files.map((file) => file.filename):[];

           
            
            const food = await Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                price: price,
                rating: 0,
                readyTime: readyTime,
                foodType: foodType,
                images: images
            })
            
            vendor.foods.push(food._id);

            const result = await vendor.save();
            return res.json(result);
       }

    }
    return res.status(400).json({ message: "Unable to add food" });

}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
 
    if(user){

       const foods = await Food.find({ vendorId: user._id});

       if(foods !== null){
            return res.json(foods);
       }

    }
    return res.json({'message': 'Foods not found!'})
}