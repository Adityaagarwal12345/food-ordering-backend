import express, { Request,Response,NextFunction } from "express";
import { VandorLogin } from "../controllers/VandorController.js";
const router = express.Router();

router.post('/login',VandorLogin);

router.get("/", (req:Request, res:Response,next:NextFunction) => {
 
  res.json({message:"Vendor Route is working 🚀"});

});

export { router as VandorRoute };
