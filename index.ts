import express from "express";
import ExpressApp from "./services/ExpressApp.js";
import dbConnection from "./services/Database.js";
import { PORT } from "./config/index.js";

const StartServer = async () => {
  const app = express();

  await dbConnection();
  await ExpressApp(app);

  app.get("/", (_req, res) => {
    res.send("Food Ordering API is running 🚀");
  });

  app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
  });
};

StartServer();
