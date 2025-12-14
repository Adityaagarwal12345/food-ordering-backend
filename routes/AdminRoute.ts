import express from "express";
import {
  CreateVandor,
  GetVandors,
  GetVandorById
} from "../controllers/index.js";

const router = express.Router();

router.post("/vandor", CreateVandor);
router.get("/get-vandors", GetVandors);
router.get("/get-vandor/:id", GetVandorById);

router.get("/", (req, res) => {
  res.json("Admin Route is working 🚀");
});

export { router as AdminRoute };
