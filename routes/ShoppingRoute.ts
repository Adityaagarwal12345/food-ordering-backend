import express from "express";
import type{Request,Response,NextFunction} from "express";
import {GetFoodAvailability,GetTopRestaurants,GetFoodsIn30Minutes,SearchFoods,GetResturantById} from "../controllers/ShoppingController.js";

const router=express.Router();

//food avaliable in shoppiing cart
router.get('/:pincode',GetFoodAvailability);

//top restruants
router.get('/top-resturants/:pincode',GetTopRestaurants);

//food avaliable in 30 minutes

router.get('/food-in-30-minutes/:pincode',  GetFoodsIn30Minutes);
//search foods

router.get('/search/:pincode',  SearchFoods);
//find resturant by id 

router.get('/resturant/:id',    GetResturantById);

//test route
router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.json({message:"Shopping Route is working 🚀"})
})
export {router as ShoppingRoute};