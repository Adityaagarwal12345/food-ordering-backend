import express, { Application } from "express";
import path from "path";
import { fileURLToPath } from "url";

import { AdminRoute, VandorRoute , ShoppingRoute} from "../routes/index.js";

// 🔥 Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ExpressApp = async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve images
  const imagePath = path.join(__dirname, "../images");
  app.use("/images", express.static(imagePath));

  app.use("/admin", AdminRoute);
  app.use("/vendor", VandorRoute);
  app.use(ShoppingRoute)
  return app;
};

export default ExpressApp;
