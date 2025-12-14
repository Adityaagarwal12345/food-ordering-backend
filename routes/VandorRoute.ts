import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Vendor Route is working 🚀");
});

export { router as VandorRoute };
