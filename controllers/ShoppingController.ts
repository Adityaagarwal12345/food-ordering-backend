import type { Request, Response, NextFunction } from "express";
import { Vendor } from "../models/Vandor.js";
import { FoodDoc } from "../models/Food.js";

/* =========================
   FOOD AVAILABILITY
========================= */
export const GetFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pincode = req.params.pincode;

    const result = await Vendor.find({
      pincode,
      serviceAvailable: true,
    })
      .sort({ rating: -1 })
      .populate("foods");

    if (result.length > 0) {
      return res.status(200).json(result);
    }

    return res.status(404).json({ message: "No Food Available" });
  } catch (error) {
    next(error);
  }
};

/* =========================
   TOP RESTAURANTS
========================= */
export const GetTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pincode = req.params.pincode;

    const result = await Vendor.find({
      pincode,
      serviceAvailable: true,
    })
      .sort({ rating: -1 })
      .limit(10);

    if (result.length > 0) {
      return res.status(200).json(result);
    }

    return res.status(404).json({ message: "No Restaurant Found" });
  } catch (error) {
    next(error);
  }
};

/* =========================
   FOODS IN 30 MINUTES
========================= */
export const GetFoodsIn30Minutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pincode = req.params.pincode;

    const vendors = await Vendor.find({
      pincode,
      serviceAvailable: true,
    }).populate("foods");

    if (vendors.length === 0) {
      return res.status(404).json({ message: "No Food Available" });
    }

    const foodResult = vendors.map((vendor) => {
      const foods = vendor.foods as FoodDoc[];

      const foodsIn30Minutes = foods.filter(
        (food) => food.readyTime <= 30
      );

      return {
        ...vendor.toObject(),
        foods: foodsIn30Minutes,
      };
    });

    return res.status(200).json(foodResult);
  } catch (error) {
    next(error);
  }
};

/* =========================
   SEARCH FOODS
========================= */
export const SearchFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pincode = req.params.pincode;

    const vendors = await Vendor.find({
      pincode,
      serviceAvailable: true,
    }).populate("foods");

    if (vendors.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    let foodResult: FoodDoc[] = [];

    vendors.forEach((vendor) => {
      const foods = vendor.foods as FoodDoc[];
      foodResult.push(...foods);
    });

    return res.status(200).json(foodResult);
  } catch (error) {
    next(error);
  }
};

/* =========================
   RESTAURANT BY ID
========================= */
export const GetResturantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurantId = req.params.id;

    const result = await Vendor.findById(restaurantId).populate("foods");

    if (!result) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
