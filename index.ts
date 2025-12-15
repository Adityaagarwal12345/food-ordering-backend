import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { AdminRoute, VandorRoute } from "./routes/index.js";
import { MONGO_URI } from "./config/index.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname,"images")));

/* 🔹 API Routes */
app.use("/admin", AdminRoute);
app.use("/vendor", VandorRoute);

app.get("/", (req, res) => {
  res.send("Food Ordering API is running 🚀");
});

const PORT = 5000;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🔥 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed", err);
    process.exit(1);
  }
};

startServer();
