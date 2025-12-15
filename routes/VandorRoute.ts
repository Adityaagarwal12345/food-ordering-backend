import express, { Request,Response,NextFunction } from "express";
import { VandorLogin
  ,GetVandorProfile,
  UpdateVandorProfile,
  UpdateVandorService} 
  from "../controllers/VandorController.js";
import { Authenticate } from "../middlewares/CommanAuth.js";
const router = express.Router();

router.post('/login',VandorLogin);


router.get('/profile',Authenticate,GetVandorProfile)
router.patch('/profile',Authenticate,UpdateVandorProfile);
router.patch('/service'   ,Authenticate,UpdateVandorService);
router.get("/", (req:Request, res:Response,next:NextFunction) => {
 
  res.json({message:"Vendor Route is working 🚀"});

});

export { router as VandorRoute };
