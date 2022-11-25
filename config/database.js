import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/ynov-pwa")
  .then((db) => console.log("✅ DB is connected"))
  .catch((err) => console.log(`❌ DB is not connected: ${err}`));
