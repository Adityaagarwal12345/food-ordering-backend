import mongoose from "mongoose";
import { MONGO_URI } from "../config/index.js";

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
};

export default dbConnection;
