import express, { Request, Response, NextFunction } from "express";
import {
  AddFood,
  GetFoods,
  VandorLogin,
  GetVandorProfile,
  UpdateVandorProfile,
  UpdateVandorService,
  UpdateVandorCoverImage
} from "../controllers/VandorController.js";
import { Authenticate } from "../middlewares/CommanAuth.js";

import multer from "multer";

const router = express.Router();

/* 🔹 Multer Storage Config */
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

/* 🔹 Multer Middleware */
const images = multer({ storage: imageStorage }).array("images", 10);

/* 🔹 Auth Routes */
router.post("/login", VandorLogin);

/* 🔹 Vendor Profile Routes */
router.get("/profile", Authenticate, GetVandorProfile);
router.patch("/profile", Authenticate, UpdateVandorProfile);
router.patch("/coverimage", Authenticate,images, UpdateVandorCoverImage);
router.patch("/service", Authenticate, UpdateVandorService);

/* 🔹 Food Routes */
router.post("/food", Authenticate, images, AddFood);
router.get("/food", Authenticate, GetFoods);

/* 🔹 Test Route */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Vendor Route is working 🚀" });
});

export { router as VandorRoute };
